<svelte:head>
	<title>SOS2425-17</title>
</svelte:head>

<script>
    // Datos de los miembros
    const miembros = [
        {
            nombre: 'Pablo Aguza Barragán',
            frontend: '',
            api: 'https://sos2425-17.onrender.com/api/v1/university-academic-performance/docs',
            postman: 'https://documenter.getpostman.com/view/43694449/2sB2cUBica',
            recurso: 'university-academic-performance',
            github: 'https://github.com/Aguzajr'
        },
        {
            nombre: 'Javier Guerrero Pérez',
            frontend: '',
            api: 'https://sos2425-17.onrender.com/api/v1/university-demands/docs',
            postman: 'https://documenter.getpostman.com/view/42357894/2sB2cUAN1D',
            recurso: 'university-demands',
            github: ''
        },
        {
            nombre: 'Alejandro Gaona Penco',
            frontend: '',
            api: 'https://sos2425-17.onrender.com/api/v1/students-satisfaction/docs',
            postman: 'https://documenter.getpostman.com/view/42373237/2sB2cUBicY',
            recurso: 'students-satisfaction',
            github: ''
        }
    ];

    const githubComun = 'https://github.com/gti-sos/sos2425-17';
</script>

<style>
    h1 {
        text-align: center;
        color: #333;
    }
    .section {
        margin-bottom: 30px;
    }
    .section h2 {
        color: #4CAF50;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    ul li {
        margin: 10px 0;
    }
    a {
        color: #4CAF50;
        text-decoration: none;
    }
</style>

<main>
    <h1>Enlaces y Documentación del Proyecto</h1>

    <div class="section">
        <h2>📱 Enlaces a los Front-End desarrollados por cada miembro del grupo</h2>
        <ul>
            {#each miembros as miembro}
                <li><strong>{miembro.nombre}:</strong>
                    {#if miembro.frontend}
                        <a href={miembro.frontend} target="_blank">{miembro.frontend}</a>
                    {:else}
                        <em>No disponible</em>
                    {/if}
                </li>
            {/each}
        </ul>
    </div>

    <div class="section">
        <h2>🌐 Enlaces a las URL base de las APIs desarrolladas</h2>
        <ul>
            {#each miembros as miembro}
                <li><strong>{miembro.nombre} API:</strong>
                    <a href={miembro.api} target="_blank">{miembro.api}</a>
                </li>
            {/each}
        </ul>
    </div>

    <div class="section">
        <h2>📄 Enlaces a la documentación de Postman de las APIs</h2>
        <ul>
            {#each miembros as miembro}
                <li><strong>{miembro.nombre} Docs:</strong>
                    <a href={miembro.postman} target="_blank">{miembro.postman}</a>
                </li>
            {/each}
        </ul>
    </div>

    <div class="section">
        <h2>🗃️ Repositorio del equipo en GitHub</h2>
        <ul>
            <li><a href={githubComun} target="_blank">{githubComun}</a></li>
        </ul>
    </div>

</main>