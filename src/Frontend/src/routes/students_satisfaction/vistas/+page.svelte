<script>
    import { onMount } from 'svelte';

    let API = "http://localhost:16078/api/v2/students_satisfaction";
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
        Highcharts.chart('container', {
            chart: {
                type: 'bar' // Cambiar a gráfico de barras
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
                    borderRadius: 5,
                    dataLabels: {
                        enabled: true
                    }
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

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>

<figure class="highcharts-figure">
    <div id="container"></div>
    <p class="highcharts-description">
        Este gráfico muestra la media de satisfacción total por ciudad. El eje Y contiene las ciudades, y el eje X muestra la media de satisfacción en un rango de 0 a 10.
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