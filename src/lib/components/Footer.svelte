<footer class="footer">
    <div class="container px-5 px-lg-0">
        <div class="row gy-4">
            <div class="col-lg-4 col-md-6 left-align">
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
                    <li>
                        <i class="fa fa-phone"></i>
                        +36 30 123 4567
                    </li>
                    <li>
                        <a href="mailto:focistak.sob@gmail.com">
                            <i class="fa fa-envelope"></i>
                            focistak.sob@gmail.com
                        </a>
                    </li>
                </ul>
            </div>
            <div class="col-lg-4 col-md-6">
                <a href="#top" class="back-to-top">
                    <i class="fa fa-arrow-up"></i>
                    Az oldal tetejére
                </a>
            </div>
        </div>
    </div>
</footer>

<style>
.footer {
    background-color: #e2f6de;
    color: black; /* Minden szöveg fekete lesz alapértelmezetten */
    padding: 3rem 0;
    width: 100%;
    margin-top: auto;
}

.footer-heading,
.footer-description,
.contact-list li,
.back-to-top,
.contact-list a {
    color: black; /* Explicit fekete szín minden fontos elemre */
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
}

.contact-list a {
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: opacity 0.2s ease;
}

.contact-list a:hover {
    opacity: 0.8;
}

.contact-list i {
    margin-right: 0.75rem;
    width: 20px;
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
}

.back-to-top:hover {
    opacity: 0.8;
}

.back-to-top i {
    margin-right: 0.5rem;
}

.left-align {
    text-align: left;
}

</style>
