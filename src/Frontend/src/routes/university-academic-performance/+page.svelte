<svelte:head>
    <title>UniversityAcademicPerformance</title>
</svelte:head>

<script>
    import { Table } from '@sveltestrap/sveltestrap'; 
    import { dev } from '$app/environment';
    import { onMount } from "svelte";


    let ruta_host = "http://localhost:16078";
    let ruta_api = "/api/v2/university-academic-performance";

    let UniversityAcademicPerformance = [];
    let UniversityAcademicPerformanceDegree;
    let UniversityAcademicPerformanceLocation;
    let UniversityAcademicPerformanceDropoutSecondCourse;
    let UniversityAcademicPerformanceEfficiencyRate;
    let UniversityAcademicPerformanceDropoutThirdCourse;
    let UniversityAcademicPerformanceSuccessRate;
    let UniversityAcademicPerformanceDropoutFirstCourse;
    let UniversityAcademicPerformanceDropoutsThirdCourse;
    let UniversityAcademicPerformanceProgressNormalized;
    let UniversityAcademicPerformanceDropoutsFirstCourse;
    let UniversityAcademicPerformancePerformanceRate;
    let UniversityAcademicPerformanceCohortStudents;
    let UniversityAcademicPerformanceDropoutsSecondCourse;
    let UniversityAcademicPerformanceDropoutRate;
    let UniversityAcademicPerformanceGraduationRate;
    let UniversityAcademicPerformanceAcademicYear;
    let output = "";
    let status = "";
    let sortDirection;
    let sortColumn;
    let lastSearch;
    let lastParams;
    let newTimeOut;





    let showfilterForm = false; 
    let showDeleteForm = false;
    let showEditForm = false;
    let showCreateForm = false;
    let successMessage = "";
    let errorMessage = "";
    let deleteDegree="";
    let deleteLocation="";
    let deleteAcademiYear="";
    let fromYear;
    let toYear;

    if (dev) {
        ruta_api = ruta_host + ruta_api;
    }

    //CARGAR DATOS AL INICIAR LA PÁGINA

    onMount(async () => {
        await deleteAll();
        await getLoadInitialData();
    });

    //  MIRAR TODOS LOS DATOS

    async function getUniversityAcademicPerformance() {
        output = "";
        status = "";
        errorMessage= "";
        successMessage= "";
        stopTimer();

        try {
            let data = await fetch(ruta_api, { method: "GET" }).then(response => response.json());
            UniversityAcademicPerformance = data;
            output = JSON.stringify(data, null, 2);
            lastSearch=ruta_api
            successMessage = "Datos cargados con éxito.";
            newTimeOut= newTimeOut= setTimeout(() => { successMessage= "" }, 6000);
        } catch (error) {
            errorMessage = "No se han podido cargar correctamente los datos.";
            newTimeOut= setTimeout(() => { errorMessage= "" }, 6000);
    }
    }

    // LOAD INITIAL DATA

    async function getLoadInitialData() {
        errorMessage= "";
        successMessage= "";
        stopTimer();

        fetch("/api/v2/university-academic-performance/loadInitialData")
        .then(response => {
            if (response.status === 201) {
                successMessage = "Datos cargados con éxito.";
                newTimeOut= setTimeout(() => { successMessage= "" }, 6000);
                lastSearch="/api/v2/university-academic-performance/loadInitialData";
                getUniversityAcademicPerformance();
            } else if (response.status === 409) {
                errorMessage = "La página ya contiene datos; para insertar datos nuevos, borre los actuales.";
                newTimeOut= setTimeout(() => { errorMessage= "" }, 6000);
            } else {
                errorMessage = "Hubo un error inesperado al cargar los datos.";
                newTimeOut= setTimeout(() => { errorMessage= "" }, 6000);
            }
        })
        .catch( error=> {
            errorMessage = "Hubo un error inesperado al cargar los datos.";
            newTimeOut= setTimeout(() => { errorMessage= "" }, 6000);
        });
}

    //FILTRO


