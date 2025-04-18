
<svelte:head>
	<title>University Demands</title>
</svelte:head>

<script>

    import {dev} from '$app/environment';
    let Devel_HOST = "http://localhost:16078";


    let Api = "/api/v2/university-demands";

    //Para que funcione todo si estas en modod desarrollo
    if (dev){
        Api = Devel_HOST + Api;
    }

    import {onMount} from "svelte";
    import {Button,Table } from '@sveltestrap/sveltestrap';

    //Importo el componente de bootstrap para que me haga la tabla
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

    let fromYear = '';
    let toYear = '';


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
    fetch("/api/v2/university-demands/loadInitialData")
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
//http://localhost:16078/api/v2/university-demands?from=2017-2018&to=2018-2019
async function getUniversityEspecifico(params = {}) {
    resultStatus = result = "";
    try {
        const queryString = new URLSearchParams(params).toString();
        //Lo que hago es que llamo a la direccion /university-demands?campo = valor 
        const url = `${Api}?${queryString}`;
        const res = await fetch(url, { method: "GET" });

        const status = res.status;
        resultStatus = status;

            if (status === 404) {
                const firstParamKey = Object.keys(params)[0];
                const firstParamValue = params[firstParamKey];
                errorMessage = `No se encontró ningún resultado con ${firstParamKey} = ${firstParamValue}`;
                setTimeout(() => {
                errorMessage = "";
                }, 3000);
            } 

        const data = await res.json();

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

function applyFilters() {
    const params = {};

    if (filterLocation) params.location = filterLocation;
    if (filterDegree) params.degree = filterDegree;
    if (filterOver45) params.over45 = filterOver45;
    if (filterSpanish) params.spanishFirst = filterSpanish;
    if (filterForeigners) params.foreigners = filterForeigners;
    if (filterGraduated) params.graduated = filterGraduated;
    if (filterAcademicYear) params.academicYear = filterAcademicYear;
    if (fromYear) params.from = fromYear;
    if (toYear) params.to = toYear;

    getUniversityEspecifico(params);
    showFilterForm = false; // Oculta el formulario tras aplicar
}

//Con esto vacio los campos de crear y actualizar 
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

//Con esto lo que hago esque vacio los campos del formulario de filtro
function clearFilterFields() {
    filterLocation = "";
    filterDegree = "";
    filterOver45 = "";
    filterSpanish = "";
    filterForeigners = "";
    filterGraduated = "";
    filterAcademicYear = "";
    fromYear = "";
    toYear = "";
}

//Con esto lo que hago es que dejo todos los campos de ambos formularios vacios y hago un get para que se actualize la tabla
//con los campos vacios
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
        <tr>
            <th>Localización</th>
            <th>Grado</th>
            <th>Mayores 45</th>
            <th>Españoles Primer Año</th>
            <th>Extranjeros</th>
            <th>Graduados</th>
            <th>Año academico</th>
        </tr>
        
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

            <div class="form-group">
                <label for="location">Localización</label>
                <input id="location" required type="text" placeholder="Ej : Badajoz" bind:value={filterLocation} />
            </div>

            <div class="form-group">
                <label for="degree">Grado</label>
                <input id="degree" required type="text" placeholder="Ej : Medicina" bind:value={filterDegree} />
            </div>

            <div class="form-group">
                <label for="over45">Mayores de 45</label>
                <input id="over45" required type="text" placeholder="Ej : 3" bind:value={filterOver45} />
            </div>

            <div class="form-group">
                <label for="spanishFirst">Españoles Primer año</label>
                <input id="spanishFirst" required type="text" placeholder="Ej : 4" bind:value={filterSpanish} />
            </div>

            <div class="form-group">
                <label for="foreigners">Extranjeros</label>
                <input id="foreigners" required type="text" placeholder="Ej : 5" bind:value={filterForeigners} />
            </div>

            <div class="form-group">
                <label for="graduated">Graduados</label>
                <input id="graduated" required type="text" placeholder="Ej : 25" bind:value={filterGraduated} />
            </div>

            <div class="form-group">
                <label for="academicYear">Año Académico</label>
                <input id="academicYear" required type="text" placeholder="Ej : 2016-2017" bind:value={filterAcademicYear} />
            </div>

            <div class="form-group">
                <label>Desde: <input bind:value={fromYear} type="text" placeholder="Ej: 2005-2006" /></label>
                <label>Hasta: <input bind:value={toYear} type="text" placeholder="Ej: 2016-2017" /></label>
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
            <h5>Crear Demanda Universitaria</h5>

            <div class="form-group">
                <label for="location">Localización</label>
                <input id="location" required type="text" placeholder="Ej : Badajoz" bind:value={newUniversityLocation} />
            </div>

            <div class="form-group">
                <label for="degree">Grado</label>
                <input id="degree" required type="text" placeholder="Ej : Medicina" bind:value={newUniversityDegree} />
            </div>

            <div class="form-group">
                <label for="over45">Mayores de 45</label>
                <input id="over45" required type="text" placeholder="Ej : 3" bind:value={newUniversityOver45} />
            </div>

            <div class="form-group">
                <label for="spanishFirst">Españoles Primer año</label>
                <input id="spanishFirst" required type="text" placeholder="Ej : 4" bind:value={newUniversitySpanish} />
            </div>

            <div class="form-group">
                <label for="foreigners">Extranjeros</label>
                <input id="foreigners" required type="text" placeholder="Ej : 5" bind:value={newUniversityForeigners} />
            </div>

            <div class="form-group">
                <label for="graduated">Graduados</label>
                <input id="graduated" required type="text" placeholder="Ej : 25" bind:value={newUniversitygraduated} />
            </div>

            <div class="form-group">
                <label for="academicYear">Año Académico</label>
                <input id="academicYear" required type="text" placeholder="Ej : 2016-2017" bind:value={newUniversityAcademicYear} />
            </div>


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

            <div class="form-group">
                <label for="location">Localización</label>
                <input id="location" required type="text" placeholder="Ej : Badajoz" bind:value={newUniversityLocation} />
            </div>

            <div class="form-group">
                <label for="degree">Grado</label>
                <input id="degree" required type="text" placeholder="Ej : Medicina" bind:value={newUniversityDegree} />
            </div>

            <div class="form-group">
                <label for="over45">Mayores de 45</label>
                <input id="over45" required type="text" placeholder="Ej : 3" bind:value={newUniversityOver45} />
            </div>

            <div class="form-group">
                <label for="spanishFirst">Españoles Primer año</label>
                <input id="spanishFirst" required type="text" placeholder="Ej : 4" bind:value={newUniversitySpanish} />
            </div>

            <div class="form-group">
                <label for="foreigners">Extranjeros</label>
                <input id="foreigners" required type="text" placeholder="Ej : 5" bind:value={newUniversityForeigners} />
            </div>

            <div class="form-group">
                <label for="graduated">Graduados</label>
                <input id="graduated" required type="text" placeholder="Ej : 25" bind:value={newUniversitygraduated} />
            </div>

            <div class="form-group">
                <label for="academicYear">Año Académico</label>
                <input id="academicYear" required type="text" placeholder="Ej : 2016-2017" bind:value={newUniversityAcademicYear} />
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




