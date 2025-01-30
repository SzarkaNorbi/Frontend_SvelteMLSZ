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

    const gallerys = [
        gallery1,
        gallery2,
        gallery3,
        gallery4,
        gallery5,
        gallery6
    ]
</script>

<section class="banner_section">
    <div class="container">
        <div class="banner-content py-2"> 
            <h1 class="text-start m-0">Főoldal</h1>
        </div>
    </div>
</section>



<section class="landing_about_section">
    <div class="container">
        <div class="row align-items-center">
            <div class="col-lg-6 col-md-8 col-sm-12">
                <div class="about_content">
                    <p>A magyar futball aranykorát az 1950-es évek Aranycsapata hozta el, de a szurkolók lelkesedése a '90-es években is töretlen maradt.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="testimonial_section">
    <div class="container">
        <div class="row pb-5">
            <div class="col-12 text-center">
                <h2 class="section-title">Vélemények</h2>
                <p class="section-subtitle">
                    Amit ügyfeleink mondanak rólunk
                </p>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-lg-8 col-md-10 col-12">
                <div id="testimonialCarousel" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-indicators">
                        <button type="button" data-bs-target="#testimonialCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Első vélemény"></button>
                        <button type="button" data-bs-target="#testimonialCarousel" data-bs-slide-to="1" aria-label="Második vélemény"></button>
                        <button type="button" data-bs-target="#testimonialCarousel" data-bs-slide-to="2" aria-label="Harmadik vélemény"></button>
                    </div>

                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <div class="d-flex row" style="min-height: 350px;">
                                <div class="profile-box col-sm-5 d-flex align-items-center justify-content-center">
                                    <img src={velemeny1} class="img-fluid" alt="Véleménykép">
                                </div>
                                <div class="card col-sm-7 d-flex flex-column justify-content-center align-items-center">
                                    <div class="desc-box text-center">
                                        <p class="fst-italic">A weboldal kialakítása modern és professzionális. Alig várom, hogy a jövőben új tartalmakkal és funkciókkal bővüljön!</p>
                                        <div class="my-4">
                                            <h4>Nagy Imre</h4>
                                            <p class="m-0 text-white">Boldog Ügyfél</p>
                                        </div>
                                        <img src={quotes} class="float-end" alt="Idézet">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <div class="d-flex row" style="min-height: 350px;">
                                <div class="profile-box col-sm-5 d-flex align-items-center justify-content-center">
                                    <img src={velemeny2} class="img-fluid" alt="Véleménykép">
                                </div>
                                <div class="card col-sm-7 d-flex flex-column justify-content-center align-items-center">
                                    <div class="desc-box text-center">
                                        <p class="fst-italic">Nagyon informatív és könnyen kezelhető oldal. Mindent megtaláltam, amit kerestem, és a tartalom is fantasztikus.</p>
                                        <div class="my-4">
                                            <h4>Kovács Anna</h4>
                                            <p class="m-0 text-white">Elégedett ügyfél</p>
                                        </div>
                                        <img src={quotes} class="float-end" alt="Idézet">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <div class="d-flex row" style="min-height: 350px;">
                                <div class="profile-box col-sm-5 d-flex align-items-center justify-content-center">
                                    <img src={velemeny3} class="img-fluid" alt="Véleménykép">
                                </div>
                                <div class="card col-sm-7 d-flex flex-column justify-content-center align-items-center">
                                    <div class="desc-box text-center">
                                        <p class="fst-italic">Gyors és megbízható oldal, valamint naprakész információk. Nagyon ajánlom ezt az oldalt mindenkinek!</p>
                                        <div class="my-4">
                                            <h4>Balogh Márk</h4>
                                            <p class="m-0 text-white">Boldog felhasználó</p>
                                        </div>
                                        <img src={quotes} class="float-end" alt="Idézet">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button class="carousel-control-prev" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Előző</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="next">
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
            {#each gallerys as img }
                <div class="col-12 col-md-4 mb-4">
                    <img src={img} class="img-fluid rounded-3" alt="Galéria kép">
                </div>
            {/each}
        </div>
    </div>
</section>


<style>
    @media (max-width: 768px) {
        .banner-content h1 {
            font-size: 2rem;
        }

        .about_content p {
            font-size: 1.1rem;
        }

        .desc-box h4 {
            font-size: 1.2rem;
        }

        .desc-box p {
            font-size: 1rem;
        }

        .carousel-item {
            min-height: 300px;
        }

        .gallery_section .col-6 {
            margin-bottom: 20px;
        }
    }

    @media (max-width: 576px) {
        .banner-content h1 {
            font-size: 1.5rem;
        }


        .about_content p {
            font-size: 1rem;
        }

        .carousel-item {
            min-height: 250px;
        }

        .desc-box h4 {
            font-size: 1rem;
        }

        .desc-box p {
            font-size: 0.9rem;
        }
    }
</style>
