<svelte:head>
    <title>Students Satisfaction</title>
</svelte:head>


<script>
   import { dev } from '$app/environment';

let DEVEL_HOST = "http://localhost:16078";
let PROD_HOST = "https://sos2425-17.onrender.com";

let Api = "/api/v2/students_satisfaction";

if (dev) {
    Api = DEVEL_HOST + Api;
} else {
    Api = PROD_HOST + Api;
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
    let newAñoAcademico = "";


    let showFilterForm = false; 
    let showCreateForm = false;
    let showUpdateForm = false;
    let successMessage = "";
    let errorMessage = "";


    let filterCarrera = "";
    let filterCiudad = "";
    let filterSatisfaccion_total = "";
    let filterSat_estudiantes = "";
    let filterSatisfaccion_pdi = "";
    let filterAñoAcademico = "";

    let fromSat="";
    let toSat="";
   


    async function getStudentsSatisfaction() {
        resultStatus = result = "";
       
        try{


            const res  = await fetch(Api,{method: "GET"});
            const data = await res.json();
            result = JSON.stringify(data,null,2);
            satisfactionData = data;
            console.log(`Response received:${(JSON.stringify(satisfactionData,null,2))}`);
        } catch(error){
            console.log(`Error : Get from ${Api} : ${(error)}`)
        }
    }
    onMount(async () => {
        await getStudentsSatisfaction();
    });


    function getLoadInitialData() {

        fetch(`${Api}/loadInitialData`)
        .then(response => {
            if (response.status === 201) {
                console.log("Datos iniciales insertados correctamente");
                getStudentsSatisfaction(); 
                successMessage = "¡Datos iniciales insertados correctamente!";


                setTimeout(() => {
                    successMessage = "";
                }, 3000);
            } else if (response.status === 409) {
                console.log("La base de datos ya tiene datos. Elimínalos primero.");
                errorMessage = "¡La base de datos ya tiene datos! . Elimínalos primero.";
                setTimeout(() => {
                    errorMessage = "";
                }, 3000);
               
            }
           
            else {
                console.log("Error al insertar los datos");
                errorMessage = "Error al insertar los datos";
                setTimeout(() => {
                    errorMessage = "";
                }, 3000);
               
            }
        })
        .catch(error => {
            console.error("Error:", error);
            errorMessage = "Error al cargar los datos iniciales";
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
       
        console.log("URL with parameters:", url); 


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
    showFilterForm = false; 
}





function clearFilters() {
    newCarrera = "";
    newCiudad = "";
    newSatisfaccion_total = "";
    newSat_estudiantes = "";
    newSatisfaccion_pdi = "";
    newAñoAcademico = ""; // Limpiar el nuevo campo
    resultStatus = "";
}



function clearFilterFields() {
    filterCarrera = "";
    filterCiudad = "";
    filterSatisfaccion_total = "";
    filterSat_estudiantes = "";
    filterSatisfaccion_pdi = "";
    filterAñoAcademico = ""; // Limpiar el nuevo campo
    fromSat = "";
    toSat = "";
}


function resetFilters() {
    clearFilters();
    clearFilterFields();
    getStudentsSatisfaction(); 
}




async function createStudentsSatisfaction() {
    resultStatus = result = "";
    try {
        const res = await fetch(Api, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                carrera: newCarrera,
                ciudad: newCiudad,
                satisfaccion_total: newSatisfaccion_total,
                sat_estudiantes: newSat_estudiantes,
                satisfaccion_pdi: newSatisfaccion_pdi,
                año_academico: newAñoAcademico // Nuevo campo
            })
        });
        const status = res.status;
        resultStatus = status.toString();
        if (status == 201) {
            console.log(`Satisfaction created:`);
            getStudentsSatisfaction();
            showCreateForm = false;
            successMessage = "Satisfaccion creada con éxito!";
            setTimeout(() => {
                successMessage = "";
            }, 3000);
        } else if (status == 409) {
            console.log(`ERROR creating satisfaction: status received\n${status}`);
            errorMessage = "¡Esta satisfaccion ya existe!";
            setTimeout(() => {
                errorMessage = "";
            }, 3000);
        } else if (status == 400) {
            console.log(`ERROR creating satisfaction: status received\n${status}`);
            errorMessage = "¡Tienes que rellenar todos los campos!";
            setTimeout(() => {
                errorMessage = "";
            }, 3000);
        } else {
            console.log(`ERROR creating satisfaction: status received\n${status}`);
            errorMessage = `¡Error al crear la satisfaccion! (Código: ${status})`;
            setTimeout(() => {
                errorMessage = "";
            }, 3000);
        }
    } catch (error) {
        console.log(`ERROR: POST to ${Api}: ${error}`);
        errorMessage = "Error de red al crear la satisfaccion.";
        setTimeout(() => {
            errorMessage = "";
        }, 3000);
    }
}
async function updateUniversityDemand() {
    resultStatus = result = "";
    try {
        const url = `${Api}/${encodeURIComponent(newCarrera)}/${encodeURIComponent(newCiudad)}`;

        const updatedData = {
            carrera: newCarrera,
            ciudad: newCiudad,
            satisfaccion_total: newSatisfaccion_total,
            sat_estudiantes: newSat_estudiantes,
            satisfaccion_pdi: newSatisfaccion_pdi,
            año_academico: newAñoAcademico // Nuevo campo
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
            console.log("Satisfacción actualizada correctamente.");
            getStudentsSatisfaction();
            successMessage = "¡Satisfacción actualizada con éxito!";
            showUpdateForm = false;

            setTimeout(() => {
                successMessage = "";
            }, 3000);
        } else if (status === 404) {
            errorMessage = "No se encontró la satisfacción a actualizar.";
        } else if (status === 400) {
            errorMessage = "Datos incompletos o no coinciden con los parámetros de la URL.";
        } else {
            errorMessage = `Error al actualizar la satisfacción (Código: ${status}).`;
        }

        setTimeout(() => {
            errorMessage = "";
        }, 3000);

    } catch (error) {
        console.log("Error en PUT:", error);
        errorMessage = "Error de red al actualizar.";
        setTimeout(() => {
            errorMessage = "";
        }, 3000);
    }
}


