<script>
    import { fade, fly } from 'svelte/transition';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { LogIn, User, Lock, AlertCircle, Home } from 'lucide-svelte';
    import logo from '$lib/images/logo.png';
    import AuthApi from "../../../generated-client/src/api/AuthApi.js";

    // State variables
    let email = '';
    let password = '';
    let isLoading = false;
    let errorMessage = '';
    let showPassword = false;
    
    // Initialize API
    const loginInstance = new AuthApi();
    
    // Handle form submission
    async function handleLogin(event) {
        event.preventDefault();
        
        // Validate form
        if (!email || !password) {
            errorMessage = "Kérlek, add meg az e-mail címedet és a jelszavadat!";
            return;
        }
        
        // Set loading state
        isLoading = true;
        errorMessage = '';
        
        // Create login model
        const loginModel = {
            email,
            password
        };
        
        // Attempt login
        try {
            loginInstance.apiAuthLoginPost({ loginModel }, (error, data, response) => {
                if (error) {
                    console.error("Login error:", error);
                    errorMessage = "Hibás e-mail vagy jelszó!";
                    isLoading = false;
                } else {
                    console.log("Login successful");
                    // Store token and redirect
                    localStorage.setItem("AuthToken", JSON.parse(response.text).token);
                    
                    // Use goto if available, otherwise fallback to window.location
                    if (typeof goto === 'function') {
                        goto('/admin/surface');
                    } else {
                        window.location.href = "/admin/surface";
                    }
                }
            });
        } catch (error) {
            console.error("Exception during login:", error);
            errorMessage = "Hiba történt a bejelentkezés során. Kérjük, próbáld újra később.";
            isLoading = false;
        }
    }
    
    // Toggle password visibility
    function togglePasswordVisibility() {
        showPassword = !showPassword;
    }
    
    // Navigate back to home page
    function navigateToHome() {
        if (typeof goto === 'function') {
            goto('/');
        } else {
            window.location.href = "/";
        }
    }
    
    // Focus on email input on mount
    onMount(() => {
        const emailInput = document.getElementById('email');
        if (emailInput) emailInput.focus();
    });
</script>

