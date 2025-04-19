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
    /**
	 * @type {any[]}
	 */
    let satisfactionData = [];
    let result = "";
    let resultStatus = "";

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

    async function createStudentsSatisfaction() {
        //Para que siempre que llamemos a la funcion esos campos esten vacios
        resultStatus = result = "";
        //Esta funcion lo que hace es que recorre la api con un get y mete los datos en res
        //Se hace await por el async 
        
        try{

            const res  = await fetch(Api,{
                method: "POST", 
                header:{
                    "Content-type": "application/json"
                },
                body:
            });
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

</script>

<Table>
    <thead>
        <tr>
            <th>carrera</th>
            <th>ciudad</th>
            <th>satisfaccion_total</th>
            <th>sat_estudiantes</th>
            <th>satisfaccion_pdi</th>
            <th>actions</th>
        </tr>
    </thead>
    <tbody>
        {#each satisfactionData as s}
        <tr>
            <td>
                {s.carrera}
            </td>
            <td>
                {s.ciudad}
            </td>
            <td>
                {s.satisfaccion_total}
            </td>
            <td>
                {s.sat_estudiantes}
            </td>
            <td>
                {s.satisfaccion_pdi}
            </td>
            <td>
                
            </td>
        </tr>
        {/each}
    </tbody>
</Table>