<script>
    import { onMount, tick } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    
    import velemeny1 from '$lib/images/testimonial/velemeny.jpg';
    import quotes from '$lib/images/testimonial/qoutes.svg';
    import velemeny2 from '$lib/images/testimonial/velemeny2.jpg';
    import velemeny3 from '$lib/images/testimonial/velemeny3.jpg';

    import gallery1 from '$lib/images/gallery/g-1.jpg';
    import gallery2 from '$lib/images/gallery/g-2.jpg';
    import gallery3 from '$lib/images/gallery/g-3.jpg';
    import gallery4 from '$lib/images/gallery/g-4.jpg';
    import gallery5 from '$lib/images/gallery/g-5.jpg';
    import gallery6 from '$lib/images/gallery/g-6.jpg';

    const galleryImages = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6];
    const backgroundImages = galleryImages;

    const testimonials = [
        {
            image: velemeny1,
            text: 'A weboldal kialakítása modern és professzionális. Alig várom, hogy a jövőben új tartalmakkal és funkciókkal bővüljön!',
            name: 'Nagy Imre',
            role: 'Boldog Ügyfél'
        },
        {
            image: velemeny2,
            text: 'Nagyon informatív és könnyen kezelhető oldal. Mindent megtaláltam, amit kerestem, és a tartalom is fantasztikus.',
            name: 'Kovács Anna',
            role: 'Elégedett ügyfél'
        },
        {
            image: velemeny3,
            text: 'Gyors és megbízható oldal, valamint naprakész információk. Nagyon ajánlom ezt az oldalt mindenkinek!',
            name: 'Balogh Márk',
            role: 'Boldog felhasználó'
        }
    ];

    const aboutSlides = [
        {
            title: "Ismerje meg a Focisták platformot",
            content: "A Focisták egy olyan platform, amely a magyar labdarúgás szerelmeseinek szól. Célunk, hogy összehozzuk a sportágban tevékenykedő játékosokat, edzőket és rajongókat, valamint támogassuk a labdarúgáshoz kapcsolódó közösségek munkáját."
        },
        {
            title: "Közösségünk",
            content: "Az oldal segíti a sportág fejlődését, támogatja a tehetségek kibontakozását, és hozzájárul ahhoz, hogy a labdarúgás mindenki számára elérhető és élvezetes legyen. Csatlakozz te is a magyar futball közösségéhez a Focisták oldalán!"
        },
        {
            title: "Versenyek és események",
            content: "Rendszeresen szervezünk versenyeket és eseményeket, ahol a játékosok megmutathatják tehetségüket. Kövess minket, hogy ne maradj le a legújabb eseményekről és versenyekről a magyar labdarúgás világában."
        },
        {
            title: "Csapatok és játékosok",
            content: "Böngéssz a magyar csapatok és játékosok között, ismerkedj meg a tehetségekkel, és kövess nyomon karrierjüket. A Focisták platformon minden információt megtalálsz a magyar labdarúgás szereplőiről."
        }
    ];

    let currentTestimonialIndex = 0;
    let currentAboutIndex = 0;
    let currentBackgroundIndex = 0;
    let isTestimonialTransitioning = false;
    let isAboutTransitioning = false;
    let isBackgroundTransitioning = false;
    let testimonialAutoplayInterval;
    let aboutAutoplayInterval;
    let backgroundAutoplayInterval;
    let activeImage = null;
    let isLightboxOpen = false;
    let touchStartX = 0;
    let touchEndX = 0;
    let viewportWidth;
    
    async function changeSlide(type, direction) {
        const isTransitioning = type === 'testimonial' ? isTestimonialTransitioning : 
                               type === 'about' ? isAboutTransitioning : isBackgroundTransitioning;
        
        if (isTransitioning) return;
        
        if (type === 'testimonial') {
            isTestimonialTransitioning = true;
            stopAutoplay('testimonial');
            
            if (direction === 'next') {
                currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
            } else if (direction === 'prev') {
                currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
            } else if (typeof direction === 'number') {
                currentTestimonialIndex = direction;
            }
            
            setTimeout(() => {
                isTestimonialTransitioning = false;
                startAutoplay('testimonial');
            }, 500);
        } else if (type === 'about') {
            isAboutTransitioning = true;
            stopAutoplay('about');
            
            if (direction === 'next') {
                currentAboutIndex = (currentAboutIndex + 1) % aboutSlides.length;
            } else if (direction === 'prev') {
                currentAboutIndex = (currentAboutIndex - 1 + aboutSlides.length) % aboutSlides.length;
            } else if (typeof direction === 'number') {
                currentAboutIndex = direction;
            }
            
            await tick();
            setTimeout(() => {
                isAboutTransitioning = false;
                startAutoplay('about');
            }, 500);
        } else if (type === 'background') {
            isBackgroundTransitioning = true;
            
            currentBackgroundIndex = (currentBackgroundIndex + 1) % backgroundImages.length;
            
            await tick();
            setTimeout(() => {
                isBackgroundTransitioning = false;
            }, 1000);
        }
    }

    function startAutoplay(type) {
        if (type === 'testimonial') {
            stopAutoplay('testimonial');
            testimonialAutoplayInterval = setInterval(() => changeSlide('testimonial', 'next'), 5000);
        } else if (type === 'about') {
            stopAutoplay('about');
            aboutAutoplayInterval = setInterval(() => changeSlide('about', 'next'), 6000);
        } else if (type === 'background') {
            stopAutoplay('background');
            backgroundAutoplayInterval = setInterval(() => changeSlide('background', 'next'), 4000);
        }
    }
    
    function stopAutoplay(type) {
        if (type === 'testimonial' && testimonialAutoplayInterval) {
            clearInterval(testimonialAutoplayInterval);
        } else if (type === 'about' && aboutAutoplayInterval) {
            clearInterval(aboutAutoplayInterval);
        } else if (type === 'background' && backgroundAutoplayInterval) {
            clearInterval(backgroundAutoplayInterval);
        }
    }
 
    function handleTouchStart(e, type) {
        touchStartX = e.touches[0].clientX;
        stopAutoplay(type);
    }
    
    function handleTouchMove(e) {
        touchEndX = e.touches[0].clientX;
    }
    
    function handleTouchEnd(type) {
        if (!touchStartX || !touchEndX) return;
        
        const diff = touchStartX - touchEndX;
        const threshold = 50;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
               
                changeSlide(type, 'next');
            } else {
               
                changeSlide(type, 'prev');
            }
        }
        
        touchStartX = 0;
        touchEndX = 0;
        startAutoplay(type);
    }
    
    function openLightbox(image) {
        activeImage = image;
        isLightboxOpen = true;
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
        isLightboxOpen = false;
        document.body.style.overflow = ''; 
    }
    
    onMount(() => {
        startAutoplay('testimonial');
        startAutoplay('about');
        startAutoplay('background');
        
        return () => {
            stopAutoplay('testimonial');
            stopAutoplay('about');
            stopAutoplay('background');
        };
    });
