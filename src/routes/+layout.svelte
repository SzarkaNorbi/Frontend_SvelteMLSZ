<script>
	import { page } from '$app/stores';
	import '../css/style.css';
	import '../css/responsive-style.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<div>
	{#if ['/admin', '/register', '/login', '/admin/surface'].includes($page.url.pathname)}
		<main>
			{@render children()}
		</main>
	{:else}
		<Navbar />
		<main>
			{@render children()}
		</main>
		<Footer />
	{/if}
</div>
