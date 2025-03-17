<script>
    // Function to scroll to top smoothly
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
</script>

<footer class="footer-section">
    <div class="container">
        <div class="footer-content">
            <div class="footer-info">
                <h2 class="footer-title">Elérhetőség</h2>
                <p class="footer-description">
                    Ha bármilyen kérdésed van, vagy szeretnél kapcsolatba lépni velünk, az alábbi elérhetőségeken érhetsz el minket:
                </p>
                
                <ul class="contact-list">
                    <li class="contact-item">
                        <a 
                            href="https://www.google.com/maps?q=46.27191510177705,20.172764584181714" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            class="contact-link"
                        >
                            <div class="contact-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                    <circle cx="12" cy="10" r="3"></circle>
                                </svg>
                            </div>
                            <span>6727 Szeged, Lidicei Tér 1.</span>
                        </a>
                    </li>
                    
                    <li class="contact-item">
                        <a href="tel:+36301234567" class="contact-link">
                            <div class="contact-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                </svg>
                            </div>
                            <span>+36 30 123 4567</span>
                        </a>
                    </li>
                    
                    <li class="contact-item">
                        <a href="mailto:focistak.sob@gmail.com" class="contact-link">
                            <div class="contact-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                    <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>
                            </div>
                            <span>focistak.sob@gmail.com</span>
                        </a>
                    </li>
                </ul>
            </div>
            
            <div class="footer-links">
                <h2 class="footer-title">Gyors linkek</h2>
                <ul class="quick-links">
                    <li><a href="/">Rólunk</a></li>
                    <li><a href="/teams">Csapatok</a></li>
                    <li><a href="/players">Játékosok</a></li>
                    <li><a href="/competetion">Versenyek</a></li>
                </ul>
            </div>
        </div>
        
        <div class="footer-bottom">
            <p class="copyright">© {new Date().getFullYear()} Focisták. Minden jog fenntartva.</p>
            
            <button class="back-to-top" on:click={scrollToTop} aria-label="Vissza az oldal tetejére">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
                <span>Az oldal tetejére</span>
            </button>
        </div>
    </div>
</footer>

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

    /* Footer Section */
    .footer-section {
        background-color: var(--primary);
        color: white;
        padding: 4rem 0 2rem;
        position: relative;
        margin-top: 4rem;
    }

    .container {
        width: 100%;
        max-width: 1400px;
        margin: 0 auto;
        padding: 0 1rem;
    }

    /* Footer Content */
    .footer-content {
        display: grid;
        grid-template-columns: 1fr;
        gap: 3rem;
    }

    @media (min-width: 768px) {
        .footer-content {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (min-width: 992px) {
        .footer-content {
            grid-template-columns: 2fr 1fr 1fr;
        }
    }

    /* Footer Titles */
    .footer-title {
        font-size: 1.25rem;
        font-weight: 700;
        color: white;
        margin-bottom: 1.5rem;
        position: relative;
        display: inline-block;
    }

   

    /* Footer Description */
    .footer-description {
        font-size: 1rem;
        line-height: 1.6;
        color: var(--gray-300);
        margin-bottom: 2rem;
    }

    /* Contact List */
    .contact-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
    }

    .contact-item {
        display: flex;
    }

    .contact-link {
        display: flex;
        align-items: center;
        gap: 1rem;
        text-decoration: none;
        color: var(--gray-300);
        transition: var(--transition);
    }

    .contact-link:hover {
        color: white;
    }

    .contact-icon {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: var(--radius-sm);
        background-color: rgba(255, 255, 255, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }

    .contact-icon svg {
        width: 1.25rem;
        height: 1.25rem;
        color: var(--accent);
    }

    /* Quick Links */
    .quick-links {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    .quick-links a {
        text-decoration: none;
        color: var(--gray-300);
        font-size: 1rem;
        transition: var(--transition);
        display: inline-block;
        position: relative;
        padding-left: 1.25rem;
    }

    .quick-links a::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 0.5rem;
        height: 0.5rem;
        background-color: var(--accent);
        border-radius: 50%;
    }

    .quick-links a:hover {
        color: white;
        transform: translateX(5px);
    }

    /* Social Links */
    .social-links {
        display: flex;
        gap: 1rem;
        margin-top: 1rem;
    }

    .social-link {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2.75rem;
        height: 2.75rem;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.1);
        color: white;
        transition: var(--transition);
    }

    .social-link:hover {
        background-color: var(--accent);
        transform: translateY(-3px);
    }

    .social-link svg {
        width: 1.25rem;
        height: 1.25rem;
    }

    /* Footer Bottom */
    .footer-bottom {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        margin-top: 3rem;
        padding-top: 2rem;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        gap: 1.5rem;
    }

    @media (min-width: 768px) {
        .footer-bottom {
            flex-direction: row;
        }
    }

    /* Copyright */
    .copyright {
        font-size: 0.875rem;
        color: var(--gray-400);
        margin: 0;
    }

    /* Back to Top */
    .back-to-top {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: none;
        border: none;
        color: var(--gray-300);
        font-size: 0.875rem;
        cursor: pointer;
        transition: var(--transition);
        padding: 0.5rem 1rem;
        border-radius: var(--radius);
        background-color: rgba(255, 255, 255, 0.1);
    }

    .back-to-top:hover {
        color: white;
        background-color: rgba(255, 255, 255, 0.15);
    }

    .back-to-top svg {
        width: 1rem;
        height: 1rem;
    }

    /* Responsive Adjustments */
    @media (max-width: 576px) {
        .footer-section {
            padding: 3rem 0 1.5rem;
        }
        
        .footer-content {
            gap: 2rem;
        }
        
        .footer-title {
            font-size: 1.125rem;
            margin-bottom: 1.25rem;
        }
        
        .footer-description {
            font-size: 0.9375rem;
        }
        
        .contact-link, .quick-links a {
            font-size: 0.9375rem;
        }
        
        .contact-icon {
            width: 2.25rem;
            height: 2.25rem;
        }
        
        .contact-icon svg {
            width: 1.125rem;
            height: 1.125rem;
        }
        
        .social-link {
            width: 2.5rem;
            height: 2.5rem;
        }
        
        .social-link svg {
            width: 1.125rem;
            height: 1.125rem;
        }
    }
</style>