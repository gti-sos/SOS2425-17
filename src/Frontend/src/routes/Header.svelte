<script>
    let showGithubDropdown = false;
    let showFrontendsDropdown = false;
    let showAPIsDropdown = false;
    let showDocumentationDropdown = false;

    function toggleGithubDropdown() {
    showGithubDropdown = !showGithubDropdown; // si estaba abierto, lo cierra. Si estaba cerrado, lo abre.
    showFrontendsDropdown = false;            // cierra los otros
    showAPIsDropdown = false;
    showDocumentationDropdown = false;
}


    function toggleFrontendsDropdown() {
    //Eso lo haces para que solo un dropdown este activo , dices que los otros sean false y que el dropdown de frontend
    //sea el contrario es decir true , ya por defecto es false 
    showFrontendsDropdown = !showFrontendsDropdown;
    showGithubDropdown = false;
    showAPIsDropdown = false;
    showDocumentationDropdown = false;
}

    function toggleDocumentationDropdown() {
    //Eso lo haces para que solo un dropdown este activo , dices que los otros sean false y que el dropdown de frontend
    //sea el contrario es decir true , ya por defecto es false 
    showFrontendsDropdown = false;
    showGithubDropdown = false;
    showAPIsDropdown = false;
    showDocumentationDropdown = !showDocumentationDropdown;
}


    function toggleAPIsDropdown() {
    showAPIsDropdown = !showAPIsDropdown;
    showGithubDropdown = false;
    showFrontendsDropdown = false;
    showDocumentationDropdown = false;
}
    

    function closeDropdowns() {
        showGithubDropdown = false;
        showFrontendsDropdown = false;
        showAPIsDropdown = false;
        showDocumentationDropdown = false;
        
    }

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
        position: relative;
        z-index: 1000;
        background-color: #f0f0f0;
        padding: 1rem 0;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        overflow: visible;
    }

    .nav-container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        padding: 1rem 2rem;
        flex-wrap: nowrap;
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
        z-index: 9999;
        display: flex;
        flex-direction: column;
        padding: 0.5rem 0;
        width: 200px;
        text-align: center;
    }

    .dropdown a {
        padding: 0.5rem 1rem;
        text-decoration: none;
        color: black;
    }

    .dropdown a:hover {
        background-color: #e6e2e2;
        color: white;
    }

    .arrow-down {
        margin-left: 0.3rem;
    }
</style>

<header>
    <div class="nav-container">
        <a href="/" class="nav-link"><i class="fas fa-home"></i>Inicio</a>
        
        <!-- APIs dropdown -->
        <div use:clickOutside on:outclick={closeDropdowns} class="nav-link" on:click|stopPropagation={toggleAPIsDropdown}>
            <i class="fas fa-microchip"></i>APIs <i class="fas fa-caret-down arrow-down"></i>
            {#if showAPIsDropdown}
                <div class="dropdown">
                    <a href="/api/v1/university-demands">university-demands</a>
                    <a href="/api/v1/students_satisfaction">students_satisfaction</a>
                    <a href="/api/v1/university-academic-performance">university-academic-performance</a>
                </div>
            {/if}
        </div>

        <!-- GitHub dropdown -->
        <div use:clickOutside on:outclick={closeDropdowns} class="nav-link" on:click|stopPropagation={toggleGithubDropdown}>
            <i class="fab fa-github"></i>GitHub <i class="fas fa-caret-down arrow-down"></i>
            {#if showGithubDropdown}
                <div class="dropdown">
                    <a href="https://github.com/Javiigp">Javier Guerrero</a>
                    <a href="https://github.com/alegp2003">Alejandro Gaona</a>
                    <a href="https://github.com/aguzajr">Pablo Aguza</a>
                </div>
            {/if}
        </div>

        <!-- Frontends dropdown -->
        <div use:clickOutside on:outclick={closeDropdowns} class="nav-link" on:click|stopPropagation={toggleFrontendsDropdown}>
            <i class="fas fa-window-maximize"></i>Frontends <i class="fas fa-caret-down arrow-down"></i>
            {#if showFrontendsDropdown}
                <div class="dropdown">
                    <a href="/university-demands">University Demands</a>
                    <a href="/frontends/vue">students_satisfaction</a>
                    <a href="/frontends/svelte">university-academic-performance</a>
                </div>
            {/if}
        </div>

        
        <!-- Documentaciones dropdown -->
        <div use:clickOutside on:outclick={closeDropdowns} class="nav-link" on:click|stopPropagation={toggleDocumentationDropdown}>
            <i class="fas fa-file-alt"></i>Documentaciones <i class="fas fa-caret-down arrow-down"></i>
            {#if showDocumentationDropdown}
                <div class="dropdown">
                    <a href="https://sos2425-17.onrender.com/api/v1/university-demands/docs">University Demands</a>
                    <a href="http://sos2425-17.onrender.com/api/v1/students_satisfaction/docs">students_satisfaction</a>
                    <a href="http://sos2425-17.onrender.com/api/v1/university-academic-performance/docs">university-academic-performance</a>
                </div>
            {/if}
        </div>
        
    </div>
</header>
