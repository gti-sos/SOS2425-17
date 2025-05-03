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
    let API = "/api/v2/students_satisfaction";

    if (dev) {
        API = DEVEL_HOST + API;
    }

    let myData = [];
    let resultadoSatisfaccion = [];

    // Función para obtener los datos del backend
    async function getData() {
        try {
            const res = await fetch(API, { method: "GET" });
            const data = await res.json();
            myData = data;
            console.log(`Response received:\n${JSON.stringify(myData, null, 2)}`);
        } catch (error) {
            console.log(`ERROR: GET from ${API}: ${error}`);
        }
    }

    // Función para calcular la media de satisfacción por ciudad
    async function calculateAverageSatisfactionByCity() {
        await getData(); // Cargar los datos

        const grouped = {};

        for (const entry of myData) {
            const { ciudad, satisfaccion_total } = entry;

            if (!grouped[ciudad]) {
                grouped[ciudad] = {
                    ciudad,
                    totalSatisfaccion: 0,
                    count: 0
                };
            }

            grouped[ciudad].totalSatisfaccion += parseFloat(satisfaccion_total) || 0;
            grouped[ciudad].count += 1;
        }

        // Calcular la media de satisfacción para cada ciudad
        return Object.values(grouped).map(item => ({
            ciudad: item.ciudad,
            averageSatisfaction: item.totalSatisfaccion / item.count
        }));
    }

    onMount(async () => {
        resultadoSatisfaccion = await calculateAverageSatisfactionByCity();

        // Obtener las ciudades y sus medias
        const ciudades = resultadoSatisfaccion.map(item => item.ciudad);
        const medias = resultadoSatisfaccion.map(item => item.averageSatisfaction);

        // Crear la gráfica
        // @ts-ignore
        Highcharts.chart('container', {
            chart: {
                type: 'bar', // Cambiar a gráfico de barras
                styledMode: true
            },
            title: {
                text: 'Media de satisfacción total por ciudad'
            },
            xAxis: {
                categories: ciudades, // Ciudades en el eje Y
                title: {
                    text: 'Ciudades'
                }
            },
            yAxis: {
                min: 0,
                max: 10, // Rango de 0 a 10
                title: {
                    text: 'Media de satisfacción total'
                }
            },
            plotOptions: {
                bar: {
                    borderRadius: 5
                }
            },
            series: [{
                name: 'Media de satisfacción',
                data: medias, // Medias de satisfacción
                tooltip: {
                    valueSuffix: ' puntos'
                }
            }]
        });
    });
</script>

<figure class="highcharts-figure">
    <div id="container"></div>
</figure>
