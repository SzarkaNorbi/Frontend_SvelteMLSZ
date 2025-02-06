<script>
    import logo from '$lib/images/logo.png';
</script>

<header class="bg-white py-3 shadow-sm">
    <div class="container">
        <nav class="navbar navbar-expand-lg navbar-light d-flex justify-content-between align-items-center">
            <a href="/" class="navbar-brand d-flex align-items-center">
                <img src={logo} alt="logo" style="height: 40px; margin-right: 10px;">
                <span class="fs-3 fw-bold">Admin Felület</span>
            </a>
            <a href="/" class="btn btn-outline-primary">Vissza a főoldalra</a>
        </nav>
    </div>
</header>

<main class="container my-5">
    <h2 class="section-title text-center">Adminisztrációs Felület</h2>
    <div class="admin-panel">
        <button class="btn btn-success">Hozzáadás</button>
        <button class="btn btn-danger">Törlés</button>
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
