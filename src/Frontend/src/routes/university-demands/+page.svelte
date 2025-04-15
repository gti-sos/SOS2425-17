
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
            } else if (response.status === 409) {
                console.log("La base de datos ya tiene datos. Elimínalos primero.");
            } else {
                console.log("Error al insertar los datos");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Error de conexión al cargar datos iniciales");
        });
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
            } else {
                console.log(`ERROR creating demand: status received\n${status}`);
            }

        } catch (error){
            console.log(`ERROR:  GET from ${Api}: ${error}`);
        }


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
            } else {
                console.error(`ERROR deleting demand: status ${status} - response: ${text}`);
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
            } else {
                console.error(`ERROR deleting demands`);
            }

        } catch (error){
            console.log(`ERROR:  GET from ${Api}: ${error}`);
        }

    }
    
</script>
<Table>
    <tbody>

        <tr>
            <td>
                <input type="text" placeholder="LOCATION" bind:value={newUniversityLocation}>  
            </td>
            <td>
                <input type="text" placeholder="DEGREE" bind:value={newUniversityDegree}>  
            </td>
            <td>
                <input type="text" placeholder="OVER45" bind:value={newUniversityOver45}>  
            </td>
            <td>
                <input type="text" placeholder="SPANISHFIRST" bind:value={newUniversitySpanish}>  
            </td>
            <td>
                <input type="text" placeholder="FOREIGNERS" bind:value={newUniversityForeigners}>  
            </td>
            <td>
                <input type="text" placeholder="GRADUATED" bind:value={newUniversitygraduated}>  
            </td>
            <td>
                <input type="text" placeholder="ACADEMICYEAR" bind:value={newUniversityAcademicYear}>  
            </td>
            
        </tr>
        <tr>
            <td>
                <!--Para que ejecuto la funcion createContatcs al pulsar el boton -->
            <Button color="primary" on:click={createUniversityDemands}>Create</Button>
            </td>
            <td>
                <Button color = "primary" id="load-data-btn" on:click={getLoadInitialData}>Load Data</Button>
            </td>
            <td>
                <Button color = "primary" id="load-data-btn" on:click={deleteAllDemands}>Delete ALL</Button>
            </td>
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
                <Button color="danger" on:click={() => {deleteDemands(universityD.degree, universityD.location, universityD.academicYear)}}>Delete</Button>
                
            </td>
        </tr>
        {/each}

    </tbody>
</Table>
    
        

