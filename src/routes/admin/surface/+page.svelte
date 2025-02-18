<script>
	import { goto } from '$app/navigation'; // SvelteKit navigációhoz
	import { Pencil, Trash2 } from 'lucide-svelte';
	import CsapatApi from '../../../../generated-client/src/api/CsapatApi';
	import JatekosApi from '../../../../generated-client/src/api/JatekosApi';
	import NemzetisegApi from '../../../../generated-client/src/api/NemzetisegApi';
	import StadionApi from '../../../../generated-client/src/api/StadionApi';
	import VersenyApi from '../../../../generated-client/src/api/VersenyApi';
	import Stadion from '../../../../generated-client/src/model/Stadion';
	import { onMount } from 'svelte';
	import axios from 'axios';
	import { type } from 'superagent/lib/utils';

	let stadions = [];
	let nationalitys = [];
	let teams = [];
	let players = [];
	let competetions = [];

	let createModalType = null;
	let modifyModal = { type: null, id: null};
	let modalType = null;
	let showModal = false;
	function openModal(type) {
		modalType = type;
		loadTeams();
		loadPlayers();
		loadCompetetions();
		showModal = true;
	}

	function closeModal() {
		showModal = false;
	}

	function loadStadions() {
		const stadionApi = new StadionApi();
		stadionApi.stadionGet((error, data, response) => {
			if (error) {
				console.error(error);
			} else {
				stadions = data;
			}
		});
	}
	onMount(loadStadions);

	function loadNationalitys() {
		const nemzetisegApi = new NemzetisegApi();
		nemzetisegApi.nemzetisegGet((error, data, response) => {
			if (error) {
				console.error(error);
			} else {
				nationalitys = data;
			}
		});
	}
	onMount(loadNationalitys);

	function loadTeams() {
		const csapatApi = new CsapatApi();
		csapatApi.apiCsapatGet((error, data, response) => {
			if (error) {
				console.error(error);
			} else {
				teams = data;
			}
		});
	}
	function loadPlayers() {
		const jatekosApi = new JatekosApi();
		jatekosApi.jatekosGet((error, data, response) => {
			if (error) {
				console.error(error);
			} else {
				players = data;
			}
		});
	}
	function loadCompetetions() {
		const apiInstance = new VersenyApi();
		apiInstance.versenyGet((error, data, response) => {
			if (error) {
				console.error(error);
			} else {
				competetions = data;
			}
		});
	}

	/* Csapatok */
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

	function convertCsapatStatusz(id) {
		switch (id) {
			case 0:
				return 'Aktív';
			case 1:
				return 'Inaktív';
			case 2:
				return 'Átigazolás Alatt';
			case 3:
				return 'Felbomlott';
		}
	}

	/* Jatekosok */
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

	function convertJatekosStatusz(id) {
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

	async function handleCreate(type) {
		switch (type) {
			case 'Csapatok':
				const csapatApi = new CsapatApi();
				
				const csapat = {
					csapatId: 0,
					csapatNev: team_name.value,
					alapitasDatum: foundation_date.value,
					jelenlegiEdzo: coach_name.value,
					stadionId: stadium.value,
					statusz: +csapatStatus.value,
					media_Id: 1
				};
				try {
					const response = await new Promise((resolve, reject) => {
						csapatApi.apiCsapatPost({ csapat, authToken: localStorage.getItem("AuthToken") }, (error, data, response) => {
							if (error) {
								reject(error);
							} else {
								resolve(data);
								loadTeams();
								createModalType = null
							}
						});
					});
					return response;
				} catch (error) {
					console.error('Error fetching csapatok:', error);
					errorMessage = 'An error occurred while fetching the csapatok.';
				}
				break;
			case 'Játékosok':
				const jatekosApi = new JatekosApi();
				const jatekos = {
					jatekosId: 0,
					vezeteknev: player_name.value.split(" ")[0],
					keresztnev: player_name.value.split(" ")[1],
					szuletesiDatum: birth_date.value,
					nemzetisegId: nationality.value,
					pozicio: +position.value,
					csapatId: +team.value,
					statuszId: +jatekosStatus.value,
					media_Id: 1
				};
				try {
					const response = await new Promise((resolve, reject) => {
						jatekosApi.jatekosPost({ jatekos, authToken: localStorage.getItem('AuthToken') }, (error, data, response) => {
							if (error) {
								reject(error);
							} else {
								resolve(data);
								loadPlayers();
								createModalType = null
							}
						})
					})
					return response;
				} catch (error) {
					console.error('Error fetching csapatok:', error);
					errorMessage = 'An error occurred while fetching the csapatok.';
				}
				break;
			case 'Események':
				const versenyApi = new VersenyApi();
				const verseny = {
					versenyId: 0,
					liga: liga.value,
					fordulo: round.value,
					stadionId: stadium.value,
					kezdesDatum: starting_date.value,
					befejezesDatum: ending_date.value,
					leiras: "",
					aktualis: +esemenyStatus.value === 1 ? true : false
				};
				try {
					const response = await new Promise((resolve, reject) => {
						versenyApi.versenyPost({ verseny, authToken: localStorage.getItem('AuthToken') }, (error, data, response) => {
							if (error) {
								reject(error);
							} else {
								resolve(data);
								loadCompetetions();
								createModalType = null
							}
						})
					})
					return response;
				} catch (error) {
					console.error('Error fetching csapatok:', error);
					errorMessage = 'An error occurred while fetching the csapatok.';
				};
				break;
			default:
				break;
		}
	}

	async function handleModify(modal) {
		switch (modal.type) {
			case "Csapatok":
			const csapatApi = new CsapatApi();
				const csapat = {
					csapatId: 0,
					csapatNev: team_name.value,
					alapitasDatum: foundation_date.value,
					jelenlegiEdzo: coach_name.value,
					stadionId: stadium.value,
					statusz: csapatStatus.value,
					media_Id: 1
				};
				try {
					const response = await new Promise((resolve, reject) => {
						csapatApi.apiCsapatIdPut(modal.id, { csapat, authToken: localStorage.getItem("AuthToken") }, (error, data, response) => {
							if (error) {
								reject(error);
							} else {
								resolve(data);
								loadTeams();
								modifyModal.type = null
							}
						});
					});
					return response;
				} catch (error) {
					console.error('Error fetching csapatok:', error);
					errorMessage = 'An error occurred while fetching the csapatok.';
				}
				break;
			case "Játékosok":
			const jatekosApi = new JatekosApi();
				const jatekos = {
					jatekosId: 0,
					vezeteknev: player_name.value.split(" ")[0],
					keresztnev: player_name.value.split(" ")[1],
					szuletesiDatum: birth_date.value,
					nemzetisegId: nationality.value,
					pozicio: +position.value,
					csapatId: +team.value,
					statuszId: +jatekosStatus.value,
					media_Id: 1
				};
				try {
					const response = await new Promise((resolve, reject) => {
						jatekosApi.jatekosIdPut(modal.id, { jatekos, authToken: localStorage.getItem('AuthToken') }, (error, data, response) => {
							if (error) {
								reject(error);
							} else {
								resolve(data);
								loadPlayers();
								modifyModal.type = null
							}
						})
					})
					return response;
				} catch (error) {
					console.error('Error fetching csapatok:', error);
					errorMessage = 'An error occurred while fetching the csapatok.';
				}
				break;
			case "Események":
				const versenyApi = new VersenyApi();
				const verseny = {
					versenyId: modal.id,
					liga: liga.value,
					fordulo: round.value,
					stadionId: stadium.value,
					kezdesDatum: starting_date.value,
					befejezesDatum: ending_date.value,
					leiras: "",
					aktualis: +esemenyStatus.value === 1 ? true : false
				};
				try {
					const response = await new Promise((resolve, reject) => {
						versenyApi.versenyIdPut(modal.id, { verseny, authToken: localStorage.getItem('AuthToken') }, (error, data, response) => {
							if (error) {
								reject(error);
							} else {
								resolve(data);
								loadCompetetions();
								modifyModal.type = null
							}
						})
					})
					return response;
				} catch (error) {
					console.error('Error fetching csapatok:', error);
					errorMessage = 'An error occurred while fetching the csapatok.';
				};
				break;
			default:
				break;
		}
	}

	function openCreateModal(type) {
		createModalType = type;
	}

	async function openModifyModal(id, type) {
		modifyModal = { type, id };

		switch (type) {
			case 'Csapatok':
				const csapat = await getCsapatById(id)

				team_name.value = csapat.csapatNev
				foundation_date.value = new Date(csapat.alapitasDatum).toISOString().split('T')[0];
				coach_name.value = csapat.jelenlegiEdzo
				stadium.value = csapat.stadionId
				csapatStatus.value = +csapat.statusz
				break;
			case 'Játékosok':
				const jatekos = await getJatekosById(id)

				player_name.value = `${jatekos.vezeteknev} ${jatekos.keresztnev}`
				birth_date.value = new Date(jatekos.szuletesiDatum).toISOString().split('T')[0];
				nationality.value = jatekos.nemzetisegId
				position.value = jatekos.pozicio
				team.value = jatekos.csapatId
				jatekosStatus.value = jatekos.statuszId
				break;
			case 'Események':
				const esemeny = await getEsemenyById(id)

				liga.value = esemeny.liga
				round.value = esemeny.fordulo
				stadium.value = esemeny.stadionId
				starting_date.value = new Date(esemeny.kezdesDatum).toISOString().split('T')[0];
				ending_date.value = new Date(esemeny.befejezesDatum).toISOString().split('T')[0];
				esemenyStatus.value = esemeny.aktualis ? 1 : 0
				break;
			default:
				break;
		}
	}

	async function getCsapatById(id) {
		const csapatApi = new CsapatApi();
			try {
			const response = await new Promise((resolve, reject) => {
				csapatApi.apiCsapatIdGet(id, (error, data, response) => {
					if (error) {
						reject(error);
					} else {
						resolve(data);
					}
				});
			});
			return response
		} catch (error) {
			console.error('Error fetching nemzetiseg:', error);
			errorMessage = 'An error occurred while fetching the nemzetiseg.';
		}
	}	

	async function getEsemenyById(id) {
		const versenyApi = new VersenyApi();
			try {
			const response = await new Promise((resolve, reject) => {
				versenyApi.versenyIdGet(id, (error, data, response) => {
					if (error) {
						reject(error);
					} else {
						resolve(data);
					}
				});
			});
			return response
		} catch (error) {
			console.error('Error fetching nemzetiseg:', error);
			errorMessage = 'An error occurred while fetching the nemzetiseg.';
		}
	}

	async function getJatekosById(id) {
		const jatekosApi = new JatekosApi();
			try {
			const response = await new Promise((resolve, reject) => {
				jatekosApi.jatekosIdGet(id, (error, data, response) => {
					if (error) {
						reject(error);
					} else {
						resolve(data);
					}
				});
			});
			return response
		} catch (error) {
			console.error('Error fetching nemzetiseg:', error);
			errorMessage = 'An error occurred while fetching the nemzetiseg.';
		}
	}

	async function handleRemove(id, type) {
		switch (type) {
			case 'Csapatok':
			const csapatApi = new CsapatApi();
		try {
			const response = await new Promise((resolve, reject) => {
				csapatApi.apiCsapatIdDelete(id, { authToken: localStorage.getItem("AuthToken") }, (error, data, response) => {
					if (error) {
						reject(error);
					} else {
						resolve(data);
						loadTeams();
					}
				});
			});
		} catch (error) {
			console.error('Error fetching nemzetiseg:', error);
			errorMessage = 'An error occurred while fetching the nemzetiseg.';
		}
				break;
			case 'Játékosok':
			const jatekosApi = new JatekosApi();
		try {
			const response = await new Promise((resolve, reject) => {
				jatekosApi.jatekosIdDelete(id, { authToken: localStorage.getItem("AuthToken") }, (error, data, response) => {
					if (error) {
						reject(error);
					} else {
						resolve(data);
						loadPlayers();
					}
				});
			});
		} catch (error) {
			console.error('Error fetching nemzetiseg:', error);
			errorMessage = 'An error occurred while fetching the nemzetiseg.';
		}
				break;
			case 'Események':
			const versenyApi = new VersenyApi();
			try {
			const response = await new Promise((resolve, reject) => {
				versenyApi.versenyIdDelete(id, { authToken: localStorage.getItem("AuthToken") }, (error, data, response) => {
					if (error) {
						reject(error);
					} else {
						resolve(data);
						loadCompetetions();
					}
				});
			});
		} catch (error) {
			console.error('Error fetching nemzetiseg:', error);
			errorMessage = 'An error occurred while fetching the nemzetiseg.';
		}
				break;
			default:
				break;
		}
	}

	// Navigáció a /about oldalra
	function navigateToHomePage() {
		if (goto) {
			goto('/'); // SvelteKit natív navigáció
			showModal = false
			modalType = null
			createModalType = null
		} else {
			window.location.href = '/'; // Ha nem SvelteKit-et használsz
			showModal = false
			modalType = null
			createModalType = null
		}
	}
</script>

<header class="bg-white py-3 shadow-sm">
	<div class="container">
		<nav
			class="navbar navbar-expand-lg navbar-light d-flex justify-content-between align-items-center"
		>
			<a
				href="/"
				class="btn btn-outline-primary ms-auto"
				on:click|preventDefault={navigateToHomePage}>Vissza a főoldalra</a
			>
		</nav>
	</div>
</header>

<main class="container my-5">
	<h2 class="section-title text-center">Adminisztrációs Felület</h2>

	<div class="container">
		<div class="buttons">
			<button class="btn" on:click={() => openModal('Csapatok')}>Csapatok</button>
			<button class="btn" on:click={() => openModal('Játékosok')}>Játékosok</button>
			<button class="btn" on:click={() => openModal('Események')}>Események</button>
		</div>
	</div>

	{#if showModal}
		<div class="modal" on:click={closeModal}>
			<div class="modal-content" on:click|stopPropagation>
				<span class="close" on:click={closeModal}>&times;</span>
				<h2 class="modal-title">{modalType}</h2>
				<button class="edit-btn" on:click={() => openCreateModal(modalType)}>Hozzáadás</button>
				<div class="table-container">
					<table class="csapat-table">
						{#if modalType === 'Csapatok'}
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
								{#each teams as csapat}
									<tr>
										<td>{csapat.csapatNev}</td>
										<td>{csapat.jelenlegiEdzo}</td>
										<td>{new Date(csapat.alapitasDatum).toLocaleDateString('hu-HU')}</td>
										{#await getStadionName(csapat.stadionId) then stadion}
											<td>{stadion}</td>
										{/await}
										<td>
											<div class="actions-btn">
												{convertCsapatStatusz(csapat.statusz)}
												<div>
													<button
														on:click|preventDefault={() =>
															openModifyModal(csapat.csapatId, modalType)}
														><Pencil class="me-2" /></button
													>
													<button on:click={() => handleRemove(csapat.csapatId, modalType)}
														><Trash2 /></button
													>
												</div>
											</div>
										</td>
									</tr>
								{/each}
							</tbody>
						{:else if modalType === 'Játékosok'}
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
								{#each players as jatekos}
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
										<td>
											<div class="actions-btn">
												{convertJatekosStatusz(jatekos.statuszId)}
												<div>
													<button
														on:click|preventDefault={() =>
															openModifyModal(jatekos.jatekosId, modalType)}
														><Pencil class="me-2" /></button
													>
													<button on:click={() => handleRemove(jatekos.jatekosId, modalType)}
														><Trash2 /></button
													>
												</div>
											</div>
										</td>
									</tr>
								{/each}
							</tbody>
						{:else}
							<thead>
								<tr>
									<th>Liga</th>
									<th>Forduló</th>
									<th>Stadion</th>
									<th>Kezdési Dátum</th>
									<th>Befejezési Dátum</th>
									<th>Jelenleg</th>
								</tr>
							</thead>
							<tbody>
								{#each competetions as verseny}
									<tr>
										<td>{verseny.liga}</td>
										<td>{verseny.fordulo}</td>
										{#await getStadionName(verseny.stadionId) then stadion}
											<td>{stadion}</td>
										{/await}
										<td>{new Date(verseny.kezdesDatum).toLocaleDateString('hu-HU')}</td>
										<td>{new Date(verseny.befejezesDatum).toLocaleDateString('hu-HU')}</td>
										<td>
											<div class="actions-btn">
												{verseny.aktualis? 'Jelenleg fut' : "Lezárult"}
												<div>
													<button
														on:click|preventDefault={() =>
															openModifyModal(verseny.versenyId, modalType)}
														><Pencil class="me-2" /></button
													>
													<button on:click={() => handleRemove(verseny.versenyId, modalType)}
														><Trash2 /></button
													>
												</div>
											</div>
										</td>
									</tr>
								{/each}
							</tbody>
						{/if}
					</table>
				</div>
			</div>
		</div>
	{/if}

	{#if showModal && modifyModal.type !== null}
		<div class="modal" on:click={() => (modifyModal.type = null)}>
			<div class="modal-content" on:click|stopPropagation>
				<span class="close" on:click={() => (modifyModal.type = null)}>&times;</span>
				<h2 class="modal-title">{modifyModal.type} módosítása</h2>
				<div class="input-container">
					{#if modifyModal.type === 'Csapatok'}
					<label for="team_name">Csapatnév:</label>
					<input type="text" id="team_name" placeholder="Írd be a csapat nevét" />

					<label for="coach_name">Jelenlegi Edző:</label>
					<input type="text" id="coach_name" placeholder="Írd be az edző nevét" />

					<label for="foundation_date">Alapítási Dátum:</label>
					<input type="date" id="foundation_date" />

					<label for="stadium">Stadion:</label>
					<select id="stadium">
						<option value="">Válassz stadiont</option>
						{#each stadions as stadion}
							<option value={stadion.stadionId}>{stadion.stadionNeve}</option>
						{/each}
					</select>

					<label for="csapatStatus">Státusz:</label>
					<select id="csapatStatus">
						<option value="0">Aktív</option>
						<option value="1">Inaktív</option>
						<option value="3">Felbomlott</option>
					</select>

						<button class="submit-btn" on:click={() => handleModify(modifyModal)}>Mentés</button>
					{:else if modifyModal.type === 'Játékosok'}
					<label for="player_name">Játékos neve:</label>
					<input type="text" id="player_name" placeholder="Írd be a játékos nevét" />

					<label for="nationality">Nemzetiség:</label>
					<select id="nationality">
						<option value="">Válassz nemzetiséget</option>
						{#each nationalitys as nationality}
							<option value={nationality.nemzetisegId}>{nationality.nemzetisegNev}</option>
						{/each}
					</select>

					<label for="birth_date">Születési Dátum:</label>
					<input type="date" id="birth_date" />

					<label for="position">Pozíció:</label>
					<select id="position">
						<option value="">Válasszon csapatot!</option>
						<option value="0">Kapus</option>
						<option value="1">Védő</option>
						<option value="2">Középpályás</option>
						<option value="3">Csatár</option>
					</select>

					<label for="team">Csapat:</label>
					<select id="team">
						<option value="">Válasszon csapatot!</option>
						{#each teams as team}
							<option value="{team.csapatId}">{team.csapatNev}</option>
						{/each}
					</select>

					<label for="jatekosStatus">Státusz:</label>
					<select id="jatekosStatus">
						<option value="0">Aktív</option>
						<option value="1">Inaktív</option>
						<option value="2">Sérült</option>
						<option value="3">Visszavonult</option>
					</select>

						<button class="submit-btn" on:click={() => handleModify(modifyModal)}>Mentés</button>
					{:else if modifyModal.type === "Események"}
					<label for="liga">Liga:</label>
					<input type="text" id="liga" placeholder="Írd be a liga nevét" />

					<label for="round">Forduló:</label>
					<input
						type="number"
						id="round"
						placeholder="Írd be a forduló számát"
						min="1"
						max="38"
					/>

					<label for="stadium">Stadion:</label>
					<select id="stadium">
						<option value="">Válassz stadiont</option>
						{#each stadions as stadion}
							<option value={stadion.stadionId}>{stadion.stadionNeve}</option>
						{/each}
					</select>

					<label for="starting_date">Kezdés Dátuma:</label>
					<input type="date" id="starting_date" />

					<label for="ending_date">Befejezés Dátuma:</label>
					<input type="date" id="ending_date" />

					<label for="esemenyStatus">Állapot:</label>
					<select id="esemenyStatus">
						<option value="1">Jelenleg fut</option>
						<option value="0">Lezárult</option>
					</select>

						<button class="submit-btn" on:click={() => handleModify(modifyModal)}>Mentés</button>
					{/if}
				</div>
			</div>
		</div>
	{/if}
	{#if showModal && createModalType !== null}
		<div class="modal" on:click={() => (createModalType = null)}>
			<div class="modal-content" on:click|stopPropagation>
				<span class="close" on:click={() => (createModalType = null)}>&times;</span>
				<h2 class="modal-title">{createModalType} létrehozása</h2>
				<div class="input-container">
					{#if createModalType === 'Csapatok'}
						<label for="team_name">Csapatnév:</label>
						<input type="text" id="team_name" placeholder="Írd be a csapat nevét" />

						<label for="coach_name">Jelenlegi Edző:</label>
						<input type="text" id="coach_name" placeholder="Írd be az edző nevét" />

						<label for="foundation_date">Alapítási Dátum:</label>
						<input type="date" id="foundation_date" />

						<label for="stadium">Stadion:</label>
						<select id="stadium">
							<option value="">Válassz stadiont</option>
							{#each stadions as stadion}
								<option value={stadion.stadionId}>{stadion.stadionNeve}</option>
							{/each}
						</select>

						<label for="csapatStatus">Státusz:</label>
						<select id="csapatStatus">
							<option value="0">Aktív</option>
							<option value="1">Inaktív</option>
							<option value="3">Felbomlott</option>
						</select>

						<button class="submit-btn" on:click={() => handleCreate(createModalType)}
							>Létrehozás</button
						>
					{:else if createModalType === 'Játékosok'}
						<label for="player_name">Játékos neve:</label>
						<input type="text" id="player_name" placeholder="Írd be a játékos nevét" />

						<label for="nationality">Nemzetiség:</label>
						<select id="nationality">
							<option value="">Válassz nemzetiséget</option>
							{#each nationalitys as nationality}
								<option value={nationality.nemzetisegId}>{nationality.nemzetisegNev}</option>
							{/each}
						</select>

						<label for="birth_date">Születési Dátum:</label>
						<input type="date" id="birth_date" />

						<label for="position">Pozíció:</label>
						<select id="position">
							<option value="">Válasszon csapatot!</option>
							<option value="0">Kapus</option>
							<option value="1">Védő</option>
							<option value="2">Középpályás</option>
							<option value="3">Csatár</option>
						</select>

						<label for="team">Csapat:</label>
						<select id="team">
							<option value="">Válasszon csapatot!</option>
							{#each teams as team}
								<option value="{team.csapatId}">{team.csapatNev}</option>
							{/each}
						</select>

						<label for="jatekosStatus">Státusz:</label>
						<select id="jatekosStatus">
							<option value="0">Aktív</option>
							<option value="1">Inaktív</option>
							<option value="2">Sérült</option>
							<option value="3">Visszavonult</option>
						</select>

						<button class="submit-btn" on:click={() => handleCreate(createModalType)}
							>Létrehozás</button
						>
					{:else if createModalType === "Események"}
						<label for="liga">Liga:</label>
						<input type="text" id="liga" placeholder="Írd be a liga nevét" />

						<label for="round">Forduló:</label>
						<input
							type="number"
							id="round"
							placeholder="Írd be a forduló számát"
							min="1"
							max="38"
						/>

						<label for="stadium">Stadion:</label>
						<select id="stadium">
							<option value="">Válassz stadiont</option>
							{#each stadions as stadion}
								<option value={stadion.stadionId}>{stadion.stadionNeve}</option>
							{/each}
						</select>

						<label for="starting_date">Kezdés Dátuma:</label>
						<input type="date" id="starting_date" />

						<label for="ending_date">Befejezés Dátuma:</label>
						<input type="date" id="ending_date" />

						<label for="esemenyStatus">Státusz:</label>
						<select id="esemenyStatus">
							<option value="0">Jelenleg fut</option>
							<option value="1">Lezárult</option>
						</select>

						<button class="submit-btn" on:click={() => handleCreate(createModalType)}
							>Létrehozás</button
						>
					{/if}
				</div>
			</div>
		</div>
	{/if}
</main>

<style>
	.container {
		margin: auto;
		text-align: center;
	}
	.buttons {
		display: grid;
		width: 20%;
		margin: 0 auto;
	}
	.buttons .btn {
		display: inline-block;
		margin-bottom: 1.5rem;
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
	.edit-btn {
		margin-bottom: 1.5rem;
		padding: 6px 12px;
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
	.actions-btn {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	div button {
		all: unset;
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
		padding: 20px;
		border-radius: 15px;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
		text-align: center;
		min-width: 70%;
		max-width: 500px;
	}

	.modal-title {
		font-size: 2.2rem;
		color: #28a745;
		margin-bottom: 20px;
		font-weight: 600;
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

	.input-container {
		display: flex;
		flex-direction: column;
		gap: 10px;
		background: white;
		padding: 20px;
		border-radius: 10px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}
	.input-container label {
		font-size: 1.2rem;
		font-weight: 500;
	}
	.input-container input,
	.input-container select {
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 5px;
		font-size: 1rem;
	}
	.submit-btn {
		padding: 10px;
		background: #28a745;
		color: white;
		font-size: 1.2rem;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		transition: 0.3s;
	}
	.submit-btn:hover {
		background: #218838;
	}
</style>
