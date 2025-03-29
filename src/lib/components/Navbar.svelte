<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	const paths = [
		{ href: '/', name: 'Rólunk' },
		{ href: '/teams', name: 'Csapatok' },
		{ href: '/players', name: 'Játékosok' },
		{ href: '/competetion', name: 'Versenyek' },
		{ href: '/admin', name: 'Admin felület' }
	];

	let isMenuOpen = false;
	let scrolled = false;
	let lastScrollY = 0;
	let isScrollingUp = true;
	let viewportHeight;
	let viewportWidth;

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;

		if (isMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	}

	function closeMenu() {
		if (isMenuOpen) {
			isMenuOpen = false;
			document.body.style.overflow = '';
		}
	}

	function handleScroll() {
		const currentScrollY = window.scrollY;

		isScrollingUp = currentScrollY < lastScrollY;

		scrolled = currentScrollY > 50;

		lastScrollY = currentScrollY;
	}

	// Check if device has a notch
	function hasNotch() {
		const ratio = window.devicePixelRatio || 1;
		const screen = {
			width: window.screen.width * ratio,
			height: window.screen.height * ratio
		};
		
		// Common iPhone models with notch
		return (
			(screen.width === 1125 && screen.height === 2436) ||
			
			(screen.width === 828 && screen.height === 1792) ||

			(screen.width === 1242 && screen.height === 2688) ||
			
			(screen.width === 1170 && screen.height === 2532) ||
			
			(screen.width === 1284 && screen.height === 2778) ||
			
			(CSS.supports('padding-top: env(safe-area-inset-top)') && 
			 getComputedStyle(document.documentElement).getPropertyValue('--safe-area-inset-top') !== '')
		);
	}

	onMount(() => {
		window.addEventListener('scroll', handleScroll);
		
		if (CSS.supports('padding-top: env(safe-area-inset-top)')) {
			document.documentElement.style.setProperty(
				'--safe-area-inset-top', 
				'env(safe-area-inset-top)'
			);
		}

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<svelte:window bind:innerHeight={viewportHeight} bind:innerWidth={viewportWidth} />

<div class="notch-background"></div>

<header class="navbar-wrapper" class:scrolled class:hidden={!isScrollingUp && scrolled && !isMenuOpen}>
	<div class="container">
		<nav class="navbar">
			<div class="navbar-logo">
				<a href="/" class="logo-link">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="logo-icon"
					>
						<circle cx="12" cy="12" r="10"></circle>
						<path
							d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
						></path>
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
				<div class="menu-header">
					<button class="close-menu" on:click={closeMenu} aria-label="Close menu">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<line x1="18" y1="6" x2="6" y2="18"></line>
							<line x1="6" y1="6" x2="18" y2="18"></line>
						</svg>
					</button>
				</div>
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
		--safe-area-inset-top: 0px;
	}

	.notch-background {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: var(--safe-area-inset-top);
		background-color: white;
		z-index: 1002;
	}

	.navbar-wrapper {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 1000;
		background-color: white;
		box-shadow: var(--shadow);
		transition:
			transform 0.3s ease,
			background-color 0.3s ease,
			box-shadow 0.3s ease;
		height: var(--navbar-height);
		padding-top: var(--safe-area-inset-top);
	}

	.navbar-wrapper.scrolled {
		box-shadow: var(--shadow-md);
	}

	.navbar-wrapper.hidden {
		transform: translateY(calc(-100% - var(--safe-area-inset-top)));
	}

	.container {
		width: 100%;
		max-width: 1400px;
		margin: 0 auto;
		padding: 0 1rem;
		height: 100%;
	}

	.navbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 100%;
	}

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
		width: 2.25rem;
		height: 2.25rem;
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

	.menu-toggle {
		display: block;
		width: 3rem;
		height: 3rem;
		background: none;
		border: none;
		cursor: pointer;
		position: relative;
		z-index: 1001;
		margin-right: -0.5rem;
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

	.menu-header {
		display: flex;
		justify-content: flex-end;
		padding: 1rem 0;
		margin-bottom: 2rem;
	}

	.close-menu {
		background: none;
		border: none;
		color: var(--gray-700);
		cursor: pointer;
		width: 3rem;
		height: 3rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		transition: var(--transition);
	}

	.close-menu:hover {
		background-color: var(--gray-200);
	}

	.navbar-menu {
		position: fixed;
		top: 0;
		right: 0;
		width: 100%;
		height: 100vh;
		background-color: white;
		padding: var(--safe-area-inset-top) 2rem 2rem;
		transform: translateX(100%);
		transition: transform 0.3s ease;
		overflow-y: auto;
		z-index: 1001;
		display: flex;
		flex-direction: column;
	}

	.navbar-menu.open {
		transform: translateX(0);
	}

	.nav-links {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 1.75rem;
	}

	.nav-item {
		position: relative;
	}

	.nav-link {
		display: block;
		font-size: 1.375rem;
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
		width: 2.5rem;
		height: 3px;
		background-color: var(--accent);
	}

	@media (min-width: 992px) {
		.menu-toggle {
			display: none;
		}

		.menu-header {
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
			height: 2px;
		}
	}

	@supports (padding-top: env(safe-area-inset-top)) {
		.navbar-wrapper {
			padding-top: var(--safe-area-inset-top);
		}

		.navbar-menu {
			padding-top: var(--safe-area-inset-top);
		}
	}

	@media (max-height: 450px) and (orientation: landscape) {
		.navbar-wrapper {
			height: 60px;
		}

		.nav-links {
			gap: 1.25rem;
		}

		.nav-link {
			font-size: 1.25rem;
		}

		.logo-icon {
			width: 2rem;
			height: 2rem;
		}
	}
</style>