<script>
	import NemzetisegApi from '../../../generated-client/src/api/NemzetisegApi.js';
	import JatekosApi from '../../../generated-client/src/api/JatekosApi.js';
	import CsapatApi from '../../../generated-client/src/api/CsapatApi.js';
	import MediaApi from '../../../generated-client/src/api/MediaApi.js';
	import { onMount } from 'svelte';

	let jatekosok = [];

	onMount(() => {
		const jatekosApi = new JatekosApi();

		// Játékosok lekérése
		jatekosApi.jatekosGet((error, data, response) => {
			if (error) {
				console.error(error);
			} else {
				jatekosok = data;
			}
		});
	});

	// Segédfüggvények a megfelelő szövegek lekérésére
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
			errorMessage = 'An error occurred while fetching the nemzetiseg.';
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
			errorMessage = 'An error occurred while fetching the csapatok.';
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

		<div class="table-container">
			<table class="csapat-table">
				<thead>
					<tr>
						<th>Név</th>
						<th>Nemzetiség</th>
						<th>Születési dátum</th>
						<th>Pozíció</th>
						<th>Csapat</th>
						<th>Státusz</th>
					</tr>
				</thead>
				<tbody>
					{#each jatekosok as jatekos}
						<tr>
							<td>{jatekos.vezeteknev} {jatekos.keresztnev}</td>
							{#await getNemzetisegName(jatekos.nemzetisegId) then nemzetiseg}
								<td>{nemzetiseg}</td>
							{/await}
							<td>{new Date(jatekos.szuletesiDatum).toLocaleDateString('hu-HU')}</td>
							<td>{convertPozicio(jatekos.pozicio)}</td>
							{#await getCsapatName(jatekos.csapatId) then csapat}
								<td>{csapat}</td>
							{/await}
							<td>{convertStatusz(jatekos.statuszId)}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</section>

<style>
	.section-subtitle {
		font-size: 2em;
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

	.table-container {
		margin-top: 30px;
		padding: 20px 0;
		border-radius: 8px;
		background-color: #333;
	}

	.csapat-table {
		width: 100%;
		border-collapse: collapse;
		color: #fff;
		font-size: 1.4rem;
	}

	.csapat-table th,
	.csapat-table td {
		text-align: left;
		padding: 10px;
		border-bottom: 1px solid #32cd32;
	}

	.csapat-table th {
		background-color: #32cd32;
		color: #fff;
		font-weight: bold;
	}

	.csapat-table tr:nth-child(even) {
		background-color: #555;
	}

	.csapat-table tr:hover {
		background-color: #666;
	}

	.csapat-table td {
		color: #ddd;
	}
</style>
