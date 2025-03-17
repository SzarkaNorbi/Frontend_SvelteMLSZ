<script>
    import CsapatApi from '../../../generated-client/src/api/CsapatApi.js';
    import StadionApi from '../../../generated-client/src/api/StadionApi.js';
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    
    const csapatApi = new CsapatApi();
    const stadionApi = new StadionApi();
    
    let csapatok = [];
    let searchQuery = "";
    let sortBy = "abc";
    let isLoading = true;
    let stadionCache = new Map();
    
    onMount(() => {
        loadTeams();
    });
    
    function loadTeams() {
        isLoading = true;
        csapatApi.apiCsapatGet((error, data, response) => {
            if (error) {
                console.error(error);
            } else {
                csapatok = data;
            }
            isLoading = false;
        });
    }
    
    async function getStadionName(stadionId) {
        if (stadionCache.has(stadionId)) {
            return stadionCache.get(stadionId);
        }
        
        try {
            const stadionName = await new Promise((resolve, reject) => {
                stadionApi.stadionIdGet(stadionId, (error, data, response) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(data.stadionNeve);
                    }
                });
            });
            
            stadionCache.set(stadionId, stadionName);
            return stadionName;
        } catch (error) {
            console.error('Error fetching stadion name:', error);
            return 'Ismeretlen stadion';
        }
    }
    
    function convertStatusz(id) {
        const statusMap = {
            0: { text: 'Aktív', class: 'status-active' },
            1: { text: 'Inaktív', class: 'status-inactive' },
            3: { text: 'Felbomlott', class: 'status-dissolved' }
        };
        
        return statusMap[id] || { text: 'Ismeretlen', class: 'status-unknown' };
    }
    
    function formatFoundingDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('hu-HU', { year: 'numeric', month: 'long', day: 'numeric' });
    }
    
    function getFoundingYear(dateString) {
        return new Date(dateString).getFullYear();
    }
    
    $: filteredTeams = csapatok
        .filter(csapat => csapat.csapatNev.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => {
            if (sortBy === "abc") {
                return a.csapatNev.localeCompare(b.csapatNev);
            } else if (sortBy === "alapitas") {
                return new Date(a.alapitasDatum) - new Date(b.alapitasDatum);
            } else if (sortBy === "statusz") {
                return a.statusz - b.statusz;
            }
            return 0;
        });
</script>

