<svelte:head>
	<title>Students Satisfaction</title>
</svelte:head>

<script>
    import {dev} from '$app/environment';
    let DEVEL_HOST = "http://localhost:16078";
    let Api = "/api/v2/students_satisfaction";
    if (dev){
        Api = DEVEL_HOST + Api;
    }

    import {onMount} from "svelte";
    import {Button,Table } from '@sveltestrap/sveltestrap';
    

    let satisfactionData = [];
    let result = "";
    let resultStatus = "";
    let newCarrera="";
    let newCiudad="";
    let newSatisfaccion_total="";
    let newSat_estudiantes="";
    let newSatisfaccion_pdi="";

    let showFilterForm = false; // Para mostrar/ocultar el formulario
    let showCreateForm = false;
    let showUpdateForm = false;
    let successMessage = "";
    let errorMessage = "";

    // Campos del filtro (diferente de los de creación)
    let filterCarrera = "";
    let filterCiudad = "";
    let filterSatisfaccion_total = "";
    let filterSat_estudiantes = "";
    let filterSatisfaccion_pdi = "";

    let fromSat="";
    let toSat="";
    

    async function getStudentsSatisfaction() {
        //Para que siempre que llamemos a la funcion esos campos esten vacios
        resultStatus = result = "";
        //Esta funcion lo que hace es que recorre la api con un get y mete los datos en res
        //Se hace await por el async 
        
        try{

            const res  = await fetch(Api,{method: "GET"});
            //Para manda el resultado res en json y lo mete en data
            const data = await res.json();
            result = JSON.stringify(data,null,2);
            satisfactionData = data;
            console.log(`Response received:${(JSON.stringify(satisfactionData,null,2))}`);
        } catch(error){
            console.log(`Error : Get from ${Api} : ${(error)}`)
        }
    }
         //Cada vez que cargue la pagina llama a get contact
    onMount(async () => {
        //Cuando se carga la pagina se llama a la funcion getContacts
        await getStudentsSatisfaction();
    });

    function getLoadInitialData() {
        fetch(`${DEVEL_HOST}/api/v2/students_satisfaction/loadInitialData`)
        .then(response => {
            if (response.status === 201) {
                console.log("Datos iniciales insertados correctamente");
                getStudentsSatisfaction(); // <-- Esto recarga la tabla
                successMessage = "¡Datos iniciales insertados correctamente!";

                // Oculta el mensaje después de unos segundos
                setTimeout(() => {
                    successMessage = "";
                }, 3000);
            } else if (response.status === 409) {
                console.log("La base de datos ya tiene datos. Elimínalos primero.");
                errorMessage = "¡La base de datos ya tiene datos! . Elimínalos primero.";
                // Oculta el mensaje después de unos segundos
                setTimeout(() => {
                    errorMessage = "";
                }, 3000);
                
            } 
            
            else {
                console.log("Error al insertar los datos");
                errorMessage = "Error al insertar los datos";
                // Oculta el mensaje después de unos segundos
                setTimeout(() => {
                    errorMessage = "";
                }, 3000);
                
            }
        })
        .catch(error => {
            console.error("Error:", error);
            errorMessage = "Error al cargar los datos iniciales";
                // Oculta el mensaje después de unos segundos
                setTimeout(() => {
                    errorMessage = "";
                }, 3000);
        });
}
//http://localhost:16078/api/v2/students_satisfaction?from=3&to=5
async function getSatisfactionEspecifico(params = {}) {
    resultStatus = result = "";
    try {
        const queryString = new URLSearchParams(params).toString();
        const url = `${Api}?${queryString}`;
        
        console.log("URL with parameters:", url); // Agrega esto para ver la URL generada

        const res = await fetch(url, { method: "GET" });
        const status = res.status;
        resultStatus = status.toString();

        const data = await res.json();
        result = JSON.stringify(data, null, 2);
        satisfactionData = data;
        console.log(`Response received:\n${result}`);
    } catch (error) {
        console.log(`Error: GET from ${Api} - ${error}`);
        errorMessage = "Error al obtener los datos.";
        setTimeout(() => {
            errorMessage = "";
        }, 3000);
    }
}


