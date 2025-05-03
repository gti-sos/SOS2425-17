<script>
    import { onMount } from "svelte";
    import { dev } from "$app/environment"; 

    let DEVEL_HOST = "http://localhost:16078";

    let API = "/api/v2/students_satisfaction";
    if(dev)
        API = DEVEL_HOST + API;
    
    let myData = [];
    let resultadoSatisfaccion = [];
    let result = "";
    let resultStatus = "";

    // Función para obtener los datos del backend
    async function getData() {
        resultStatus = result = "";
        try {
            await fetch("/api/v2/students_satisfaction/loadInitialData")
            const res = await fetch(API, { method: "GET" });
            const data = await res.json();
            result = JSON.stringify(data,null,2);
            myData = data;
            console.log(`Response received:\n${JSON.stringify(myData, null, 2)}`);
        } catch (error) {
            console.log(`ERROR: GET from ${API}: ${error}`);
        }
    }

    // Función para calcular las medias de satisfacción por ciudad
    async function calculateAverageSatisfactionByCity() {
        await getData();

        const grouped = {};

        for (const entry of myData) {
            const { ciudad, satisfaccion_total, sat_estudiantes, satisfaccion_pdi } = entry;

            if (!grouped[ciudad]) {
                grouped[ciudad] = {
                    ciudad,
                    totalSatisfaccion: 0,
                    estudiantesSatisfaccion: 0,
                    pdiSatisfaccion: 0,
                    count: 0
                };
            }

            grouped[ciudad].totalSatisfaccion += parseFloat(satisfaccion_total) || 0;
            grouped[ciudad].estudiantesSatisfaccion += parseFloat(sat_estudiantes) || 0;
            grouped[ciudad].pdiSatisfaccion += parseFloat(sat_estudiantes) || 0;
            grouped[ciudad].count += 1;
        }

        // Calcular las medias de satisfacción para cada ciudad y limitar a 2 decimales
        return Object.values(grouped).map(item => ({
            ciudad: item.ciudad,
            averageTotal: (item.totalSatisfaccion / item.count).toFixed(2),
            averageEstudiantes: (item.estudiantesSatisfaccion / item.count).toFixed(2),
            averagePDI: (item.pdiSatisfaccion / item.count).toFixed(2)
        }));
    }

    onMount(async () => {
        resultadoSatisfaccion = await calculateAverageSatisfactionByCity();

        const ciudades = resultadoSatisfaccion.map(item => item.ciudad);
        const mediasTotal = resultadoSatisfaccion.map(item => parseFloat(item.averageTotal));
        const mediasEstudiantes = resultadoSatisfaccion.map(item => parseFloat(item.averageEstudiantes));
        const mediasPDI = resultadoSatisfaccion.map(item => parseFloat(item.averagePDI));

        console.log("Ciudades:", ciudades);
        console.log("Medias Total:", mediasTotal);
        console.log("Medias Estudiantes:", mediasEstudiantes);
        console.log("Medias PDI:", mediasPDI);

        if (ciudades.length === 0) {
            console.error("No hay datos para mostrar en la gráfica.");
            return;
        }

        Highcharts.chart('container', {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Media de satisfacción por ciudad'
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
                    text: 'Media de satisfacción'
                }
            },
            plotOptions: {
                bar: {
                    borderRadius: 5,
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            series: [{
                name: 'Satisfacción Total',
                data: mediasTotal,
                tooltip: {
                    valueSuffix: ' puntos'
                }
            }, {
                name: 'Satisfacción Estudiantes',
                data: mediasEstudiantes,
                tooltip: {
                    valueSuffix: ' puntos'
                }
            }, {
                name: 'Satisfacción PDI',
                data: mediasPDI,
                tooltip: {
                    valueSuffix: ' puntos'
                }
            }]
        });
    });
</script>
<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>

<figure class="highcharts-figure">
    <div id="container"></div>
    <p class="highcharts-description">
        Este gráfico muestra la media de satisfacción total, de estudiantes y de PDI por ciudad. El eje Y contiene las ciudades, y el eje X muestra las medias en un rango de 0 a 10.
    </p>
</figure>

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

    .highcharts-description {
        margin: 0.3rem 10px;
    }
</style>