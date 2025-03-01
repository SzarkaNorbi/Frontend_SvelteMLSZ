<script>
    import CsapatApi from '../../../generated-client/src/api/CsapatApi.js';
    import StadionApi from '../../../generated-client/src/api/StadionApi.js';
    import { onMount } from 'svelte';
    import ApiClient from '../../../generated-client/src/ApiClient.js';

    const apiInstance = new CsapatApi();
    let csapatok = [];
    let searchQuery = "";
    let sortBy = "abc";

    onMount(() => {
        apiInstance.apiCsapatGet((error, data, response) => {
            if (error) {
                console.error(error);
            } else {
                csapatok = data;
            }
        });
    });

    async function getStadionName(stadionId) {
        const stadionApi = new StadionApi();
        try {
            const response = await new Promise((resolve, reject) => {
                stadionApi.stadionIdGet(stadionId, (error, data, response) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(data.stadionNeve);
                    }
                });
            });
            return response;
        } catch (error) {
            console.error('Error fetching stadion name:', error);
            return 'Ismeretlen stadion';
        }
    }

    function convertStatusz(id) {
        switch (id) {
            case 0:
                return 'Aktív';
            case 1:
                return 'Inaktív';
            case 3:
                return 'Felbomlott';
            default:
                return 'Ismeretlen';
        }
    }

    function sortTeams(a, b) {
        if (sortBy === "abc") {
            return a.csapatNev.localeCompare(b.csapatNev);
        } else if (sortBy === "alapitas") {
            return new Date(a.alapitasDatum) - new Date(b.alapitasDatum);
        } else if (sortBy === "statusz") {
            return a.statusz - b.statusz;
        }
    }
</script>

<section class="product_section">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-12 text-center pb-5">
                <div class="section-title-frame">
                    <p class="section-subtitle">Ismerjen meg magyar csapatokat!</p>
                </div>
            </div>
        </div>

        <div class="row justify-content-center search-container">
            <input type="text" bind:value={searchQuery} placeholder="Keresés csapatnév alapján..." class="search-box" />
            <select bind:value={sortBy} class="sort-dropdown">
                <option value="abc">ABC sorrend</option>
                <option value="alapitas">Alapítás</option>
                <option value="statusz">Státusz</option>
            </select>
        </div>

        <div class="card-container">
            {#each csapatok.filter(csapat => csapat.csapatNev.toLowerCase().includes(searchQuery.toLowerCase())).sort(sortTeams) as csapat}
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">{csapat.csapatNev}</h2>
                        <img class="team-logo" src={`https://focistak-test.runasp.net/Media/Files/${csapat.media_Id}`} alt="Team logo">
                    </div>
                    <div class="card-body">
                        <p><strong>Jelenlegi edző:</strong> {csapat.jelenlegiEdzo}</p>
                        <p><strong>Alapítási év:</strong> {new Date(csapat.alapitasDatum).toLocaleDateString('hu-HU').slice(0,4)}</p>
                        {#await getStadionName(csapat.stadionId) then stadion}
                            <p><strong>Stadion:</strong> {stadion}</p>
                        {/await}
                        <p><strong>Státusz:</strong> {convertStatusz(csapat.statusz)}</p>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>

<style>
.search-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
    flex-wrap: wrap; 
}

.search-box {
    width: 100%;
    max-width: 300px; 
    padding: 10px;
    font-size: 1.2rem;
    border: 2px solid #28a745;
    border-radius: 5px;
    outline: none;
}

.sort-dropdown {
    padding: 8px;
    font-size: 1rem;
    border: 2px solid #28a745;
    border-radius: 5px;
    width: 180px;
    min-width: 150px; 
}

.card-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); 
    gap: 20px;
    padding: 20px;
}

@media (max-width: 768px) {
    .search-box {
        width: 80%;
    }

    .sort-dropdown {
        width: 100%;
    }
}

@media (max-width: 480px) {
    .search-box {
        width: 100%;
        font-size: 1rem; 
    }

    .sort-dropdown {
        width: 100%;
        font-size: 1rem;
    }

    .card-container {
        grid-template-columns: 1fr; 
    }

    .card {
        padding: 15px; 
    }

    .card-title {
        font-size: 1.8rem; 
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

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.card-title {
    font-size: 2rem;
    color: #28a745;
}

.team-logo {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50%;
}

.card-body p {
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
</style>
