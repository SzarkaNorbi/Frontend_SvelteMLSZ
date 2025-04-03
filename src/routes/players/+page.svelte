<script>
    import NemzetisegApi from '../../../generated-client/src/api/NemzetisegApi.js';
    import JatekosApi from '../../../generated-client/src/api/JatekosApi.js';
    import CsapatApi from '../../../generated-client/src/api/CsapatApi.js';
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    
    const jatekosApi = new JatekosApi();
    const nemzetisegApi = new NemzetisegApi();
    const csapatApi = new CsapatApi();
    
    let jatekosok = [];
    let searchQuery = "";
    let sortBy = "abc";
    let isLoading = true;
    let nemzetisegCache = new Map();
    let csapatCache = new Map();
    let viewportWidth;
    
    const positionMap = {
        0: { text: 'Kapus', class: 'position-goalkeeper' },
        1: { text: 'Védő', class: 'position-defender' },
        2: { text: 'Középpályás', class: 'position-midfielder' },
        3: { text: 'Csatár', class: 'position-forward' }
    };
    
    const statusMap = {
        0: { text: 'Aktív', class: 'status-active' },
        1: { text: 'Inaktív', class: 'status-inactive' },
        2: { text: 'Sérült', class: 'status-injured' },
        3: { text: 'Visszavonult', class: 'status-retired' }
    };
    
    onMount(loadPlayers);
    
    function loadPlayers() {
        isLoading = true;
        jatekosApi.jatekosGet((error, data, response) => {
            if (error) {
                console.error(error);
            } else {
                jatekosok = data;
            }
            isLoading = false;
        });
    }
    
    async function getCachedData(id, cache, fetchFn, defaultValue) {
        if (cache.has(id)) {
            return cache.get(id);
        }
        
        try {
            const result = await fetchFn(id);
            cache.set(id, result);
            return result;
        } catch (error) {
            console.error(`Error fetching data:`, error);
            return defaultValue;
        }
    }
    
    async function getNemzetisegName(nemzetisegId) {
        return getCachedData(
            nemzetisegId, 
            nemzetisegCache, 
            async (id) => {
                return new Promise((resolve, reject) => {
                    nemzetisegApi.nemzetisegIdGet(id, (error, data, response) => {
                        if (error) reject(error);
                        else resolve(data.nemzetisegNev);
                    });
                });
            },
            'Ismeretlen nemzetiség'
        );
    }
    
    async function getCsapatName(csapatId) {
        return getCachedData(
            csapatId, 
            csapatCache, 
            async (id) => {
                return new Promise((resolve, reject) => {
                    csapatApi.apiCsapatIdGet(id, (error, data, response) => {
                        if (error) reject(error);
                        else resolve(data.csapatNev);
                    });
                });
            },
            'Ismeretlen csapat'
        );
    }
    
    function convertPozicio(id) {
        return positionMap[id] || { text: 'Ismeretlen', class: 'position-unknown' };
    }
    
    function convertStatusz(id) {
        return statusMap[id] || { text: 'Ismeretlen', class: 'status-unknown' };
    }
    
    function formatBirthDate(dateString) {
        return new Date(dateString).toLocaleDateString('hu-HU', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }
    
    function calculateAge(birthDate) {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        
        return age;
    }
    
    $: filteredPlayers = jatekosok
        .filter(jatekos => `${jatekos.vezeteknev} ${jatekos.keresztnev}`.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => {
            if (sortBy === "abc") {
                return a.vezeteknev.localeCompare(b.vezeteknev);
            } else if (sortBy === "szuldatum") {
                return new Date(a.szuletesiDatum) - new Date(b.szuletesiDatum);
            } else if (sortBy === "statusz") {
                return a.statuszId - b.statuszId;
            }
            return 0;
        });
</script>

<svelte:window bind:innerWidth={viewportWidth} />

<section class="players-section">
    <div class="container">
        <header class="section-header">
            <p class="section-subtitle">Tekintsen meg kiemelt játékosokat!</p>
        </header>
        
        <div class="controls">
            <div class="search-container">
                <input 
                    type="text" 
                    bind:value={searchQuery} 
                    placeholder="Keresés játékos neve alapján..." 
                    class="search-input"
                    aria-label="Keresés játékos neve alapján"
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
                        <option value="szuldatum">Születési dátum</option>
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
                <p>Játékosok betöltése...</p>
            </div>
        {:else if filteredPlayers.length === 0}
            <div class="no-results" in:fade>
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <p>Nincs találat a keresési feltételeknek megfelelően</p>
            </div>
        {:else}
            <div class="players-grid" in:fade={{ duration: 300 }}>
                {#each filteredPlayers as jatekos, i (jatekos.vezeteknev + jatekos.keresztnev)}
                    <div class="player-card" in:fly={{ y: 20, delay: i * 50, duration: 300 }}>
                        <div class="card-badge" class:active={jatekos.statuszId === 0} class:injured={jatekos.statuszId === 2}>
                            {convertStatusz(jatekos.statuszId).text}
                        </div>
                        
                        <div class="card-header">
                            <div class="photo-container">
                                <img 
                                    class="player-photo" 
                                    src={`https://focistak-test.runasp.net/Media/Files/${jatekos.media_Id}`} 
                                    alt={`${jatekos.vezeteknev} ${jatekos.keresztnev}`}
                                    loading="lazy"
                                />
                            </div>
                            <div class="player-info">
                                <h2 class="player-name">{jatekos.vezeteknev} {jatekos.keresztnev}</h2>
                                <div class="position-badge {convertPozicio(jatekos.pozicio).class}">
                                    {convertPozicio(jatekos.pozicio).text}
                                </div>
                            </div>
                        </div>
                        
                        <div class="card-body">
                            <div class="info-row">
                                <div class="info-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                    </svg>
                                </div>
                                <div class="info-content">
                                    <span class="info-label">Csapat</span>
                                    {#if jatekos.statuszId !== 1 && jatekos.statuszId !== 3}
                                        {#await getCsapatName(jatekos.csapatId)}
                                            <span class="info-value loading-text">Betöltés...</span>
                                        {:then csapatName}
                                            <span class="info-value">{csapatName}</span>
                                        {:catch error}
                                            <span class="info-value error-text">Hiba történt</span>
                                        {/await}
                                    {:else}
                                        <span class="info-value inactive-text">Nincs aktív csapat</span>
                                    {/if}
                                </div>
                            </div>
                            
                            <div class="info-row">
                                <div class="info-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="2" y1="12" x2="22" y2="12"></line>
                                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                                    </svg>
                                </div>
                                <div class="info-content">
                                    <span class="info-label">Nemzetiség</span>
                                    {#await getNemzetisegName(jatekos.nemzetisegId)}
                                        <span class="info-value loading-text">Betöltés...</span>
                                    {:then nemzetisegName}
                                        <span class="info-value">{nemzetisegName}</span>
                                    {:catch error}
                                        <span class="info-value error-text">Hiba történt</span>
                                    {/await}
                                </div>
                            </div>
                            
                            <div class="info-row">
                                <div class="info-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                        <line x1="16" y1="2" x2="16" y2="6"></line>
                                        <line x1="8" y1="2" x2="8" y2="6"></line>
                                        <line x1="3" y1="10" x2="21" y2="10"></line>
                                    </svg>
                                </div>
                                <div class="info-content">
                                    <span class="info-label">Születési idő</span>
                                    <span class="info-value">
                                        {formatBirthDate(jatekos.szuletesiDatum)}
                                        <span class="age-badge">{calculateAge(jatekos.szuletesiDatum)} éves</span>
                                    </span>
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
        --navbar-height: 70px;
        --goalkeeper: #4361ee;
        --defender: #3a0ca3;
        --midfielder: #7209b7;
        --forward: #f72585;
        
        --active: #2a9d8f;
        --inactive: #6c757d;
        --injured: #e9c46a;
        --retired: #e76f51;
    }

    .players-section {
        padding: 7.5rem 1rem 4rem;
        background-color: var(--gray-100);
        min-height: 100vh;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: var(--font-base);
        scroll-margin-top: var(--navbar-height);
        position: relative;
    }

    .container {
        width: 100%;
        max-width: 1400px;
        margin: 0 auto;
        padding: 0 1rem;
    }

    .section-header {
        text-align: center;
        margin-bottom: 3.5rem;
        position: relative;
        padding-top: 1.5rem;
    }

    .section-title {
        font-size: 1rem;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--primary-light);
        margin-bottom: 0.75rem;
    }

    .section-subtitle {
        font-size: 2.75rem;
        font-weight: 700;
        color: var(--primary);
        margin: 0;
        position: relative;
        display: inline-block;
        line-height: 1.2;
        padding-top: 30px;
    }

    .section-subtitle::after {
        content: '';
        position: absolute;
        bottom: -0.75rem;
        left: 50%;
        transform: translateX(-50%);
        width: 100px;
        height: 4px;
        background-color: var(--accent);
        border-radius: 2px;
    }

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

    .players-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 2.5rem;
    }

    .player-card {
        background-color: white;
        border-radius: var(--radius-lg);
        overflow: hidden;
        box-shadow: var(--shadow);
        transition: var(--transition);
        position: relative;
    }

    .player-card:hover {
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
        color: var(--active);
    }

    .card-badge.injured {
        background-color: rgba(233, 196, 106, 0.15);
        color: var(--injured);
    }

    .card-header {
        padding: 2rem 2rem 1rem;
        display: flex;
        align-items: center;
        gap: 1.5rem;
    }

    .photo-container {
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

    .player-photo {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: var(--transition);
    }

    .player-card:hover .player-photo {
        transform: scale(1.1);
    }

    .player-info {
        flex: 1;
    }

    .player-name {
        font-size: 1.75rem;
        font-weight: 700;
        color: var(--primary-dark);
        margin: 0 0 0.75rem 0;
        line-height: 1.2;
    }

    .position-badge {
        display: inline-block;
        padding: 0.35rem 0.75rem;
        border-radius: 9999px;
        font-size: 0.875rem;
        font-weight: 600;
        background-color: rgba(67, 97, 238, 0.15);
        color: var(--goalkeeper);
    }

    .position-goalkeeper {
        background-color: rgba(67, 97, 238, 0.15);
        color: var(--goalkeeper);
    }

    .position-defender {
        background-color: rgba(58, 12, 163, 0.15);
        color: var(--defender);
    }

    .position-midfielder {
        background-color: rgba(114, 9, 183, 0.15);
        color: var(--midfielder);
    }

    .position-forward {
        background-color: rgba(247, 37, 133, 0.15);
        color: var(--forward);
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
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    .age-badge {
        display: inline-block;
        padding: 0.2rem 0.5rem;
        border-radius: 9999px;
        font-size: 0.75rem;
        font-weight: 600;
        background-color: var(--gray-200);
        color: var(--gray-700);
    }

    .loading-text {
        color: var(--gray-500);
        font-style: italic;
    }

    .error-text {
        color: var(--danger);
    }

    .inactive-text {
        color: var(--gray-500);
        font-style: italic;
    }

    @media (max-width: 1400px) {
        .players-grid {
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 2rem;
        }
    }

    @media (max-width: 1200px) {
        .players-grid {
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1.75rem;
        }
        
        .card-header {
            padding: 1.75rem 1.75rem 0.875rem;
        }
        
        .card-body {
            padding: 1.25rem 1.75rem 1.75rem;
        }
    }

    @media (max-width: 992px) {
        .players-section {
            padding-top: 6.5rem;
        }
        
        .section-subtitle {
            font-size: 2.25rem;
        }
        
        .players-grid {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 1.5rem;
        }
        
        .player-name {
            font-size: 1.5rem;
        }
        
        .info-value {
            font-size: 1.125rem;
        }
        
        .photo-container {
            width: 90px;
            height: 90px;
        }
    }

    @media (max-width: 768px) {
        .players-section {
            padding: 5.5rem 1rem 3rem;
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
        
        .players-grid {
            grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
            gap: 1.5rem;
        }
        
        .card-header {
            padding: 1.5rem 1.5rem 0.75rem;
        }
        
        .card-body {
            padding: 1rem 1.5rem 1.5rem;
        }
        
        .photo-container {
            width: 80px;
            height: 80px;
        }
    }

    @media (max-width: 576px) {
        .players-section {
            padding-top: 5rem;
        }
        
        .section-header {
            margin-bottom: 2.5rem;
        }
        
        .section-subtitle {
            font-size: 1.75rem;
        }
        
        .section-subtitle::after {
            width: 80px;
            height: 3px;
        }
        
        .card-header {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 1rem;
            padding-bottom: 1.25rem;
        }
        
        .player-info {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .player-name {
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
        
        .age-badge {
            font-size: 0.7rem;
            padding: 0.15rem 0.4rem;
        }
    }

    @media (max-width: 480px) {
        .section-subtitle {
            font-size: 1.5rem;
            padding-top: 20px;
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
        
        .player-name {
            font-size: 1.35rem;
        }
        
        .info-value {
            font-size: 1.1rem;
        }
        
        .card-badge {
            font-size: 0.8rem;
            padding: 0.25rem 0.75rem;
        }
        
        .position-badge {
            font-size: 0.8rem;
            padding: 0.25rem 0.65rem;
        }
    }

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

    @media (max-width: 360px) {
        .section-subtitle {
            font-size: 1.35rem;
        }
        
        .card-header {
            padding: 1.25rem 1.25rem 0.75rem;
        }
        
        .card-body {
            padding: 0.875rem 1.25rem 1.25rem;
        }
        
        .photo-container {
            width: 70px;
            height: 70px;
        }
        
        .player-name {
            font-size: 1.25rem;
        }
        
        .info-value {
            font-size: 1rem;
        }
        
        .info-icon {
            width: 2rem;
            height: 2rem;
        }
        
        .info-icon svg {
            width: 1.125rem;
            height: 1.125rem;
        }
    }
</style>