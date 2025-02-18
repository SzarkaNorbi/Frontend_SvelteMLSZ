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
                <div class="card">
                    <div class="card-content">
                        <h2 class="card-title">{csapat.csapatNev}</h2>
                    <p class="white-text"><strong>Jelenlegi edző:</strong> {csapat.jelenlegiEdzo}</p>
                    <p class="white-text"><strong>Alapítási dátum:</strong> {new Date(csapat.alapitasDatum).toLocaleDateString('hu-HU')}</p>
                    {#await getStadionName(csapat.stadionId) then stadion}
                        <p class="white-text"><strong>Stadion:</strong> {stadion}</p>
                    {/await}
                    <p class="white-text"><strong>Státusz:</strong> {convertStatusz(csapat.statusz)}</p>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>

<style>
.card-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* Creates flexible grid layout */
    gap: 20px; /* Adds space between cards */
    padding: 20px; /* Adds padding around the container */
}

.card {
    background: #333;
    border-radius: 20px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3); /* Adds shadow for depth */
    padding: 20px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column; /* Ensures content within card stacks vertically */
}

.card:hover {
    transform: translateY(-5px); /* Slightly lifts the card when hovered */
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.5); /* Increases shadow for hover effect */
}

.card-title {
    font-size: 2.5rem;
    color: #32cd32; /* Green color for titles */
    margin-bottom: 10px;
}

.card-content p {
    font-size: 1.6rem;
    color: #ddd; /* Light text for readability */
    margin: 5px 0;
}

.section-subtitle {
    font-size: 2.5em;
    color: #32cd32; /* Green color for subtitle */
    padding: 10px;
    text-align: center;
}

.container {
    padding-top: 80px; /* Adds padding on top of the container */
}

.section-title-frame {
    padding: 20px;
    border-radius: 10px;
    background-color: #333;
}

</style>
