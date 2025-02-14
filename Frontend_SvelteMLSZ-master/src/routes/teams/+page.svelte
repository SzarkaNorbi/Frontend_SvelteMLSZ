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

	// Segédfüggvények az id alapján történő szöveg megjelenítéséhez
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
			errorMessage = 'An error occurred while fetching the nemzetiseg.';
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

		<div>
			<div class="table-container">
					<table class="csapat-table">
						<thead>
							<tr>
								<th>Csapatnév</th>
								<th>Jelenlegi Edző</th>
								<th>Alapítási Dátum</th>
								<th>Stadion</th>
								<th>Státusz</th>
							</tr>
						</thead>
						<tbody>
							{#each csapatok as csapat}
								<tr>
									<td>{csapat.csapatNev}</td>
									<td>{csapat.jelenlegiEdzo}</td>
									<td>{new Date(csapat.alapitasDatum).toLocaleDateString('hu-HU')}</td>
									{#await getStadionName(csapat.stadionId) then stadion}
										<td>{stadion}</td>
									{/await}
									<td>{convertStatusz(csapat.statusz)}</td>
								</tr>
							{/each}
						</tbody>
					</table>
			</div>
		</div>
	</div>
</section>

<style>
	.section-subtitle {
		font-size: 2em;
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
