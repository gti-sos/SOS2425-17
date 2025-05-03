<script>
    let showSubmenu = {
        'university-demands': false,
        'students_satisfaction': false,
        'university-academic-performance': false,
    };
    
    let showGithubDropdown = false;
    let showFrontendsDropdown = false;
    let showAPIsDropdown = false;
    let showDocumentationDropdown = false;
    let showViewsDropdown = false;

    


    function toggleViewsDropdown() {
    showViewsDropdown = !showViewsDropdown;
    showGithubDropdown = false;
    showFrontendsDropdown = false;
    showAPIsDropdown = false;
    showDocumentationDropdown = false;
}

    function toggleGithubDropdown() {
    showGithubDropdown = !showGithubDropdown; // si estaba abierto, lo cierra. Si estaba cerrado, lo abre.
    showFrontendsDropdown = false;            // cierra los otros
    showAPIsDropdown = false;
    showDocumentationDropdown = false;
    showViewsDropdown=false;
}


    function toggleFrontendsDropdown() {
    //Eso lo haces para que solo un dropdown este activo , dices que los otros sean false y que el dropdown de frontend
    //sea el contrario es decir true , ya por defecto es false 
    showFrontendsDropdown = !showFrontendsDropdown;
    showGithubDropdown = false;
    showAPIsDropdown = false;
    showDocumentationDropdown = false;
    showViewsDropdown=false;
}

    function toggleDocumentationDropdown() {
    //Eso lo haces para que solo un dropdown este activo , dices que los otros sean false y que el dropdown de frontend
    //sea el contrario es decir true , ya por defecto es false 
    showFrontendsDropdown = false;
    showGithubDropdown = false;
    showAPIsDropdown = false;
    showViewsDropdown=false;
    showDocumentationDropdown = !showDocumentationDropdown;
}


    function toggleAPIsDropdown() {
        console.log("antes",showAPIsDropdown)
    showAPIsDropdown = !showAPIsDropdown;
    console.log("antsdsdad",showAPIsDropdown)
    showGithubDropdown = false;
    showFrontendsDropdown = false;
    showDocumentationDropdown = false;
    showViewsDropdown=false;
}
        function toggleSubmenu(api) {
        // Toggle the selected submenu and close others
        for (const key in showSubmenu) { 
            if (key === api) {
                showSubmenu[key] = !showSubmenu[key];
            } else {
                showSubmenu[key] = false;
            }
        }
    }

    function closeDropdowns() {
        showGithubDropdown = false;
        showFrontendsDropdown = false;
        showAPIsDropdown = false;
        showDocumentationDropdown = false;
        showViewsDropdown=false;
        
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
        cursor: pointer;
        position: relative;
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

    .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    z-index: 1001;
    display: flex;
    flex-direction: column;
    width: 200px;
    text-align: center;
  }

  .dropdown-item {
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-weight: bold;
  }

  .submenu {
    position: relative;
    margin-top: 0.25rem;
    margin-left: 1rem;
    display: flex;
    flex-direction: column;
  }
  .submenu a {
    padding: 0.25rem 0;
    text-decoration: none;
    font-weight: normal;
    color: black;
  }
  .submenu a:hover {
    text-decoration: underline;
  }

    .arrow-down {
        margin-left: 0.3rem;
    }
</style>

<header>
    <div class="nav-container">
        <!-- Inicio -->
        <a href="/" class="nav-link">
            <i class="fas fa-home"></i> Inicio
        </a>

        <!-- APIs Dropdown -->
        <div use:clickOutside on:outclick={closeDropdowns} class="nav-link" on:click|stopPropagation={toggleAPIsDropdown}>
            <i class="fas fa-microchip"></i> APIs <i class="fas fa-caret-down arrow-down"></i>
            {#if showAPIsDropdown}
                <div class="dropdown-menu">

                    <!-- university-demands -->
                    <div class="dropdown-item" on:click={() => toggleSubmenu('university-demands')}>
                        <a href="#" on:click|preventDefault>university-demands</a>                    
                        {#if showSubmenu['university-demands']}
                            <div class="submenu">
                                <a href="/api/v1/university-demands">/V1</a>
                                <a href="/api/v2/university-demands">/V2</a>
                            </div>
                        {/if}
                    </div>

                    <!-- students_satisfaction -->
                    <div class="dropdown-item" on:click={() => toggleSubmenu('students_satisfaction')}>
                        <a href="#">students_satisfaction</a>
                        {#if showSubmenu['students_satisfaction']}
                            <div class="submenu">
                                <a href="/api/v1/students_satisfaction">/V1</a>
                                <a href="/api/v2/students_satisfaction">/V2</a>
                            </div>
                        {/if}
                    </div>

                    <!-- university-academic-performance -->
                    <div class="dropdown-item" on:click={() => toggleSubmenu('university-academic-performance')}>
                        <a href="#">university-academic-performance</a>
                        {#if showSubmenu['university-academic-performance']}
                            <div class="submenu">
                                <a href="/api/v1/university-academic-performance">/V1</a>
                                <a href="/api/v2/university-academic-performance">/V2</a>
                            </div>
                        {/if}
                    </div>

                </div>
            {/if}
        </div>

        <!-- GitHub Dropdown -->
        <div use:clickOutside on:outclick={closeDropdowns} class="nav-link" on:click|stopPropagation={toggleGithubDropdown}>
            <i class="fab fa-github"></i> GitHub <i class="fas fa-caret-down arrow-down"></i>
            {#if showGithubDropdown}
                <div class="dropdown">
                    <a href="https://github.com/Javiigp">Javier Guerrero</a>
                    <a href="https://github.com/alegp2003">Alejandro Gaona</a>
                    <a href="https://github.com/aguzajr">Pablo Aguza</a>
                </div>
            {/if}
        </div>

        <!-- Frontends Dropdown -->
        <div use:clickOutside on:outclick={closeDropdowns} class="nav-link" on:click|stopPropagation={toggleFrontendsDropdown}>
            <i class="fas fa-window-maximize"></i> Frontends <i class="fas fa-caret-down arrow-down"></i>
            {#if showFrontendsDropdown}
                <div class="dropdown">
                    <a href="/university-demands">University Demands</a>
                    <a href="/students_satisfaction">students_satisfaction</a>
                    <a href="/university-academic-performance">university-academic-performance</a>
                </div>
            {/if}
        </div>

        <!-- Vistas Dropdown -->
        <div use:clickOutside on:outclick={closeDropdowns} class="nav-link" on:click|stopPropagation={toggleViewsDropdown}>
            <i class="fas fa-eye"></i> Vistas <i class="fas fa-caret-down arrow-down"></i>
            {#if showViewsDropdown}
                <div class="dropdown">
                    <a href="/university-demands/vistas">Vista university-demands</a>
                    <a href="/students_satisfaction/vistas">Vista students-satisfaction</a>
                    <a href="/university-academic-performance/vistas">Vista university-academic-performance</a>
                    <a href="/analytics">Grafica común</a>
                </div>
            {/if}
        </div>
    </div>
</header>