async function getOne(params = {}) {
    status = "" ;
    output = "" ;
    errorMessage= "";
    successMessage= "";
    stopTimer();

    if (params.degree != null && params.location != null && params.academicYear != null) {
    try {
        const url = ruta_api + "/" + params.degree + "/" + params.location + "/" + params.academicYear;
        const res = await fetch(url, { method: "GET" });
        status = res.status;

        if (status === 404) {
            errorMessage = "No se encontró ningún registro con los parámetros especificados.";
            newTimeOut = setTimeout(() => { errorMessage = "" }, 6000);
        }

        if (status === 200) {
            const data = await res.json();
            UniversityAcademicPerformance = [data];
            output = JSON.stringify(data, null, 2);
            lastSearch = url;
            successMessage = "El registro fue filtrado con éxito.";
            newTimeOut = setTimeout(() => { errorMessage = "" }, 6000);
        }

    } catch (error) {
        errorMessage = "Ha ocurrido un error inesperado al filtrar los datos.";
        newTimeOut = setTimeout(() => { errorMessage = "" }, 6000);
    }
} else {

        try {
            const filteredParams = Object.fromEntries(
            Object.entries(params).filter(([_, value]) => value !== undefined && value !==null));
            const queryString = new URLSearchParams(filteredParams).toString();
            const url = ruta_api + "?" + queryString;
            const res = await fetch(url, { method: "GET" });
            status = res.status;

                if (status === 200){
                    const data = await res.json();
                    UniversityAcademicPerformance=data;
                    output = JSON.stringify(data, null, 2);
                    lastSearch=url;
                    successMessage = "Los datos fueron filtrados con éxito.";
                    newTimeOut= setTimeout(() => { successMessage= "" }, 6000);
                }
            
        } catch (error) {
             errorMessage = "Ha ocurrido un error inesperado al filtrar los datos." ;
            newTimeOut= setTimeout(() => { errorMessage= "" }, 6000);
        }
    }
}


async function createUniversityAcademicPerformance() {
    errorMessage = "";
    successMessage = "";
    stopTimer();

    const newRecord = {
        degree: UniversityAcademicPerformanceDegree,
        location: UniversityAcademicPerformanceLocation,
        academicYear: UniversityAcademicPerformanceAcademicYear,
        dropoutFirstCourse: parseFloat(UniversityAcademicPerformanceDropoutFirstCourse),
        dropoutSecondCourse: parseFloat(UniversityAcademicPerformanceDropoutSecondCourse),
        dropoutThirdCourse: parseFloat(UniversityAcademicPerformanceDropoutThirdCourse),
        dropoutsFirstCourse: parseInt(UniversityAcademicPerformanceDropoutsFirstCourse),
        dropoutsSecondCourse: parseInt(UniversityAcademicPerformanceDropoutsSecondCourse),
        dropoutsThirdCourse: parseInt(UniversityAcademicPerformanceDropoutsThirdCourse),
        efficiencyRate: parseFloat(UniversityAcademicPerformanceEfficiencyRate),
        successRate: parseFloat(UniversityAcademicPerformanceSuccessRate),
        progressNormalized: parseFloat(UniversityAcademicPerformanceProgressNormalized),
        performanceRate: parseFloat(UniversityAcademicPerformancePerformanceRate),
        cohortStudents: parseInt(UniversityAcademicPerformanceCohortStudents),
        dropoutRate: parseFloat(UniversityAcademicPerformanceDropoutRate),
        graduationRate: parseFloat(UniversityAcademicPerformanceGraduationRate)
    };

    try {
        const res = await fetch("/api/v2/university-academic-performance", {method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRecord)
        });

        if (res.status === 201) {
            successMessage = "Nuevo registro creado con éxito." ;
            newTimeOut= setTimeout(() => { successMessage= "" }, 6000);
            output=JSON.stringify(newRecord)
            checkSearch();

        } else if (res.status === 409) {
             errorMessage = "Ya existe un registro con el mismo Grado, Ciudad y Año académico." ;
            newTimeOut= setTimeout(() => { errorMessage= "" }, 6000);
        } else if (res.status === 400) {
             errorMessage = "Todos los campos deben estar rellenos." ;
            newTimeOut= setTimeout(() => { errorMessage= "" }, 6000);
        } else {
             errorMessage = "Ha ocurrido un error inesperado al crear el registro." ;
            newTimeOut= setTimeout(() => { errorMessage= "" }, 6000);
        }
    } catch (err) {
        console.error("Error al hacer POST:", err);
        errorMessage = "Ha ocurrido un error inesperado al crear el registro.";
        newTimeOut= setTimeout(() => { errorMessage= "" }, 6000);
    }
}






