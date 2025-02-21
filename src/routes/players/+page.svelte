<script>
	import NemzetisegApi from '../../../generated-client/src/api/NemzetisegApi.js';
	import JatekosApi from '../../../generated-client/src/api/JatekosApi.js';
	import CsapatApi from '../../../generated-client/src/api/CsapatApi.js';
	import { onMount } from 'svelte';

	let jatekosok = [];

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

		<div class="card-container">
			{#each jatekosok as jatekos}
				<div class="card">
					<div class="card-content">
						<div class="d-flex justify-content-between">
							<h2 class="card-title align-self-center">{jatekos.vezeteknev} {jatekos.keresztnev}</h2>
							<img style="width: 100px;" src={`https://focistak-test.runasp.net/Media/Files/${jatekos.media_Id}`} alt="">
						</div>
						{#await getNemzetisegName(jatekos.nemzetisegId) then nemzetiseg}
							<p class="white-text"><strong>Nemzetiség:</strong> {nemzetiseg}</p>
						{/await}
						<p class="white-text"><strong>Születési dátum:</strong> {new Date(jatekos.szuletesiDatum).toLocaleDateString('hu-HU')}</p>
						<p class="white-text"><strong>Pozíció:</strong> {convertPozicio(jatekos.pozicio)}</p>
						{#await getCsapatName(jatekos.csapatId) then csapat}
							<p class="white-text"><strong>Csapat:</strong> {csapat}</p>
						{/await}
						<p class="white-text"><strong>Státusz:</strong> {convertStatusz(jatekos.statuszId)}</p>
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
