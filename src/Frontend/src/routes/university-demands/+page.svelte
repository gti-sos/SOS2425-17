
<script>

    import {dev} from '$app/environment';
    let Devel_HOST = "http://localhost:16078";


    let Api = "/api/v1/university-demands";

    //Para que funcione todo si estas en modod desarrollo
    if (dev){
        Api = Devel_HOST + Api;
    }

    import {onMount} from "svelte";
    import {Button,Table } from '@sveltestrap/sveltestrap';


    let universityData = [];
    let result = "";
    let resultStatus = "";
    let newUniversityLocation;
    let newUniversityDegree;
    let newUniversityOver45;
    let newUniversitySpanish;
    let newUniversityForeigners;
    let newUniversitygraduated;
    let newUniversityAcademicYear;

    let showFilterForm = false; // Para mostrar/ocultar el formulario
    let showCreateForm = false;
    let showUpdateForm = false;
    let successMessage = "";
    let errorMessage = "";


    // Campos del filtro (diferente de los de creación)
    let filterLocation = "";
    let filterDegree = "";
    let filterOver45 = "";
    let filterSpanish = "";
    let filterForeigners = "";
    let filterGraduated = "";
    let filterAcademicYear = "";


    async function getUniversityDemands() {
        //Para que siempre que llamemos a la funcion esos campos esten vacios
        resultStatus = result = "";
        //Esta funcion lo que hace es que recorre la api con un get y mete los datos en res
        //Se hace await por el async 
        
        try{

            const res  = await fetch(Api,{method: "GET"});
            //Para manda el resultado res en json y lo mete en data
            const data = await res.json();
            result = JSON.stringify(data,null,2);
            universityData = data;
            console.log(`Response received:${(JSON.stringify(universityData,null,2))}`);
        } catch(error){
            console.log(`Error : Get from ${Api} : ${(error)}`)
        }
    }

    //Cada vez que cargue la pagina llama a get contact
    onMount(async () => {
        //Cuando se carga la pagina se llama a la funcion getContacts
        await getUniversityDemands();
    });

    function getLoadInitialData() {
    fetch("/api/v1/university-demands/loadInitialData")
        .then(response => {
            if (response.status === 201) {
                console.log("Datos iniciales insertados correctamente");
                getUniversityDemands(); // <-- Esto recarga la tabla
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
//Filtrar por un dato 
//?http://localhost:16078/api/v1/university-demands/?academicYear=2016-2017
async function getUniversityEspecifico(params = {}) {
    resultStatus = result = "";
    try {
        const queryString = new URLSearchParams(params).toString();
        const url = `${Api}?${queryString}`;
        const res = await fetch(url, { method: "GET" });

        const status = res.status;
        resultStatus = status;

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${status}`);
        }

        const data = await res.json();

        if (data.length === 0) {
            errorMessage = "No se encontraron resultados con esos filtros.";
            universityData = []; // Limpiar la tabla

            // Oculta el mensaje después de unos segundos
            setTimeout(() => {
                errorMessage = "";
            }, 3000);
            return;
        }

        result = JSON.stringify(data, null, 2);
        universityData = data;
        console.log(`Response received:\n${result}`);
    } catch (error) {
        console.log(`Error: GET from ${Api} - ${error}`);
        errorMessage = "Error al obtener los datos.";

        // Oculta el mensaje después de unos segundos
        setTimeout(() => {
            errorMessage = "";
        }, 3000);
    }
}


async function getUniversityDetalle(degree, location, academicYear) {
    resultStatus = result = "";

    // Codificar parámetros por si tienen espacios o tildes
    const url = `${Api}/${encodeURIComponent(degree)}/${encodeURIComponent(location)}/${academicYear}`;

    try {
        const res = await fetch(url, { method: "GET" });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        result = JSON.stringify(data, null, 2);
        universityData = data;

        console.log(`Response received:\n${result}`);
    } catch (error) {
        console.log(`Error: GET from ${url} - ${error}`);
    }
}

function applyFilters() {
    const params = {};

    if (filterLocation) params.location = filterLocation;
    if (filterDegree) params.degree = filterDegree;
    if (filterOver45) params.over45 = filterOver45;
    if (filterSpanish) params.spanishFirst = filterSpanish;
    if (filterForeigners) params.foreigners = filterForeigners;
    if (filterGraduated) params.graduated = filterGraduated;
    if (filterAcademicYear) params.academicYear = filterAcademicYear;

    getUniversityEspecifico(params);
    showFilterForm = false; // Oculta el formulario tras aplicar
}

function clearFilters() {
    newUniversityLocation = "";
    newUniversityDegree = "";
    newUniversityOver45 = "";
    newUniversitySpanish = "";
    newUniversityForeigners = "";
    newUniversitygraduated = "";
    newUniversityAcademicYear = "";
    resultStatus = "";
}


function clearFilterFields() {
    filterLocation = "";
    filterDegree = "";
    filterOver45 = "";
    filterSpanish = "";
    filterForeigners = "";
    filterGraduated = "";
    filterAcademicYear = "";
}

function resetFilters() {
    clearFilters();
    clearFilterFields();
    getUniversityDemands(); // <- Vuelve a cargar todo sin filtros
}


//location,degree,over45,spanishFirst,foreigners,graduated,academicYear
    async function createUniversityDemands(){
        resultStatus = result = "";
        try {
            
            const res = await fetch(Api,{
                method:"POST",
                headers:{
                    "Content-Type" : "application/json"
                },
                body:JSON.stringify({ 
                    location: newUniversityLocation,
                    degree: newUniversityDegree,
                    over45: newUniversityOver45,
                    spanishFirst: newUniversitySpanish,
                    foreigners: newUniversityForeigners,
                    graduated: newUniversitygraduated,
                    academicYear: newUniversityAcademicYear         })
            });
  
            const status = await res.status;
            resultStatus = status;
            if(status == 201){
                console.log(`Demand created`);
                getUniversityDemands();
                showCreateForm = false;
                clearFilters(); 

                successMessage = "¡Demanda creada con éxito!";

                // Oculta el mensaje después de unos segundos
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


    }

    //Put en el front
    async function updateUniversityDemand() {
    resultStatus = result = "";
    try {
        const url = `${Api}/${encodeURIComponent(newUniversityDegree)}/${encodeURIComponent(newUniversityLocation)}/${encodeURIComponent(newUniversityAcademicYear)}`;

        const updatedData = {
            location: newUniversityLocation,
            degree: newUniversityDegree,
            over45: newUniversityOver45,
            spanishFirst: newUniversitySpanish,
            foreigners: newUniversityForeigners,
            graduated: newUniversitygraduated,
            academicYear: newUniversityAcademicYear
        };

        const res = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedData)
        });

        const status = res.status;
        resultStatus = status;

        if (status === 200) {
            console.log("Demanda actualizada correctamente.");
            getUniversityDemands();
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

function openEditForm(universityD) {
    newUniversityLocation = universityD.location;
    newUniversityDegree = universityD.degree;
    newUniversityOver45 = universityD.over45;
    newUniversitySpanish = universityD.spanishFirst;
    newUniversityForeigners = universityD.foreigners;
    newUniversitygraduated = universityD.graduated;
    newUniversityAcademicYear = universityD.academicYear;

    showUpdateForm = true;
}



    //Borro en funcion del nombre
    async function deleteDemands(degree, location, academicYear){
        resultStatus = result = "";
        try {
            //Basicamente lo que llamo es a api/v1/university-demands/degree/location/academicYear que es donde tengo el 
            //delete especifico
            

            console.log("Intentando borrar URL:", Api + "/" + degree + "/" + location + "/" + academicYear);

            const res = await fetch(`${Api}/${encodeURIComponent(degree)}/${encodeURIComponent(location)}/${encodeURIComponent(academicYear)}`, {method: "DELETE"});
            

            const status = res.status;
            resultStatus = status;

            if (status === 200) {
                console.log(`Demand ${degree} in ${location} in ${academicYear} deleted`);
                getUniversityDemands(); // más lógico que recargar los datos con loadInitialData
                successMessage = "¡Demanda borrada con éxito!";

                // Oculta el mensaje después de unos segundos
                setTimeout(() => {
                    successMessage = "";
                }, 3000);
            } else {
                console.error(`ERROR deleting demand: status ${status} - response: ${Text}`);
                errorMessage = "Error al eliminar los datos";
                // Oculta el mensaje después de unos segundos
                setTimeout(() => {
                    errorMessage = "";
                }, 3000);
            }



        } catch (error){
            console.log(`ERROR:  GET from ${Api}: ${error}`);
        }

    }

    //Borro Todo
    async function deleteAllDemands(){
        resultStatus = result = "";
        try {
            
            //Hago un delete en api/avi/univertity-demands
            const res = await fetch(Api, {method: "DELETE"});
            
            const status = res.status;
            resultStatus = status;

            if (status === 200) {
                console.log(`All demands deleted`);
                getUniversityDemands(); // más lógico que recargar los datos con loadInitialData
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

<!-- Mensajes de exito o error -->
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
        
        <!-- Esto ejecuta tantos tr como contacts haya -->
        {#each universityData as universityD}
        <tr>
            <td>
                {universityD.location}
            </td>
            <td>
                {universityD.degree}
            </td>
            <td>
                {universityD.over45}
            </td>
            <td>
                {universityD.spanishFirst}
            </td>
            <td>
                {universityD.foreigners}
            </td>
            <td>
                {universityD.graduated}
            </td>
            <td>
                {universityD.academicYear}
            </td>
            <td>
                <Button color="danger" on:click={() => {deleteDemands(universityD.degree, universityD.location, universityD.academicYear)}}>Borrar</Button>
                <Button color="warning" on:click={() => openEditForm(universityD)}>Editar</Button>
            </td>
        </tr>
        {/each}

    </tbody>
</Table>

<!-- -->
<!-- Si pulso el boton que llama a showFilterForm -->
{#if showFilterForm}
    <div class="filter-overlay" on:click={() => showFilterForm = false}>
        <div class="filter-form" on:click|stopPropagation>
            <h5>Filtrar Demanda Universitaria</h5>

            <input required type="text" placeholder="Location" bind:value={filterLocation} />
            <input required type="text" placeholder="Degree" bind:value={filterDegree} />
            <input required type="text" placeholder="Over 45" bind:value={filterOver45} />
            <input required type="text" placeholder="Spanish First" bind:value={filterSpanish} />
            <input required type="text" placeholder="Foreigners" bind:value={filterForeigners} />
            <input required type="text" placeholder="Graduated" bind:value={filterGraduated} />
            <input required type="text" placeholder="Academic Year" bind:value={filterAcademicYear} />

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
            <h5>Crear Demanda Universitaria</h5>

            <input type="text" placeholder="Location" bind:value={newUniversityLocation} />
            <input type="text" placeholder="Degree" bind:value={newUniversityDegree}>
            <input type="text" placeholder="Over45" bind:value={newUniversityOver45}> 
            <input type="text" placeholder="Spanish First" bind:value={newUniversitySpanish}>
            <input type="text" placeholder="Foreigners" bind:value={newUniversityForeigners}>
            <input type="text" placeholder="Graduated" bind:value={newUniversitygraduated}>
            <input type="text" placeholder="Academic Year" bind:value={newUniversityAcademicYear}>

            <div class="filter-buttons">
                <!--Para que ejecuto la funcion createContatcs al pulsar el boton -->
                <Button color="primary" on:click={createUniversityDemands}>Crear</Button>
                <Button color="danger" on:click={clearFilters}>Borrar Campos</Button>
                <Button on:click={() => showCreateForm = false}>Cerrar</Button>
            </div>
        </div>
    </div>
{/if}

{#if showUpdateForm}
    <div class="filter-overlay" on:click={() => showUpdateForm = false}>
        <div class="filter-form" on:click|stopPropagation>
            <h5>Editar Demanda Universitaria</h5>

            <input type="text" placeholder="Location" bind:value={newUniversityLocation} />
            <input type="text" placeholder="Degree" bind:value={newUniversityDegree}>
            <input type="text" placeholder="Over45" bind:value={newUniversityOver45}> 
            <input type="text" placeholder="Spanish First" bind:value={newUniversitySpanish}>
            <input type="text" placeholder="Foreigners" bind:value={newUniversityForeigners}>
            <input type="text" placeholder="Graduated" bind:value={newUniversitygraduated}>
            <input type="text" placeholder="Academic Year" bind:value={newUniversityAcademicYear}>

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
        padding: 2rem;
        border-radius: 10px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
        display: flex;
        flex-direction: column;
        gap: 0.7rem;
        width: 90%;
        max-width: 500px;
        z-index: 1001;
    }

    .filter-form input {
        padding: 0.5rem;
        border-radius: 5px;
        border: 1px solid #ccc;
    }

    .filter-buttons {
        display: flex;
        justify-content: space-between;
        gap: 0.5rem;
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

    .success-message, .error-message {
        text-align: center;
        margin: 1rem auto;
        padding: 0.75rem 1rem;
        width: fit-content;
        border-radius: 5px;
        font-weight: bold;
    }

    .success-message {
        background-color: #d4edda;
        color: #155724;
    }

    .error-message {
        background-color: #f8d7da;
        color: #721c24;
    }

</style>