</script>

<svelte:window bind:innerWidth={viewportWidth} />

<section class="about-section">
    <div class="about-background-container">
        {#each backgroundImages as bgImage, i}
            {#if i === currentBackgroundIndex}
                <div 
                    class="background-image" 
                    in:fade={{ duration: 1000 }}
                    style="background-image: url({bgImage || '/placeholder.svg?height=800&width=1200'});"
                ></div>
            {/if}
        {/each}
        <div class="background-overlay"></div>
    </div>
    
    <div class="container about-content-container">
        <header class="section-header">
            <p class="section-subtitle">{aboutSlides[currentAboutIndex].title}</p>
        </header>
        
        <div class="about-carousel-wrapper">
            <div class="about-carousel"
                 on:touchstart={(e) => handleTouchStart(e, 'about')}
                 on:touchmove={handleTouchMove}
                 on:touchend={() => handleTouchEnd('about')}
                 on:mouseenter={() => stopAutoplay('about')}
                 on:mouseleave={() => startAutoplay('about')}>
                
                <button class="carousel-arrow carousel-prev about-arrow" on:click={() => changeSlide('about', 'prev')} aria-label="Previous slide">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
                
                <div class="about-content" in:fade={{ duration: 500 }}>
                    <p>{aboutSlides[currentAboutIndex].content}</p>
                </div>
                
                <button class="carousel-arrow carousel-next about-arrow" on:click={() => changeSlide('about', 'next')} aria-label="Next slide">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
            </div>
        </div>
        
        <div class="carousel-indicators about-indicators">
            {#each aboutSlides as _, index}
                <button 
                    class="indicator-dot {currentAboutIndex === index ? 'active' : ''}"
                    on:click={() => changeSlide('about', index)}
                    aria-label={`About slide ${index + 1}`}
                ></button>
            {/each}
        </div>
    </div>
</section>

<section class="testimonials-section">
    <div class="container">
        <header class="section-header">
            <p class="section-subtitle" style="color: black;">Amit ügyfeleink mondanak rólunk</p>
        </header>
        
        <div class="testimonials-carousel">
            <div class="testimonial-container" 
                 in:fade={{ duration: 300 }}
                 on:touchstart={(e) => handleTouchStart(e, 'testimonial')}
                 on:touchmove={handleTouchMove}
                 on:touchend={() => handleTouchEnd('testimonial')}
                 on:mouseenter={() => stopAutoplay('testimonial')}
                 on:mouseleave={() => startAutoplay('testimonial')}>
                
                <button class="carousel-arrow carousel-prev" on:click={() => changeSlide('testimonial', 'prev')} aria-label="Previous testimonial">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
                
                <div class="testimonial-card">
                    <div class="testimonial-image-container">
                        <img 
                            src={testimonials[currentTestimonialIndex].image || "/placeholder.svg"}
                            alt={testimonials[currentTestimonialIndex].name}
                            class="testimonial-image"
                            loading="lazy"
                        />
                    </div>
                    
                    <div class="testimonial-content">
                        <div class="quote-icon">
                            <img src={quotes || "/placeholder.svg"} alt="Idézet" loading="lazy" />
                        </div>
                        
                        <p class="testimonial-text">
                            {testimonials[currentTestimonialIndex].text}
                        </p>
                        
                        <div class="testimonial-author">
                            <h3 class="author-name">{testimonials[currentTestimonialIndex].name}</h3>
                            <p class="author-role">{testimonials[currentTestimonialIndex].role}</p>
                        </div>
                    </div>
                </div>
                
                <button class="carousel-arrow carousel-next" on:click={() => changeSlide('testimonial', 'next')} aria-label="Next testimonial">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
            </div>
            
            <div class="carousel-indicators">
                {#each testimonials as _, index}
                    <button 
                        class="indicator-dot {currentTestimonialIndex === index ? 'active' : ''}"
                        on:click={() => changeSlide('testimonial', index)}
                        aria-label={`Testimonial ${index + 1}`}
                    ></button>
                {/each}
            </div>
        </div>
    </div>
</section>

<section class="gallery-section">
    <div class="container">
        <header class="section-header">
            <h1 class="section-title">Galéria</h1>
        </header>
        
        <div class="gallery-grid" in:fade={{ duration: 300 }}>
            {#each galleryImages as image, i}
                <div 
                    class="gallery-item" 
                    in:fly={{ y: 20, delay: i * 50, duration: 300 }}
                    on:click={() => openLightbox(image)}
                    on:keydown={(e) => e.key === 'Enter' && openLightbox(image)}
                    tabindex="0"
                    role="button"
                    aria-label="Galéria kép megnyitása"
                >
                    <div class="gallery-image-container">
                        <img src={image || "/placeholder.svg"} alt="Galéria kép" class="gallery-image" loading="lazy" />
                        <div class="gallery-overlay">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                <line x1="11" y1="8" x2="11" y2="14"></line>
                                <line x1="8" y1="11" x2="14" y2="11"></line>
                            </svg>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>

{#if isLightboxOpen}
    <div class="lightbox" 
         in:fade={{ duration: 200 }}
         on:click={closeLightbox}
         on:keydown={(e) => e.key === 'Escape' && closeLightbox()}
         tabindex="0"
    >
        <button class="lightbox-close" on:click={closeLightbox} aria-label="Close lightbox">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>
        
        <div class="lightbox-content" on:click|stopPropagation>
            <img src={activeImage || "/placeholder.svg"} alt="Nagyított kép" class="lightbox-image" />
        </div>
    </div>
{/if}

<style>
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

    .about-section,
    .testimonials-section,
    .gallery-section {
        padding: 7.5rem 0 4rem;
        background-color: var(--gray-100);
        min-height: 50vh;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: var(--font-base);
        scroll-margin-top: var(--navbar-height);
        position: relative;
    }

    .container {
        width: 100%;
        max-width: 1400px;
        margin: 0 auto;
        padding: 0 1.25rem;
    }

    .about-background-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .background-image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center top;
        background-repeat: no-repeat;
        transform: scale(1.05);
    }

    .background-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.4);
    }

    .about-content-container {
        position: relative;
        z-index: 10;
        padding: 4rem 1.25rem;
        min-height: 600px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .section-header {
        text-align: center;
        margin-bottom: 2rem;
        position: relative;
        padding-top: 1.5rem;
        z-index: 10;
    }

    .section-title {
        font-size: 1.125rem;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--primary-light);
        margin-bottom: 0.75rem;
    }

    .section-subtitle {
        font-size: 2.25rem;
        font-weight: 700;
        color: white;
        margin: 0;
        position: relative;
        display: inline-block;
        line-height: 1.2;
        padding-top: 50px;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }

    .section-subtitle::after {
        content: '';
        position: absolute;
        bottom: -0.75rem;
        left: 50%;
        transform: translateX(-50%);
        width: 100px;
        height: 4px;
        background: var(--accent);
        border-radius: 2px;
    }

    .about-carousel-wrapper {
        position: relative;
        max-width: 900px;
        margin: 0 auto;
        z-index: 5;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .about-carousel {
        position: relative;
        z-index: 5;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 1.25rem;
        width: 100%;
    }

    .about-content {
        background-color: rgba(255, 255, 255, 0.85);
        border-radius: var(--radius-lg);
        padding: 2rem;
        width: 100%;
        backdrop-filter: blur(5px);
        box-shadow: var(--shadow-lg);
        text-align: center;
    }

    .about-content p {
        font-size: 1.125rem;
        line-height: 1.8;
        color: var(--gray-800);
        margin: 0;
        font-weight: 500;
        text-align: center;
    }

    .about-arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 10;
    }

    .carousel-arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        background-color: white;
        border: none;
        box-shadow: var(--shadow);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 10;
        transition: var(--transition);
        touch-action: manipulation;
    }

    .carousel-arrow:hover {
        background-color: var(--primary-light);
        color: white;
    }

    .carousel-arrow svg {
        width: 1.5rem;
        height: 1.5rem;
    }

    .carousel-prev {
        left: 0;
    }

    .carousel-next {
        right: 0;
    }

    .about-indicators {
        margin-top: 2rem;
        position: relative;
        z-index: 10;
    }

    .testimonials-section {
        padding-top: 5rem;
    }

    .testimonials-carousel {
        max-width: 900px;
        margin: 0 auto;
    }

    .testimonial-container {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem 0;
    }

    .testimonial-card {
        display: flex;
        background-color: white;
        border-radius: var(--radius-lg);
        overflow: hidden;
        box-shadow: var(--shadow);
        width: 100%;
        flex-direction: column;
    }

    .testimonial-image-container {
        flex: 0 0 auto;
        position: relative;
        overflow: hidden;
        height: 250px;
    }

    .testimonial-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: var(--transition);
    }

    .testimonial-content {
        flex: 1;
        padding: 2rem;
        position: relative;
    }

    .quote-icon {
        position: absolute;
        top: 1.5rem;
        right: 1.5rem;
        opacity: 0.2;
    }

    .quote-icon img {
        width: 2.5rem;
        height: auto;
    }

    .testimonial-text {
        font-size: 1.125rem;
        line-height: 1.7;
        color: var(--gray-700);
        margin-bottom: 1.5rem;
        font-style: italic;
    }

    .testimonial-author {
        margin-top: auto;
    }

    .author-name {
        font-size: 1.25rem;
        font-weight: 700;
        color: var(--primary);
        margin: 0 0 0.5rem 0;
    }

    .author-role {
        font-size: 1rem;
        color: var(--gray-600);
        margin: 0;
    }

    .carousel-indicators {
        display: flex;
        justify-content: center;
        gap: 0.75rem;
        margin-top: 1.5rem;
    }

    .indicator-dot {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background-color: var(--gray-300);
        border: none;
        cursor: pointer;
        transition: var(--transition);
        padding: 0;
    }

    .indicator-dot.active {
        background-color: var(--primary);
        transform: scale(1.2);
    }

    .gallery-grid {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 1.5rem;
    }

    .gallery-item {
        cursor: pointer;
        border-radius: var(--radius);
        overflow: hidden;
        box-shadow: var(--shadow);
        transition: var(--transition);
        position: relative;
    }

    .gallery-item:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-lg);
    }

    .gallery-item:hover .gallery-overlay {
        opacity: 1;
    }

    .gallery-image-container {
        position: relative;
        overflow: hidden;
        aspect-ratio: 16 / 9;
    }

    .gallery-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center top;
        transition: var(--transition);
    }

    .gallery-item:hover .gallery-image {
        transform: scale(1.1);
    }

    .gallery-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(29, 53, 87, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: var(--transition);
    }

    .gallery-overlay svg {
        width: 2.5rem;
        height: 2.5rem;
        color: white;
    }

    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }

    .lightbox-close {
        position: absolute;
        top: 1.5rem;
        right: 1.5rem;
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        z-index: 1001;
        width: 3rem;
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.5);
        transition: var(--transition);
    }

    .lightbox-close:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }

    .lightbox-close svg {
        width: 2rem;
        height: 2rem;
    }

    .lightbox-content {
        max-width: 90%;
        max-height: 90%;
        position: relative;
    }

    .lightbox-image {
        max-width: 100%;
        max-height: 90vh;
        object-fit: contain;
        border-radius: var(--radius);
    }

    @media (min-width: 576px) {
        .section-subtitle {
            font-size: 2.5rem;
        }
        
        .about-content p {
            font-size: 1.25rem;
        }
        
        .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.75rem;
        }
        
        .testimonial-text {
            font-size: 1.25rem;
        }
    }

    @media (min-width: 768px) {
        .container {
            padding: 0 2rem;
        }
        
        .section-subtitle {
            font-size: 2.75rem;
        }
        
        .testimonial-card {
            flex-direction: row;
        }
        
        .testimonial-image-container {
            flex: 0 0 40%;
            height: auto;
        }
        
        .testimonial-content {
            flex: 0 0 60%;
            padding: 3rem;
        }
        
        .quote-icon img {
            width: 3rem;
        }
        
        .author-name {
            font-size: 1.5rem;
        }
        
        .carousel-arrow {
            width: 3.5rem;
            height: 3.5rem;
        }
        
        .carousel-arrow svg {
            width: 1.75rem;
            height: 1.75rem;
        }
    }

    @media (min-width: 992px) {
        .gallery-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
        }
        
        .about-content {
            padding: 2.5rem;
        }
    }

    @media (max-width: 576px) {
        .about-section,
        .testimonials-section,
        .gallery-section {
            padding: 5rem 0 3rem;
        }
        
        .section-header {
            margin-bottom: 1.5rem;
        }
        
        .section-subtitle {
            font-size: 1.75rem;
            padding-top: 30px;
        }
        
        .section-subtitle::after {
            width: 80px;
            height: 3px;
        }
        
        .about-content {
            padding: 1.5rem;
        }
        
        .about-content p {
            font-size: 1rem;
            line-height: 1.6;
        }
        
        .testimonial-content {
            padding: 1.5rem;
        }
        
        .testimonial-text {
            font-size: 1rem;
            margin-bottom: 1.25rem;
            line-height: 1.5;
        }
        
        .quote-icon {
            top: 1rem;
            right: 1rem;
        }
        
        .quote-icon img {
            width: 2rem;
        }
        
        .carousel-arrow {
            width: 2.5rem;
            height: 2.5rem;
        }
        
        .carousel-arrow svg {
            width: 1.25rem;
            height: 1.25rem;
        }
        
        .testimonial-image-container {
            height: 200px;
        }
        
        .author-name {
            font-size: 1.125rem;
        }
        
        .author-role {
            font-size: 0.875rem;
        }
        
        .indicator-dot {
            width: 0.875rem;
            height: 0.875rem;
        }
    }

    @media (max-width: 360px) {
        .section-subtitle {
            font-size: 1.5rem;
        }
        
        .about-content {
            padding: 1.25rem;
        }
        
        .about-content p {
            font-size: 0.9375rem;
        }
        
        .testimonial-content {
            padding: 1.25rem;
        }
        
        .testimonial-text {
            font-size: 0.9375rem;
        }
        
        .carousel-arrow {
            width: 2.25rem;
            height: 2.25rem;
        }
        
        .carousel-arrow svg {
            width: 1.125rem;
            height: 1.125rem;
        }
        
        .testimonial-image-container {
            height: 180px;
        }
    }
</style>