function applyFilters() {
    const params = {};

    if (filterCarrera) params.carrera = filterCarrera;
    if (filterCiudad) params.ciudad = filterCiudad;
    if (filterSatisfaccion_total) params.satisfaccion_total = filterSatisfaccion_total;
    if (filterSat_estudiantes) params.sat_estudiantes = filterSat_estudiantes;
    if (filterSatisfaccion_pdi) params.satisfaccion_pdi = filterSatisfaccion_pdi;
    if (fromSat) params.from = fromSat;
    if (toSat) params.to = toSat;

    getSatisfactionEspecifico(params);
    showFilterForm = false; // Oculta el formulario tras aplicar
}


//Con esto vacio los campos de crear y actualizar 
function clearFilters() {
    newCarrera = "";
    newCiudad = "";
    newSatisfaccion_total = "";
    newSat_estudiantes = "";
    newSatisfaccion_pdi = "";
    resultStatus = "";
}

//Con esto lo que hago esque vacio los campos del formulario de filtro
function clearFilterFields() {
    filterCarrera = "";
    filterCiudad = "";
    filterSatisfaccion_total = "";
    filterSat_estudiantes = "";
    filterSatisfaccion_pdi = "";
    fromSat="";
    toSat="";
    
}

//Con esto lo que hago es que dejo todos los campos de ambos formularios vacios y hago un get para que se actualize la tabla
//con los campos vacios
function resetFilters() {
    clearFilters();
    clearFilterFields();
    getStudentsSatisfaction(); // <- Vuelve a cargar todo sin filtros
}


    async function createStudentsSatisfaction() {
        //Para que siempre que llamemos a la funcion esos campos esten vacios
        resultStatus = result = "";
        //Esta funcion lo que hace es que recorre la api con un get y mete los datos en res
        //Se hace await por el async 
        
        try{

            const res  = await fetch(Api,{
                method: "POST", 
                headers:{
                    "Content-type": "application/json"
                },
                body:JSON.stringify({
                    carrera: newCarrera,
                    ciudad: newCiudad, 
                    satisfaccion_total: newSatisfaccion_total, 
                    sat_estudiantes: newSat_estudiantes, 
                    satisfaccion_pdi: newSatisfaccion_pdi 
                })
            });
            //Para manda el resultado res en json y lo mete en data
            const status = res.status;
            resultStatus=status.toString();
            if(status==201){
                console.log(`Satisfaction created:`);
                getStudentsSatisfaction();
                showCreateForm = false;
                successMessage = "¡Demanda creada con éxito!";
                setTimeout(() => {
                    successMessage = "";
                }, 3000);
            }
            else if(status == 409){
                console.log(`ERROR creating demand: status received\n${status}`);
                errorMessage = "¡Esta demanda ya existe!";
                // Oculta el mensaje después de unos segundos
                setTimeout(() => {
                    errorMessage = "";
                }, 3000);
            }
            else if(status == 400){
                console.log(`ERROR creating demand: status received\n${status}`);
                errorMessage = "¡Tienes que rellenar todos los campos!";

                // Oculta el mensaje después de unos segundos
                setTimeout(() => {
                    errorMessage = "";
                }, 3000);
            }
            else {
                console.log(`ERROR creating demand: status received\n${status}`);
                errorMessage = "¡Error al crear la demanda!";

                // Oculta el mensaje después de unos segundos
                setTimeout(() => {
                    errorMessage = "";
                }, 3000);
            }
            

        } catch (error){
            console.log(`ERROR:  GET from ${Api}: ${error}`);
        }


    }//Put en el front
    async function updateUniversityDemand() {
    resultStatus = result = "";
    try {
        const url = `${Api}/${encodeURIComponent(newCarrera)}/${encodeURIComponent(newCiudad)}`;

        const updatedData = {
            carrera: newCarrera,
            ciudad: newCiudad, 
            satisfaccion_total: newSatisfaccion_total, 
            sat_estudiantes: newSat_estudiantes, 
            satisfaccion_pdi: newSatisfaccion_pdi 
        };

        const res = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedData)
        });

        const status = res.status;
        resultStatus = status.toString();

        if (status === 200) {
            console.log("Demanda actualizada correctamente.");
            getStudentsSatisfaction();
            successMessage = "¡Demanda actualizada con éxito!";
            showUpdateForm = false;

            setTimeout(() => {
                successMessage = "";
            }, 3000);
        } else if (status === 404) {
            errorMessage = "No se encontró la demanda a actualizar.";
        } else if (status === 400) {
            errorMessage = "Datos incompletos o no coinciden con los parámetros de la URL.";
        } else {
            errorMessage = "Error al actualizar la demanda.";
        }

        setTimeout(() => {
            errorMessage = "";
        }, 3000);

    } catch (error) {
        console.log("Error en PUT:", error);
        errorMessage = "Error de red al actualizar.";
    }
}

