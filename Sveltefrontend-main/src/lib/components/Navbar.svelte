<script>
    import image1 from '$lib/images/logo.png'; 
</script>

<header id="full_nav">
    <div class="header">
        <div class="container">
            <nav class="navbar navbar-expand-lg">
                <div class="container-fluid">
                  <a class="navbar-brand" href="/">
                    <img src={image1} alt="logo">
                  </a>
                  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <i class="fas fa-stream navbar-toggler-icon"></i>
                  </button>
                  <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav mx-auto">
                      <li class="nav-item">
                        <a class="nav-link" href="/about">Rólunk</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="/teams">Csapatok</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="/players">Játékosok</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="/competetion">Versenyek</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="/events">Jövőbeli Események</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="/admin">Admin felület</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
        </div>
    </div>
</header>