<!-- Main Content -->
<main class="main">
    <div class="container">
        <div class="login-container" in:fade={{ duration: 300, delay: 150 }}>
            <div class="login-card" in:fly={{ y: 20, duration: 400, delay: 200 }}>
                <div class="home-button-container">
                    <button class="home-button" on:click={navigateToHome} title="Vissza a főoldalra">
                        <Home size={20} />
                    </button>
                </div>
                
                <div class="card-header">
                    <div class="icon-container">
                        <div class="icon-circle">
                            <User size={32} />
                        </div>
                    </div>
                    <h2 class="card-title">Adminisztrációs Belépés</h2>
                    <p class="card-subtitle">Kérjük, jelentkezz be az adminisztrációs felülethez</p>
                </div>
                
                {#if errorMessage}
                    <div class="error-alert" in:fly={{ y: -10, duration: 300 }}>
                        <AlertCircle size={18} />
                        <span>{errorMessage}</span>
                    </div>
                {/if}
                
                <form class="login-form" on:submit={handleLogin}>
                    <div class="form-group">
                        <label for="email" class="form-label">Email cím</label>
                        <div class="input-container">
                            <User size={18} class="input-icon" />
                            <input 
                                type="email" 
                                id="email" 
                                class="form-input" 
                                placeholder="Adja meg az email címét"
                                bind:value={email}
                                disabled={isLoading}
                                required
                            />
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="password" class="form-label">Jelszó</label>
                        <div class="input-container">
                            <Lock size={18} class="input-icon" />
                            <input 
                                type={showPassword ? "text" : "password"} 
                                id="password" 
                                class="form-input" 
                                placeholder="Adja meg a jelszavát"
                                bind:value={password}
                                disabled={isLoading}
                                required
                            />
                            <button 
                                type="button" 
                                class="password-toggle" 
                                on:click={togglePasswordVisibility}
                                tabindex="-1"
                            >
                                {showPassword ? 'Elrejt' : 'Mutat'}
                            </button>
                        </div>
                    </div>
                    
                    
                    
                    <button 
                        type="submit" 
                        class="submit-button" 
                        disabled={isLoading}
                    >
                        {#if isLoading}
                            <div class="spinner"></div>
                            <span>Bejelentkezés...</span>
                        {:else}
                            <LogIn size={18} />
                            <span>Belépés</span>
                        {/if}
                    </button>
                </form>
            </div>
        </div>
    </div>
</main>

<style>
    /* Variables */
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
    
    /* Global Styles */
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
    
    /* Main Content */
    .main {
        min-height: 100vh;
        padding: 3rem 0;
        display: flex;
        align-items: center;
    }
    
    .login-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }
    
    .login-card {
        background-color: white;
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
        width: 100%;
        max-width: 500px;
        overflow: hidden;
        padding: 2.5rem;
        position: relative;
    }
    
    .home-button-container {
        position: absolute;
        top: 1.25rem;
        right: 1.25rem;
    }
    
    .home-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        background-color: var(--gray-100);
        color: var(--primary);
        border: none;
        cursor: pointer;
        transition: var(--transition);
    }
    
    .home-button:hover {
        background-color: var(--primary-light);
        color: white;
    }
    
    .card-header {
        text-align: center;
        margin-bottom: 2rem;
    }
    
    .icon-container {
        display: flex;
        justify-content: center;
        margin-bottom: 1.5rem;
    }
    
    .icon-circle {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background-color: var(--primary-light);
        color: white;
    }
    
    .card-title {
        font-size: 1.75rem;
        color: var(--primary);
        margin-bottom: 0.5rem;
    }
    
    .card-subtitle {
        color: var(--gray-600);
        font-size: 0.95rem;
    }
    
    /* Form Styles */
    .login-form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }
    
    .form-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .form-label {
        font-size: 0.95rem;
        font-weight: 500;
        color: var(--gray-700);
    }
    
    .input-container {
        position: relative;
        display: flex;
        align-items: center;
    }
    
    .input-icon {
        position: absolute;
        left: 1rem;
        color: var(--gray-500);
    }
    
    .form-input {
        width: 100%;
        padding: 0.875rem 1rem 0.875rem 2.75rem;
        border: 1px solid var(--gray-300);
        border-radius: var(--radius);
        font-size: 1rem;
        transition: var(--transition);
    }
    
    .form-input:focus {
        outline: none;
        border-color: var(--primary-light);
        box-shadow: 0 0 0 3px rgba(69, 123, 157, 0.2);
    }
    
    .form-input::placeholder {
        color: var(--gray-400);
    }
    
    .password-toggle {
        position: absolute;
        right: 1rem;
        background: none;
        border: none;
        color: var(--primary-light);
        font-size: 0.85rem;
        font-weight: 500;
        cursor: pointer;
        transition: var(--transition);
    }
    
    .password-toggle:hover {
        color: var(--primary);
    }
    
    .checkbox-group {
        margin-top: -0.5rem;
    }
    
    .checkbox-container {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
    }
    
    .checkbox-label {
        font-size: 0.95rem;
        color: var(--gray-700);
    }
    
    .submit-button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        padding: 1rem;
        background-color: var(--primary);
        color: white;
        border: none;
        border-radius: var(--radius);
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
        transition: var(--transition);
        margin-top: 0.5rem;
    }
    
    .submit-button:hover:not(:disabled) {
        background-color: var(--primary-hover);
    }
    
    .submit-button:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
    
    /* Error Alert */
    .error-alert {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 1rem;
        background-color: rgba(230, 57, 70, 0.1);
        border-left: 4px solid var(--accent);
        border-radius: var(--radius);
        color: var(--accent);
        margin-bottom: 1.5rem;
    }
    
    /* Loading Spinner */
    .spinner {
        width: 18px;
        height: 18px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        border-top-color: white;
        animation: spin 0.8s linear infinite;
    }
    
    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
    
    /* Responsive Adjustments */
    @media (max-width: 768px) {
        .login-card {
            padding: 2rem;
        }
        
        .card-title {
            font-size: 1.5rem;
        }
        
        .icon-circle {
            width: 70px;
            height: 70px;
        }
    }
    
    @media (max-width: 576px) {
        .main {
            padding: 2rem 0;
        }
        
        .login-card {
            padding: 1.5rem;
            max-width: 100%;
        }
        
        .card-title {
            font-size: 1.35rem;
        }
        
        .icon-circle {
            width: 60px;
            height: 60px;
        }
        
        .form-input {
            padding: 0.75rem 1rem 0.75rem 2.5rem;
            font-size: 0.95rem;
        }
    }
</style>