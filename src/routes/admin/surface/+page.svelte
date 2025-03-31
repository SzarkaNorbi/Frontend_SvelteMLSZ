<script>
    import { goto } from '$app/navigation'; 
    import { Pencil, Trash2, Plus, X, ChevronLeft, Save, AlertTriangle, Home } from 'lucide-svelte';
    import { fade, fly, scale } from 'svelte/transition';
    import { onMount } from 'svelte';
    
    import CsapatApi from '../../../../generated-client/src/api/CsapatApi';
    import JatekosApi from '../../../../generated-client/src/api/JatekosApi';
    import NemzetisegApi from '../../../../generated-client/src/api/NemzetisegApi';
    import StadionApi from '../../../../generated-client/src/api/StadionApi';
    import VersenyApi from '../../../../generated-client/src/api/VersenyApi';
    
    let stadions = [];
    let nationalitys = [];
    let teams = [];
    let players = [];
    let competetions = [];
    let jatekosMediaId = 0;
    let csapatMediaId = 0;
    
    let team_name = { value: '' };
    let coach_name = { value: '' };
    let foundation_date = { value: '' };
    let stadium = { value: '' };
    let csapatStatus = { value: '0' };
    
    let player_name = { value: '' };
    let birth_date = { value: '' };
    let nationality = { value: '' };
    let position = { value: '' };
    let team = { value: '' };
    let jatekosStatus = { value: '0' };
    
    let liga = { value: '' };
    let round = { value: '' };
    let starting_date = { value: '' };
    let ending_date = { value: '' };
    let esemenyStatus = { value: '1' };
    
    let createModalType = null;
    let modifyModal = { type: null, id: null };
    let modalType = null;
    let showModal = false;
    let isLoading = false;
    let confirmDeleteModal = { show: false, type: null, id: null, name: null };
    let successMessage = null;
    let errorMessage = null;
    
    function getSingularForm(type) {
        const singularForms = {
            'Csapatok': 'Csapat',
            'Játékosok': 'Játékos',
            'Események': 'Esemény'
        };
        
        return singularForms[type] || type.slice(0, -1);
    }
    
    function openModal(type) {
        modalType = type;
        isLoading = true;
 
        Promise.all([
            loadTeams(),
            loadPlayers(),
            loadCompetetions()
        ]).then(() => {
            isLoading = false;
        }).catch(err => {
            console.error("Error loading data:", err);
            errorMessage = "Hiba történt az adatok betöltése közben.";
            isLoading = false;
        });
        
        showModal = true;
    }
    
    function closeModal() {
        showModal = false;
        setTimeout(() => {
            modalType = null;
            createModalType = null;
            modifyModal = { type: null, id: null };
        }, 300);
    }
    
    function showSuccess(message) {
        successMessage = message;
        setTimeout(() => {
            successMessage = null;
        }, 3000);
    }
    
    function showError(message) {
        errorMessage = message;
        setTimeout(() => {
            errorMessage = null;
        }, 5000);
    }
    
    function loadStadions() {
        const stadionApi = new StadionApi();
        return new Promise((resolve, reject) => {
            stadionApi.stadionGet((error, data, response) => {
                if (error) {
                    console.error(error);
                    reject(error);
                } else {
                    stadions = data;
                    resolve(data);
                }
            });
        });
    }
    
    function loadNationalitys() {
        const nemzetisegApi = new NemzetisegApi();
        return new Promise((resolve, reject) => {
            nemzetisegApi.nemzetisegGet((error, data, response) => {
                if (error) {
                    console.error(error);
                    reject(error);
                } else {
                    nationalitys = data;
                    resolve(data);
                }
            });
        });
    }
    
    function loadTeams() {
        const csapatApi = new CsapatApi();
        return new Promise((resolve, reject) => {
            csapatApi.apiCsapatGet((error, data, response) => {
                if (error) {
                    console.error(error);
                    reject(error);
                } else {
                    teams = data;
                    resolve(data);
                }
            });
        });
    }
    
    function loadPlayers() {
        const jatekosApi = new JatekosApi();
        return new Promise((resolve, reject) => {
            jatekosApi.jatekosGet((error, data, response) => {
                if (error) {
                    console.error(error);
                    reject(error);
                } else {
                    players = data;
                    resolve(data);
                }
            });
        });
    }
    
    function loadCompetetions() {
        const apiInstance = new VersenyApi();
        return new Promise((resolve, reject) => {
            apiInstance.versenyGet((error, data, response) => {
                if (error) {
                    console.error(error);
                    reject(error);
                } else {
                    competetions = data;
                    resolve(data);
                }
            });
        });
    }
    
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
            return 'Ismeretlen stadion';
        }
    }
    
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
            console.error('Error fetching csapat:', error);
            return 'Ismeretlen csapat';
        }
    }
    
    function convertCsapatStatusz(id) {
        const statuses = {
            0: 'Aktív',
            1: 'Inaktív',
            2: 'Átigazolás Alatt',
            3: 'Felbomlott'
        };
        return statuses[id] || 'Ismeretlen';
    }
    
    function convertPozicio(id) {
        const positions = {
            0: 'Kapus',
            1: 'Védő',
            2: 'Középpályás',
            3: 'Csatár'
        };
        return positions[id] || 'Ismeretlen';
    }
    
    function convertJatekosStatusz(id) {
        const statuses = {
            0: 'Aktív',
            1: 'Inaktív',
            2: 'Sérült',
            3: 'Visszavonult',
            4: 'Átigazolás Alatt'
        };
        return statuses[id] || 'Ismeretlen';
    }
    
    function resetTeamForm() {
        team_name.value = '';
        coach_name.value = '';
        foundation_date.value = '';
        stadium.value = '';
        csapatStatus.value = '0';
    }
    
    function resetPlayerForm() {
        player_name.value = '';
        birth_date.value = '';
        nationality.value = '';
        position.value = '';
        team.value = '';
        jatekosStatus.value = '0';
    }
    
    function resetEventForm() {
        liga.value = '';
        round.value = '';
        starting_date.value = '';
        ending_date.value = '';
        esemenyStatus.value = '1';
    }
    
    function validateTeamForm() {
        if (!team_name.value || !coach_name.value || !foundation_date.value || !stadium.value) {
            showError("Kérem töltse ki a hiányzó adatot");
            return false;
        }
        return true;
    }
    
    function validatePlayerForm() {
        if (!player_name.value || !birth_date.value || !nationality.value || !position.value || !team.value) {
            showError("Kérem töltse ki a hiányzó adatot");
            return false;
        }
        return true;
    }
    
    function validateEventForm() {
        if (!liga.value || !round.value || !starting_date.value || !ending_date.value) {
            showError("Kérem töltse ki a hiányzó adatot");
            return false;
        }
        return true;
    }
    
    async function handleCreate(type) {
        isLoading = true;
        
        try {
            switch (type) {
                case 'Csapatok':
                    if (!validateTeamForm()) {
                        isLoading = false;
                        return;
                    }
                    
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
                    
                    await new Promise((resolve, reject) => {
                        csapatApi.apiCsapatPost(
                            { csapat, authToken: localStorage.getItem('AuthToken') },
                            (error, data, response) => {
                                if (error) {
                                    reject(error);
                                } else {
                                    resolve(data);
                                }
                            }
                        );
                    });
                    
                    await loadTeams();
                    
                    resetTeamForm();
                    
                    showSuccess("Csapat sikeresen létrehozva!");
                    break;
                    
                case 'Játékosok':
                    if (!validatePlayerForm()) {
                        isLoading = false;
                        return;
                    }
                    
                    const jatekosApi = new JatekosApi();
                    const nameParts = player_name.value.split(' ');
                    const jatekos = {
                        jatekosId: 0,
                        vezeteknev: nameParts[0] || '',
                        keresztnev: nameParts.slice(1).join(' ') || '',
                        szuletesiDatum: birth_date.value,
                        nemzetisegId: nationality.value,
                        pozicio: +position.value,
                        csapatId: +team.value,
                        statuszId: +jatekosStatus.value,
                        media_Id: 1
                    };
                    
                    await new Promise((resolve, reject) => {
                        jatekosApi.jatekosPost(
                            { jatekos, authToken: localStorage.getItem('AuthToken') },
                            (error, data, response) => {
                                if (error) {
                                    reject(error);
                                } else {
                                    resolve(data);
                                }
                            }
                        );
                    });
                    
                    await loadPlayers();
                    
                    resetPlayerForm();
                    
                    showSuccess("Játékos sikeresen létrehozva!");
                    break;
                    
                case 'Események':
                    if (!validateEventForm()) {
                        isLoading = false;
                        return;
                    }
                    
                    const versenyApi = new VersenyApi();
                    const verseny = {
                        versenyId: 0,
                        liga: liga.value,
                        fordulo: round.value,
                        stadionId: 1,
                        kezdesDatum: starting_date.value,
                        befejezesDatum: ending_date.value,
                        leiras: '',
                        aktualis: +esemenyStatus.value === 1
                    };
                    
                    await new Promise((resolve, reject) => {
                        versenyApi.versenyPost(
                            { verseny, authToken: localStorage.getItem('AuthToken') },
                            (error, data, response) => {
                                if (error) {
                                    reject(error);
                                } else {
                                    resolve(data);
                                }
                            }
                        );
                    });
                    
                    await loadCompetetions();
                    
                    resetEventForm();
                    
                    showSuccess("Esemény sikeresen létrehozva!");
                    break;
            }
            
            createModalType = null;
        } catch (error) {
            console.error('Error creating item:', error);
            showError("Hiba történt a létrehozás során!");
        } finally {
            isLoading = false;
        }
    }
    
    async function handleModify(modal) {
        isLoading = true;
        
        try {
            switch (modal.type) {
                case 'Csapatok':
                    if (!validateTeamForm()) {
                        isLoading = false;
                        return;
                    }
                    
                    const csapatApi = new CsapatApi();
                    const csapat = {
                        csapatId: modal.id,
                        csapatNev: team_name.value,
                        alapitasDatum: foundation_date.value,
                        jelenlegiEdzo: coach_name.value,
                        stadionId: stadium.value,
                        statusz: +csapatStatus.value,
                        media_Id: csapatMediaId
                    };
                    
                    await new Promise((resolve, reject) => {
                        csapatApi.apiCsapatIdPut(
                            modal.id,
                            { csapat, authToken: localStorage.getItem('AuthToken') },
                            (error, data, response) => {
                                if (error) {
                                    reject(error);
                                } else {
                                    resolve(data);
                                }
                            }
                        );
                    });
                    
                    await loadTeams();
                    showSuccess("Csapat sikeresen módosítva!");
                    break;
                    
                case 'Játékosok':
                    if (!validatePlayerForm()) {
                        isLoading = false;
                        return;
                    }
                    
                    const jatekosApi = new JatekosApi();
                    const nameParts = player_name.value.split(' ');
                    const jatekos = {
                        jatekosId: modal.id,
                        vezeteknev: nameParts[0] || '',
                        keresztnev: nameParts.slice(1).join(' ') || '',
                        szuletesiDatum: birth_date.value,
                        nemzetisegId: nationality.value,
                        pozicio: +position.value,
                        csapatId: +team.value,
                        statuszId: +jatekosStatus.value,
                        media_Id: jatekosMediaId
                    };
                    
                    await new Promise((resolve, reject) => {
                        jatekosApi.jatekosIdPut(
                            modal.id,
                            { jatekos, authToken: localStorage.getItem('AuthToken') },
                            (error, data, response) => {
                                if (error) {
                                    reject(error);
                                } else {
                                    resolve(data);
                                }
                            }
                        );
                    });
                    
                    await loadPlayers();
                    showSuccess("Játékos sikeresen módosítva!");
                    break;
                    
                case 'Események':
                    if (!validateEventForm()) {
                        isLoading = false;
                        return;
                    }
                    
                    const versenyApi = new VersenyApi();
                    const verseny = {
                        versenyId: modal.id,
                        liga: liga.value,
                        fordulo: round.value,
                        stadionId: 1,
                        kezdesDatum: starting_date.value,
                        befejezesDatum: ending_date.value,
                        leiras: '',
                        aktualis: +esemenyStatus.value === 1
                    };
                    
                    await new Promise((resolve, reject) => {
                        versenyApi.versenyIdPut(
                            modal.id,
                            { verseny, authToken: localStorage.getItem('AuthToken') },
                            (error, data, response) => {
                                if (error) {
                                    reject(error);
                                } else {
                                    resolve(data);
                                }
                            }
                        );
                    });
                    
                    await loadCompetetions();
                    showSuccess("Esemény sikeresen módosítva!");
                    break;
            }
            
            modifyModal.type = null;
        } catch (error) {
            console.error('Error modifying item:', error);
            showError("Hiba történt a módosítás során!");
        } finally {
            isLoading = false;
        }
    }
    
    function openCreateModal(type) {
        switch (type) {
            case 'Csapatok':
                resetTeamForm();
                break;
            case 'Játékosok':
                resetPlayerForm();
                break;
            case 'Események':
                resetEventForm();
                break;
        }
        
        createModalType = type;
    }
    
    async function openModifyModal(id, type) {
        isLoading = true;
        modifyModal = { type, id };
        
        try {
            switch (type) {
                case 'Csapatok':
                    const csapat = await getCsapatById(id);
                    
                    team_name.value = csapat.csapatNev;
                    foundation_date.value = new Date(csapat.alapitasDatum).toISOString().split('T')[0];
                    coach_name.value = csapat.jelenlegiEdzo;
                    stadium.value = csapat.stadionId;
                    csapatStatus.value = csapat.statusz.toString();
                    csapatMediaId = csapat.media_Id;
                    break;
                    
                case 'Játékosok':
                    const jatekos = await getJatekosById(id);
                    
                    player_name.value = `${jatekos.vezeteknev} ${jatekos.keresztnev}`;
                    birth_date.value = new Date(jatekos.szuletesiDatum).toISOString().split('T')[0];
                    nationality.value = jatekos.nemzetisegId;
                    position.value = jatekos.pozicio.toString();
                    team.value = jatekos.csapatId;
                    jatekosStatus.value = jatekos.statuszId.toString();
                    jatekosMediaId = jatekos.media_Id;
                    break;
                    
                case 'Események':
                    const esemeny = await getEsemenyById(id);
                    
                    liga.value = esemeny.liga;
                    round.value = esemeny.fordulo;
                    starting_date.value = new Date(esemeny.kezdesDatum).toISOString().split('T')[0];
                    ending_date.value = new Date(esemeny.befejezesDatum).toISOString().split('T')[0];
                    esemenyStatus.value = esemeny.aktualis ? "1" : "0";
                    break;
            }
        } catch (error) {
            console.error('Error fetching item details:', error);
            showError("Hiba történt az adatok betöltése során!");
        } finally {
            isLoading = false;
        }
    }
    
    async function getCsapatById(id) {
        const csapatApi = new CsapatApi();
        return new Promise((resolve, reject) => {
            csapatApi.apiCsapatIdGet(id, (error, data, response) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
    }
    
    async function getEsemenyById(id) {
        const versenyApi = new VersenyApi();
        return new Promise((resolve, reject) => {
            versenyApi.versenyIdGet(id, (error, data, response) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
    }
    
    async function getJatekosById(id) {
        const jatekosApi = new JatekosApi();
        return new Promise((resolve, reject) => {
            jatekosApi.jatekosIdGet(id, (error, data, response) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
    }
    
    async function showDeleteConfirmation(id, type) {
        let name = "";
        
        try {
            switch (type) {
                case 'Csapatok':
                    const csapat = await getCsapatById(id);
                    name = csapat.csapatNev;
                    break;
                case 'Játékosok':
                    const jatekos = await getJatekosById(id);
                    name = `${jatekos.vezeteknev} ${jatekos.keresztnev}`;
                    break;
                case 'Események':
                    const esemeny = await getEsemenyById(id);
                    name = `${esemeny.liga} - ${esemeny.fordulo}`;
                    break;
            }
        } catch (error) {
            console.error("Error fetching item name:", error);
            name = "ezt az elemet";
        }
        
        confirmDeleteModal = { show: true, type, id, name };
    }
    
    async function handleRemove() {
        if (!confirmDeleteModal.show) return;
        
        const { id, type } = confirmDeleteModal;
        isLoading = true;
        
        try {
            switch (type) {
                case 'Csapatok':
                    const csapatApi = new CsapatApi();
                    await new Promise((resolve, reject) => {
                        csapatApi.apiCsapatIdDelete(
                            id,
                            { authToken: localStorage.getItem('AuthToken') },
                            (error, data, response) => {
                                if (error) {
                                    reject(error);
                                } else {
                                    resolve(data);
                                }
                            }
                        );
                    });
                    
                    await loadTeams();
                    showSuccess("Csapat sikeresen törölve!");
                    break;
                    
                case 'Játékosok':
                    const jatekosApi = new JatekosApi();
                    await new Promise((resolve, reject) => {
                        jatekosApi.jatekosIdDelete(
                            id,
                            { authToken: localStorage.getItem('AuthToken') },
                            (error, data, response) => {
                                if (error) {
                                    reject(error);
                                } else {
                                    resolve(data);
                                }
                            }
                        );
                    });
                    
                    await loadPlayers();
                    showSuccess("Játékos sikeresen törölve!");
                    break;
                    
                case 'Események':
                    const versenyApi = new VersenyApi();
                    await new Promise((resolve, reject) => {
                        versenyApi.versenyIdDelete(
                            id,
                            { authToken: localStorage.getItem('AuthToken') },
                            (error, data, response) => {
                                if (error) {
                                    reject(error);
                                } else {
                                    resolve(data);
                                }
                            }
                        );
                    });
                    
                    await loadCompetetions();
                    showSuccess("Esemény sikeresen törölve!");
                    break;
            }
        } catch (error) {
            console.error('Error removing item:', error);
            showError("Hiba történt a törlés során!");
        } finally {
            confirmDeleteModal = { show: false, type: null, id: null, name: null };
            isLoading = false;
        }
    }
    
    function navigateToHomePage() {
        if (goto) {
            goto('/');
        } else {
            window.location.href = '/';
        }
        showModal = false;
        modalType = null;
        createModalType = null;
    }
    
    onMount(async () => {
        try {
            await Promise.all([
                loadStadions(),
                loadNationalitys()
            ]);
        } catch (error) {
            console.error("Error loading initial data:", error);
        }
    });
</script>

<main class="main">
    <div class="container">
        <div class="admin-header">
            <div class="title-container">
                <h1 class="admin-title">Focisták Admin</h1>
                <button 
                    class="home-button"
                    on:click|preventDefault={navigateToHomePage}
                    title="Vissza a főoldalra"
                >
                    <Home size={20} />
                </button>
            </div>
            <h2 class="section-title">Adminisztrációs Felület</h2>
            <p class="section-description">Válassza ki a kezelni kívánt adattípust</p>
        </div>
        
        <div class="admin-menu">
            <button class="menu-button" on:click={() => openModal('Csapatok')}>
                <span class="button-icon">🏆</span>
                <span class="button-text">Csapatok</span>
            </button>
            
            <button class="menu-button" on:click={() => openModal('Játékosok')}>
                <span class="button-icon">⚽</span>
                <span class="button-text">Játékosok</span>
            </button>
            
            <button class="menu-button" on:click={() => openModal('Események')}>
                <span class="button-icon">🗓️</span>
                <span class="button-text">Események</span>
            </button>
        </div>
    </div>
</main>

{#if successMessage}
    <div class="notification success" transition:fly={{ y: 50, duration: 300 }}>
        <span class="notification-icon">✓</span>
        <span class="notification-text">{successMessage}</span>
    </div>
{/if}

{#if errorMessage}
    <div class="notification error" transition:fly={{ y: 50, duration: 300 }}>
        <span class="notification-icon">⚠</span>
        <span class="notification-text">{errorMessage}</span>
    </div>
{/if}

<!-- Main Modal -->
{#if showModal}
    <div class="modal-backdrop" transition:fade={{ duration: 200 }} on:click={closeModal}>
        <div class="modal-container" transition:scale={{ start: 0.9, duration: 200 }} on:click|stopPropagation>
            <div class="modal-header">
                <h2 class="modal-title">{modalType}</h2>
                <button class="modal-close" on:click={closeModal}>
                    <X size={24} />
                </button>
            </div>
            
            <div class="modal-actions">
                <button class="action-button add" on:click={() => openCreateModal(modalType)}>
                    <Plus size={18} />
                    <span>Új {getSingularForm(modalType)} hozzáadása</span>
                </button>
            </div>
            
            {#if isLoading}
                <div class="loading-container">
                    <div class="loading-spinner"></div>
                    <p>Adatok betöltése...</p>
                </div>
            {:else}
                <div class="items-grid">
                    {#if modalType === 'Csapatok'}
                        {#each teams as csapat}
                            <div class="item-card" in:fade={{ duration: 200, delay: 100 }}>
                                <div class="card-header">
                                    <h3 class="card-title">{csapat.csapatNev}</h3>
                                    <span class="status-badge {csapat.statusz === 0 ? 'active' : csapat.statusz === 3 ? 'inactive' : ''}">
                                        {convertCsapatStatusz(csapat.statusz)}
                                    </span>
                                </div>
                                
                                <div class="card-content">
                                    <p><strong>Edző:</strong> {csapat.jelenlegiEdzo}</p>
                                    <p>
                                        <strong>Alapítási Év:</strong>
                                        {new Date(csapat.alapitasDatum).toLocaleDateString('hu-HU')}
                                    </p>
                                    {#await getStadionName(csapat.stadionId) then stadion}
                                        <p><strong>Stadion:</strong> {stadion}</p>
                                    {/await}
                                </div>
                                
                                <div class="card-actions">
                                    <button class="action-icon edit" on:click={() => openModifyModal(csapat.csapatId, modalType)}>
                                        <Pencil size={18} />
                                    </button>
                                    <button class="action-icon delete" on:click={() => showDeleteConfirmation(csapat.csapatId, modalType)}>
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        {/each}
                    {:else if modalType === 'Játékosok'}
                        {#each players as jatekos}
                            <div class="item-card" in:fade={{ duration: 200, delay: 100 }}>
                                <div class="card-header">
                                    <h3 class="card-title">{jatekos.vezeteknev} {jatekos.keresztnev}</h3>
                                    <span class="status-badge {jatekos.statuszId === 0 ? 'active' : jatekos.statuszId === 3 ? 'inactive' : jatekos.statuszId === 2 ? 'warning' : ''}">
                                        {convertJatekosStatusz(jatekos.statuszId)}
                                    </span>
                                </div>
                                
                                <div class="card-content">
                                    {#await getNemzetisegName(jatekos.nemzetisegId) then nemzetiseg}
                                        <p><strong>Nemzetiség:</strong> {nemzetiseg}</p>
                                    {/await}
                                    <p>
                                        <strong>Születési Dátum:</strong>
                                        {new Date(jatekos.szuletesiDatum).toLocaleDateString('hu-HU')}
                                    </p>
                                    <p><strong>Pozíció:</strong> {convertPozicio(jatekos.pozicio)}</p>
                                    {#await getCsapatName(jatekos.csapatId) then csapat}
                                        <p><strong>Csapat:</strong> {csapat}</p>
                                    {/await}
                                </div>
                                
                                <div class="card-actions">
                                    <button class="action-icon edit" on:click={() => openModifyModal(jatekos.jatekosId, modalType)}>
                                        <Pencil size={18} />
                                    </button>
                                    <button class="action-icon delete" on:click={() => showDeleteConfirmation(jatekos.jatekosId, modalType)}>
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        {/each}
                    {:else}
                        {#each competetions as verseny}
                            <div class="item-card" in:fade={{ duration: 200, delay: 100 }}>
                                <div class="card-header">
                                    <h3 class="card-title">{verseny.liga} - {verseny.fordulo}</h3>
                                    <span class="status-badge {verseny.aktualis ? 'active' : 'inactive'}">
                                        {verseny.aktualis ? 'Jelenleg fut' : 'Lezárult'}
                                    </span>
                                </div>
                                
                                <div class="card-content">
                                    <p>
                                        <strong>Kezdési Dátum:</strong>
                                        {new Date(verseny.kezdesDatum).toLocaleDateString('hu-HU')}
                                    </p>
                                    <p>
                                        <strong>Befejezési Dátum:</strong>
                                        {new Date(verseny.befejezesDatum).toLocaleDateString('hu-HU')}
                                    </p>
                                </div>
                                
                                <div class="card-actions">
                                    <button class="action-icon edit" on:click={() => openModifyModal(verseny.versenyId, modalType)}>
                                        <Pencil size={18} />
                                    </button>
                                    <button class="action-icon delete" on:click={() => showDeleteConfirmation(verseny.versenyId, modalType)}>
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        {/each}
                    {/if}
                </div>
            {/if}
        </div>
    </div>
{/if}

<!-- Create Modal -->
{#if showModal && createModalType !== null}
    <div class="modal-backdrop" transition:fade={{ duration: 200 }} on:click={() => createModalType = null}>
        <div class="form-modal" transition:scale={{ start: 0.9, duration: 200 }} on:click|stopPropagation>
            <div class="modal-header">
                <h2 class="modal-title">Új {getSingularForm(createModalType)} létrehozása</h2>
                <button class="modal-close" on:click={() => createModalType = null}>
                    <X size={24} />
                </button>
            </div>
            
            <div class="form-container">
                {#if createModalType === 'Csapatok'}
                    <div class="form-group">
                        <label for="team_name">Csapatnév:</label>
                        <input type="text" id="team_name" placeholder="Írd be a csapat nevét" bind:value={team_name.value} />
                    </div>
                    
                    <div class="form-group">
                        <label for="coach_name">Jelenlegi Edző:</label>
                        <input type="text" id="coach_name" placeholder="Írd be az edző nevét" bind:value={coach_name.value} />
                    </div>
                    
                    <div class="form-group">
                        <label for="foundation_date">Alapítási Dátum:</label>
                        <input type="date" id="foundation_date" bind:value={foundation_date.value} />
                    </div>
                    
                    <div class="form-group">
                        <label for="stadium">Stadion:</label>
                        <select id="stadium" bind:value={stadium.value}>
                            <option value="">Válasszon stadiont</option>
                            {#each stadions as stadion}
                                <option value={stadion.stadionId}>{stadion.stadionNeve}</option>
                            {/each}
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="csapatStatus">Státusz:</label>
                        <select id="csapatStatus" bind:value={csapatStatus.value}>
                            <option value="0">Aktív</option>
                            <option value="1">Inaktív</option>
                            <option value="3">Felbomlott</option>
                        </select>
                    </div>
                {:else if createModalType === 'Játékosok'}
                    <div class="form-group">
                        <label for="player_name">Játékos neve:</label>
                        <input type="text" id="player_name" placeholder="Írd be a játékos nevét" bind:value={player_name.value} />
                    </div>
                    
                    <div class="form-group">
                        <label for="nationality">Nemzetiség:</label>
                        <select id="nationality" bind:value={nationality.value}>
                            <option value="">Válasszon nemzetiséget</option>
                            {#each nationalitys as nationality}
                                <option value={nationality.nemzetisegId}>{nationality.nemzetisegNev}</option>
                            {/each}
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="birth_date">Születési Dátum:</label>
                        <input type="date" id="birth_date" bind:value={birth_date.value} />
                    </div>
                    
                    <div class="form-group">
                        <label for="position">Pozíció:</label>
                        <select id="position" bind:value={position.value}>
                            <option value="">Válasszon pozíciót</option>
                            <option value="0">Kapus</option>
                            <option value="1">Védő</option>
                            <option value="2">Középpályás</option>
                            <option value="3">Csatár</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="team">Csapat:</label>
                        <select id="team" bind:value={team.value}>
                            <option value="">Válasszon csapatot</option>
                            {#each teams as team}
                                <option value={team.csapatId}>{team.csapatNev}</option>
                            {/each}
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="jatekosStatus">Státusz:</label>
                        <select id="jatekosStatus" bind:value={jatekosStatus.value}>
                            <option value="0">Aktív</option>
                            <option value="1">Inaktív</option>
                            <option value="2">Sérült</option>
                            <option value="3">Visszavonult</option>
                            <option value="4">Átigazolás Alatt</option>
                        </select>
                    </div>
                {:else if createModalType === 'Események'}
                    <div class="form-group">
                        <label for="liga">Liga:</label>
                        <input type="text" id="liga" placeholder="Írd be a liga nevét" bind:value={liga.value} />
                    </div>
                    
                    <div class="form-group">
                        <label for="round">Forduló:</label>
                        <input type="number" id="round" placeholder="Írd be a forduló számát" min="1" max="38" bind:value={round.value} />
                    </div>
                    
                    <div class="form-group">
                        <label for="starting_date">Kezdés Dátuma:</label>
                        <input type="date" id="starting_date" bind:value={starting_date.value} />
                    </div>
                    
                    <div class="form-group">
                        <label for="ending_date">Befejezés Dátuma:</label>
                        <input type="date" id="ending_date" bind:value={ending_date.value} />
                    </div>
                    
                    <div class="form-group">
                        <label for="esemenyStatus">Státusz:</label>
                        <select id="esemenyStatus" bind:value={esemenyStatus.value}>
                            <option value="1">Jelenleg fut</option>
                            <option value="0">Lezárult</option>
                        </select>
                    </div>
                {/if}
                
                <div class="form-actions">
                    <button class="form-button cancel" on:click={() => createModalType = null}>Mégse</button>
                    <button class="form-button submit" on:click={() => handleCreate(createModalType)} disabled={isLoading}>
                        {#if isLoading}
                            <div class="button-spinner"></div>
                            <span>Feldolgozás...</span>
                        {:else}
                            <span>Létrehozás</span>
                        {/if}
                    </button>
                </div>
            </div>
        </div>
    </div>
{/if}

<!-- Modify Modal -->
{#if showModal && modifyModal.type !== null}
    <div class="modal-backdrop" transition:fade={{ duration: 200 }} on:click={() => modifyModal.type = null}>
        <div class="form-modal" transition:scale={{ start: 0.9, duration: 200 }} on:click|stopPropagation>
            <div class="modal-header">
                <h2 class="modal-title">{getSingularForm(modifyModal.type)} módosítása</h2>
                <button class="modal-close" on:click={() => modifyModal.type = null}>
                    <X size={24} />
                </button>
            </div>
            
            {#if isLoading}
                <div class="loading-container">
                    <div class="loading-spinner"></div>
                    <p>Adatok betöltése...</p>
                </div>
            {:else}
                <div class="form-container">
                    {#if modifyModal.type === 'Csapatok'}
                        <div class="form-group">
                            <label for="team_name">Csapatnév:</label>
                            <input type="text" id="team_name" placeholder="Írd be a csapat nevét" bind:value={team_name.value} />
                        </div>
                        
                        <div class="form-group">
                            <label for="coach_name">Jelenlegi Edző:</label>
                            <input type="text" id="coach_name" placeholder="Írd be az edző nevét" bind:value={coach_name.value} />
                        </div>
                        
                        <div class="form-group">
                            <label for="foundation_date">Alapítási Dátum:</label>
                            <input type="date" id="foundation_date" bind:value={foundation_date.value} />
                        </div>
                        
                        <div class="form-group">
                            <label for="stadium">Stadion:</label>
                            <select id="stadium" bind:value={stadium.value}>
                                <option value="">Válasszon stadiont</option>
                                {#each stadions as stadion}
                                    <option value={stadion.stadionId}>{stadion.stadionNeve}</option>
                                {/each}
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="csapatStatus">Státusz:</label>
                            <select id="csapatStatus" bind:value={csapatStatus.value}>
                                <option value="0">Aktív</option>
                                <option value="1">Inaktív</option>
                                <option value="3">Felbomlott</option>
                            </select>
                        </div>
                    {:else if modifyModal.type === 'Játékosok'}
                        <div class="form-group">
                            <label for="player_name">Játékos neve:</label>
                            <input type="text" id="player_name" placeholder="Írd be a játékos nevét" bind:value={player_name.value} />
                        </div>
                        
                        <div class="form-group">
                            <label for="nationality">Nemzetiség:</label>
                            <select id="nationality" bind:value={nationality.value}>
                                <option value="">Válasszon nemzetiséget</option>
                                {#each nationalitys as nationality}
                                    <option value={nationality.nemzetisegId}>{nationality.nemzetisegNev}</option>
                                {/each}
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="birth_date">Születési Dátum:</label>
                            <input type="date" id="birth_date" bind:value={birth_date.value} />
                        </div>
                        
                        <div class="form-group">
                            <label for="position">Pozíció:</label>
                            <select id="position" bind:value={position.value}>
                                <option value="">Válasszon pozíciót</option>
                                <option value="0">Kapus</option>
                                <option value="1">Védő</option>
                                <option value="2">Középpályás</option>
                                <option value="3">Csatár</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="team">Csapat:</label>
                            <select id="team" bind:value={team.value}>
                                <option value="">Válasszon csapatot</option>
                                {#each teams as team}
                                    <option value={team.csapatId}>{team.csapatNev}</option>
                                {/each}
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="jatekosStatus">Státusz:</label>
                            <select id="jatekosStatus" bind:value={jatekosStatus.value}>
                                <option value="0">Aktív</option>
                                <option value="1">Inaktív</option>
                                <option value="2">Sérült</option>
                                <option value="3">Visszavonult</option>
                                <option value="4">Átigazolás Alatt</option>
                            </select>
                        </div>
                    {:else if modifyModal.type === 'Események'}
                        <div class="form-group">
                            <label for="liga">Liga:</label>
                            <input type="text" id="liga" placeholder="Írd be a liga nevét" bind:value={liga.value} />
                        </div>
                        
                        <div class="form-group">
                            <label for="round">Forduló:</label>
                            <input type="number" id="round" placeholder="Írd be a forduló számát" min="1" max="38" bind:value={round.value} />
                        </div>
                        
                        <div class="form-group">
                            <label for="starting_date">Kezdés Dátuma:</label>
                            <input type="date" id="starting_date" bind:value={starting_date.value} />
                        </div>
                        
                        <div class="form-group">
                            <label for="ending_date">Befejezés Dátuma:</label>
                            <input type="date" id="ending_date" bind:value={ending_date.value} />
                        </div>
                        
                        <div class="form-group">
                            <label for="esemenyStatus">Státusz:</label>
                            <select id="esemenyStatus" bind:value={esemenyStatus.value}>
                                <option value="1">Jelenleg fut</option>
                                <option value="0">Lezárult</option>
                            </select>
                        </div>
                    {/if}
                    
                    <div class="form-actions">
                        <button class="form-button cancel" on:click={() => modifyModal.type = null}>Mégse</button>
                        <button class="form-button submit" on:click={() => handleModify(modifyModal)} disabled={isLoading}>
                            {#if isLoading}
                                <div class="button-spinner"></div>
                                <span>Feldolgozás...</span>
                            {:else}
                                <Save size={18} />
                                <span>Mentés</span>
                            {/if}
                        </button>
                    </div>
                </div>
            {/if}
        </div>
    </div>
{/if}

<!-- Delete Confirmation Modal -->
{#if confirmDeleteModal.show}
    <div class="modal-backdrop" transition:fade={{ duration: 200 }} on:click={() => confirmDeleteModal = { show: false, type: null, id: null, name: null }}>
        <div class="confirm-modal" transition:scale={{ start: 0.9, duration: 200 }} on:click|stopPropagation>
            <div class="confirm-icon">
                <AlertTriangle size={48} />
            </div>
            
            <h2 class="confirm-title">Törlés megerősítése</h2>
            
            <p class="confirm-message">
                Biztosan törölni szeretné a következőt: <strong>{confirmDeleteModal.name}</strong>?
                <br />
                Ez a művelet nem visszavonható!
            </p>
            
            <div class="confirm-actions">
                <button 
                    class="confirm-button cancel" 
                    on:click={() => confirmDeleteModal = { show: false, type: null, id: null, name: null }}
                >
                    Mégse
                </button>
                
                <button 
                    class="confirm-button delete" 
                    on:click={handleRemove}
                    disabled={isLoading}
                >
                    {#if isLoading}
                        <div class="button-spinner"></div>
                        <span>Törlés...</span>
                    {:else}
                        <Trash2 size={18} />
                        <span>Törlés</span>
                    {/if}
                </button>
            </div>
        </div>
    </div>
{/if}

<style>
    :root {
        --primary: #1d3557;
        --primary-light: #457b9d;
        --primary-hover: #2c4f7c;
        --accent: #e63946;
        --accent-hover: #d62f3c;
        --success: #2a9d8f;
        --warning: #e9c46a;
        --danger: #e76f51;
        --light: #f1faee;
        --dark: #1d3557;
        --gray-100: #f8f9fa;
        --gray-200: #e9ecef;
        --gray-300: #dee2e6;
        --gray-400: #ced4da;
        --gray-500: #adb5bd;
        --gray-600: #6c757d;
        --gray-700: #495057;
        --gray-800: #343a40;
        --gray-900: #212529;
        --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.05);
        --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        --shadow-md: 0 6px 12px rgba(0, 0, 0, 0.15);
        --shadow-lg: 0 15px 25px rgba(0, 0, 0, 0.1);
        --radius-sm: 0.25rem;
        --radius: 0.5rem;
        --radius-lg: 1rem;
        --radius-xl: 1.5rem;
        --transition: all 0.3s ease;
    }
    
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    
    body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        background-color: var(--gray-100);
        color: var(--gray-900);
        line-height: 1.5;
    }
    
    .container {
        width: 100%;
        max-width: 1400px;
        margin: 0 auto;
        padding: 0 1rem;
    }
    
    .main {
        padding: 2rem 0;
    }
    
    .admin-header {
        text-align: center;
        margin-bottom: 3rem;
    }
    
    .title-container {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1.5rem;
        position: relative;
    }
    
    .admin-title {
        font-size: 2.25rem;
        color: var(--primary);
        margin: 0;
    }
    
    .home-button {
        position: absolute;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        background-color: var(--gray-100);
        color: var(--primary);
        border: 1px solid var(--primary);
        cursor: pointer;
        transition: var(--transition);
    }
    
    .home-button:hover {
        background-color: var(--primary);
        color: white;
    }
    
    .section-title {
        font-size: 2rem;
        color: var(--primary);
        margin-bottom: 0.5rem;
    }
    
    .section-description {
        font-size: 1.125rem;
        color: var(--gray-600);
    }
    
    .admin-menu {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        max-width: 500px;
        margin: 0 auto;
    }
    
    .menu-button {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1.25rem;
        background-color: white;
        border: none;
        border-radius: var(--radius);
        box-shadow: var(--shadow);
        cursor: pointer;
        transition: var(--transition);
        text-align: left;
    }
    
    .menu-button:hover {
        transform: translateY(-3px);
        box-shadow: var(--shadow-md);
    }
    
    .button-icon {
        font-size: 1.5rem;
    }
    
    .button-text {
        font-size: 1.25rem;
        font-weight: 500;
        color: var(--primary);
    }
    
    .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }
    
    .modal-container {
        background-color: white;
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
        width: 90%;
        max-width: 1000px;
        max-height: 90vh;
        overflow-y: auto;
        padding: 1.5rem;
    }
    
    .form-modal {
        background-color: white;
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
        width: 90%;
        max-width: 600px;
        max-height: 90vh;
        overflow-y: auto;
        padding: 1.5rem;
    }
    
    .confirm-modal {
        background-color: white;
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
        width: 90%;
        max-width: 450px;
        padding: 2rem;
        text-align: center;
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid var(--gray-200);
    }
    
    .modal-title {
        font-size: 1.5rem;
        color: var(--primary);
        margin: 0;
    }
    
    .modal-close {
        background: none;
        border: none;
        color: var(--gray-600);
        cursor: pointer;
        transition: var(--transition);
    }
    
    .modal-close:hover {
        color: var(--accent);
    }
    
    .modal-actions {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 1.5rem;
    }
    
    .action-button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.25rem;
        border: none;
        border-radius: var(--radius);
        cursor: pointer;
        transition: var(--transition);
        font-weight: 500;
    }
    
    .action-button.add {
        background-color: var(--success);
        color: white;
    }
    
    .action-button.add:hover {
        background-color: darken(var(--success), 10%);
    }
    
    .items-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1.5rem;
    }
    
    .item-card {
        background-color: white;
        border-radius: var(--radius);
        box-shadow: var(--shadow);
        overflow: hidden;
        transition: var(--transition);
        border: 1px solid var(--gray-200);
    }
    
    .item-card:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-md);
    }
    
    .card-header {
        padding: 1rem;
        background-color: var(--gray-100);
        border-bottom: 1px solid var(--gray-200);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .card-title {
        font-size: 1.125rem;
        color: var(--primary);
        margin: 0;
        font-weight: 600;
    }
    
    .status-badge {
        padding: 0.25rem 0.75rem;
        border-radius: 50px;
        font-size: 0.75rem;
        font-weight: 500;
        background-color: var(--gray-300);
        color: var(--gray-700);
    }
    
    .status-badge.active {
        background-color: var(--success);
        color: white;
    }
    
    .status-badge.inactive {
        background-color: var(--gray-500);
        color: white;
    }
    
    .status-badge.warning {
        background-color: var(--warning);
        color: var(--gray-900);
    }
    
    .card-content {
        padding: 1rem;
    }
    
    .card-content p {
        margin-bottom: 0.5rem;
        font-size: 0.875rem;
    }
    
    .card-content p:last-child {
        margin-bottom: 0;
    }
    
    .card-content strong {
        color: var(--gray-700);
    }
    
    .card-actions {
        display: flex;
        justify-content: flex-end;
        padding: 0.75rem 1rem;
        border-top: 1px solid var(--gray-200);
        gap: 0.75rem;
    }
    
    .action-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        background: none;
        border: none;
        cursor: pointer;
        transition: var(--transition);
    }
    
    .action-icon.edit {
        color: var(--primary-light);
    }
    
    .action-icon.edit:hover {
        background-color: var(--gray-100);
        color: var(--primary);
    }
    
    .action-icon.delete {
        color: var(--accent);
    }
    
    .action-icon.delete:hover {
        background-color: var(--gray-100);
        color: var(--accent-hover);
    }
    
    .form-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    
    .form-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .form-group label {
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--gray-700);
    }
    
    .form-group input,
    .form-group select {
        padding: 0.75rem;
        border: 1px solid var(--gray-300);
        border-radius: var(--radius);
        font-size: 1rem;
        transition: var(--transition);
    }
    
    .form-group input:focus,
    .form-group select:focus {
        outline: none;
        border-color: var(--primary-light);
        box-shadow: 0 0 0 3px rgba(69, 123, 157, 0.2);
    }
    
    .form-actions {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
        margin-top: 1.5rem;
    }
    
    .form-button {
        padding: 0.75rem 1.5rem;
        border-radius: var(--radius);
        font-weight: 500;
        cursor: pointer;
        transition: var(--transition);
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .form-button.cancel {
        background-color: var(--gray-200);
        color: var(--gray-700);
        border: none;
    }
    
    .form-button.cancel:hover {
        background-color: var(--gray-300);
    }
    
    .form-button.submit {
        background-color: var(--primary);
        color: white;
        border: none;
    }
    
    .form-button.submit:hover {
        background-color: var(--primary-hover);
    }
    
    .form-button:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
    
    .confirm-icon {
        color: var(--warning);
        margin-bottom: 1rem;
    }
    
    .confirm-title {
        font-size: 1.5rem;
        color: var(--gray-900);
        margin-bottom: 1rem;
    }
    
    .confirm-message {
        color: var(--gray-700);
        margin-bottom: 1.5rem;
    }
    
    .confirm-actions {
        display: flex;
        justify-content: center;
        gap: 1rem;
    }
    
    .confirm-button {
        padding: 0.75rem 1.5rem;
        border-radius: var(--radius);
        font-weight: 500;
        cursor: pointer;
        transition: var(--transition);
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .confirm-button.cancel {
        background-color: var(--gray-200);
        color: var(--gray-700);
        border: none;
    }
    
    .confirm-button.cancel:hover {
        background-color: var(--gray-300);
    }
    
    .confirm-button.delete {
        background-color: var(--accent);
        color: white;
        border: none;
    }
    
    .confirm-button.delete:hover {
        background-color: var(--accent-hover);
    }
    
    .confirm-button:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
    
    .loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 3rem;
        color: var(--gray-600);
    }
    
    .loading-spinner {
        width: 40px;
        height: 40px;
        border: 3px solid var(--gray-200);
        border-top: 3px solid var(--primary);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 1rem;
    }
    
    .button-spinner {
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top: 2px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .notification {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        padding: 1rem 1.5rem;
        border-radius: var(--radius);
        box-shadow: var(--shadow-md);
        display: flex;
        align-items: center;
        gap: 0.75rem;
        z-index: 1100;
    }
    
    .notification.success {
        background-color: var(--success);
        color: white;
    }
    
    .notification.error {
        background-color: var(--accent);
        color: white;
    }
    
    .notification-icon {
        font-size: 1.25rem;
    }
    
    .notification-text {
        font-weight: 500;
    }
    
    @media (max-width: 768px) {
        .items-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        }
        
        .modal-container,
        .form-modal,
        .confirm-modal {
            width: 95%;
            padding: 1rem;
        }
        
        .section-title {
            font-size: 1.75rem;
        }
        
        .menu-button {
            padding: 1rem;
        }
        
        .button-text {
            font-size: 1.125rem;
        }
        
        .admin-title {
            font-size: 1.75rem;
        }
        
        .home-button {
            width: 2.25rem;
            height: 2.25rem;
        }
    }
    
    @media (max-width: 576px) {
        .items-grid {
            grid-template-columns: 1fr;
        }
        
        .card-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
        }
        
        .status-badge {
            align-self: flex-start;
        }
        
        .form-actions {
            flex-direction: column;
            gap: 0.75rem;
        }
        
        .form-button {
            width: 100%;
            justify-content: center;
        }
        
        .confirm-actions {
            flex-direction: column;
            gap: 0.75rem;
        }
        
        .confirm-button {
            width: 100%;
            justify-content: center;
        }
        
        .notification {
            left: 1rem;
            right: 1rem;
            bottom: 1rem;
        }
        
        .title-container {
            margin-bottom: 1rem;
        }
        
        .admin-title {
            font-size: 1.5rem;
        }
        
        .home-button {
            width: 2.25rem;
            height: 2.25rem;
        }
    }
</style>
