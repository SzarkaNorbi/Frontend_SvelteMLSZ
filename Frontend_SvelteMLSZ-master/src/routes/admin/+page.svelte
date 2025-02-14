<script>
    import logo from '$lib/images/logo.png';
    import AuthApi from "../../../generated-client/src/api/AuthApi.js";

    const loginInstance = new AuthApi();

    async function handleLogin(event) {
        event.preventDefault(); 

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (!email || !password) {
            document.getElementById("error-message").textContent = "Kérlek, add meg az e-mail címedet és a jelszavadat!";
            document.getElementById("error-message").style.display = "block";
            return;
        }

        const loginModel = {
            email: email,
            password: password,
            rememberMe: false
        };

        console.log(loginModel);

        loginInstance.apiAuthLoginPost({ loginModel }, (error, data, response) => {
            if (error) {
                console.error("Login error:", error);
                document.getElementById("error-message").textContent = "Hibás e-mail vagy jelszó!";
                document.getElementById("error-message").style.display = "block"; 
            } else {
                console.log("Login successful", response);
                localStorage.setItem("AuthToken", JSON.parse(response.text).token);
                window.location.href = "/admin/surface";
            }
        });
    }
</script>

<header class="bg-white py-3 shadow-sm">
    <div class="container">
        <nav class="navbar navbar-expand-lg navbar-light d-flex justify-content-between align-items-center">
                <span class="fs-3 fw-bold">Admin Felület</span>
            
            <a href="/" class="btn btn-outline-primary">Vissza a főoldalra</a>
        </nav>
    </div>
</header>

<main class="container my-5">
    <div class="row justify-content-center">
        <div class="col-lg-6 col-md-8 col-12">
            <div class="admin-card">
                <div class="icon-container">
                    <i class="fas fa-user-cog"></i>
                </div>
                <h2 class="section-title text-center">Adminisztrációs Felület</h2>
                <form id="adminForm" on:submit={handleLogin}>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email cím</label>
                        <input type="email" class="form-control" id="email" placeholder="Adja meg az email címét">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Jelszó</label>
                        <input type="password" class="form-control" id="password" placeholder="Adja meg a jelszavát">
                    </div>

                    <p id="error-message" class="error-message" style="display: none;"></p>

                    <div class="text-center">
                        <button type="submit" class="btn btn-main">Belépés</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</main>

<style>
    .admin-card {
        background-color: #ffffff;
        border-radius: 15px;
        padding: 35px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .section-title {
        font-size: 3rem;
        font-weight: 700;
        color: #333;
        margin-bottom: 30px; 
    }

    .form-label {
        font-size: 1.5rem; 
        font-weight: 500;
        color: #555;
    }

    .form-control {
        font-size: 1.2rem;
        padding: 15px;
        border-radius: 10px;
        border: 1px solid #ddd;
    }

    .form-control:focus {
        border-color: #007bff;
        box-shadow: 0 0 4px rgba(0, 123, 255, 0.5);
    }

    .btn-main {
        background-color: #007bff;
        color: #fff;
        padding: 15px 25px;
        border-radius: 10px;
        font-size: 1.3rem;
        font-weight: 600;
        transition: background-color 0.3s ease, transform 0.2s ease;
    }

    .btn-main:hover {
        background-color: #0056b3;
        transform: scale(1.05);
    }

    .icon-container {
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
    }

    .icon-container i {
        font-size: 4rem;
        color: #007bff;
    }

    .error-message {
        color: #ff0000;
        font-size: 1.2rem;
        margin-top: 10px;
        text-align: center;
    }

    @media (max-width: 768px) {
        .admin-card {
            padding: 25px;
        }

        .section-title {
            font-size: 2.5rem;
        }

        .form-label {
            font-size: 1.4rem;
        }

        .form-control {
            font-size: 1.1rem;
        }

        .btn-main {
            font-size: 1.2rem;
            padding: 12px 22px; 
        }
    }
    @media (max-width: 576px) {
        .admin-card {
            padding: 20px;
        }

        .section-title {
            font-size: 2.2rem;
        }

        .navbar-brand span {
            font-size: 1.4rem;
        }

        .btn-main {
            width: 100%;
            padding: 14px 0;
        }
    }
</style>
