<script>
    import VersenyApi from '../../../generated-client/src/api/VersenyApi.js';
    import { onMount } from 'svelte';

    let events = [];
    let searchQuery = '';
    let sortBy = "abc"; 

    function loadEvents() {
        const apiInstance = new VersenyApi();
        apiInstance.versenyGet((error, data, response) => {
            if (error) {
                console.error(error);
            } else {
                events = data;
            }
        });
    }

    onMount(loadEvents);

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

<section class="product_section">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-12 text-center pb-5">
                <div class="section-title-frame">
                    <p class="section-subtitle">Tekintse meg versenyeinket!</p>
                </div>
            </div>
        </div>

		<div class="row justify-content-center search-sort-container">
            <input type="text" bind:value={searchQuery} placeholder="Keresés verseny alapján..." class="search-box" />
            <select bind:value={sortBy} class="filter-dropdown">
                <option value="abc">ABC sorrend</option>
                <option value="statusz">Státusz</option>
                <option value="fordulo">Forduló szerint</option>
            </select>
        </div>

        <div class="card-container">
            {#each filteredEvents as event}
                <div class="card">
                    <div class="card-content">
                        <h2 class="card-title">{event.liga}</h2>
                        <p><strong>Forduló:</strong> {event.fordulo}</p>
                        <p><strong>Kezdés dátuma:</strong> {new Date(event.kezdesDatum).toLocaleDateString('hu-HU')}</p>
                        <p><strong>Befejezés dátuma:</strong> {new Date(event.befejezesDatum).toLocaleDateString('hu-HU')}</p>
                        <p><strong>Jelenleg:</strong> {event.aktualis ? 'Jelenleg fut' : 'Lezárult'}</p>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>

<style>
    .card-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
        padding: 20px;
    }

    @media (max-width: 768px) {
        .card-container {
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); 
        }

        .search-sort-container {
            width: 80%; 
        }

        .search-box, .filter-dropdown {
            width: 100%;
        }

        .search-box {
            font-size: 1.2rem;
            padding: 12px; 
        }

        .filter-dropdown {
            font-size: 1rem;
            padding: 10px; 
        }
    }

    @media (max-width: 480px) {
        .card-container {
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); 
        }

        .section-subtitle {
            font-size: 2rem; 
        }

        .card-title {
            font-size: 1.6rem;
        }

        .card-content p {
            font-size: 1.2rem; 
        }

        .search-box {
            font-size: 1rem; 
        }

        .filter-dropdown {
            font-size: 0.9rem; 
        }
    }

    .card {
        background: #ffffff;
        border-radius: 15px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        padding: 20px;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        border: 1px solid #eaeaea;
    }

    .card:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
    }

    .card-title {
        font-size: 2.2rem;
        color: #28a745;
        margin-bottom: 10px;
    }

    .card-content p {
        font-size: 1.4rem;
        color: #555;
        margin-bottom: 8px;
    }

    .section-subtitle {
        font-size: 2.5em;
        color: #28a745;
        padding: 10px;
        text-align: center;
    }

    .container {
        padding-top: 80px;
    }

    .section-title-frame {
        padding: 20px;
        border-radius: 10px;
        background-color: #f8f9fa;
    }

    .search-sort-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 50%;
        margin: 10px auto;
        gap: 10px;
        flex-wrap: wrap; 
    }

    .search-box {
        flex: 1;
        width: 100%; 
        padding: 10px;
        font-size: 1.2rem;
        border: 2px solid #28a745;
        border-radius: 5px;
        outline: none;
    }

    .filter-dropdown {
        padding: 8px;
        font-size: 1rem;
        border: 2px solid #28a745;
        border-radius: 5px;
        width: 180px;
    }
</style>

