<script>
    let showDropdown = false;

    function toggleDropdown() {
        showDropdown = !showDropdown;
    }

    function closeDropdown() {
        showDropdown = false;
    }

    // Acción personalizada para detectar clics fuera
    function clickOutside(node) {
        const handleClick = event => {
            if (!node.contains(event.target)) {
                node.dispatchEvent(new CustomEvent('outclick'));
            }
        };

        document.addEventListener('click', handleClick, true);

        return {
            destroy() {
                document.removeEventListener('click', handleClick, true);
            }
        };
    }
</script>

<style>
    @import '@fortawesome/fontawesome-free/css/all.min.css';

    header {
        position: relative; /* importante para posicionar el dropdown */
        z-index: 1000;
        background-color: #f0f0f0;
        padding: 1rem 0;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        overflow: visible; /* esto es CLAVE para que no se corte el dropdown */
    }

    .nav-container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        padding: 1rem 2rem;
        flex-wrap: nowrap;
        overflow: visible;
    }

    .nav-link {
        display: flex;
        align-items: center;
        font-size: 1rem;
        font-weight: bold;
        color: black;
        text-decoration: none;
        transition: color 0.3s;
        padding: 0.3rem 0.5rem;
        border-radius: 5px;
        cursor: pointer;
        position: relative;
    }

    .nav-link i {
        margin-right: 0.5rem;
    }

    .nav-link:hover {
        color: white;
        background-color: #007bff;
    }

    .dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 9999; /*para que el dropdown este por encima del header que tiene un z-index menor*/
    display: flex;
    flex-direction: column; /* esto los pone uno debajo del otro */
    padding: 0.5rem 0;
    width: 200px;
    text-align: center; /*para centrar los enlaces*/
}


    .dropdown a:hover {
        background-color: #e6e2e2;
        color: white;
    }
</style>



<header>
    <div class="nav-container">
        <a href="/" class="nav-link"><i class="fas fa-home"></i>Inicio</a>
        <a href="/apis" class="nav-link"><i class="fas fa-microchip"></i>APIs</a>
        <a href="/github" class="nav-link"><i class="fab fa-github"></i>GitHub</a>

        <!-- Dropdown -->
        <div use:clickOutside on:outclick={closeDropdown} class="nav-link" on:click|stopPropagation={toggleDropdown}>
            <i class="fas fa-window-maximize"></i>Frontends
            {#if showDropdown}
                <div class="dropdown">
                    <a href="/university-demands" style="text-decoration: none; color:black">university-demands</a>
                    <a href="/frontends/vue" style="text-decoration: none; color:black">Vue App</a>
                    <a href="/frontends/svelte" style="text-decoration: none; color:black">Svelte App</a>
                </div>
            {/if}
        </div>

        <a href="/docs" class="nav-link"><i class="fas fa-file-alt"></i>Documentaciones</a>
    </div>
</header>
