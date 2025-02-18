<script>
	import StadionApi from '../../../generated-client/src/api/StadionApi.js';
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
			console.error('Error fetching stadion:', error);
		}
	}
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
						{#await getStadionName(event.stadionId) then stadion}
							<p><strong>Stadion:</strong> {stadion}</p>
						{/await}
						<p><strong>Kezdés dátuma:</strong> {new Date(event.kezdesDatum).toLocaleDateString('hu-HU')}</p>
						<p><strong>Befejezés dátuma:</strong> {new Date(event.befejezesDatum).toLocaleDateString('hu-HU')}</p>
						<p><strong>Leírás:</strong> {event.leiras}</p>
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
    padding: 20px 0;
}

.card {
    background: #333;
    border-radius: 20px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    padding: 20px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.5);
}

.card-title {
    font-size: 2.5rem;
    color: #32cd32;
    margin-bottom: 10px;
}

.card-content p {
    font-size: 1.6rem;
    color: #ddd;
    margin: 5px 0;
}

.section-subtitle {
    font-size: 2.5em; 
    color: #32cd32;
    padding: 10px;
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

</style>
