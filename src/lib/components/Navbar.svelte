<script>
	import { page } from '$app/stores';

	const paths = [
		{ href: '/', name: 'Rólunk' },
		{ href: '/teams', name: 'Csapatok' },
		{ href: '/players', name: 'Játékosok' },
		{ href: '/competetion', name: 'Versenyek' },
		{ href: '/admin', name: 'Admin felület' }
	];
</script>

<header id="full_nav">
	<div class="header">
		<div class="container">
			<nav class="navbar navbar-expand-lg">
				<div class="container-fluid">
					<button
						class="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarNav"
						aria-controls="navbarNav"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<i class="fas fa-stream navbar-toggler-icon"></i>
					</button>
					<div class="collapse navbar-collapse" id="navbarNav">
						<ul class="navbar-nav mx-auto">
							{#each paths as path}
								<li class="nav-item {$page.url.pathname === path.href ? 'active' : ''}">
									<a class="nav-link" href={path.href}>{path.name}</a>
								</li>
							{/each}
						</ul>
					</div>
				</div>
			</nav>
		</div>
	</div>
</header>

<style>
	.navbar-toggler i {
		color: red;
	}

	.active .nav-link {
		color: red !important;
	}

	@media (min-width: 992px) {
		.navbar-nav {
			justify-content: center; 
		}

		.navbar {
			padding: 20px 0; 
		}
	}
</style>