function openEditForm(sat) {
        newCarrera = sat.carrera;
        newCiudad = sat.ciudad;
        newSatisfaccion_total = sat.satisfaccion_total;
        newSat_estudiantes = sat.sat_estudiantes;
        newSatisfaccion_pdi = sat.satisfaccion_pdi;
    showUpdateForm = true;
}

async function deleteStudentsSatisfaction(carrera, ciudad) {
    resultStatus = result = "";
    try {
        console.log("Intentando borrar URL:", `${Api}/${encodeURIComponent(carrera)}/${encodeURIComponent(ciudad)}`);
        
        const res = await fetch(`${Api}/${encodeURIComponent(carrera)}/${encodeURIComponent(ciudad)}`, {
            method: "DELETE"
        });

        const status = res.status;
        resultStatus = status.toString();

        if (status === 200 || status === 204) {  // Verifica tanto 200 como 204
            console.log(`Demand ${carrera} in ${ciudad} deleted`);
            getStudentsSatisfaction(); // Recarga los datos
            successMessage = "¡Demanda borrada con éxito!";

            setTimeout(() => {
                successMessage = "";
            }, 3000);
        } else {
            console.error(`ERROR deleting demand: status ${status} - response: ${res.statusText}`);
            errorMessage = "Error al eliminar los datos";
            setTimeout(() => {
                errorMessage = "";
            }, 3000);
        }

    } catch (error) {
        console.log(`ERROR: DELETE from ${Api}: ${error}`);
        errorMessage = "Error de red al eliminar.";
        setTimeout(() => {
            errorMessage = "";
        }, 3000);
    }
}

    async function deleteAllDemands(){
        resultStatus = result = "";
        try {
            
            //Hago un delete en api/avi/univertity-demands
            const res = await fetch(Api, {method: "DELETE"});
            
            const status = res.status;
            resultStatus = status;

            if (status === 200) {
                console.log(`All demands deleted`);
                getStudentsSatisfaction(); // más lógico que recargar los datos con loadInitialData
                successMessage = "¡Demandas borradas con éxito!";

                // Oculta el mensaje después de unos segundos
                setTimeout(() => {
                    successMessage = "";
                }, 3000);
            } else {
                console.error(`ERROR deleting demands`);
                errorMessage = "Error al borrar todos los datos";
                // Oculta el mensaje después de unos segundos
                setTimeout(() => {
                    errorMessage = "";
                }, 3000);
            }

        } catch (error){
            console.log(`ERROR:  GET from ${Api}: ${error}`);
        }

    }

</script>

