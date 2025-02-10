<script>
    import { goto } from '$app/navigation'; // SvelteKit navigációhoz
    import logo from '$lib/images/logo.png';

    let items = [];   // Adatok listája
    let newItem = ""; // Új adat neve
    let selectedId = null; // Kijelölt elem azonosítója törléshez

    // Adatok lekérése a backendből
    async function loadData() {
        try {
            const res = await fetch("http://localhost:5173/data");
            items = await res.json();
        } catch (error) {
            console.error("Hiba az adatok lekérésekor:", error);
        }
    }

    // Új adat hozzáadása
    async function addItem() {
        if (!newItem.trim()) return;
        try {
            await fetch("http://localhost:5173/data", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: newItem }),
            });
            newItem = "";
            loadData();
        } catch (error) {
            console.error("Hiba az adat hozzáadásakor:", error);
        }
    }

    // Adat törlése
    async function deleteItem() {
        if (!selectedId) return;
        try {
            await fetch(`http://localhost:5173/data/${selectedId}`, {
                method: "DELETE",
            });
            selectedId = null;
            loadData();
        } catch (error) {
            console.error("Hiba az adat törlésekor:", error);
        }
    }

    // Navigáció a főoldalra frissítés nélkül
    function navigateToHome() {
        if (goto) {
            goto('/'); // SvelteKit natív navigáció
        } else {
            window.location.href = "/"; // Ha nem SvelteKit-et használsz
        }
    }

    loadData();
</script>

<header class="bg-white py-3 shadow-sm">
    <div class="container">
        <nav class="navbar navbar-expand-lg navbar-light d-flex justify-content-between align-items-center">
            <a href="#" class="navbar-brand d-flex align-items-center" on:click|preventDefault={navigateToHome}>
                <img src={logo} alt="logo" style="height: 40px; margin-right: 10px;">
                <span class="fs-3 fw-bold">Admin Felület</span>
            </a>
            <a href="#" class="btn btn-outline-primary" on:click|preventDefault={navigateToHome}>Vissza a főoldalra</a>
        </nav>
    </div>
</header>

<main class="container my-5">
    <h2 class="section-title text-center">Adminisztrációs Felület</h2>

    <!-- Új adat hozzáadása -->
    <div class="text-center mb-3">
        <input type="text" bind:value={newItem} placeholder="Új adat neve" class="form-control d-inline-block w-auto" />
        <button on:click={addItem} class="btn btn-success ms-2">Hozzáadás</button>
    </div>

    <!-- Adatok megjelenítése -->
    <table class="table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Név</th>
                <th>Kijelölés törléshez</th>
            </tr>
        </thead>
        <tbody>
            {#each items as item}
                <tr>
                    <td>{item._id}</td>
                    <td>{item.name}</td>
                    <td>
                        <input type="radio" bind:group={selectedId} value={item._id} />
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>

    <!-- Kijelölt adat törlése -->
    <div class="text-center mt-3">
        <button on:click={deleteItem} class="btn btn-danger">Törlés</button>
    </div>
</main>

<style>
    .admin-panel {
        text-align: center;
    }
    .table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
    }
    .table th, .table td {
        border: 1px solid #ddd;
        padding: 10px;
        text-align: center;
    }
    .table th {
        background-color: #f8f9fa;
    }
    .btn-success {
        background-color: #28a745;
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        margin-bottom: 20px;
    }
    .btn-danger {
        background-color: #dc3545;
        padding: 10px 20px;
        border-radius: 5px;
        margin-bottom: 20px;
    }
</style>