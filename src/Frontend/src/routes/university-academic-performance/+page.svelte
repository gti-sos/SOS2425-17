<svelte:head>
    <title>UniversityAcademicPerformance</title>
</svelte:head>

<script>
    import { Table } from '@sveltestrap/sveltestrap'; 
    import { dev } from '$app/environment';
    import { onMount } from "svelte";
    import { Button } from '@sveltestrap/sveltestrap';


    let ruta_host = "http://localhost:16078";
    let ruta_api = "/api/v1/university-academic-performance";

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




    let showfilterForm = false; 
    let showDeleteForm = false;
    let showEditForm = false;
    let showSearchForm = false;
    let showFilterForm = false; // Para mostrar/ocultar el formulario
    let showCreateForm = false;
    let showUpdateForm = false;
    let successMessage = "";
    let errorMessage = "";
    let fromYear = '';
    let toYear = '';
    let searchParamKey = "";
    let searchParamValue = "";
    let deleteDegree="";
    let deleteLocation="";
    let deleteAcademiYear="";

    



    


    // Campos del filtro (diferente de los de creación)
    let filterUniversityAcademicPerformanceDegree="";
    let filterUniversityAcademicPerformanceLocation=""
    let filterUniversityAcademicPerformanceDropoutSecondCourse="";
    let filterUniversityAcademicPerformanceEfficiencyRate="";
    let filterUniversityAcademicPerformanceDropoutThirdCourse="";
    let filterUniversityAcademicPerformanceSuccessRate="";
    let filterUniversityAcademicPerformanceDropoutFirstCourse="";
    let filterUniversityAcademicPerformanceDropoutsThirdCourse="";
    let filterUniversityAcademicPerformanceProgressNormalized="";
    let filterUniversityAcademicPerformanceDropoutsFirstCourse="";
    let filterUniversityAcademicPerformancePerformanceRate="";
    let filterUniversityAcademicPerformanceCohortStudents="";
    let filterUniversityAcademicPerformanceDropoutsSecondCourse="";
    let filterUniversityAcademicPerformanceDropoutRate="";
    let filterUniversityAcademicPerformanceGraduationRate="";
    let filterUniversityAcademicPerformanceAcademicYear="";









    if (dev) {
        ruta_api = ruta_host + ruta_api;
    }


    //  Cargar datos al iniciar la página
    onMount(async () => {
        await getUniversityAcademicPerformance();
    });

    //  Obtener datos de la API
    async function getUniversityAcademicPerformance() {
        output = "";
        status = "";
        try {
            let data = await fetch(ruta_api, { method: "GET" }).then(response => response.json());
            UniversityAcademicPerformance = data;
            output = JSON.stringify(data, null, 2);
            console.log(`Response received: ${output}`);
        } catch (error) {
            console.log(`Error: Get from ${ruta_api} : ${error}`);
        }
    }

    // Cargar datos iniciales
    function getLoadInitialData() {
    fetch("/api/v1/university-academic-performance/loadInitialData")
        .then(response => {
            if (response.status === 201) {
                console.log("Datos iniciales insertados correctamente");
                successMessage = "¡Datos iniciales insertados correctamente!";
                setTimeout(() => { successMessage = ""; }, 3000);
                getUniversityAcademicPerformance();
            } else if (response.status === 409) {
                console.log("La base de datos ya tiene datos. Elimínalos primero.");
                errorMessage = "¡La base de datos ya tiene datos! Elimínalos primero.";
                setTimeout(() => { errorMessage = ""; }, 3000);
            } else {
                console.log("Error al insertar los datos");
                errorMessage = "Error al insertar los datos";
                setTimeout(() => { errorMessage = ""; }, 3000);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            errorMessage = "Error al cargar los datos iniciales";
            setTimeout(() => { errorMessage = ""; }, 3000);
        });
}

    //Filtrar por un dato 


async function getOne(params = {}) {
    status = output = "";
    


    try {
        const filteredParams = Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value !== undefined));
        const queryString = new URLSearchParams(filteredParams).toString();
        const url = `${ruta_api}?${queryString}`;

            const res = await fetch(url, { method: "GET" });
            console.log("La URL es:", url);

        status = res.status;

            if (status === 404) {
                const firstParamKey = Object.keys(params)[0];
                const firstParamValue = params[firstParamKey];
                errorMessage = `No se encontró ningún resultado con ${firstParamKey} = ${firstParamValue}`;
                setTimeout(() => {
                errorMessage = "";
                }, 3000);
            } 

        const data = await res.json();
        UniversityAcademicPerformance=data;

        output = JSON.stringify(data, null, 2);
        console.log(`Response received:\n${output}`);
    } catch (error) {
        console.log(`Error: GET from ${ruta_api} - ${error}`);
        errorMessage = "Error al obtener los datos.";

        // Oculta el mensaje después de unos segundos
        setTimeout(() => {
            errorMessage = "";
        }, 3000);
    }
}


