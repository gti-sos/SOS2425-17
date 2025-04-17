<script>
    import Header from './Header.svelte';
    import Footer from './Footer.svelte';
</script>

<style>
    main {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    .content {
        flex: 1;
    }
</style>

<main>
    <Header />
    
    <div class="content">
        <slot />
    </div>

    <Footer />
</main>
