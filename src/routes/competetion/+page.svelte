<script>
    import VersenyApi from '../../../generated-client/src/api/VersenyApi.js';
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    
    // State
    let events = [];
    let searchQuery = '';
    let sortBy = "abc";
    let isLoading = true;
    let viewportWidth;
    
    // Load events on mount
    onMount(() => {
        loadEvents();
    });
    
    function loadEvents() {
        isLoading = true;
        const apiInstance = new VersenyApi();
        apiInstance.versenyGet((error, data, response) => {
            if (error) {
                console.error(error);
            } else {
                events = data;
            }
            isLoading = false;
        });
    }
    
    // Format date
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('hu-HU', { year: 'numeric', month: 'long', day: 'numeric' });
    }
    
    // Get status with class
    function getStatus(isActive) {
        return isActive 
            ? { text: 'Jelenleg fut', class: 'status-active' }
            : { text: 'Lezárult', class: 'status-inactive' };
    }
    
    // Calculate progress percentage
    function calculateProgress(startDate, endDate) {
        const start = new Date(startDate).getTime();
        const end = new Date(endDate).getTime();
        const now = new Date().getTime();
        
        if (now <= start) return 0;
        if (now >= end) return 100;
        
        const total = end - start;
        const elapsed = now - start;
        const percentage = Math.round((elapsed / total) * 100);
        
        return percentage;
    }
    
    // Reactive filtered and sorted events
    $: filteredEvents = events
        .filter(event => event.liga.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => {
            if (sortBy === "abc") {
                return a.liga.localeCompare(b.liga);
            } else if (sortBy === "statusz") {
                return a.aktualis - b.aktualis; 
            } else if (sortBy === "fordulo") {
                return a.fordulo - b.fordulo; 
            }
            return 0;
        });
</script>

<svelte:window bind:innerWidth={viewportWidth} />