async function updateUniversityAcademicPerformance() {
    errorMessage =  "";
    successMessage = "";
    stopTimer();

    const updatedRecord = {
        degree: UniversityAcademicPerformanceDegree,
        location: UniversityAcademicPerformanceLocation,
        academicYear: UniversityAcademicPerformanceAcademicYear,
        dropoutFirstCourse: parseFloat(UniversityAcademicPerformanceDropoutFirstCourse),
        dropoutSecondCourse: parseFloat(UniversityAcademicPerformanceDropoutSecondCourse),
        dropoutThirdCourse: parseFloat(UniversityAcademicPerformanceDropoutThirdCourse),
        dropoutsFirstCourse: parseInt(UniversityAcademicPerformanceDropoutsFirstCourse),
        dropoutsSecondCourse: parseInt(UniversityAcademicPerformanceDropoutsSecondCourse),
        dropoutsThirdCourse: parseInt(UniversityAcademicPerformanceDropoutsThirdCourse),
        efficiencyRate: parseFloat(UniversityAcademicPerformanceEfficiencyRate),
        successRate: parseFloat(UniversityAcademicPerformanceSuccessRate),
        progressNormalized: parseFloat(UniversityAcademicPerformanceProgressNormalized),
        performanceRate: parseFloat(UniversityAcademicPerformancePerformanceRate),
        cohortStudents: parseInt(UniversityAcademicPerformanceCohortStudents),
        dropoutRate: parseFloat(UniversityAcademicPerformanceDropoutRate),
        graduationRate: parseFloat(UniversityAcademicPerformanceGraduationRate)
    };

    try {
        const res = await fetch(`/api/v2/university-academic-performance/${UniversityAcademicPerformanceDegree}/${UniversityAcademicPerformanceLocation}/${UniversityAcademicPerformanceAcademicYear}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedRecord)
        });
        if (res.status === 200) {
            checkSearch();
            successMessage = "Registro actualizado con éxito."; 
            newTimeOut= setTimeout(() => { successMessage= "" }, 6000);

        } else if (res.status === 400) {
             errorMessage = "Todos los campos deben estar rellenos." ;
            newTimeOut= setTimeout(() => { errorMessage= "" }, 6000);
        } else if (res.status === 404) {
             errorMessage = "No existe ningún registro con ese Grado, Ciudad y/o Año Académico." ;
            newTimeOut= setTimeout(() => { errorMessage= "" }, 6000);

        } else {
             errorMessage = "Ha ocurrido un error desconocido." ;
            newTimeOut= setTimeout(() => { errorMessage= "" }, 6000);

        }
    } catch (err) {
         errorMessage = "Ha ocurrido un error desconocido." ;
        newTimeOut= setTimeout(() => { errorMessage= "" }, 6000);
    }
    
}



//Borro Todo
async function deleteAll() {
    successMessage = "";
    errorMessage = "";
    stopTimer();

    try {
        const res = await fetch(ruta_api, { method: "DELETE" });

        if (res.status === 200) {
            const responseBody = await res.json(); 
            await(getUniversityAcademicPerformance());  
            successMessage = "Se han Borrado los registros con éxito." ;
            newTimeOut= setTimeout(() => { successMessage= "" }, 6000);
        } else {
            errorMessage = "No hay datos que borrar."
            newTimeOut= setTimeout(() => { errorMessage= "" }, 6000);
        }

    } catch (error) {
         errorMessage = "Error inesperado al contactar con el servidor." ;
        newTimeOut= setTimeout(() => { errorMessage= "" }, 6000);
    }
}



//BORRA UNO


async function deleteOne(degree, location, academicYear){
        output = "";
        status = "";
        errorMessage= "";
        successMessage= "";
        stopTimer();
        
        try {
            const res = await fetch(`${ruta_api}/${encodeURIComponent(degree)}/${encodeURIComponent(location)}/${encodeURIComponent(academicYear)}`, {method: "DELETE"});
            status = res.status;

            if (status === 200) {
                checkSearch()
                successMessage = "Registo borrado con éxito." ;
                newTimeOut= setTimeout(() => { successMessage= "" }, 6000);
            }

            else if(status === 404) {
                 errorMessage = "No se ha encontrado ningún registro con ese Grado, Localización y/o Año Académico." ;
                 newTimeOut= setTimeout(() => { errorMessage= "" }, 6000);
            }

             else {
                console.error(`ERROR deleting demand: status ${status} - response: ${Text}`);
                 errorMessage = "Error al eliminar el registro." ;
                newTimeOut= setTimeout(() => { errorMessage= "" }, 6000);
            }
        } catch (error){
            console.log(`ERROR:  GET from ${ruta_api}: ${error}`);
             errorMessage = "Error inesperado al contactar con el servidor." ;
            newTimeOut= setTimeout(() => { errorMessage= "" }, 6000);
        }
    }

    //CREA PARAMS

    function handleActualizar() {
    const params = {
      degree: UniversityAcademicPerformanceDegree,
      location: UniversityAcademicPerformanceLocation,
      academicYear: UniversityAcademicPerformanceAcademicYear,
      dropoutFirstCourse: UniversityAcademicPerformanceDropoutFirstCourse,
      dropoutSecondCourse: UniversityAcademicPerformanceDropoutSecondCourse,
      dropoutThirdCourse: UniversityAcademicPerformanceDropoutThirdCourse,
      dropoutsFirstCourse: UniversityAcademicPerformanceDropoutsFirstCourse,
      dropoutsSecondCourse: UniversityAcademicPerformanceDropoutsSecondCourse,
      dropoutsThirdCourse: UniversityAcademicPerformanceDropoutsThirdCourse,
      efficiencyRate: UniversityAcademicPerformanceEfficiencyRate,
      successRate: UniversityAcademicPerformanceSuccessRate,
      progressNormalized: UniversityAcademicPerformanceProgressNormalized,
      performanceRate: UniversityAcademicPerformancePerformanceRate,
      cohortStudents: UniversityAcademicPerformanceCohortStudents,
      dropoutRate: UniversityAcademicPerformanceDropoutRate,
      graduationRate: UniversityAcademicPerformanceGraduationRate,
      year_small: fromYear,
      year_big: toYear
    };
    getOne(params);
    lastParams=params;
  }

//CAMBIA COLOR TABLA

  function getcolorClass(index) {
    return index % 2 === 0 ? "color-green" : "color-ligthgreen";
  }


//ORDENA ARRIBA/ABAJO

  function handleClick(column) {
    if (sortColumn === column) {
      sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      sortColumn = column;
      sortDirection = 'asc';
    }
    getOne({ sortBy: sortColumn, order: sortDirection });
  }



//ÚLTIMA BÚSQUEDA
  
    function checkSearch(){
        console.log("La última busqueda fue a  ",lastSearch)
        if (lastSearch===null){
            getUniversityAcademicPerformance()
        }
        else if(lastSearch===ruta_api || lastSearch===ruta_api+"/loadInitialData"){
                getUniversityAcademicPerformance()
            }
        else{
        getOne(lastParams)
        }



    }

    function stopTimer() {
    clearTimeout(newTimeOut);
}

</script>

<!--MUESTRA LOS MENSAJES -->

{#if successMessage}
<div class="sucess-message">{successMessage}</div>
{/if}
{#if errorMessage}
<div class="error-message">{errorMessage}</div>
{/if}

<!--BOTON LOAD INITIAL DATA -->

<div class="container-btns">
    <button class="btn-purple" on:click={getLoadInitialData}>
        Cargar datos iniciales
    </button>

<!--BOTON GET TODO -->

    <button class="btn-green" on:click={getUniversityAcademicPerformance}>
        Mira datos
    </button>

<!--BOTON FILTRADO -->

<button class="btn-green" on:click={() => {UniversityAcademicPerformanceDropoutThirdCourse=null;UniversityAcademicPerformanceDropoutsFirstCourse=null;UniversityAcademicPerformanceDegree=null;UniversityAcademicPerformanceLocation=null;UniversityAcademicPerformanceDropoutSecondCourse=null;UniversityAcademicPerformanceEfficiencyRate=null;UniversityAcademicPerformanceSuccessRate=null;UniversityAcademicPerformanceDropoutFirstCourse=null;UniversityAcademicPerformanceDropoutsThirdCourse=null; UniversityAcademicPerformanceProgressNormalized=null;UniversityAcademicPerformancePerformanceRate=null;UniversityAcademicPerformanceCohortStudents=null;UniversityAcademicPerformanceDropoutsSecondCourse=null;UniversityAcademicPerformanceDropoutRate=null;UniversityAcademicPerformanceGraduationRate=null;UniversityAcademicPerformanceAcademicYear=null;toYear=null,fromYear=null;
 showfilterForm = !showfilterForm
}}>
    {showfilterForm ? "Cancelar" : "Filtrado"}
  </button>
  
  {#if showfilterForm}
    <div class="formulario">
      <input placeholder="Grado" bind:value={UniversityAcademicPerformanceDegree} />
      <input placeholder="Localización" bind:value={UniversityAcademicPerformanceLocation} />
      <input placeholder="Año académico" bind:value={UniversityAcademicPerformanceAcademicYear} />
      <input placeholder="Tasa abandono 1er curso (%)" type="number" bind:value={UniversityAcademicPerformanceDropoutFirstCourse} />
      <input placeholder="Tasa abandono 2º curso (%)" type="number" bind:value={UniversityAcademicPerformanceDropoutSecondCourse} />
      <input placeholder="Tasa abandono 3º curso (%)" type="number" bind:value={UniversityAcademicPerformanceDropoutThirdCourse} />
      <input placeholder="Nº abandonos 1er curso" type="number" bind:value={UniversityAcademicPerformanceDropoutsFirstCourse} />
      <input placeholder="Nº abandonos 2º curso" type="number" bind:value={UniversityAcademicPerformanceDropoutsSecondCourse} />
      <input placeholder="Nº abandonos 3º curso" type="number" bind:value={UniversityAcademicPerformanceDropoutsThirdCourse} />
      <input placeholder="Tasa abandono (%)" type="number" bind:value={UniversityAcademicPerformanceDropoutRate} />
      <input placeholder="Tasa eficiencia (%)" type="number" bind:value={UniversityAcademicPerformanceEfficiencyRate} />
      <input placeholder="Tasa éxito (%)" type="number" bind:value={UniversityAcademicPerformanceSuccessRate} />
      <input placeholder="Progreso normalizado (%)" type="number" bind:value={UniversityAcademicPerformanceProgressNormalized} />
      <input placeholder="Tasa de rendimiento (%)" type="number" bind:value={UniversityAcademicPerformancePerformanceRate} />
      <input placeholder="Estudiantes cohorte" type="number" bind:value={UniversityAcademicPerformanceCohortStudents} />
      <input placeholder="Tasa graduación (%)" type="number" bind:value={UniversityAcademicPerformanceGraduationRate} />
      <div>
        <input class=inputs-years placeholder="Desde el año" bind:value={fromYear} />
        <input class=inputs-years placeholder="Hasta el año" bind:value={toYear} />
    </div>
      <button class="btn-green" on:click={() =>{showfilterForm=false;handleActualizar()}}>
        Filtrar
      </button>
    </div>
  {/if}

   <!-- BOTON POST-->
    <button class="btn-yellow" on:click={() => {UniversityAcademicPerformanceDropoutsFirstCourse=null;UniversityAcademicPerformanceDegree=null;UniversityAcademicPerformanceLocation=null;UniversityAcademicPerformanceDropoutSecondCourse=null;UniversityAcademicPerformanceEfficiencyRate=null;UniversityAcademicPerformanceSuccessRate=null;UniversityAcademicPerformanceDropoutFirstCourse=null;UniversityAcademicPerformanceDropoutsThirdCourse=null; UniversityAcademicPerformanceProgressNormalized=null;UniversityAcademicPerformancePerformanceRate=null;UniversityAcademicPerformanceCohortStudents=null;UniversityAcademicPerformanceDropoutsSecondCourse=null;UniversityAcademicPerformanceDropoutRate=null;UniversityAcademicPerformanceGraduationRate=null;UniversityAcademicPerformanceAcademicYear=null;
    showCreateForm = !showCreateForm}}>
        {showCreateForm ? "Cancelar" : "Crear nuevo registro"}
    </button>

    {#if showCreateForm}
        <div class="formulario">
            <input placeholder="Grado" bind:value={UniversityAcademicPerformanceDegree} />
            <input placeholder="Localización" bind:value={UniversityAcademicPerformanceLocation} />
            <input placeholder="Año académico" bind:value={UniversityAcademicPerformanceAcademicYear} />
            <input placeholder="Tasa abandono 1er curso (%)" type="number" bind:value={UniversityAcademicPerformanceDropoutFirstCourse} />
            <input placeholder="Tasa abandono 2º curso (%)" type="number" bind:value={UniversityAcademicPerformanceDropoutSecondCourse} />
            <input placeholder="Tasa abandono 3º curso (%)" type="number" bind:value={UniversityAcademicPerformanceDropoutThirdCourse} />
            <input placeholder="Nº abandonos 1er curso" type="number" bind:value={UniversityAcademicPerformanceDropoutsFirstCourse} />
            <input placeholder="Nº abandonos 2º curso" type="number" bind:value={UniversityAcademicPerformanceDropoutsSecondCourse} />
            <input placeholder="Nº abandonos 3º curso" type="number" bind:value={UniversityAcademicPerformanceDropoutsThirdCourse} />
            <input placeholder="Tasa abandono (%)" type="number" bind:value={UniversityAcademicPerformanceDropoutRate} />
            <input placeholder="Tasa eficiencia (%)" type="number" bind:value={UniversityAcademicPerformanceEfficiencyRate} />
            <input placeholder="Tasa éxito (%)" type="number" bind:value={UniversityAcademicPerformanceSuccessRate} />
            <input placeholder="Progreso normalizado (%)" type="number" bind:value={UniversityAcademicPerformanceProgressNormalized} />
            <input placeholder="Tasa de rendimiento (%)" type="number" bind:value={UniversityAcademicPerformancePerformanceRate} />
            <input placeholder="Estudiantes cohorte" type="number" bind:value={UniversityAcademicPerformanceCohortStudents} />
            <input placeholder="Tasa graduación (%)" type="number" bind:value={UniversityAcademicPerformanceGraduationRate} />
    
            <button class="btn-yellow"on:click={() =>{showCreateForm=false
            createUniversityAcademicPerformance()}}>
                Guardar
            </button>
        </div>
    {/if}

<!-- BOTON UPDATE -->
<button class="btn-blue" on:click={() =>{UniversityAcademicPerformanceDropoutsFirstCourse=null;UniversityAcademicPerformanceDegree=null;UniversityAcademicPerformanceLocation=null;UniversityAcademicPerformanceDropoutSecondCourse=null;UniversityAcademicPerformanceEfficiencyRate=null;UniversityAcademicPerformanceSuccessRate=null;UniversityAcademicPerformanceDropoutFirstCourse=null;UniversityAcademicPerformanceDropoutsThirdCourse=null; UniversityAcademicPerformanceProgressNormalized=null;UniversityAcademicPerformancePerformanceRate=null;UniversityAcademicPerformanceCohortStudents=null;UniversityAcademicPerformanceDropoutsSecondCourse=null;UniversityAcademicPerformanceDropoutRate=null;UniversityAcademicPerformanceGraduationRate=null;UniversityAcademicPerformanceAcademicYear=null;
     showEditForm = !showEditForm}}>
    {showEditForm ? "Cancelar" : "Editar registro"}
</button>


{#if showEditForm}
    <div class="formulario">
        <input placeholder="Grado" bind:value={UniversityAcademicPerformanceDegree} />
        <input placeholder="Localización" bind:value={UniversityAcademicPerformanceLocation} />
        <input placeholder="Año académico" bind:value={UniversityAcademicPerformanceAcademicYear} />
        <input placeholder="Tasa abandono 1er curso (%)" type="number" bind:value={UniversityAcademicPerformanceDropoutFirstCourse} />
        <input placeholder="Tasa abandono 2º curso (%)" type="number" bind:value={UniversityAcademicPerformanceDropoutSecondCourse} />
        <input placeholder="Tasa abandono 3º curso (%)" type="number" bind:value={UniversityAcademicPerformanceDropoutThirdCourse} />
        <input placeholder="Nº abandonos 1er curso" type="number" bind:value={UniversityAcademicPerformanceDropoutsFirstCourse} />
        <input placeholder="Nº abandonos 2º curso" type="number" bind:value={UniversityAcademicPerformanceDropoutsSecondCourse} />
        <input placeholder="Nº abandonos 3º curso" type="number" bind:value={UniversityAcademicPerformanceDropoutsThirdCourse} />
        <input placeholder="Tasa abandono (%)" type="number" bind:value={UniversityAcademicPerformanceDropoutRate} />
        <input placeholder="Tasa eficiencia (%)" type="number" bind:value={UniversityAcademicPerformanceEfficiencyRate} />
        <input placeholder="Tasa éxito (%)" type="number" bind:value={UniversityAcademicPerformanceSuccessRate} />
        <input placeholder="Progreso normalizado (%)" type="number" bind:value={UniversityAcademicPerformanceProgressNormalized} />
        <input placeholder="Tasa de rendimiento (%)" type="number" bind:value={UniversityAcademicPerformancePerformanceRate} />
        <input placeholder="Estudiantes cohorte" type="number" bind:value={UniversityAcademicPerformanceCohortStudents} />
        <input placeholder="Tasa graduación (%)" type="number" bind:value={UniversityAcademicPerformanceGraduationRate} />

        <button class="btn-blue" on:click={() =>{showEditForm=false,updateUniversityAcademicPerformance()}}>
            Actualizar
        </button>
    </div>
{/if}

<!--BOTON BORRA TODO -->

    <button class="btn-red" on:click={deleteAll}>
        Borra todo
    </button>

<!-- BOTON BORRA UNO-->
<button class="btn-red" on:click={() => {deleteDegree="";deleteLocation="";deleteAcademiYear="";
    showDeleteForm = !showDeleteForm}}>
    {showDeleteForm ? "Cancelar" : "Borrar registro"}
</button>

{#if showDeleteForm}
    <div class="formulario">
        <input placeholder="Grado" bind:value={deleteDegree} />
        <input placeholder="Localización" bind:value={deleteLocation} />
        <input placeholder="Año académico" bind:value={deleteAcademiYear} />

        <button class="btn-red" on:click={() => {deleteOne(deleteDegree, deleteLocation, deleteAcademiYear)
        showDeleteForm=false;    
        }}>
            Borrar Uno
        </button>
    </div>
{/if}

</div>

<!--TABLA  -->

<Table class="table">
    <tbody>
        <tr>
            <th class="title" on:click={() => handleClick('degree')}>Grado</th>
            <th class="title" on:click={() => handleClick('location')}>Ciudad</th>
            <th class="title" on:click={() => handleClick('academicYear')}>Año academico</th>
            <th class="title" on:click={() => handleClick('dropoutFirstCourse')}>Tasa de abandono 1er curso</th>
            <th class="title" on:click={() => handleClick('dropoutSecondCourse')}>Tasa de abandono 2er curso</th>
            <th class="title" on:click={() => handleClick('dropoutThirdCourse')}>Tasa de abandono 3er curso</th>
            <th class="title" on:click={() => handleClick('dropoutsFirstCourse')}>Número de abandonos 1er curso</th>
            <th class="title" on:click={() => handleClick('dropoutsSecondCourse')}>Número de abandonos 2er curso</th>
            <th class="title" on:click={() => handleClick('dropoutsThirdCourse')}>Número de abandonos 3er curso</th>
            <th class="title" on:click={() => handleClick('dropoutRate')}>Tasa de abandono</th>
            <th class="title" on:click={() => handleClick('efficiencyRate')}>Tasa de eficiencia</th>
            <th class="title" on:click={() => handleClick('successRate')}>Tasa de éxito</th>
            <th class="title" on:click={() => handleClick('progressNormalized')}>Progreso normalizado</th>
            <th class="title" on:click={() => handleClick('performanceRate')}>Tasa de rendimiento</th>
            <th class="title" on:click={() => handleClick('cohortStudents')}>Estudiantes cohorte</th>
            <th class="title" on:click={() => handleClick('graduationRate')}>Tasa de graduacion</th>
        </tr>
        
        {#each UniversityAcademicPerformance as universityD,index}
            <tr class={getcolorClass(index)}>
                <td class="transparent">
                    {universityD.degree}
                </td>
                <td class="transparent">
                    {universityD.location}
                </td>
                <td class="transparent">
                    {universityD.academicYear}
                </td>
                <td class="transparent">
                    {universityD.dropoutFirstCourse}
                </td>
                <td class="transparent">
                    {universityD.dropoutSecondCourse}
                </td>
                <td class="transparent">
                    {universityD.dropoutThirdCourse}
                </td>
                <td class="transparent">
                    {universityD.dropoutsFirstCourse}
                </td>
                <td class="transparent">
                    {universityD.dropoutsSecondCourse}
                </td>
                <td class="transparent">
                    {universityD.dropoutsThirdCourse}
                </td>
                <td class="transparent">
                    {universityD.dropoutRate}
                </td>
                <td class="transparent">
                    {universityD.efficiencyRate}
                </td>
                <td class="transparent">
                    {universityD.successRate}
                </td>
                <td class="transparent">
                    {universityD.progressNormalized}
                </td>
                <td class="transparent">
                    {universityD.performanceRate}
                </td>
                <td class="transparent">
                    {universityD.cohortStudents}
                </td>
                <td class="transparent">
                    {universityD.graduationRate}
                </td>
                <td class="last-td">
                    <div class="btns-table">
                    <button class="btn-red" on:click={() => {deleteOne(universityD.degree, universityD.location, universityD.academicYear)}}>Borrar</button>
                    <button class="btn-green" on:click={() => getOne({degree:universityD.degree, location:universityD.location,academicYear: universityD.academicYear})}>Mirar</button>
                </div>
                </td>
            </tr>
        {/each}

    </tbody>
</Table>
  

<style>

.last-td{
  background-color: transparent;
  border: 2px solid black;
}

/*  CSS MENSAJE DE ERROR*/ 

.error-message{
  background-color: #ffe5e5;
  color: #d8000c;
  border: 1px solid #d8000c;
  padding: 12px 16px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 14px;
  margin: 12px 0;
  box-shadow: 0 2px 4px rgba(216, 0, 12, 0.1);
}

/*  CSS MENSAJE DE ÉXITO*/ 

.sucess-message{
  background-color: #ffe5e5;
  color: #00d80e;
  border: 1px solid #00d80e;;
  padding: 12px 16px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 14px;
  margin: 12px 0;
  box-shadow: 0 2px 4px rgba(216, 0, 12, 0.1);
}

/*  CSS INPUTS FILTRO DIFERENTE */ 

.inputs-years{
  width: 100px;           
  padding: 4px 8px;       
  font-size: 12px;        
  line-height: 1.2;        
  border: 1px solid #ccc; 
  border-radius: 4px;     
  box-sizing: border-box; 
}

/*  CSS CONTENEDOR DE LOS BOTONES */ 

.container-btns{
    margin-bottom: 5px; 
    padding: 10px;
    display: flex;
    justify-content: center;  
    align-items: center;      
    flex-wrap: wrap;         
    gap: 19px;                
}

/*  CSS TABLA*/ 

.table{
    border: 2px solid black;   
    width: 100%;
}

/*  CSS CONTENEDOR DE LOS BOTONES EN LA TABLA*/ 

.btns-table{
  display: flex;
  flex-direction: column; 
  gap: 8px;                
  align-items: center; 
  margin-top: 8px;
  font-family: "Merriweather", serif;
}

/*  CSS CONTENEDOR DE LOS TITULOS DE LA GRAFICA */ 

.title{
    background-color: orange;
    border: 2px solid black;
    transition: background-color 0.2s;
    cursor: pointer;
    font-family: "Montserrat", "Helvetica Neue", Arial, sans-serif;
}

.title:hover {
    background-color: #ddd;
}

/*  CSS DATOS TABLA */ 

.transparent{
    background-color: transparent;
    border-top: 2px solid black;
    border-bottom: 2px solid black;
    font-family: "Playfair Display", serif;
}

/*  CSS COLOR variable 1 */ 

.color-green {
    background-color: #57fda2; 
    
}

/*  CSS COLOR variable 2 */ 

.color-ligthgreen {
    background-color: #bde844;
}

/*  CSS BOTONES MIRAR Y FILTRAR */ 

.btn-green {
    background-color: #4CAF50; 
    color: white;
    cursor: pointer;
    text-align: center;
    font-family: "Merriweather", serif;
}

/*  CSS BOTONES BORRAR */ 

.btn-red {
    background-color: #f44336; 
    color: white;
    cursor: pointer;
    text-align: center;
    font-family: "Merriweather", serif;
}

/*  CSS BOTON POST */ 

.btn-yellow {
    background-color: 	#ebca60;
    color: white;
    cursor: pointer;
    text-align: center;
    font-family: "Merriweather", serif;
}

/*  CSS BOTON UPDATE*/ 

.btn-blue {
    background-color: #2196F3; 
    color: white;
    cursor: pointer;
    text-align: center;
    font-family: "Merriweather", serif;
}

/*  CSS BOTON LOADINITIAL DATA*/

.btn-purple {
    background-color: #950d7e; 
    color: white;
    cursor: pointer;
    text-align: center;
    font-family: "Merriweather", serif;
}

</style>