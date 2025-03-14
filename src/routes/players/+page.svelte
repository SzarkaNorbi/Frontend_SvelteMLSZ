<script>
    import NemzetisegApi from '../../../generated-client/src/api/NemzetisegApi.js';
    import JatekosApi from '../../../generated-client/src/api/JatekosApi.js';
    import CsapatApi from '../../../generated-client/src/api/CsapatApi.js';
    import { onMount } from 'svelte';

    let jatekosok = [];
    let searchQuery = "";
    let sortBy = "abc";

    onMount(() => {
        const jatekosApi = new JatekosApi();
        jatekosApi.jatekosGet((error, data, response) => {
            if (error) {
                console.error(error);
            } else {
                jatekosok = data;
            }
        });
    });

    async function getNemzetisegName(nemzetisegId) {
        const nemzetisegApi = new NemzetisegApi();
        try {
            const response = await new Promise((resolve, reject) => {
                nemzetisegApi.nemzetisegIdGet(nemzetisegId, (error, data, response) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(data.nemzetisegNev);
                    }
                });
            });
            return response;
        } catch (error) {
            console.error('Error fetching nemzetiseg:', error);
            return 'Ismeretlen nemzetiség';
        }
    }

    function convertPozicio(id) {
        switch (id) {
            case 0:
                return 'Kapus';
            case 1:
                return 'Védő';
            case 2:
                return 'Középpályás';
            case 3:
                return 'Csatár';
            default:
                return 'Ismeretlen';
        }
    }

    function convertStatusz(id) {
        switch (id) {
            case 0:
                return 'Aktív';
            case 1:
                return 'Inaktív';
            case 2:
                return 'Sérült';
            case 3:
                return 'Visszavonult';
            default:
                return 'Ismeretlen';
        }
    }

    async function getCsapatName(csapatId) {
        const csapatApi = new CsapatApi();
        try {
            const response = await new Promise((resolve, reject) => {
                csapatApi.apiCsapatIdGet(csapatId, (error, data, response) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(data.csapatNev);
                    }
                });
            });
            return response;
        } catch (error) {
            console.error('Error fetching csapatok:', error);
            return 'Ismeretlen csapat';
        }
    }

    function sortTeams(a, b) {
        if (sortBy === "abc") {
            return a.vezeteknev.localeCompare(b.vezeteknev);
        } else if (sortBy === "szuldatum") {
            return new Date(a.szuletesiDatum) - new Date(b.szuletesiDatum);
        } else if (sortBy === "statusz") {
            return a.statusz - b.statusz;
        }
    }

    function filterByName(jatekos) {
        return `${jatekos.vezeteknev} ${jatekos.keresztnev}`.toLowerCase().includes(searchQuery.toLowerCase());
    }

    function combinedFilter(jatekos) {
        return filterByName(jatekos);
    }
</script>

<section class="product_section">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-12 text-center pb-5">
                <div class="section-title-frame">
                    <p class="section-subtitle">Tekintsen meg kiemelt játékosokat!</p>
                </div>
            </div>
        </div>

        <div class="row justify-content-between align-items-center search-container">
            <div class="col-12 col-md-6 search-column">
                <input type="text" bind:value={searchQuery} placeholder="Keresés játékos neve alapján..." class="search-box" />
            </div>
            <div class="col-12 col-md-6 sort-column">
                <h1 class="sort-text">Rendezés:</h1>
                <select bind:value={sortBy} class="sort-dropdown">
                    <option value="abc">ABC sorrend</option>
                    <option value="szuldatum">Születési dátum</option>
                    <option value="statusz">Státusz</option>
                </select>
            </div>
        </div>

        <div class="card-container">
            {#each jatekosok.filter(combinedFilter).sort(sortTeams) as jatekos}
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">{jatekos.vezeteknev} {jatekos.keresztnev}</h2>
                        <img class="player-photo" src={`https://focistak-test.runasp.net/Media/Files/${jatekos.media_Id}`} alt="Player photo" />
                    </div>
                    <div class="card-body">
                        {#await getNemzetisegName(jatekos.nemzetisegId) then nemzetiseg}
                            <p><strong>Nemzetiség:</strong> {nemzetiseg}</p>
                        {/await}
                        <p><strong>Születési dátum:</strong> {new Date(jatekos.szuletesiDatum).toLocaleDateString('hu-HU')}</p>
                        <p><strong>Pozíció:</strong> {convertPozicio(jatekos.pozicio)}</p>
                        {#await getCsapatName(jatekos.csapatId) then csapat}
                            <p><strong>Csapat:</strong> {csapat}</p>
                        {/await}
                        <p><strong>Státusz:</strong> {convertStatusz(jatekos.statuszId)}</p>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>

<style>
    .search-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
        margin-bottom: 20px;
        flex-wrap: wrap;
    }

    .search-column, .sort-column {
        display: flex;
        align-items: center;
    }

    .search-box {
        width: 100%; 
        max-width: 300px;
        padding: 10px;
        font-size: 1.3rem;
        border: 2px solid #28a745;
        border-radius: 5px;
        outline: none;
    }

    .sort-dropdown {
        width: 100%;
        max-width: 180px;
        padding: 8px;
        font-size: 1.2rem;
        border: 2px solid #28a745;
        border-radius: 5px;
    }

    .sort-text {
    font-size: 1.3rem;
    margin-right: 10px;
}

    .card-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 20px;
        padding: 20px;
    }

    @media (max-width: 768px) {
        .card-container {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        }

        .search-box, .sort-dropdown {
            width: 100%;
        }
    }

    @media (max-width: 480px) {
        .card-container {
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        }

        .section-subtitle {
            font-size: 1.8rem;
        }

        .card-title {
            font-size: 1.6rem;
        }

        .player-photo {
            width: 50px;
            height: 50px;
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
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
    }

    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
    }

    .card-title {
        font-size: 2.2rem;
        color: #28a745;
    }

    .player-photo {
        width: 60px;
        height: 60px;
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