<section class="events-section">
    <div class="container">
        <header class="section-header">
            <p class="section-subtitle">Tekintsen meg versenyeket!</p>
        </header>
        
        <div class="controls">
            <div class="search-container">
                <input 
                    type="text" 
                    bind:value={searchQuery} 
                    placeholder="Keresés verseny alapján..." 
                    class="search-input"
                    aria-label="Keresés verseny alapján"
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
                        <option value="statusz">Státusz</option>
                        <option value="fordulo">Forduló szerint</option>
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
                <p>Versenyek betöltése...</p>
            </div>
        {:else if filteredEvents.length === 0}
            <div class="no-results" in:fade>
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <p>Nincs találat a keresési feltételeknek megfelelően</p>
            </div>
        {:else}
            <div class="events-grid" in:fade={{ duration: 300 }}>
                {#each filteredEvents as event, i (event.liga + event.fordulo)}
                    <div class="event-card" in:fly={{ y: 20, delay: i * 50, duration: 300 }}>
                        <div class="card-badge" class:active={event.aktualis}>
                            {getStatus(event.aktualis).text}
                        </div>
                        
                        <div class="card-header">
                            <h2 class="event-name">{event.liga}</h2>
                            <div class="round-badge">
                                <span>{event.fordulo}. forduló</span>
                            </div>
                        </div>
                        
                        <div class="card-body">
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
                                    <span class="info-label">Kezdés dátuma</span>
                                    <span class="info-value">{formatDate(event.kezdesDatum)}</span>
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
                                    <span class="info-label">Befejezés dátuma</span>
                                    <span class="info-value">{formatDate(event.befejezesDatum)}</span>
                                </div>
                            </div>
                            
                            <div class="event-progress">
                                <div class="progress-bar">
                                    <div 
                                        class="progress-fill" 
                                        class:completed={!event.aktualis}
                                        style={`width: ${event.aktualis ? calculateProgress(event.kezdesDatum, event.befejezesDatum) : '100'}%`}
                                        aria-valuenow={event.aktualis ? calculateProgress(event.kezdesDatum, event.befejezesDatum) : 100}
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                        role="progressbar"
                                    ></div>
                                </div>
                                <div class="progress-text">
                                    {event.aktualis 
                                        ? `Folyamatban (${calculateProgress(event.kezdesDatum, event.befejezesDatum)}%)` 
                                        : 'Befejezve (100%)'}
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
        --navbar-height: 70px;
    }

    /* Base Styles */
    .events-section {
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

    /* Section Header */
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
        padding-top: 50px;
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

    /* Events Grid */
    .events-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 2.5rem;
    }

    /* Event Card */
    .event-card {
        background-color: white;
        border-radius: var(--radius-lg);
        overflow: hidden;
        box-shadow: var(--shadow);
        transition: var(--transition);
        position: relative;
    }

    .event-card:hover {
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
        flex-direction: column;
        gap: 0.75rem;
    }

    .event-name {
        font-size: 1.75rem;
        font-weight: 700;
        color: var(--primary-dark);
        margin: 0;
        line-height: 1.2;
    }

    .round-badge {
        display: inline-block;
        padding: 0.5rem 1rem;
        border-radius: var(--radius);
        font-size: 1rem;
        font-weight: 600;
        background-color: var(--primary-light);
        color: white;
        align-self: flex-start;
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

    /* Progress Bar */
    .event-progress {
        margin-top: 1.5rem;
    }

    .progress-bar {
        width: 100%;
        height: 0.75rem;
        background-color: var(--gray-200);
        border-radius: 9999px;
        overflow: hidden;
    }

    .progress-fill {
        height: 100%;
        background-color: var(--primary-light);
        border-radius: 9999px;
        transition: width 0.5s ease;
    }

    .progress-fill.completed {
        background-color: var(--success);
    }

    .progress-text {
        margin-top: 0.5rem;
        font-size: 0.875rem;
        color: var(--gray-600);
        text-align: right;
    }

    /* Enhanced Responsive Adjustments */
    @media (max-width: 1400px) {
        .events-grid {
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 2rem;
        }
    }

    @media (max-width: 1200px) {
        .events-grid {
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
        .events-section {
            padding-top: 6.5rem;
        }
        
        .section-subtitle {
            font-size: 2.25rem;
        }
        
        .events-grid {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 1.5rem;
        }
        
        .event-name {
            font-size: 1.5rem;
        }
        
        .info-value {
            font-size: 1.125rem;
        }
        
        .round-badge {
            padding: 0.4rem 0.85rem;
            font-size: 0.95rem;
        }
    }

    @media (max-width: 768px) {
        .events-section {
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
        
        .events-grid {
            grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
            gap: 1.5rem;
        }
        
        .card-header {
            padding: 1.5rem 1.5rem 0.75rem;
        }
        
        .card-body {
            padding: 1rem 1.5rem 1.5rem;
        }
    }

    @media (max-width: 576px) {
        .events-section {
            padding-top: 5rem;
        }
        
        .section-header {
            margin-bottom: 2.5rem;
        }
        
        .section-subtitle {
            font-size: 1.75rem;
            padding-top: 30px;
        }
        
        .section-subtitle::after {
            width: 80px;
            height: 3px;
        }
        
        .card-header {
            align-items: flex-start;
            gap: 0.5rem;
        }
        
        .event-name {
            font-size: 1.35rem;
        }
        
        .round-badge {
            padding: 0.35rem 0.75rem;
            font-size: 0.875rem;
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
        
        .progress-bar {
            height: 0.625rem;
        }
        
        .progress-text {
            font-size: 0.8125rem;
        }
    }

    @media (max-width: 480px) {
        .events-section {
            padding-top: 4.5rem;
        }
        
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
        
        .card-badge {
            font-size: 0.8rem;
            padding: 0.25rem 0.75rem;
            top: 1rem;
            right: 1rem;
        }
        
        .info-value {
            font-size: 1.1rem;
        }
    }

    /* Extra small devices */
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
        
        .event-name {
            font-size: 1.25rem;
        }
        
        .round-badge {
            padding: 0.3rem 0.65rem;
            font-size: 0.8125rem;
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