<svelte:head>
    
<!--Cargo las bibliotecas de highcharts -->
	<script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
	
</svelte:head>


<style>

    @import url("https://code.highcharts.com/css/highcharts.css");

    .highcharts-figure,
    .highcharts-data-table table {
        min-width: 310px;
        max-width: 800px;
        margin: 1em auto;
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

    .highcharts-yaxis .highcharts-axis-line {
        stroke-width: 2px;
    }

    /* Link the series colors to axis colors */
    .highcharts-color-0 {
        fill: #7cb5ec;
        stroke: #7cb5ec;
    }

    .highcharts-axis.highcharts-color-0 .highcharts-axis-line {
        stroke: #7cb5ec;
    }

    .highcharts-axis.highcharts-color-0 text {
        fill: #7cb5ec;
    }

    .highcharts-color-1 {
        fill: #90ed7d;
        stroke: #90ed7d;
    }

    .highcharts-axis.highcharts-color-1 .highcharts-axis-line {
        stroke: #90ed7d;
    }

    .highcharts-axis.highcharts-color-1 text {
        fill: #90ed7d;
    }

    .highcharts-description {
        margin: 0.3rem 10px;
    }

</style>

<script>

    import { onMount } from "svelte";
    import { dev } from "$app/environment"; 

    let DEVEL_HOST = "http://localhost:16078";

    let API = "/api/v2/university-demands";

    if(dev)
        API = DEVEL_HOST + API;

    /**
     * @type {never[]}
     */
    

    //Funcion para sacar los datos 

    let myData = [];
    let resultadoGraduados = [];
    let result = "";
    let resultStatus = "";

    //Funcion para sacar los datos 
    async function getData(){
        resultStatus = result = "";

        try {

            //Cargo los datos iniciales
            await fetch("/api/v2/university-demands/loadInitialData")

            const res = await fetch(API,{method:"GET"});

            const data = await res.json();
            result = JSON.stringify(data,null,2);

            myData = data;

        } catch (error){
            console.log(`ERROR:  GET from ${API}: ${error}`);
        }
    }


    async function numGraduateByLocationandYear() {
        await getData(); // Cargo los datos

        const grouped = {};

        for (const entry of myData) {
            //Pngo los parametros que quiero agrupar 
            const { location, academicYear, graduated } = entry;
            //digo que la clave es la localizacion y el año academico
            const key = `${location}__${academicYear}`;

            //Si no existe la clave , pongo que sea 0 
            if (!grouped[key]) {
                grouped[key] = {
                    location,
                    academicYear,
                    totalGraduated: 0
                };
            }
            //Si exista la clave entonces le sume los graduados
            grouped[key].totalGraduated += parseFloat(graduated) || 0;
        }

        return Object.values(grouped); // Lista de objetos agrupados
    } 

    function getGraduadosPorLocalizacion(año, localizaciones, datos) {

        //devuelvo las localizaciones cuyo año sea el que le paso 
        return localizaciones.map(loc => {
            const entry = datos.find(item =>
                item.academicYear === año && item.location === loc
            );
            return entry ? entry.totalGraduated : 0;
        });
    }
        
    onMount(async () => {

        resultadoGraduados  = await numGraduateByLocationandYear();

        // Saco las localizaciones de la funcion de sacar los datos
        const localizacion = [...new Set(resultadoGraduados.map(item => item.location))];

        // Saco el numero de graduados en funcion de la localizacion y el año que le paso
        const numGraduados2016_2017 = getGraduadosPorLocalizacion("2016-2017", localizacion, resultadoGraduados);
        const numGraduados2017_18 = getGraduadosPorLocalizacion("2017-2018", localizacion, resultadoGraduados);
        const numGraduados2018_19 = getGraduadosPorLocalizacion("2018-2019", localizacion, resultadoGraduados);

        // @ts-ignore
        Highcharts.chart('container', {

        chart: {
            type: 'column',
            styledMode: true
        },

        title: {
            text: 'Numero de graduados por provincia en cada año'
        },
        subtitle: {
        text: 'Grafico de Highcharts (Styled mode column)'  
        },

        xAxis: {
            categories: localizacion
        },

        yAxis: [{ // Primary axis
            className: 'highcharts-color-0',
            title: {
                text: 'Numero de graduados'
            }
        }, { // Secondary axis
            className: 'highcharts-color-1',
            opposite: true,
            title: {
                text: 'Años'
            }
        }],

        plotOptions: {
            column: {
                borderRadius: 5
            }
        },

        series: [{
            name: '2016-2017',
            data: numGraduados2016_2017,
            tooltip: {
                valueSuffix: ' personas'
            }
        }, {
            name: '2017-2018',
            data: numGraduados2017_18,
            yAxis: 1
        }, {
            name: '2018-2019',
            data: numGraduados2018_19,
            yAxis: 1
        }]

        });
            
    });
    
</script>


<figure class="highcharts-figure">
    <div id="container"></div>
</figure>