<section class="teams-section">
    <div class="container">
        <header class="section-header">
            <p class="section-subtitle">Tekintsen meg magyar csapatokat!</p>
        </header>
        
        <div class="controls">
            <div class="search-container">
                <input 
                    type="text" 
                    bind:value={searchQuery} 
                    placeholder="Keresés csapatnév alapján..." 
                    class="search-input" 
                />
                <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
            </div>
            
            <div class="sort-container">
                <label for="sort-select" class="sort-label">Rendezés:</label>
                <div class="select-wrapper">
                    <select id="sort-select" bind:value={sortBy} class="sort-select">
                        <option value="abc">ABC sorrend</option>
                        <option value="alapitas">Alapítási év</option>
                        <option value="statusz">Státusz</option>
                    </select>
                    <svg class="select-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>
            </div>
        </div>
        
        {#if isLoading}
            <div class="loading" in:fade>
                <div class="spinner"></div>
                <p>Csapatok betöltése...</p>
            </div>
        {:else if filteredTeams.length === 0}
            <div class="no-results" in:fade>
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <p>Nincs találat a keresési feltételeknek megfelelően</p>
            </div>
        {:else}
            <div class="teams-grid" in:fade={{ duration: 300 }}>
                {#each filteredTeams as csapat, i (csapat.csapatNev)}
                    <div class="team-card" in:fly={{ y: 20, delay: i * 50, duration: 300 }}>
                        <div class="card-badge" class:active={csapat.statusz === 0}>
                            {convertStatusz(csapat.statusz).text}
                        </div>
                        
                        <div class="card-header">
                            <div class="logo-container">
                                <img 
                                    class="team-logo" 
                                    src={`https://focistak-test.runasp.net/Media/Files/${csapat.media_Id}`} 
                                    alt={`${csapat.csapatNev} logo`}
                                />
                            </div>
                            <div class="team-info">
                                <h2 class="team-name">{csapat.csapatNev}</h2>
                                <div class="founding-year">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                        <line x1="16" y1="2" x2="16" y2="6"></line>
                                        <line x1="8" y1="2" x2="8" y2="6"></line>
                                        <line x1="3" y1="10" x2="21" y2="10"></line>
                                    </svg>
                                    <span>{getFoundingYear(csapat.alapitasDatum)}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="card-body">
                            <div class="info-row">
                                <div class="info-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                </div>
                                <div class="info-content">
                                    <span class="info-label">Edző</span>
                                    <span class="info-value">{csapat.jelenlegiEdzo || 'Nincs megadva'}</span>
                                </div>
                            </div>
                            
                            <div class="info-row">
                                <div class="info-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                    </svg>
                                </div>
                                <div class="info-content">
                                    <span class="info-label">Stadion</span>
                                    {#await getStadionName(csapat.stadionId)}
                                        <span class="info-value loading-text">Betöltés...</span>
                                    {:then stadionName}
                                        <span class="info-value">{stadionName}</span>
                                    {:catch error}
                                        <span class="info-value error-text">Hiba történt</span>
                                    {/await}
                                </div>
                            </div>
                            
                            <div class="info-row">
                                <div class="info-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <polyline points="12 6 12 12 16 14"></polyline>
                                    </svg>
                                </div>
                                <div class="info-content">
                                    <span class="info-label">Alapítva</span>
                                    <span class="info-value">{formatFoundingDate(csapat.alapitasDatum)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</section>

<style>
    /* Variables */
    :root {
        --primary: #1d3557;
        --primary-light: #457b9d;
        --primary-dark: #0d1b2a;
        --accent: #e63946;
        --success: #2a9d8f;
        --warning: #e9c46a;
        --danger: #e76f51;
        --light: #f1faee;
        --dark: #1d3557;
        --gray-100: #f8f9fa;
        --gray-200: #e9ecef;
        --gray-300: #dee2e6;
        --gray-400: #ced4da;
        --gray-500: #adb5bd;
        --gray-600: #6c757d;
        --gray-700: #495057;
        --gray-800: #343a40;
        --gray-900: #212529;
        --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.05);
        --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        --shadow-md: 0 6px 12px rgba(0, 0, 0, 0.15);
        --shadow-lg: 0 15px 25px rgba(0, 0, 0, 0.1);
        --radius-sm: 0.25rem;
        --radius: 0.5rem;
        --radius-lg: 1rem;
        --radius-xl: 1.5rem;
        --transition: all 0.3s ease;
        --font-base: 1.125rem;
    }

    /* Base Styles */
    .teams-section {
        padding: 4rem 1rem;
        background-color: var(--gray-100);
        min-height: 100vh;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: var(--font-base);
    }

    .container {
        width: 100%;
        max-width: 1400px; 
        margin: 0 auto;
        padding: 0 1rem;
    }

    /* Section Header */
    .section-header {
        text-align: center;
        margin-bottom: 3.5rem;
        position: relative;
    }

    .section-subtitle {
        font-size: 2.75rem;
        font-weight: 700;
        color: var(--primary);
        margin: 0;
        position: relative;
        display: inline-block;
        line-height: 1.2;
        padding-top: 80px;
    }

    .section-subtitle::after {
        content: '';
        position: absolute;
        bottom: -0.75rem;
        left: 50%;
        transform: translateX(-50%);
        width: 100px;
        height: 4px;
        
        border-radius: 2px;
    }

    /* Controls */
    .controls {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
        margin-bottom: 3rem;
        max-width: 900px;
        margin-left: auto;
        margin-right: auto;
    }

    @media (min-width: 768px) {
        .controls {
            flex-direction: row;
            align-items: center;
        }
    }

    .search-container {
        position: relative;
        flex: 1;
    }

    .search-input {
        width: 100%;
        padding: 1rem 1.25rem 1rem 3rem; 
        border: 2px solid var(--gray-300);
        border-radius: var(--radius);
        font-size: 1.125rem;
        background-color: white;
        transition: var(--transition);
        color: var(--gray-800);
    }

    .search-input:focus {
        outline: none;
        border-color: var(--primary-light);
        box-shadow: 0 0 0 4px rgba(69, 123, 157, 0.2);
    }

    .search-input::placeholder {
        color: var(--gray-500);
    }

    .search-icon {
        position: absolute;
        left: 1rem;
        top: 50%;
        transform: translateY(-50%);
        width: 1.5rem; 
        height: 1.5rem;
        color: var(--gray-500);
        pointer-events: none;
    }

    .sort-container {
        display: flex;
        align-items: center;
        gap: 1rem;
        min-width: 280px; 
    }

    .sort-label {
        font-size: 1.125rem;
        font-weight: 500;
        color: var(--gray-700);
        white-space: nowrap;
    }

    .select-wrapper {
        position: relative;
        flex: 1;
    }

    .sort-select {
        width: 100%;
        appearance: none;
        padding: 1rem 2.75rem 1rem 1.25rem;
        border: 2px solid var(--gray-300);
        border-radius: var(--radius);
        font-size: 1.125rem;
        background-color: white;
        cursor: pointer;
        transition: var(--transition);
        color: var(--gray-800);
    }

    .sort-select:focus {
        outline: none;
        border-color: var(--primary-light);
        box-shadow: 0 0 0 4px rgba(69, 123, 157, 0.2);
    }

    .select-icon {
        position: absolute;
        right: 1rem;
        top: 50%;
        transform: translateY(-50%);
        width: 1.5rem;
        height: 1.5rem;
        color: var(--gray-500);
        pointer-events: none;
    }

    /* Loading & No Results */
    .loading, .no-results {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 5rem 0;
        color: var(--gray-600);
        text-align: center;
    }

    .spinner {
        width: 4rem;
        height: 4rem;
        border: 4px solid var(--gray-200);
        border-top-color: var(--primary);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 2rem;
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }

    .no-results svg {
        margin-bottom: 2rem;
        color: var(--gray-400);
    }

    .no-results p {
        font-size: 1.25rem;
        max-width: 350px;
    }

    /* Teams Grid */
    .teams-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 2.5rem;
    }

    /* Team Card */
    .team-card {
        background-color: white;
        border-radius: var(--radius-lg);
        overflow: hidden;
        box-shadow: var(--shadow);
        transition: var(--transition);
        position: relative;
    }

    .team-card:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-lg);
    }

    .card-badge {
        position: absolute;
        top: 1.25rem;
        right: 1.25rem;
        padding: 0.35rem 1rem;
        border-radius: 9999px;
        font-size: 0.875rem;
        font-weight: 600;
        background-color: var(--gray-200);
        color: var(--gray-700);
        z-index: 10;
    }

    .card-badge.active {
        background-color: rgba(42, 157, 143, 0.15);
        color: var(--success);
    }

    .card-header {
        padding: 2rem 2rem 1rem;
        display: flex;
        align-items: center;
        gap: 1.5rem;
    }

    .logo-container {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        overflow: hidden;
        background-color: var(--gray-100);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: var(--shadow-sm);
        flex-shrink: 0;
    }

    .team-logo {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: var(--transition);
    }

    .team-card:hover .team-logo {
        transform: scale(1.1);
    }

    .team-info {
        flex: 1;
    }

    .team-name {
        font-size: 1.75rem;
        font-weight: 700;
        color: var(--primary-dark);
        margin: 0 0 0.75rem 0;
        line-height: 1.2;
    }

    .founding-year {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--gray-600);
        font-size: 1rem;
    }

    .founding-year svg {
        width: 1.25rem; 
        height: 1.25rem;
    }

    .card-body {
        padding: 1.5rem 2rem 2rem;
    }

    .info-row {
        display: flex;
        align-items: flex-start;
        gap: 1.25rem;
        margin-bottom: 1.5rem;
    }

    .info-row:last-child {
        margin-bottom: 0;
    }

    .info-icon {
        width: 2.5rem; 
        height: 2.5rem;
        border-radius: var(--radius-sm);
        background-color: var(--gray-100);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }

    .info-icon svg {
        width: 1.5rem;
        height: 1.5rem;
        color: var(--primary-light);
    }

    .info-content {
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    .info-label {
        font-size: 0.875rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--gray-500);
        margin-bottom: 0.35rem;
    }

    .info-value {
        font-size: 1.25rem;
        color: var(--gray-800);
        line-height: 1.4;
    }

    .loading-text {
        color: var(--gray-500);
        font-style: italic;
    }

    .error-text {
        color: var(--danger);
    }

    /* Enhanced Responsive Adjustments */
    @media (max-width: 1200px) {
        .teams-grid {
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 2rem;
        }
    }

    @media (max-width: 992px) {
        .section-subtitle {
            font-size: 2.25rem;
        }
        
        .teams-grid {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        }
        
        .team-name {
            font-size: 1.5rem;
        }
        
        .info-value {
            font-size: 1.125rem;
        }
    }

    @media (max-width: 768px) {
        .teams-section {
            padding: 3rem 1rem;
        }
        
        .section-subtitle {
            font-size: 2rem;
        }
        
        .controls {
            margin-bottom: 2rem;
        }
        
        .search-input, .sort-select {
            font-size: 1rem;
            padding: 0.875rem 1rem 0.875rem 2.75rem;
        }
        
        .sort-select {
            padding: 0.875rem 2.5rem 0.875rem 1rem;
        }
        
        .sort-label {
            font-size: 1rem;
        }
        
        .teams-grid {
            grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
            gap: 1.5rem;
        }
        
        .card-header {
            padding: 1.5rem 1.5rem 0.75rem;
        }
        
        .card-body {
            padding: 1rem 1.5rem 1.5rem;
        }
        
        .logo-container {
            width: 80px;
            height: 80px;
        }
    }

    @media (max-width: 576px) {
        .section-header {
            margin-bottom: 2.5rem;
        }
        
        .section-subtitle {
            font-size: 1.75rem;
        }
        
        .section-subtitle::after {
            width: 80px;
        }
        
        .card-header {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 1rem;
            padding-bottom: 1.25rem;
        }
        
        .team-info {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .founding-year {
            justify-content: center;
        }
        
        .team-name {
            margin-bottom: 0.5rem;
        }
        
        .info-row {
            margin-bottom: 1.25rem;
        }
        
        .info-icon {
            width: 2.25rem;
            height: 2.25rem;
        }
        
        .info-icon svg {
            width: 1.25rem;
            height: 1.25rem;
        }
    }

    @media (max-width: 480px) {
        .section-subtitle {
            font-size: 1.5rem;
        }
        
        .search-input, .sort-select {
            font-size: 0.95rem;
        }
        
        .sort-container {
            min-width: 100%;
        }
        
        .sort-label {
            font-size: 0.95rem;
        }
        
        .team-name {
            font-size: 1.35rem;
        }
        
        .info-value {
            font-size: 1.1rem;
        }
        
        .card-badge {
            font-size: 0.8rem;
            padding: 0.25rem 0.75rem;
        }
    }

    /* Ensure touch targets are large enough on mobile */
    @media (max-width: 768px) {
        .search-input, .sort-select {
            min-height: 3rem;
        }
        
        .sort-container {
            width: 100%;
        }
        
        .sort-select {
            width: 100%;
        }
    }
</style>