function openEditForm(sat) {
    newCarrera = sat.carrera;
    newCiudad = sat.ciudad;
    newSatisfaccion_total = sat.satisfaccion_total;
    newSat_estudiantes = sat.sat_estudiantes;
    newSatisfaccion_pdi = sat.satisfaccion_pdi;
    newAñoAcademico = sat.año_academico; // Nuevo campo
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


        if (status === 200 || status === 204) {  
            console.log(`Demand ${carrera} in ${ciudad} deleted`);
            getStudentsSatisfaction();
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
           
 
            const res = await fetch(Api, {method: "DELETE"});
           
            const status = res.status;
            resultStatus = status;


            if (status === 200) {
                console.log(`All demands deleted`);
                getStudentsSatisfaction(); 
                successMessage = "¡Demandas borradas con éxito!";


                setTimeout(() => {
                    successMessage = "";
                }, 3000);
            } else {
                console.error(`ERROR deleting demands`);
                errorMessage = "Error al borrar todos los datos";
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
            <th>Año Académico</th> <!-- Nueva columna -->
        </tr>
       
        <!-- Esto ejecuta tantos tr como students_satisfaction haya -->
        {#each satisfactionData as universityD}
        <tr>
            <td>{universityD.carrera}</td>
            <td>{universityD.ciudad}</td>
            <td>{universityD.satisfaccion_total}</td>
            <td>{universityD.sat_estudiantes}</td>
            <td>{universityD.satisfaccion_pdi}</td>
            <td>{universityD.año_academico}</td> <!-- Mostrar el nuevo campo -->
            <td>
                <Button color="danger" on:click={() => {deleteStudentsSatisfaction(universityD.carrera, universityD.ciudad)}}>Borrar</Button>
                <Button color="warning" on:click={() => openEditForm(universityD)}>Editar</Button>
            </td>
        </tr>
        {/each}
    </tbody>
</Table>


<!-- Si pulso el botón que llama a showFilterForm -->
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
                <label for="año_academico">Año Académico</label>
                <input id="año_academico" required type="text" placeholder="Ej: 2021-2022" bind:value={filterAñoAcademico} />
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

            <div class="form-group">
                <label for="año_academico">Año Académico</label>
                <input id="año_academico" required type="text" placeholder="Ej: 2021-2022" bind:value={newAñoAcademico} />
            </div>

            <div class="filter-buttons">
                <Button color="primary" on:click={createStudentsSatisfaction}>Crear</Button>
                <Button color="danger" on:click={clearFilters}>Borrar Campos</Button>
                <Button on:click={() => showCreateForm = false}>Cerrar</Button>
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

            <div class="form-group">
                <label for="año_academico">Año Académico</label>
                <input id="año_academico" required type="text" placeholder="Ej: 2021-2022" bind:value={newAñoAcademico} />
            </div>

            <div class="filter-buttons">
                <Button color="primary" on:click={createStudentsSatisfaction}>Crear</Button>
                <Button color="danger" on:click={clearFilters}>Borrar Campos</Button>
                <Button on:click={() => showCreateForm = false}>Cerrar</Button>
            </div>
        </div>
    </div>
{/if}


<style>
    :global(body) {
        font-family: 'Roboto', sans-serif;
        background-color: #121212; /* Fondo oscuro */
        margin: 0;
        padding: 0;
        color: #e0e0e0; /* Texto claro */
    }

    .success-message, .error-message {
        padding: 1rem;
        margin: 1rem auto;
        max-width: 600px;
        border-radius: 8px;
        text-align: center;
        font-weight: 600;
        font-size: 1rem;
    }

    .success-message {
        background-color: #1b5e20; /* Verde oscuro */
        color: #a5d6a7; /* Verde claro */
        border: 1px solid #388e3c;
    }

    .error-message {
        background-color: #b71c1c; /* Rojo oscuro */
        color: #ef9a9a; /* Rojo claro */
        border: 1px solid #d32f2f;
    }

    .button-group {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 2rem;
    }

    .button-group button {
        min-width: 160px;
        padding: 0.75rem 1.25rem;
        font-size: 1rem;
        border-radius: 8px;
        border: none;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        background-color: #1e88e5; /* Azul */
        color: white;
    }

    .button-group button:hover {
        background-color: #1565c0; /* Azul más oscuro */
    }

    .filter-overlay {
        position: fixed;
        top: 0; left: 0;
        width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.8); /* Fondo semitransparente oscuro */
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .filter-form {
        background: #1e1e1e; /* Fondo oscuro */
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
        width: 90%;
        max-width: 500px;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .filter-form h5 {
        font-size: 1.5rem;
        text-align: center;
        margin-bottom: 1rem;
        color: #e0e0e0; /* Texto claro */
    }

    .form-group {
        display: flex;
        flex-direction: column;
    }

    .form-group label {
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: #bdbdbd; /* Texto gris claro */
    }

    .form-group input {
        padding: 0.75rem;
        font-size: 1rem;
        border: 1px solid #424242; /* Borde gris oscuro */
        border-radius: 8px;
        background-color: #2c2c2c; /* Fondo del input */
        color: #e0e0e0; /* Texto claro */
        transition: border-color 0.2s ease;
    }

    .form-group input:focus {
        border-color: #1e88e5; /* Azul */
        outline: none;
    }

    .filter-buttons {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    .filter-buttons button {
        flex: 1;
        padding: 0.75rem 1rem;
        font-size: 1rem;
        border-radius: 8px;
        cursor: pointer;
        transition: background 0.2s ease;
        background-color: #1e88e5; /* Azul */
        color: white;
        border: none;
    }

    .filter-buttons button:hover {
        background-color: #1565c0; /* Azul más oscuro */
    }

    table {
        width: 95%;
        margin: auto;
        border-collapse: collapse;
        background: #1e1e1e; /* Fondo oscuro */
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
        overflow: hidden;
    }

    th, td {
        padding: 1rem;
        text-align: left;
        border-bottom: 1px solid #424242; /* Línea gris oscuro */
    }

    th {
        background-color: #2c2c2c; /* Fondo gris oscuro */
        font-weight: 700;
        color: #e0e0e0; /* Texto claro */
    }

    tr:last-child td {
        border-bottom: none;
    }

    tr:hover {
        background-color: #333333; /* Fondo más claro al pasar el cursor */
    }

    td button {
        margin-right: 0.5rem;
        padding: 0.5rem 1rem;
        font-size: 0.9rem;
        border-radius: 6px;
        border: none;
        cursor: pointer;
        transition: background 0.2s ease;
    }

    td button:first-child {
        background-color: #e53935; /* Rojo */
        color: white;
    }

    td button:first-child:hover {
        background-color: #b71c1c; /* Rojo más oscuro */
    }

    td button:last-child {
        background-color: #ffb300; /* Amarillo */
        color: white;
    }

    td button:last-child:hover {
        background-color: #ffa000; /* Amarillo más oscuro */
    }
</style>


