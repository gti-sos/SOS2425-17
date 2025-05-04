<script>
    import { onMount } from "svelte";
    import { dev } from "$app/environment"; 

    let DEVEL_HOST = "http://localhost:16078";

    let API = "/api/v2/students_satisfaction";
    if(dev)
        API = DEVEL_HOST + API;
    
    let myData = [];
    let resultadoSatisfaccion = [];
    let resultadoSatisfaccionPorAño = [];
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

    // Función para calcular el porcentaje de satisfacción media por año
    async function calculateSatisfactionPercentageByYear() {
        const grouped = {};

        for (const entry of myData) {
            const { año_academico, satisfaccion_total } = entry;

            if (!grouped[año_academico]) {
                grouped[año_academico] = {
                    año_academico,
                    totalSatisfaccion: 0,
                    count: 0
                };
            }

            grouped[año_academico].totalSatisfaccion += parseFloat(satisfaccion_total) || 0;
            grouped[año_academico].count += 1;
        }

        // Calcular la media de satisfacción para cada año
        const data = Object.values(grouped).map(item => ({
            año_academico: item.año_academico,
            averageSatisfaction: item.totalSatisfaccion / item.count
        }));

        // Calcular el porcentaje de cada año respecto al total
        const totalSatisfaction = data.reduce((sum, item) => sum + item.averageSatisfaction, 0);

        return data.map(item => ({
            category: item.año_academico,
            value: ((item.averageSatisfaction / totalSatisfaction) * 100).toFixed(2) // Porcentaje
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

        // Gráfica de amCharts
        const satisfactionData = await calculateSatisfactionPercentageByYear();
        console.log("Satisfaction Data:", satisfactionData);

        am5.ready(function () {
            var root = am5.Root.new("chartdiv");

            root.setThemes([am5themes_Animated.new(root)]);

            var chart = root.container.children.push(
                am5percent.PieChart.new(root, {
                    layout: root.verticalLayout,
                    innerRadius: am5.percent(50)
                })
            );

            var series = chart.series.push(
                am5percent.PieSeries.new(root, {
                    valueField: "value",
                    categoryField: "category",
                    alignLabels: false
                })
            );

            series.labels.template.setAll({
                textType: "circular",
                centerX: 0,
                centerY: 0
            });

            series.data.setAll(satisfactionData);

            var legend = chart.children.push(
                am5.Legend.new(root, {
                    centerX: am5.percent(50),
                    x: am5.percent(50),
                    marginTop: 15,
                    marginBottom: 15
                })
            );

            legend.data.setAll(series.dataItems);

            series.appear(1000, 100);
        });
    });
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
    <script src="https://cdn.amcharts.com/lib/5/index.js"></script>
    <script src="https://cdn.amcharts.com/lib/5/percent.js"></script>
    <script src="https://cdn.amcharts.com/lib/5/themes/Animated.js"></script>
</svelte:head>

<figure class="highcharts-figure">
    <div id="container"></div>
    <p class="highcharts-description">
        Este gráfico muestra la media de satisfacción total, de estudiantes y de PDI por ciudad. El eje Y contiene las ciudades, y el eje X muestra las medias en un rango de 0 a 10.
    </p>
</figure>

<!-- Contenedor para la gráfica de amCharts -->
<div id="chartdiv"></div>

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

    #chartdiv {
        width: 100%;
        height: 500px;
    }
</style>