<script>
    import CsapatApi from '../../../generated-client/src/api/CsapatApi.js';
    import { onMount } from 'svelte';
    import ApiClient from '../../../generated-client/src/ApiClient.js';

    const apiInstance = new CsapatApi();
    let csapatok = []

    function getAuthToken() {
        return ""
    }

    function handleAddTeam() {
        const csapat = {
            csapatId: 0,
            csapatNev: "",
            alapitasDatum: "",
            jelenlegiEdzo: "",
            stadionId: 0,
            statusz: false,
            media_Id: 0,
        }
        apiInstance.apiCsapatPost({csapat}, (error, data, response) => {
            if (error) {
                console.error("Error:", error);
            } else {
                ApiClient.instance.defaultHeaders = {
                    'Authorization': `Bearer ${localStorage.getItem("AuthToken")}`,
                    'Content-Type': 'application/json'
                }
                console.log("Csapat létrehozva", response)
            }
        })
    }

    function handleRemoveTeam() {
        
    }

    onMount(() => {
        apiInstance.apiCsapatGet((error, data, response) => {
        if (error) {
            console.error(error);
        } else {
            csapatok = data;
        }
        });
    });
</script>

<section class="banner_section">
    <div class="container">
        <div class="banner-content">
            <h1>Csapatok</h1>
        </div>
    </div>
</section>
<section class="product_section">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-12 text-center pb-5">
                <h2 class="section-title">A legjobb magyar csapatok</h2>
                <p class="section-subtitle">Ismerje meg a magyar csapatokat és játékosaikat!</p>
            </div>
        </div>

        <div>
            <h1 class="product-content">Csapatok</h1>
            <ul class="product-content">
                {#each csapatok as csapat}
                    <li class="product-content">
                        <p>Csapatnév: {csapat.csapatNev} <img src="" alt=""></p>
                        <p>Jelenlegi Edző: {csapat.jelenlegiEdzo}</p>
                        <p>Alapítási dátum: {new Date(csapat.alapitasDatum).toLocaleDateString("hu-HU")}</p>
                        <p>Stadion: {csapat.stadionId}</p>
                        <p>Státusz: {csapat.statusz}</p>
                    </li>
                {/each}
            </ul>
        </div>
    </div>
</section> 

<style>
    .img-small {
        max-width: 250px; 
        height: auto; 
    }

    .product-content {
        background-color: rgba(0, 0, 0, 0.85);
        color: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        border: 1px solid #32cd32;
        margin-bottom: 1rem;
    }

    .product-content h1 {
        font-size: 3rem; 
        font-weight: bold;
        color: #32cd32;
        margin-bottom: 15px;
    }

    .product-content p,
    .product-content ul {
        font-size: 1.5rem; 
        line-height: 1.7;
        color: #ffffff;
        margin-bottom: 10px;
    }

    .product-content ul li {
        margin-bottom: 8px;
        padding: 5px 0;
    }

    .product-details {
        margin-top: 20px;
    }

    .product-content h4 {
        color: #32cd32;
    }
</style>
