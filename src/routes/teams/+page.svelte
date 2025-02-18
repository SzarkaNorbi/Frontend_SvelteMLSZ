<script>
    import CsapatApi from '../../../generated-client/src/api/CsapatApi.js';
    import StadionApi from '../../../generated-client/src/api/StadionApi.js';
    import { onMount } from 'svelte';
    import ApiClient from '../../../generated-client/src/ApiClient.js';

    const apiInstance = new CsapatApi();
    let csapatok = [];

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
            console.error('Error fetching nemzetiseg:', error);
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

        <div class="card-container">
            {#each csapatok as csapat}
                <div class="csapat-card">
                    <h2>{csapat.csapatNev}</h2>
                    <p class="white-text"><strong>Jelenlegi edző:</strong> {csapat.jelenlegiEdzo}</p>
                    <p class="white-text"><strong>Alapítási dátum:</strong> {new Date(csapat.alapitasDatum).toLocaleDateString('hu-HU')}</p>
                    {#await getStadionName(csapat.stadionId) then stadion}
                        <p class="white-text"><strong>Stadion:</strong> {stadion}</p>
                    {/await}
                    <p class="white-text"><strong>Státusz:</strong> {convertStatusz(csapat.statusz)}</p>
                </div>
            {/each}
        </div>
    </div>
</section>

<style>
.section-subtitle {
    font-size: 2.5em; 
    color: #32cd32;
    padding: 5px;
    text-align: center;
}

.container {
    padding-top: 80px;
}

.section-title-frame {
    padding: 20px;
    border-radius: 10px;
    background-color: #333;
}

.card-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 30px;
}

.csapat-card {
    background-color: #333;
    border: 1px solid #32cd32;
    border-radius: 12px;
    padding: 20px;
    color: #fff;
    transition: transform 0.3s ease;
    font-size: 1.5em; 
}

.csapat-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 4px 8px rgba(50, 205, 50, 0.5);
}

.csapat-card h2 {
    color: #32cd32;
    font-size: 2rem; 
}

.csapat-card p {
    font-size: 1.5rem; 
    margin: 10px 0;
}

.white-text {
    color: #fff;
}

</style>
