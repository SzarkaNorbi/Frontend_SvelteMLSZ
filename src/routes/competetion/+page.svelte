<script>
    import VersenyApi from '../../../generated-client/src/api/VersenyApi.js';
    import { onMount } from 'svelte';

    let events = [];

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

        <div class="card-container">
            {#each events as event}
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
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* Creates flexible grid layout */
        gap: 20px; /* Adds space between cards */
        padding: 20px; /* Adds padding around the container */
    }

    @media (max-width: 480px) {
        .card-container {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Adjusts for smaller screens */
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
        transform: translateY(-5px); /* Slightly lifts the card when hovered */
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15); /* Increases shadow for hover effect */
    }

    .card-title {
        font-size: 2.2rem;
        color: #28a745; /* Green color for titles */
        margin-bottom: 10px;
    }

    .card-content p {
        font-size: 1.4rem;
        color: #555; /* Light text for readability */
        margin-bottom: 8px;
    }

    .section-subtitle {
        font-size: 2.5em;
        color: #28a745; /* Green color for subtitle */
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
