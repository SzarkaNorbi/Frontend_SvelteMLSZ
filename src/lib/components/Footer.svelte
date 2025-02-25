<footer class="footer">
    <div class="container-fluid px-3 px-lg-5">
        <div class="row gy-4">
            <div class="col-lg-4 col-md-6 d-flex flex-column justify-content-start text-md-center text-lg-start">
                <h5 class="footer-heading">Elérhetőség</h5>
                <p class="footer-description">Ha bármilyen kérdésed van, vagy szeretnél kapcsolatba lépni velünk, az alábbi elérhetőségeken érhetsz el minket:</p>
                <ul class="contact-list">
                    <li>
                        <a href="https://www.google.com/maps?q=46.27191510177705,20.172764584181714" 
                           target="_blank" 
                           rel="noopener noreferrer">
                            <i class="fa fa-home"></i>
                            6727 Szeged, Lidicei Tér 1.
                        </a>
                    </li>
                    <li class="phone">
                        <i class="fa fa-phone"></i>
                        <span class="phone-number">+36 30 123 4567</span>
                    </li>
                    <li>
                        <a href="mailto:focistak.sob@gmail.com">
                            <i class="fa fa-envelope"></i>
                            focistak.sob@gmail.com
                        </a>
                    </li>
                </ul>
            </div>
            <div class="col-lg-4 col-md-6 text-md-center">
                <a href="#top" class="back-to-top">
                    <i class="fa fa-arrow-up"></i>
                    Az oldal tetejére
                </a>
            </div>
        </div>
    </div>
</footer>

<style>
/* Alapvető beállítások */
body, html {
    height: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column; /* Segít abban, hogy a footer alul maradjon */
}

.container-fluid {
    flex: 1; /* Kitölti a fennmaradó teret */
}

.footer {
    background-color: #e2f6de;
    color: black;
    padding: 3rem 0;
    width: 100%;
    position: relative;
    margin-top: auto; /* Ez biztosítja, hogy mindig az oldal aljára kerüljön */
}

/* Footer tartalom beállítások */
.footer-heading,
.footer-description,
.contact-list li,
.back-to-top,
.contact-list a {
    color: black; 
}

.footer, .footer p, .footer h5, .footer a {
    color: black !important;
}

.footer-heading {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
    text-transform: uppercase;
}

.footer-description {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    line-height: 1.6;
}

.contact-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.contact-list li {
    margin-bottom: 1rem;
    font-size: 1.5rem;
    color: black !important;
    -webkit-text-fill-color: black;
    -webkit-user-select: auto;
    word-wrap: break-word; /* Törje meg a hosszú szöveget */
    white-space: normal; /* Törjön, ha szükséges */
    display: flex; /* Flexbox alkalmazása */
    align-items: center; /* Igazítja a tartalmat a sorban */
}

.contact-list a {
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: opacity 0.2s ease;
    color: black !important;
}

.contact-list a:hover {
    opacity: 0.8;
}

.contact-list i {
    margin-right: 0.75rem;
    width: 20px;
}

a[href^="tel"] {
    color: black !important;
    text-decoration: none !important;
    -webkit-text-fill-color: black; 
}

footer {
    position: relative;
}

.back-to-top {
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    font-size: 1.5rem;
    transition: opacity 0.2s ease;
    position: absolute;
    right: 2rem;
    bottom: 2rem;
    color: black !important;
}

.back-to-top:hover {
    opacity: 0.8;
}

.back-to-top i {
    margin-right: 0.5rem;
}

/* Biztosítja, hogy nagyobb kijelzőkön a footer balra igazítva maradjon */
@media (min-width: 992px) { 
    .col-lg-4 {
        align-self: flex-start;
    }
}

/* Kisebb képernyők esetén módosítja a font méretet */
@media (max-width: 768px) {
    .contact-list li {
        font-size: 1.2rem; /* Csökkentett betűméret kisebb képernyőkön */
    }

    .phone-number {
        word-wrap: break-word; /* Ha a telefonszám hosszú, törje meg */
        display: inline-block; /* Biztosítja, hogy ne foglaljon túl sok helyet */
        max-width: 100%; /* Ne foglaljon el többet, mint a rendelkezésre álló hely */
    }

    .contact-list li.phone {
        display: block;
        word-wrap: break-word; /* Erősítjük a törést */
    }
}

/* A telefonszám ne kerüljön beljebb a többi adatnál */
@media (max-width: 576px) {
    .contact-list li.phone {
        display: flex;
        justify-content: flex-start; /* Igazítja a telefonszámot a bal szélére */
    }
}
</style>
