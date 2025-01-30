<script>
    import about from '$lib/images/about/ladba.jpg'
</script>

<section class="banner_section">
    <div class="container">
        <div class="banner-content">
            <h1>Rólunk</h1>
        </div>
    </div>
</section>

<section class="about_section py-5">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-12 text-center pb-5">
                <h2 class="section-title">Rólunk</h2>
                <p class="section-subtitle">A Focisták egy adatbázis és információs platform, amely a magyar labdarúgás iránt érdeklődők számára kínál részletes adatokat és statisztikákat. Az oldal célja, hogy átlátható és naprakész információkat nyújtson a sportágról.</p>
            </div>
        </div>

        <div class="row align-items-center">
            <div class="col-lg-6 col-12 mb-4">
                <img src={about} alt="about" class="img-fluid about-image">
            </div>
            <div class="col-lg-6 col-12 mb-4">
                <div class="about-content">
                    <p>A Focisták egy olyan platform, amely a magyar labdarúgás szerelmeseinek szól. Célunk, hogy összehozzuk a sportágban tevékenykedő játékosokat, edzőket és rajongókat, valamint támogassuk a labdarúgáshoz kapcsolódó közösségek munkáját. Az oldal segíti a sportág fejlődését, támogatja a tehetségek kibontakozását, és hozzájárul ahhoz, hogy a labdarúgás mindenki számára elérhető és élvezetes legyen. Csatlakozz te is a magyar futball közösségéhez a Focisták oldalán!</p>
                </div>
            </div>
        </div>
    </div>
</section>


<style>
.about_section {
    background-color: #f8f9fa;
    padding: 60px 0;
}

.section-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 20px;
}

.section-subtitle {
    font-size: 1.5rem;
    color: #6c757d;
    line-height: 1.6;
    max-width: 700px;
    margin: 0 auto 40px;
}

.about-content {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
    font-size: 1.2rem; /* Növeli a szöveg méretét */
    line-height: 1.8;  /* Növeli a sortávolságot */
}

.about-image {
    border-radius: 12px;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    width: 100%; /* biztosítja, hogy a kép a konténerhez igazodjon */
    height: auto;
}

@media (max-width: 767px) {
    .about_section {
        padding: 40px 0;
    }

    .banner-content h1 {
        font-size: 2rem;
    }

    .section-title {
        font-size: 2rem;
    }

    .section-subtitle {
        font-size: 1rem;
    }

    .about-image {
        max-width: 100%;
        height: auto;
    }

    .about-content {
        padding: 15px;
        font-size: 1rem; /* Mobilon kisebb betűméret */
        line-height: 1.6;
    }
}

@media (min-width: 992px) {
    .about-section .row {
        display: flex;
        align-items: center; /* biztosítja, hogy a kép és a szöveg középen legyen */
    }

    .about-section .col-lg-6 {
        padding: 15px;
    }

    .about-image {
        max-width: 100%;
        height: auto;
    }

    .about-content {
        font-size: 1.3rem; /* Nagyobb betűméret nagyobb képernyőkön */
        line-height: 1.9;
    }
}

</style>
