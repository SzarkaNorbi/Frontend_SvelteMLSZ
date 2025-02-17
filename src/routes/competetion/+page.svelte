<script>
	import StadionApi from '../../../generated-client/src/api/StadionApi.js';
	import VersenyApi from '../../../generated-client/src/api/VersenyApi.js';
	import { onMount } from 'svelte';
	let showModal = false;
	let events = [];

	function openModal() {
		showModal = true;
	}

	function closeModal() {
		showModal = false;
	}

	function loadEvents() {
		/* events = [
			{ date: '2025-02-15', name: 'Bajnoki mérkőzés' },
			{ date: '2025-03-02', name: 'Barátságos torna' },
			{ date: '2025-04-10', name: 'Közösségi foci' },
			{ date: '2025-05-05', name: 'Bajnoki mérkőzés' },
			{ date: '2025-06-12', name: 'Barátságos torna' },
			{ date: '2025-07-22', name: 'Közösségi foci' },
			{ date: '2025-08-15', name: 'Bajnoki mérkőzés' },
			{ date: '2025-09-10', name: 'Barátságos torna' },
			{ date: '2025-10-20', name: 'Közösségi foci' },
			{ date: '2025-11-05', name: 'Bajnoki mérkőzés' }
		]; */
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
			console.error('Error fetching nemzetiseg:', error);
			errorMessage = 'An error occurred while fetching the nemzetiseg.';
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
	</div>
</section>

<section class="content_section">
	<div class="content-container">
		<p>
			Csatlakozz hozzánk a legizgalmasabb focis eseményeken! Legyen szó bajnoki mérkőzésekről,
			barátságos tornákról vagy közösségi fociról, nálunk megtalálod a legfrissebb információkat.
			Tekintsd meg az eseménynaptárunkat, és ne maradj le egyetlen meccsről sem!
		</p>
		<button class="btn" on:click={openModal}>Saját események</button>
	</div>
</section>

{#if showModal}
	<div class="modal" on:click={closeModal}>
		<div class="modal-content" on:click|stopPropagation>
			<span class="close" on:click={closeModal}>&times;</span>
			<h2 class="modal-title">Eseménynaptár</h2>
			<ul class="event-list">
				{#each events as event}
					<li class="event-item">
						{new Date(event.kezdesDatum).toLocaleDateString('hu-HU')} - {event.liga}
					</li>
				{/each}
			</ul>
		</div>
	</div>
{/if}

<!-- <section class="product_section">
	<div class="container">
		<div class="table-container">
			<div class="table-frame">
				<table class="csapat-table">
					<thead>
						<tr>
							<th>Liga</th>
							<th>Forduló</th>
							<th>Stadion</th>
							<th>Kezdési Dátum</th>
							<th>Befejezési Dátum</th>
							<th>Leírás</th>
							<th>Jelenleg</th>
						</tr>
					</thead>
					<tbody>
						{#each events as verseny}
							<tr>
								<td>{verseny.liga}</td>
								<td>{verseny.fordulo}</td>
								{#await getStadionName(verseny.stadionId) then stadion}
										<td>{stadion}</td>
									{/await}
								<td>{new Date(verseny.kezdesDatum).toLocaleDateString('hu-HU')}</td>
								<td>{new Date(verseny.befejezesDatum).toLocaleDateString('hu-HU')}</td>
								<td>{verseny.leiras}</td>
								<td>{verseny.aktualis ? 'Jelenleg fut' : 'Már végetért / Még nem kezdődött el'}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</section> -->

<style>
	.content_section {
		padding: 40px 20px;
		max-width: 800px;
		margin: auto;
		text-align: center;
	}

	.content-container {
		background:
			linear-gradient(135deg, rgba(40, 167, 69, 0.2), rgba(40, 167, 69, 0.1)),
			url('https://via.placeholder.com/1500x1000') center center/cover no-repeat;
		border-radius: 20px;
		padding: 40px;
		box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(10px);
	}

	p {
		font-size: 1.6rem;
		line-height: 1.8;
		color: #333;
		margin-bottom: 30px;
	}

	.btn {
		display: inline-block;
		padding: 12px 25px;
		background: #28a745;
		color: white;
		font-size: 1.8rem;
		text-transform: uppercase;
		border-radius: 50px;
		border: none;
		cursor: pointer;
		box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
		transition: all 0.3s ease;
	}

	.btn:hover {
		background: #218838;
		transform: translateY(-2px);
		box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.3);
	}

	.modal {
		display: flex;
		position: fixed;
		z-index: 10;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		justify-content: center;
		align-items: center;
		animation: fadeInModal 0.3s ease;
	}

	.modal-content {
		background: white;
		padding: 40px;
		border-radius: 15px;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
		text-align: center;
		width: 90%;
		max-width: 500px;
	}

	.modal-title {
		font-size: 2.2rem;
		color: #28a745;
		margin-bottom: 20px;
		font-weight: 600;
	}

	.event-list {
		list-style: none;
		padding: 0;
	}

	.event-item {
		font-size: 1.4rem;
		padding: 12px 0;
		border-bottom: 1px solid #eee;
		color: #444;
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

	.close {
		position: absolute;
		right: 20px;
		top: 20px;
		font-size: 30px;
		color: #333;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.close:hover {
		color: #28a745;
	}

	@keyframes fadeInModal {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@media (max-width: 768px) {

		.content-container {
			padding: 30px 15px;
		}

		p {
			font-size: 1.4rem;
		}

		.btn {
			font-size: 1.4rem;
			padding: 12px 25px;
		}
	}

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
</style>
