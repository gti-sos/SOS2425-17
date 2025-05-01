<svelte:head>
	<title>SOS2425-17</title>
</svelte:head>

<script>
    // Datos de los miembros
    const miembros = [
        {
            nombre: 'Pablo Aguza Barragán',
            frontend: '/university-academic-performance',
            api_v1: "/api/v1/university-academic-performance",
            api_v2: "/api/v2/university-academic-performance",
            postman_v1: '/api/v1/university-academic-performance/docs',
            postman_v2: '/api/v2/university-academic-performance/docs',
            recurso: 'university-academic-performance',
            github: 'https://github.com/Aguzajr',
            vistas:"/university-academic-performance/vistas"
        },
        {
            nombre: 'Javier Guerrero Pérez',
            //API Javier Guerrero Pérez
            frontend: '/university-demands',
            api_v1: '/api/v1/university-demands',
            api_v2: '/api/v2/university-demands',
            postman_v1: '/api/v1/university-demands/docs',
            postman_v2: '/api/v2/university-demands/docs',
            recurso: 'university-demands',
            github: 'https://github.com/Javiigp',
            vistas: '/university-demands/vistas'
        },
        {
            nombre: 'Alejandro Gaona Penco',
            frontend: '/students_satisfaction',
            api: 'https://sos2425-17.onrender.com/api/v1/students-satisfaction/docs',
            postman: 'https://documenter.getpostman.com/view/42373237/2sB2cUBicY',
            recurso: 'students-satisfaction',
            github: 'https://github.com/alegp2003',
            vistas:'/students_satisfaction/vistas'
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
                    {#if miembro.nombre === 'Javier Guerrero Pérez'}
                        <a href="/university-demands">Front university-demands</a>
                    {:else if miembro.nombre === 'Pablo Aguza Barragán'}
                        <a href="/university-academic-performance">Front-end university-academic-performance</a>                    
                    {:else if miembro.frontend}
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
                    {#if miembro.api_v1 && miembro.api_v2}
                        <a href={miembro.api_v1} target="_blank">API v1</a> | 
                        <a href={miembro.api_v2} target="_blank">API v2</a>
                    {:else if miembro.api}
                        <a href={miembro.api} target="_blank">{miembro.api}</a>
                    {:else}
                        <em>No disponible</em>
                    {/if}
                </li>
            {/each}
        </ul>
    </div>
    

    <div class="section">
        <h2>📄 Enlaces a la documentación de Postman de las APIs</h2>
        <ul>
            {#each miembros as miembro}
                <li><strong>{miembro.nombre} API:</strong>
                    {#if miembro.postman_v1 && miembro.postman_v2}
                        <a href={miembro.postman_v1} target="_blank">API v1</a> | 
                        <a href={miembro.postman_v2} target="_blank">API v2</a>
                    {:else if miembro.api}
                        <a href={miembro.api} target="_blank">{miembro.api}</a>
                    {:else}
                        <em>No disponible</em>
                    {/if}
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


    <div class="section">
        <h2>📊 Enlaces a las vistas desarrolladas por cada miembro</h2>
        <ul>
            {#each miembros as miembro}
                <li><strong>{miembro.nombre}:</strong>
                    {#if miembro.nombre === 'Javier Guerrero Pérez'}
                        <a href="/university-demands/vistas">Vistas university-demands</a>
                    {:else if miembro.nombre === 'Pablo Aguza Barragán'}
                        <a href="/university-academic-performance/vistas">Vistas university-academic-performance</a> 
                    {:else if miembro.vistas}
                        <a href={miembro.vistas} target="_blank">{miembro.vistas}</a>
                    {:else}
                        <em>No disponible</em>
                    {/if}
                </li>
            {/each}
        </ul>
    </div>

</main>