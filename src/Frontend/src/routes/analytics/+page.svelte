

<svelte:head>
    
<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>
<script src="https://code.highcharts.com/modules/accessibility.js"></script>

</svelte:head>


<style>

    .highcharts-figure,
    .highcharts-data-table table {
        min-width: 310px;
        max-width: 800px;
        margin: 1em auto;
    }

    #container {
        height: 400px;
    }

    .highcharts-data-table table {
        font-family: Verdana, sans-serif;
        border-collapse: collapse;
        border: 1px solid #ebebeb;
        margin: 10px auto;
        text-align: center;
        width: 100%;
        max-width: 500px;
    }

    .highcharts-data-table caption {
        padding: 1em 0;
        font-size: 1.2em;
        color: #555;
    }

    .highcharts-data-table th {
        font-weight: 600;
        padding: 0.5em;
    }

    .highcharts-data-table td,
    .highcharts-data-table th,
    .highcharts-data-table caption {
        padding: 0.5em;
    }

    .highcharts-data-table thead tr,
    .highcharts-data-table tbody tr:nth-child(even) {
        background: #f8f8f8;
    }

    .highcharts-data-table tr:hover {
        background: #f1f7ff;
    }

    .highcharts-description {
        margin: 0.3rem 10px;
    }

</style>


<script>

    import { onMount } from "svelte";
    import { dev } from "$app/environment"; 

    let DEVEL_HOST = "http://localhost:16078";

    let API = "/api/v2";

    if(dev)
    API = DEVEL_HOST + API;

    /**
     * @type {never[]}
     */

    let dataJav = [];
    let result = "";
    let resultStatus = "";
    let dataPab = [];
    let dataAle = [];
    let data = [];

    //Funcion para sacar los datos 
    async function getDataJavier(){
        resultStatus = result = "";

        try {

            //Cargo los datos iniciales
            await fetch("/api/v2/university-demands/loadInitialData")

            const res = await fetch(API+"/university-demands",{method:"GET"});

            const data = await res.json();
            result = JSON.stringify(data,null,2);

            dataJav = data;
            //console.log(`Response received:\n${JSON.stringify(dataJav,null,2)}`);
            console.log(dataJav.length);

        } catch (error){
            console.log(`ERROR:  GET from ${API+"/university-demands"}: ${error}`);
        }
    }

    async function getUniversityAcademicPerformance() {

        try{
            console.log("Cargado de datos...");
            await fetch("/api/v2/university-academic-performance/loadInitialData");
            const response = await fetch("/api/v2/university-academic-performance");
            const json = await response.json();
            dataPab = json;
            //console.log(`Response received:\n${JSON.stringify(dataPab,null,2)}`);
        }catch (error){
            console.log(`ERROR:  GET from ${API+"/university-academic-performance"}: ${error}`);
        }
      
    }

    async function getDataALE(){
        resultStatus = result = "";

        try {

            //Cargo los datos iniciales
            await fetch("/api/v2/students_satisfaction/loadInitialData")

            const res = await fetch(API+"/students_satisfaction",{method:"GET"});

            const data = await res.json();
            result = JSON.stringify(data,null,2);

            dataAle = data;

        } catch (error){
            console.log(`ERROR:  GET from ${API+"/students_satisfaction"}: ${error}`);
        }
    }

    //Javier

    async function GraduatedByDegree(anio = "2016-2017",ciudad = "MÉRIDA") {
        getDataJavier().then(() => {
        dataJav = dataJav
        .filter(item => item.academicYear === anio && item.location === ciudad)
        .map(item => ({
        degree: item.degree,
        graduated: (item.graduated / ((item.over45 ?? 0) +(item.spanishFirst ?? 0) +(item.foreigners ?? 0)))*100
        }));
        });
    }

    //console.log(GraduatedByDegree());
    

    //Pablo

   async function dropOutByDegree(anio = "2016-2017",ciudad = "MÉRIDA") {
        await getUniversityAcademicPerformance().then(() => {
        dataPab = dataPab
        .filter(item => item.academicYear === anio && item.location === ciudad)
        .map(item => ({
        degree: item.degree,
        dropoutRate: item.dropoutRate
        }));
        });   
    }

    //Alejandro

    async function satisfactionByDegree(anio = "2016-2017",ciudad = "MÉRIDA") {
        await getDataALE().then(() => {
        dataAle = dataAle
        .filter(item => item.año_academico === anio && item.ciudad === ciudad)
        .map(item => ({
        carrera: item.carrera,
        satisfaccion_total: item.satisfaccion_total *10
        }));
        //console.log(dataAle);
        });   
    }

    async function getData() {
        await GraduatedByDegree();
        await dropOutByDegree();
        await satisfactionByDegree();

    }

    async function combinarDatos() {

        await getData().then(() => {

            const mapa = new Map();

        // data1: [{ degree, dropoutRate }]
        
        dataPab.forEach(item => {
            mapa.set(item.degree, { degree: item.degree, dropoutRate: item.dropoutRate });
        });

        // data2: [{ degree, efficiencyRate }]
        dataAle.forEach(item => {
            if (!mapa.has(item.carrera)) mapa.set(item.carrera, { degree: item.carrera });
            mapa.get(item.carrera).satisfaccion_total = item.satisfaccion_total;
        });

        // data3: [{ degree, graduationRate }]
        dataJav.forEach(item => {
            if (!mapa.has(item.degree)) mapa.set(item.degree, { degree: item.degree });
            mapa.get(item.degree).graduated = item.graduated;
        });
        data = Array.from(mapa.entries())
        console.log("1")
        console.log(Array.from(mapa.values()));
        console.log("2")
            
        });
    }

    onMount(async () => {
        
        await combinarDatos();

        // @ts-ignore
        console.log("esto es data",data)
        console.log(data.map(item => item[1].satisfaccion_total))
        console.log("1")
        console.log("1")

        Highcharts.chart('container', {
        chart: {
            type: 'column',
            scrollablePlotArea: {
            minWidth: 2500
    }
        },
        title: {
            text: 'Comparativa de Abandono, Satisfacción y Graduados por Carrera en el Año 2016 en MÉRIDA'
        },
        subtitle: {
            text:
                'Grafico de Highcharts (Basic column)'
        },
        xAxis: {
            categories: data.map(item => item[0]),
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Personas / Tasa'
            }
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [
            {
                name: 'Tasa Abandono',
                data: data.map(item => item[1].dropoutRate)
            },
            {
                name: 'Graduados',
                data: data.map(item => item[1].graduated)

            },
            {
                name: 'Satisfacción Total',
                data: data.map(item => item[1].satisfaccion_total)
            }
        ]

    });

    });
    
</script>

<figure class="highcharts-figure">
    <div id="container"></div>
</figure>
	
