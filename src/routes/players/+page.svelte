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
				<div class="csapat-card">
					<h2 class="green-text">{jatekos.vezeteknev} {jatekos.keresztnev}</h2>
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
			{/each}
		</div>
	</div>
</section>

<style>
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
	}

	.csapat-card:hover {
		transform: translateY(-10px);
		box-shadow: 0 4px 8px rgba(50, 205, 50, 0.5);
	}

	.white-text {
		color: #fff;
	}

	.green-text {
		color: #32cd32;
	}
	.csapat-card {
	font-size: 1.5em;
	background-color: #333;
	border: 1px solid #32cd32;
	border-radius: 12px;
	padding: 20px;
	color: #fff;
	transition: transform 0.3s ease;
}

.csapat-card h2 {
	font-size: 1.5em; 
}

.csapat-card p {
	font-size: 1.1em;
}
</style>
