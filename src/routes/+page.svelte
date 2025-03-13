<script>
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

    const gallerys = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6];

    let currentIndex = 0;
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

    const changeTestimonial = (direction) => {
        if (direction === 'next') {
            currentIndex = (currentIndex + 1) % testimonials.length;
        } else if (direction === 'prev') {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        }
    };

    setInterval(() => {
        changeTestimonial('next');
    }, 4000);
</script>

<section class="about_section">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-12 text-center">
                <div class="about-content">
                    <p>
                        A Focisták egy olyan platform, amely a magyar labdarúgás szerelmeseinek szól. Célunk,
                        hogy összehozzuk a sportágban tevékenykedő játékosokat, edzőket és rajongókat, valamint
                        támogassuk a labdarúgáshoz kapcsolódó közösségek munkáját. Az oldal segíti a sportág
                        fejlődését, támogatja a tehetségek kibontakozását, és hozzájárul ahhoz, hogy a
                        labdarúgás mindenki számára elérhető és élvezetes legyen. Csatlakozz te is a magyar
                        futball közösségéhez a Focisták oldalán!
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="testimonial_section">
    <div class="container">
        <div class="row pb-5">
            <div class="col-12 text-center">
                <p class="section-subtitle">Amit ügyfeleink mondanak rólunk</p>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-lg-8 col-md-10 col-12">
                <div id="testimonialCarousel" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        {#each testimonials as testimonial, index}
                            <div class={`carousel-item ${index === currentIndex ? 'active' : ''}`}>
                                <div class="d-flex row" style="min-height: 350px;">
                                    <div
                                        class="profile-box col-sm-5 d-flex align-items-center justify-content-center"
                                    >
                                        <img src={testimonial.image} class="img-fluid fade-in" alt="Véleménykép" />
                                    </div>
                                    <div
                                        class="card col-sm-7 d-flex flex-column justify-content-center align-items-center"
                                    >
                                        <div class="desc-box text-center">
                                            <p class="fst-italic fade-in">{testimonial.text}</p>
                                            <div class="my-4">
                                                <h4>{testimonial.name}</h4>
                                                <p class="m-0 text-black">{testimonial.role}</p>
                                            </div>
                                            <img src={quotes} class="float-end" alt="Idézet" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        {/each}
                    </div>

                    <div class="carousel-indicators">
                        {#each testimonials as _, index}
                            <button
                                type="button"
                                class="disabled"
                                aria-current={index === currentIndex ? 'true' : 'false'}
                                aria-label={`Slide ${index + 1}`}
                            >
                            </button>
                        {/each}
                    </div>

                    <button
                        class="carousel-control-prev"
                        type="button"
                        onclick={() => changeTestimonial('prev')}
                    >
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Előző</span>
                    </button>
                    <button
                        class="carousel-control-next"
                        type="button"
                        onclick={() => changeTestimonial('next')}
                    >
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Következő</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="gallery_section">
    <div class="container">
        <div class="row">
            <div class="col-12 text-center pb-5">
                <h2 class="section-title">Képek</h2>
            </div>
            {#each gallerys as img}
                <div class="col-12 col-md-4 col-lg-4 mb-4">
                    <img src={img} class="img-fluid rounded-3" alt="Galéria kép" />
                </div>
            {/each}
        </div>
    </div>
</section>


<style>
body,
html {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    background-color: white;
}

.row {
    background-color: white;
}

.section-subtitle {
    font-size: 2.5rem;
    color: grey;
    line-height: 1.6;
    max-width: 768px;
    margin: 0 auto 40px;
    padding: 15px;
    border-radius: 8px;
    background-color: #ffffff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 90%;
    margin: 0 auto;
}

.about_section,
.testimonial_section,
.gallery_section {
    padding: 80px 0;
    background-color: white;
}

.about_section {
    padding-top: 200px;
}

.about-content {
    background-color: white;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
    font-size: 1.4rem;
    line-height: 1.8;
}

.carousel-item {
    opacity: 0;
    transition: opacity 1s ease-in-out;
}

.carousel-item.active {
    opacity: 1;
}

.carousel-indicators button {
    background-color: #aaa;
    border: none;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    margin: 0 4px;
    transition: background-color 0.3s;
}

.carousel-indicators button.disabled {
    pointer-events: none;
}

@media (max-width: 767px) {
    .about_section,
    .testimonial_section,
    .gallery_section {
        padding: 40px 0;
    }

    .section-title {
        font-size: 2rem;
    }

    .section-subtitle {
        font-size: 1.6rem;
    }

    .about-content {
        padding: 15px;
        font-size: 1rem;
        line-height: 1.6;
    }

    .carousel-inner {
        margin-top: 20px;
    }

    .carousel-control-prev,
    .carousel-control-next {
        top: 50%;
        transform: translateY(-50%);
    }
}

@media (min-width: 992px) {
    .gallery_section .container-fluid .row {
        margin: 0 auto;
    }

    .gallery_section .col-md-4 {
        padding: 0 15px; 
    }

    .section-title {
        font-size: 3rem;
        margin-bottom: 2rem;
    }

    .section-subtitle {
        font-size: 2rem;
        max-width: 70%;
        margin: 0 auto;
    }

    .about-content {
        font-size: 1.5rem;
        line-height: 1.8;
        padding: 40px;
    }

    .carousel-inner {
        margin-top: 30px;
    }

    .carousel-control-prev,
    .carousel-control-next {
        top: 50%;
        transform: translateY(-50%);
    }

    .col-lg-4 {
        max-width: 33.333%;
    }

    .container-fluid {
        padding-left: 0;
        padding-right: 0;
        width: 100%;
    }
}
</style>