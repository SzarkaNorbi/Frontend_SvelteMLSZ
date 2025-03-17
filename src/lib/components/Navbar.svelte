<script>
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    
    // Navigation paths
    const paths = [
        { href: '/', name: 'Rólunk' },
        { href: '/teams', name: 'Csapatok' },
        { href: '/players', name: 'Játékosok' },
        { href: '/competetion', name: 'Versenyek' },
        { href: '/admin', name: 'Admin felület' }
    ];
    
    // State
    let isMenuOpen = false;
    let scrolled = false;
    let lastScrollY = 0;
    let isScrollingUp = true;
    
    // Toggle mobile menu
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        
        // Prevent scrolling when menu is open
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    // Close menu when clicking on a link
    function closeMenu() {
        if (isMenuOpen) {
            isMenuOpen = false;
            document.body.style.overflow = '';
        }
    }
    
    // Handle scroll events
    function handleScroll() {
        const currentScrollY = window.scrollY;
        
        // Determine if we're scrolling up or down
        isScrollingUp = currentScrollY < lastScrollY;
        
        // Set scrolled state if we've scrolled down at least 50px
        scrolled = currentScrollY > 50;
        
        // Update last scroll position
        lastScrollY = currentScrollY;
    }
    
    // Initialize on mount
    onMount(() => {
        // Add scroll event listener
        window.addEventListener('scroll', handleScroll);
        
        // Clean up on component destruction
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });
</script>

<header class="navbar-wrapper" class:scrolled class:hidden={!isScrollingUp && scrolled && !isMenuOpen}>
    <div class="container">
        <nav class="navbar">
            <div class="navbar-logo">
                <a href="/" class="logo-link">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="logo-icon">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                    </svg>
                    <span class="logo-text">Focisták</span>
                </a>
            </div>
            
            <button 
                class="menu-toggle" 
                aria-label="Toggle menu" 
                aria-expanded={isMenuOpen}
                on:click={toggleMenu}
            >
                <span class="menu-bar" class:open={isMenuOpen}></span>
            </button>
            
            <div class="navbar-menu" class:open={isMenuOpen}>
                <ul class="nav-links">
                    {#each paths as path}
                        <li class="nav-item" class:active={$page.url.pathname === path.href}>
                            <a 
                                href={path.href} 
                                class="nav-link"
                                on:click={closeMenu}
                                aria-current={$page.url.pathname === path.href ? 'page' : undefined}
                            >
                                {path.name}
                            </a>
                        </li>
                    {/each}
                </ul>
            </div>
        </nav>
    </div>
</header>

<style>
    /* Variables */
    :root {
        --primary: #1d3557;
        --primary-light: #457b9d;
        --primary-dark: #0d1b2a;
        --accent: #e63946;
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
        --font-base: 1.125rem;
        --navbar-height: 70px;
    }

    /* Navbar Wrapper */
    .navbar-wrapper {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 1000;
        background-color: white;
        box-shadow: var(--shadow);
        transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
        height: var(--navbar-height);
    }

    .navbar-wrapper.scrolled {
        box-shadow: var(--shadow-md);
    }

    .navbar-wrapper.hidden {
        transform: translateY(-100%);
    }

    .container {
        width: 100%;
        max-width: 1400px;
        margin: 0 auto;
        padding: 0 1rem;
        height: 100%;
    }

    /* Navbar */
    .navbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100%;
    }

    /* Logo */
    .navbar-logo {
        display: flex;
        align-items: center;
    }

    .logo-link {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        text-decoration: none;
        color: var(--primary);
        font-weight: 700;
        font-size: 1.5rem;
    }

    .logo-icon {
        width: 2rem;
        height: 2rem;
        color: var(--accent);
    }

    .logo-text {
        display: none;
    }

    @media (min-width: 576px) {
        .logo-text {
            display: inline;
        }
    }

    /* Menu Toggle */
    .menu-toggle {
        display: block;
        width: 2.5rem;
        height: 2.5rem;
        background: none;
        border: none;
        cursor: pointer;
        position: relative;
        z-index: 1001;
    }

    .menu-bar {
        position: relative;
        display: block;
        width: 1.75rem;
        height: 2px;
        background-color: var(--primary);
        margin: 0 auto;
        transition: var(--transition);
    }

    .menu-bar::before,
    .menu-bar::after {
        content: '';
        position: absolute;
        width: 1.75rem;
        height: 2px;
        background-color: var(--primary);
        transition: var(--transition);
    }

    .menu-bar::before {
        transform: translateY(-8px);
    }

    .menu-bar::after {
        transform: translateY(8px);
    }

    .menu-bar.open {
        background-color: transparent;
    }

    .menu-bar.open::before {
        transform: rotate(45deg);
    }

    .menu-bar.open::after {
        transform: rotate(-45deg);
    }

    /* Navbar Menu */
    .navbar-menu {
        position: fixed;
        top: 0;
        right: 0;
        width: 100%;
        height: 100vh;
        background-color: white;
        padding: 5rem 2rem 2rem;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        overflow-y: auto;
        z-index: 1000;
    }

    .navbar-menu.open {
        transform: translateX(0);
    }

    /* Nav Links */
    .nav-links {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .nav-item {
        position: relative;
    }

    .nav-link {
        display: block;
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--gray-700);
        text-decoration: none;
        padding: 0.5rem 0;
        transition: var(--transition);
    }

    .nav-link:hover {
        color: var(--primary);
    }

    .nav-item.active .nav-link {
        color: var(--accent);
    }

    .nav-item.active::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 2rem;
        height: 2px;
        background-color: var(--accent);
    }

    /* Desktop Styles */
    @media (min-width: 992px) {
        .menu-toggle {
            display: none;
        }

        .navbar-menu {
            position: static;
            width: auto;
            height: auto;
            padding: 0;
            background-color: transparent;
            transform: none;
            overflow: visible;
        }

        .nav-links {
            flex-direction: row;
            gap: 2rem;
            align-items: center;
        }

        .nav-link {
            font-size: 1.125rem;
            padding: 0.5rem 0;
        }

        .nav-item.active::after {
            bottom: -0.25rem;
            width: 100%;
        }
    }
</style>