<!-- Mensajes de éxito o error -->
{#if successMessage}
    <div class="success-message">{successMessage}</div>
{/if}

{#if errorMessage}
    <div class="error-message">{errorMessage}</div>
{/if}

<div class="button-group">
    <Button color="primary" on:click={getLoadInitialData}>Cargar Datos</Button>
    <Button color="success" on:click={() => showCreateForm = !showCreateForm}>
        {showCreateForm ? "Cerrar" : "Crear"}
    </Button>
    <Button color="info" on:click={() => showFilterForm = !showFilterForm}>
        {showFilterForm ? "Cerrar Filtros" : "Filtrar"}
    </Button>
    <Button color="secondary" on:click={resetFilters}>Limpiar Filtros</Button>
    <Button color="danger" on:click={deleteAllDemands}>Eliminar Datos</Button>
</div>

<Table>
    <tbody>
        <tr>
            <th>Carrera</th>
            <th>Ciudad</th>
            <th>Satisfacción Total</th>
            <th>Satisfacción Estudiantes</th>
            <th>Satisfacción PDI</th>
        </tr>
        
        <!-- Esto ejecuta tantos tr como students_satisfaction haya -->
        {#each satisfactionData as universityD}
        <tr>
            <td>{universityD.carrera}</td>
            <td>{universityD.ciudad}</td>
            <td>{universityD.satisfaccion_total}</td>
            <td>{universityD.sat_estudiantes}</td>
            <td>{universityD.satisfaccion_pdi}</td>
            <td>
                <Button color="danger" on:click={() => {deleteStudentsSatisfaction(universityD.carrera, universityD.ciudad)}}>Borrar</Button>
                <Button color="warning" on:click={() => openEditForm(universityD)}>Editar</Button>
            </td>
        </tr>
        {/each}
    </tbody>
</Table>

<!-- Si pulso el boton que llama a showFilterForm -->
{#if showFilterForm}
    <div class="filter-overlay" on:click={() => showFilterForm = false}>
        <div class="filter-form" on:click|stopPropagation>
            <h5>Filtrar Satisfacción Estudiantil</h5>

            <div class="form-group">
                <label for="carrera">Carrera</label>
                <input id="carrera" required type="text" placeholder="Ej: Medicina" bind:value={filterCarrera} />
            </div>

            <div class="form-group">
                <label for="ciudad">Ciudad</label>
                <input id="ciudad" required type="text" placeholder="Ej: Madrid" bind:value={filterCiudad} />
            </div>

            <div class="form-group">
                <label for="satisfaccion_total">Satisfacción Total</label>
                <input id="satisfaccion_total" required type="text" placeholder="Ej: 4" bind:value={filterSatisfaccion_total} />
            </div>

            <div class="form-group">
                <label for="sat_estudiantes">Satisfacción Estudiantes</label>
                <input id="sat_estudiantes" required type="text" placeholder="Ej: 3" bind:value={filterSat_estudiantes} />
            </div>

            <div class="form-group">
                <label for="satisfaccion_pdi">Satisfacción PDI</label>
                <input id="satisfaccion_pdi" required type="text" placeholder="Ej: 5" bind:value={filterSatisfaccion_pdi} />
            </div>

            <div class="form-group">
                <label>Desde: <input bind:value={fromSat} type="text" placeholder="Ej: 3" /></label>
                <label>Hasta: <input bind:value={toSat} type="text" placeholder="Ej: 5" /></label>
            </div>

            <div class="filter-buttons">
                <Button color="success" on:click={applyFilters}>Aplicar</Button>
                <Button color="danger" on:click={clearFilterFields}>Borrar Campos</Button>
                <Button on:click={() => showFilterForm = false}>Cerrar</Button>
            </div>
        </div>
    </div>
{/if}

{#if showCreateForm}
    <div class="filter-overlay" on:click={() => showCreateForm = false}>
        <div class="filter-form" on:click|stopPropagation>
            <h5>Crear Demanda de Satisfacción Estudiantil</h5>

            <div class="form-group">
                <label for="carrera">Carrera</label>
                <input id="carrera" required type="text" placeholder="Ej: Medicina" bind:value={newCarrera} />
            </div>

            <div class="form-group">
                <label for="ciudad">Ciudad</label>
                <input id="ciudad" required type="text" placeholder="Ej: Madrid" bind:value={newCiudad} />
            </div>

            <div class="form-group">
                <label for="satisfaccion_total">Satisfacción Total</label>
                <input id="satisfaccion_total" required type="text" placeholder="Ej: 4" bind:value={newSatisfaccion_total} />
            </div>

            <div class="form-group">
                <label for="sat_estudiantes">Satisfacción Estudiantes</label>
                <input id="sat_estudiantes" required type="text" placeholder="Ej: 3" bind:value={newSat_estudiantes} />
            </div>

            <div class="form-group">
                <label for="satisfaccion_pdi">Satisfacción PDI</label>
                <input id="satisfaccion_pdi" required type="text" placeholder="Ej: 5" bind:value={newSatisfaccion_pdi} />
            </div>

            <div class="filter-buttons">
                <Button color="primary" on:click={createStudentsSatisfaction}>Crear</Button>
                <Button color="danger" on:click={clearFilters}>Borrar Campos</Button>
                <Button on:click={() => showCreateForm = false}>Cerrar</Button>
            </div>
        </div>
    </div>
{/if}

{#if showUpdateForm}
    <div class="filter-overlay" on:click={() => showUpdateForm = false}>
        <div class="filter-form" on:click|stopPropagation>
            <h5>Editar Demanda de Satisfacción Estudiantil</h5>

            <div class="form-group">
                <label for="carrera">Carrera</label>
                <input id="carrera" required type="text" placeholder="Ej: Medicina" bind:value={newCarrera} />
            </div>

            <div class="form-group">
                <label for="ciudad">Ciudad</label>
                <input id="ciudad" required type="text" placeholder="Ej: Madrid" bind:value={newCiudad} />
            </div>

            <div class="form-group">
                <label for="satisfaccion_total">Satisfacción Total</label>
                <input id="satisfaccion_total" required type="text" placeholder="Ej: 4" bind:value={newSatisfaccion_total} />
            </div>

            <div class="form-group">
                <label for="sat_estudiantes">Satisfacción Estudiantes</label>
                <input id="sat_estudiantes" required type="text" placeholder="Ej: 3" bind:value={newSat_estudiantes} />
            </div>

            <div class="form-group">
                <label for="satisfaccion_pdi">Satisfacción PDI</label>
                <input id="satisfaccion_pdi" required type="text" placeholder="Ej: 5" bind:value={newSatisfaccion_pdi} />
            </div>

            <div class="filter-buttons">
                <Button color="primary" on:click={updateUniversityDemand}>Actualizar</Button>
                <Button color="danger" on:click={clearFilters}>Borrar Campos</Button>
                <Button on:click={() => showUpdateForm = false}>Cerrar</Button>
            </div>
        </div>
    </div>
{/if}

<style>
    .filter-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4); /* Fondo semitransparente */
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .filter-form {
        background-color: #fff;
        padding: 0.4rem 0.8rem;         /* Menos espacio dentro del cuadro */
        border-radius: 10px;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
        display: flex;
        flex-direction: column;
        gap: 0.2rem;                   /* Menos espacio entre elementos */
        width: 85%;
        max-width: 400px;              /* Más estrecho */
        font-size: 0.85rem;            /* Tamaño de texto más pequeño */
    }

    .filter-form input {
        padding: 0.2rem 0.4rem;        /* Inputs más bajos y angostos */
        font-size: 0.85rem;
        border-radius: 4px;
        border: 1px solid #ccc;
    }

    .filter-form h5 {
        font-size: 1rem;               /* Título más pequeño */
        margin-bottom: 0.5rem;
        text-align: center;
    }

    .form-group {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0.3rem;
        width: 100%;
    }

    .form-group label {
        font-weight: bold;       /* Hace el texto más fuerte */
        margin-right: 0.5rem;    /* Espacio entre el label y el input */
        width: 45%;              /* Ancho fijo del label */
    }

    .form-group input {
        flex: 1;
        padding: 0.3rem;
        font-size: 0.85rem;
        border-radius: 4px;
        border: 1px solid #ccc;
    }

    .filter-buttons {
        display: flex;
        justify-content: space-between;
        gap: 0.3rem;
        margin-top: 0.5rem;
    }

    .filter-buttons button {
        font-size: 0.8rem;             /* Botones más pequeños */
        padding: 0.3rem 0.6rem;
    }

    .success-message {
        background-color: #d4edda;
        color: #155724;
        padding: 1rem;
        border: 1px solid #c3e6cb;
        border-radius: 5px;
        margin: 1rem 0;
        text-align: center;    
    }

    .error-message {
        background-color: #f8d7da;
        color: #721c24;
        padding: 1rem;
        border: 1px solid #f5c6cb;
        border-radius: 5px;
        margin: 1rem 0;
        text-align: center;
    }

    .button-group {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 1.5rem;
    }

    .button-group button {
        min-width: 140px;
    }
</style>