async function createUniversityAcademicPerformance() {
    errorMessage = successMessage = "";

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
        const res = await fetch("/api/v1/university-academic-performance", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newRecord)
        });

        if (res.status === 201) {
            successMessage = "¡Registro creado correctamente!";
            await getUniversityAcademicPerformance();
            showCreateForm = false;

        } else if (res.status === 409) {
            errorMessage = "El registro ya existe.";
        } else if (res.status === 400) {
            errorMessage = "Faltan campos obligatorios.";
        } else {
            errorMessage = "Error desconocido al crear el registro.";
        }
    } catch (err) {
        console.error("Error al hacer POST:", err);
        errorMessage = "Error de conexión o servidor.";
    }

    setTimeout(() => {
        errorMessage = successMessage = "";
    }, 3000);
}






async function updateUniversityAcademicPerformance() {
    errorMessage = successMessage = "";

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
        const res = await fetch(`/api/v1/university-academic-performance/${UniversityAcademicPerformanceDegree}/${UniversityAcademicPerformanceLocation}/${UniversityAcademicPerformanceAcademicYear}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedRecord)
        });

        if (res.status === 200) {
            successMessage = "¡Registro actualizado correctamente!";
            await getUniversityAcademicPerformance();
            showEditForm = false;

            // Limpiar los campos si quieres
        } else if (res.status === 400) {
            errorMessage = "Campos obligatorios incompletos o modificación no permitida.";
        } else if (res.status === 404) {
            errorMessage = "Registro no encontrado.";
        } else {
            errorMessage = "Error desconocido al actualizar.";
        }
    } catch (err) {
        console.error("Error al hacer PUT:", err);
        errorMessage = "Error de conexión o servidor.";
    }

    setTimeout(() => {
        errorMessage = successMessage = "";
    }, 3000);
}



//Borro Todo
// Función para borrar todos los registros
async function deleteAll() {
    successMessage = "";
    errorMessage = "";

    try {
        const res = await fetch(ruta_api, { method: "DELETE" });

        console.log("Status Code:", res.status);  // Muestra el status code de la respuesta

        if (res.status === 200) {
            const responseBody = await res.json();  // Obtener la respuesta JSON
            console.log(responseBody);  // Mostrar la respuesta completa

            console.log("All demands deleted");
            successMessage = "¡Demandas borradas con éxito!";
            await(getUniversityAcademicPerformance());

            // Ocultar el mensaje después de unos segundos
            setTimeout(() => {
                successMessage = "";
            }, 3000);
        } else {
            console.error("ERROR deleting demands", res);
            errorMessage = "Error al borrar todos los datos: " + (await res.text());

            // Ocultar el mensaje después de unos segundos
            setTimeout(() => {
                errorMessage = "";
            }, 3000);
        }
    } catch (error) {
        console.log(`ERROR: DELETE from ${ruta_api}: ${error}`);
        errorMessage = "Error de conexión o servidor";

        // Ocultar el mensaje después de unos segundos
        setTimeout(() => {
            errorMessage = "";
        }, 3000);
    }
}



//BORRA UNO


async function deleteDemands(degree, location, academicYear){
        output = "";
        status = "";
        
        try {
            //Basicamente lo que llamo es a api/v1/university-demands/degree/location/academicYear que es donde tengo el 
            //delete especifico
            

            console.log("Intentando borrar URL:", ruta_api + "/" + degree + "/" + location + "/" + academicYear);

            const res = await fetch(`${ruta_api}/${encodeURIComponent(degree)}/${encodeURIComponent(location)}/${encodeURIComponent(academicYear)}`, {method: "DELETE"});
            

            status = res.status;

            if (status === 200) {
                console.log(`Demand ${degree} in ${location} in ${academicYear} deleted`);
                getUniversityAcademicPerformance(); // más lógico que recargar los datos con loadInitialData
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
            console.log(`ERROR:  GET from ${ruta_api}: ${error}`);
        }

    }


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
      graduationRate: UniversityAcademicPerformanceGraduationRate
    };
    getOne(params);
  }

  function getRowClass(index) {
    return index % 2 === 0 ? "row-even" : "row-odd";
  }




</script>



{#if successMessage}
<div class="success">{successMessage}</div>
{/if}
{#if errorMessage}
<div class="error">{errorMessage}</div>
{/if}


<div class="container">
    <button class="btn-morado" on:click={getLoadInitialData}>
        Cargar datos iniciales
    </button>


    <button class="btn-verde" on:click={getUniversityAcademicPerformance}>
        Mira datos
    </button>

<!-- Botón que muestra/oculta el formulario -->
<button class="btn-verde" on:click={() => showfilterForm = !showfilterForm}>
    {showfilterForm ? "cancelar" : "filtrado"}
  </button>
  
  {#if showfilterForm}
    <div class="formulario">
      <!-- Tus inputs bind:value aquí... -->
      <input placeholder="Grado" bind:value={UniversityAcademicPerformanceDegree} />
      <input placeholder="Localización" bind:value={UniversityAcademicPerformanceLocation} />
      <input placeholder="Año académico" bind:value={UniversityAcademicPerformanceAcademicYear} />
      <input placeholder="Abandono 1er curso (%)" type="number" bind:value={UniversityAcademicPerformanceDropoutFirstCourse} />
      <input placeholder="Abandono 2º curso (%)" type="number" bind:value={UniversityAcademicPerformanceDropoutSecondCourse} />
      <input placeholder="Abandono 3º curso (%)" type="number" bind:value={UniversityAcademicPerformanceDropoutThirdCourse} />
      <input placeholder="Nº abandonos 1er curso" type="number" bind:value={UniversityAcademicPerformanceDropoutsFirstCourse} />
      <input placeholder="Nº abandonos 2º curso" type="number" bind:value={UniversityAcademicPerformanceDropoutsSecondCourse} />
      <input placeholder="Nº abandonos 3º curso" type="number" bind:value={UniversityAcademicPerformanceDropoutsThirdCourse} />
      <input placeholder="Tasa eficiencia (%)" type="number" bind:value={UniversityAcademicPerformanceEfficiencyRate} />
      <input placeholder="Tasa éxito (%)" type="number" bind:value={UniversityAcademicPerformanceSuccessRate} />
      <input placeholder="Progreso normalizado (%)" type="number" bind:value={UniversityAcademicPerformanceProgressNormalized} />
      <input placeholder="Rendimiento (%)" type="number" bind:value={UniversityAcademicPerformancePerformanceRate} />
      <input placeholder="Estudiantes cohorte" type="number" bind:value={UniversityAcademicPerformanceCohortStudents} />
      <input placeholder="Tasa abandono (%)" type="number" bind:value={UniversityAcademicPerformanceDropoutRate} />
      <input placeholder="Tasa graduación (%)" type="number" bind:value={UniversityAcademicPerformanceGraduationRate} />
  
      <!-- 4) Botón que llama a handleActualizar -->
      <button class="btn-verde" on:click={handleActualizar}>
        Actualizar
      </button>
    </div>
  {/if}

    <!-- Botón para mostrar el formulario -->
    <button class="btn-amarillo" on:click={() => showCreateForm = !showCreateForm}>
        {showCreateForm ? "Cancelar" : "Crear nuevo registro"}
    </button>
    
    <!-- Formulario -->
    {#if showCreateForm}
        <div class="formulario">
            <input placeholder="Grado" bind:value={UniversityAcademicPerformanceDegree} />
            <input placeholder="Localización" bind:value={UniversityAcademicPerformanceLocation} />
            <input placeholder="Año académico" bind:value={UniversityAcademicPerformanceAcademicYear} />
            <input placeholder="Abandono 1er curso (%)" type="number" bind:value={UniversityAcademicPerformanceDropoutFirstCourse} />
            <input placeholder="Abandono 2º curso (%)" type="number" bind:value={UniversityAcademicPerformanceDropoutSecondCourse} />
            <input placeholder="Abandono 3º curso (%)" type="number" bind:value={UniversityAcademicPerformanceDropoutThirdCourse} />
            <input placeholder="Nº abandonos 1er curso" type="number" bind:value={UniversityAcademicPerformanceDropoutsFirstCourse} />
            <input placeholder="Nº abandonos 2º curso" type="number" bind:value={UniversityAcademicPerformanceDropoutsSecondCourse} />
            <input placeholder="Nº abandonos 3º curso" type="number" bind:value={UniversityAcademicPerformanceDropoutsThirdCourse} />
            <input placeholder="Tasa eficiencia (%)" type="number" bind:value={UniversityAcademicPerformanceEfficiencyRate} />
            <input placeholder="Tasa éxito (%)" type="number" bind:value={UniversityAcademicPerformanceSuccessRate} />
            <input placeholder="Progreso normalizado (%)" type="number" bind:value={UniversityAcademicPerformanceProgressNormalized} />
            <input placeholder="Rendimiento (%)" type="number" bind:value={UniversityAcademicPerformancePerformanceRate} />
            <input placeholder="Estudiantes cohorte" type="number" bind:value={UniversityAcademicPerformanceCohortStudents} />
            <input placeholder="Tasa abandono (%)" type="number" bind:value={UniversityAcademicPerformanceDropoutRate} />
            <input placeholder="Tasa graduación (%)" type="number" bind:value={UniversityAcademicPerformanceGraduationRate} />
    
            <button class="btn-amarillo" on:click={createUniversityAcademicPerformance}>
                Guardar
            </button>
        </div>
    {/if}

<!-- Botón para mostrar/ocultar el formulario de edición -->
<button class="btn-azul" on:click={() => showEditForm = !showEditForm}>
    {showEditForm ? "Cancelar edición" : "Editar registro"}
</button>

<!-- Formulario de edición -->
{#if showEditForm}
    <div class="formulario">
        <input placeholder="Grado" bind:value={UniversityAcademicPerformanceDegree} />
        <input placeholder="Localización" bind:value={UniversityAcademicPerformanceLocation} />
        <input placeholder="Año académico" bind:value={UniversityAcademicPerformanceAcademicYear} />
        <input placeholder="Abandono 1er curso (%)" type="number" bind:value={UniversityAcademicPerformanceDropoutFirstCourse} />
        <input placeholder="Abandono 2º curso (%)" type="number" bind:value={UniversityAcademicPerformanceDropoutSecondCourse} />
        <input placeholder="Abandono 3º curso (%)" type="number" bind:value={UniversityAcademicPerformanceDropoutThirdCourse} />
        <input placeholder="Nº abandonos 1er curso" type="number" bind:value={UniversityAcademicPerformanceDropoutsFirstCourse} />
        <input placeholder="Nº abandonos 2º curso" type="number" bind:value={UniversityAcademicPerformanceDropoutsSecondCourse} />
        <input placeholder="Nº abandonos 3º curso" type="number" bind:value={UniversityAcademicPerformanceDropoutsThirdCourse} />
        <input placeholder="Tasa eficiencia (%)" type="number" bind:value={UniversityAcademicPerformanceEfficiencyRate} />
        <input placeholder="Tasa éxito (%)" type="number" bind:value={UniversityAcademicPerformanceSuccessRate} />
        <input placeholder="Progreso normalizado (%)" type="number" bind:value={UniversityAcademicPerformanceProgressNormalized} />
        <input placeholder="Rendimiento (%)" type="number" bind:value={UniversityAcademicPerformancePerformanceRate} />
        <input placeholder="Estudiantes cohorte" type="number" bind:value={UniversityAcademicPerformanceCohortStudents} />
        <input placeholder="Tasa abandono (%)" type="number" bind:value={UniversityAcademicPerformanceDropoutRate} />
        <input placeholder="Tasa graduación (%)" type="number" bind:value={UniversityAcademicPerformanceGraduationRate} />

        <button class="btn-verde" on:click={updateUniversityAcademicPerformance}>
            Actualizar
        </button>
    </div>
{/if}







    <button class="btn-rojo" on:click={deleteAll}>
        borra todo
    </button>

<!-- Botón para mostrar/ocultar el formulario de borrado -->
<button class="btn-rojo" on:click={() => showDeleteForm = !showDeleteForm}>
    {showDeleteForm ? "Cancelar" : "Borrar registro"}
</button>

<!-- Formulario para borrar demanda específica -->
{#if showDeleteForm}
    <div class="formulario">
        <input placeholder="Grado" bind:value={deleteDegree} />
        <input placeholder="Localización" bind:value={deleteLocation} />
        <input placeholder="Año académico" bind:value={deleteAcademiYear} />

        <button class="btn-verde" on:click={() => deleteDemands(deleteDegree, deleteLocation, deleteAcademiYear)}>
            Borrar Uno
        </button>
    </div>
{/if}

</div>


<Table class="table">
    <tbody>
        <tr>
            <th class="titles-big">Grado</th>
            <th class="titles-big">Ciudad</th>
            <th class="titles-small">Año academico</th>
            <th class="titles-small">Número de abandonos 1er curso</th>
            <th class="titles-small">Número de abandonos 2er curso</th>
            <th class="titles-small">Número de abandonos 3er curso</th>
            <th class="titles-small">Tasa de abandono 1er curso</th>
            <th class="titles-small">Tasa de abandono 2er curso</th>
            <th class="titles-small">Tasa de abandono 3er curso</th>
            <th class="titles-small">Tasa de abandono</th>
            <th class="titles-small">Nivel de progreso</th>
            <th class="titles-small">Tasa de rendimiento</th>
            <th class="titles-small">Cohorte</th>
            <th class="titles-small">Tasa de graduacion</th>
        </tr>
        
        <!-- Esto ejecuta tantos tr como contacts haya -->
        {#each UniversityAcademicPerformance as universityD,index}
            <tr class={getRowClass(index)}>
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
                <td class="btns-table">
                    <button class="btn-rojo" on:click={() => {deleteDemands(universityD.degree, universityD.location, universityD.academicYear)}}>Borrar</button>
                    <button class="btn-azul" on:click={() => updateUniversityAcademicPerformance()}>Editar</button>
                </td>
            </tr>
        {/each}

    </tbody>
</Table>
  

<style>
.container{

    margin-bottom: 5px; /* Espacio entre los botones y la tabla */
    padding: 10px;

}
.table{
    border: 2px solid black;   /* Opcional: borde superior para la celda de los botones */
    width: 100%;

}
.btns-table{
  background-color: transparent;
  gap: 8px;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
  border-right: 2px solid black;
  border-left: 2px solid black;

  margin: 8px; /* Separación entre botones */
}
.titles-big{
    background-color: orange;
    border: 2px solid black;
    width: 150px; /* Ancho fijo para cada botón */
}
.titles-small{
    width: 50px; /* Ancho fijo para cada botón */
    background-color: orange;
    border: 2px solid black;

}
.transparent{
    background-color: transparent;
    border-top: 2px solid black;
    border-bottom: 2px solid black;
}
.row-even {
    background-color: #57fda2; /* gris clarito */
    
}

.row-odd {
    background-color: #bde844; /* blanco */
}

.btn-verde {
    background-color: #4CAF50; /* verde */
    color: white;
    cursor: pointer;
    text-align: center;
}

.btn-rojo {
    background-color: #f44336; /* rojo */
    color: white;
    cursor: pointer;
    text-align: center;
}

.btn-amarillo {
    background-color: #FFC107; /* amarillo */
    color: black;
    cursor: pointer;
    text-align: center;
}

.btn-azul {
    background-color: #2196F3; /* azul */
    color: white;
    cursor: pointer;
    text-align: center;
}

.btn-naranja {
    background-color: #e17110; /* azul */
    color: white;
    cursor: pointer;
    text-align: center;
}
.btn-morado {
    background-color: #950d7e; /* azul */
    color: white;
    cursor: pointer;
    text-align: center;
}

</style>


