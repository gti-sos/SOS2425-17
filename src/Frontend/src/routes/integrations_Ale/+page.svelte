<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/highcharts-more.js"></script>
    <script src="https://code.highcharts.com/modules/solid-gauge.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
    <script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>

</svelte:head>
<figure class="highcharts-figure">
    <div id="chartContainer-eventos" style="height: 370px; width: 100%;"></div>
    <figcaption>
        Gráfico de área apilada 100% que representa el número total de eventos por provincia y año.
    </figcaption>
</figure>

<figure class="highcharts-figure">
    <div id="container"></div>
    <p class="highcharts-description">
        **Gráfica polar de barras (Highcharts):** Esta gráfica muestra la relación entre el total nacional y el total importado para cada provincia, utilizando datos de la API G10.
    </p>
</figure>
<figure class="highcharts-figure">
    <div id="container-kpi"></div>
    <p class="highcharts-description">
        **Gráfica de Indicadores Clave (KPI):** Esta gráfica muestra la satisfacción total media y el número de autobuses en la provincia de Badajoz integrando los datos del G19 con los del G17.
    </p>
</figure>
<figure class="canvasjs-figure">
    <div id="container-canvasjs" style="height: 400px; width: 100%;"></div>
    <p class="canvasjs-description">
        **Gráfica de Columnas (CanvasJS):** Esta gráfica muestra la satisfacción media de los estudiantes y el porcentaje de consumo de electricidad en Extremadura durante el año 2018 integrando los datos del G12 con los del G17.
    </p>
</figure>

<figure style="text-align: center; margin: 2em 0;">
    <figcaption style="font-size: 1.2em; margin-bottom: 1em;">
      Partidos ganados por equipo (temporada actual)
    </figcaption>
    <div id="container-pie" style="height: 500px; width: 100%; max-width: 800px; margin: auto;"></div>
  </figure>
  
 
  
  
<figure class="canvasjs-figure">
    <div id="chartContainer" style="height: 500px; width: 100%;"></div>
    <p class="canvasjs-description">
      Gráfico de línea mostrando cuántas películas se estrenaron cada año, según los datos obtenidos de la API.
    </p>
  </figure>

  <figure class="canvasjs-figure">
    <div id="chartContainerBebidas" style="height: 500px; width: 100%;"></div>
    <p class="canvasjs-description">
      Gráfico de barras apiladas horizontales que muestra la frecuencia de cada valor en subcategorías 1, 2 y 3 de bebidas.
    </p>
  </figure>
  
  

<script>
import { onMount } from "svelte";
let apiG17="https://sos2425-17.onrender.com/api/v2/students_satisfaction";
let apifurbo = "/furbo-data";
let apicerveza = "/cerveza-data";
let apipelis = "/pelis-data";
let apiG15="https://sos2425-15.onrender.com/ocupied-grand-stats";
let apiG10="https://sos2425-10.onrender.com/api/v1/registrations-stats";
let apiG19="https://sos2425-19.onrender.com/api/v2/ownerships-changes-stats/";
let apiG12="https://sos2425-12.onrender.com/api/v1/annual-consumptions";
let apiG21="https://sos2425-21.onrender.com/api/v1/cultural-event";
let mydatag17=[];
let mydatatiktok = [];
let mydatalol = [];
let mydatapelis = [];
let mydatag15 = [];
let mydatag10 = [];
let mydatag19 = [];
let mydatag12 = [];
let result = "";
let resultStatus = "";

// Función para cargar los datos iniciales
async function loadInitialDataForG21() {
    try {
        const response = await fetch("https://sos2425-21.onrender.com/api/v1/cultural-event/loadInitialData", { method: "GET" });
        if (!response.ok) {
            throw new Error(`Error al cargar datos iniciales de G21: ${response.status} ${response.statusText}`);
        }
        console.log("Datos iniciales de G21 cargados correctamente.");
    } catch (error) {
        console.error("ERROR al cargar datos iniciales de G21:", error);
    }
}

async function getG21DataForChart() {
    try {
        await loadInitialDataForG21();
        const response = await fetch(apiG21);
        const json = await response.json();
        console.log("Respuesta completa de la API G21:", json);
        return Array.isArray(json) ? json : [];
    } catch (error) {
        console.error("Error al obtener datos de G21:", error);
        return [];
    }
}
async function drawStackedAreaChart() {
    const data = await getG21DataForChart();
    if (!data || data.length === 0) {
        console.error("No se obtuvieron datos para la gráfica.");
        return; 
    }

    console.log("Datos obtenidos para la gráfica:", data);

    // Obtener años únicos
    const years = [...new Set(data.map(item => item.year))].sort((a, b) => a - b);
    console.log("Años únicos:", years);

    // Obtener provincias únicas
    const provinces = [...new Set(data.map(item => item.province))];
    console.log("Provincias únicas:", provinces);

    // Inicializar estructura para acumular datos por provincia y año
    const provinceSeries = provinces.map(province => ({
        type: "stackedArea100",
        name: province.charAt(0).toUpperCase() + province.slice(1),
        showInLegend: true,
        dataPoints: years.map(year => {
            const record = data.find(d => d.year === year && d.province.toLowerCase() === province.toLowerCase());
            return {
                label: String(year),
                y: record ? record.total_event : 0
            };
        })
    }));

    console.log("Series procesadas para la gráfica:", provinceSeries);

    // Crear el gráfico
    const chart = new CanvasJS.Chart("chartContainer-eventos", {
        animationEnabled: true,
        title: {
            text: "Total de Eventos por Provincia (Gráfico de Área Apilada 100%)"
        },
        axisX: {
            title: "Año",
            interval: 1 // Mostrar todos los años
        },
        axisY: {
            title: "Porcentaje de eventos",
            suffix: "%"
        },
        toolTip: {
            shared: true
        },
        legend: {
            verticalAlign: "top"
        },
        data: provinceSeries
    });

    chart.render();
}
onMount(async () => {
        await drawStackedAreaChart();
    });


    // Función para obtener datos de apiG10
    async function getG10DataForChart() {
    try {
        const response = await fetch(apiG10);
        const data = await response.json();

        // Filtrar por el año 2018
        const data2018 = data.filter(item => item.year === 2018);

        // Extraer datos
        const provincias = data2018.map(item => item.province);
        const totalNacional = data2018.map(item => item.total_general_national);
        const totalImportado = data2018.map(item => item.total_general_import);

        return { provincias, totalNacional, totalImportado };
    } catch (error) {
        console.error("Error al obtener datos de G10:", error);
        return { provincias: [], totalNacional: [], totalImportado: [] };
    }
}

async function mountG10Chart() {
        const { provincias, totalNacional, totalImportado } = await getG10DataForChart();
        Highcharts.chart('container', {
            chart: {
                type: 'column',
                polar: true,
                inverted: true
            },
            title: {
                text: 'Relación de Total Nacional e Importado por Provincia'
            },
            subtitle: {
                text: 'Datos obtenidos de la API G10'
            },
            xAxis: {
                categories: provincias,
                title: {
                    text: 'Provincias'
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Cantidad'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: ' unidades'
            },
            pane: {
                size: '85%',
                innerSize: '20%',
                endAngle: 270
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    borderWidth: 0,
                    pointPadding: 0,
                    groupPadding: 0.15,
                    borderRadius: '50%'
                }
            },
            series: [{
                name: 'Total Nacional',
                data: totalNacional,
                color: '#60a5fa'
            }, {
                name: 'Total Importado',
                data: totalImportado,
                color: '#f87171'
            }]
        });
    }

    // Llamar a la función para montar la gráfica al cargar la página
    onMount(async () => {
        await mountG10Chart();
    });

// Función para obtener y procesar los datos de la API G17
async function getG17DataForBadajoz() {
    try {
        await loadInitialDataForG17();
        const response = await fetch(apiG17, { method: "GET" });
        if (!response.ok) {
            throw new Error(`Error en la API G17: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        mydatag17 = data;


        const badajozData = data.filter(item => item.ciudad?.toUpperCase() === "BADAJOZ");

        // Calcular la satisfacción total media
        const totalSatisfaccion = badajozData.reduce((sum, item) => sum + (item.satisfaccion_total || 0), 0);
        const mediaSatisfaccion = badajozData.length > 0 ? totalSatisfaccion / badajozData.length : 0;

        return mediaSatisfaccion.toFixed(2); // Devolver la media con 2 decimales
    } catch (error) {
        console.error(`ERROR al obtener datos de la API G17: ${error}`);
        return 0; // Devolver 0 si hay un error
    }
}

    // Función para obtener y procesar los datos de la API G19
    async function getG19DataForBadajoz() {
        try {
            const response = await fetch(apiG19, { method: "GET" });
            if (!response.ok) {
                throw new Error(`Error en la API G19: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            mydatag19 = data;

            // Filtrar los datos para la provincia "Badajoz"
            const badajozData = data.find(item => item.province === "Badajoz");

            // Obtener el número de autobuses
            return badajozData ? badajozData.bus : 0;
        } catch (error) {
            console.error(`ERROR al obtener datos de la API G19: ${error}`);
            return 0; // Devolver 0 si hay un error
        }
    }

    // Función para montar la gráfica de Multiple KPI Gauge
    async function mountKPIChart() {
    const mediaSatisfaccion = await getG17DataForBadajoz();
    const numeroAutobuses = await getG19DataForBadajoz();

    // Crear la gráfica de Highcharts
    Highcharts.chart('container-kpi', {
        chart: {
            type: 'solidgauge',
            events: {
                render: function () {
                    const chart = this;
                    if (!chart.customLabel) {
                        chart.customLabel = chart.renderer.text('BADAJOZ', 0, 0)
                            .css({
                                fontSize: '18px',
                                fontWeight: 'bold',
                                color: '#333'
                            })
                            .add();
                    }

                    const centerX = chart.plotWidth / 2 + chart.plotLeft;
                    const centerY = chart.plotHeight / 2 + chart.plotTop;
                    const bbox = chart.customLabel.getBBox();
                    chart.customLabel.attr({
                        x: centerX - bbox.width / 2,
                        y: centerY + 6
                    });
                }
            }
        },
        title: {
            text: 'Indicadores Clave de Badajoz'
        },
        pane: {
            startAngle: 0,
            endAngle: 360,
            background: [{
                outerRadius: '112%',
                innerRadius: '88%',
                backgroundColor: Highcharts.color('#60a5fa').setOpacity(0.3).get(),
                borderWidth: 0
            }, {
                outerRadius: '87%',
                innerRadius: '63%',
                backgroundColor: Highcharts.color('#f87171').setOpacity(0.3).get(),
                borderWidth: 0
            }]
        },
        tooltip: {
            enabled: true,
            pointFormat: '{series.name}: <b>{point.y}</b>'
        },
        yAxis: {
            min: 0,
            max: 100,
            lineWidth: 0,
            tickPositions: []
        },
        plotOptions: {
            solidgauge: {
                dataLabels: {
                    enabled: false // Desactiva el número en el centro
                },
                linecap: 'round',
                stickyTracking: false
            }
        },
        series: [{
            name: 'Satisfacción Media',
            data: [{
                color: '#60a5fa',
                radius: '112%',
                innerRadius: '88%',
                y: parseFloat(mediaSatisfaccion)
            }]
        }, {
            name: 'Número de Autobuses',
            data: [{
                color: '#f87171',
                radius: '87%',
                innerRadius: '63%',
                y: numeroAutobuses
            }]
        }]
    });
}


    // Llamar a la función para montar la gráfica al cargar la página
    onMount(async () => {
        await mountKPIChart();
    });
        

    // Función para cargar los datos iniciales de G17
async function loadInitialDataForG17() {
    try {
        
        const response = await fetch("https://sos2425-17.onrender.com/api/v2/students_satisfaction", { method: "GET" });
        if (!response.ok) {
            throw new Error(`Error al cargar datos iniciales de G17: ${response.status} ${response.statusText}`);
        }
        console.log("Datos iniciales de G17 cargados correctamente.");
    } catch (error) {
        console.error("ERROR al cargar datos iniciales de G17:", error);
    }
}


    // Función para obtener y procesar los datos de la API G17
    async function getG17DataForExtremadura() {
        try {
            // Asegurarse de que los datos iniciales estén cargados
        await loadInitialDataForG17();

            const response = await fetch(apiG17, { method: "GET" });
            if (!response.ok) {
                throw new Error(`Error en la API G17: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            mydatag17 = data;

            // Filtrar los datos para el año académico 2017-2018
            const data2017_2018 = data.filter(item => item.año_academico === "2017-2018");

             // Calcular la satisfacción media de los estudiantes
        const totalSatisfaccion = data2017_2018.reduce((sum, item) => sum + item.sat_estudiantes, 0);
        const mediaSatisfaccion = data2017_2018.length > 0 ? totalSatisfaccion / data2017_2018.length : 0;

        // Convertir la satisfacción media en porcentaje (escala de 0 a 100)
        const mediaSatisfaccionPorcentaje = (mediaSatisfaccion / 10) * 100;

        return mediaSatisfaccionPorcentaje.toFixed(2); // Devolver el porcentaje con 2 decimales
    } catch (error) {
        console.error(`ERROR al obtener datos de la API G17: ${error}`);
        return 0; // Devolver 0 si hay un error
    }
}
// Función para obtener y procesar los datos de la API G12
async function getG12DataForExtremadura() {
        try {
            const response = await fetch(apiG12, { method: "GET" });
            if (!response.ok) {
                throw new Error(`Error en la API G12: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            mydatag12 = data;

            // Filtrar los datos para Extremadura y el año 2018
            const extremaduraData = data.find(item => item.aacc === "Extremadura" && item.year === 2018);

            // Calcular el porcentaje de consumo de electricidad
            if (extremaduraData) {
                const totalConsumption = extremaduraData.total_consumption;
                const electricityPercentage = (extremaduraData.electricity / totalConsumption) * 100;
                return electricityPercentage.toFixed(2); // Devolver el porcentaje con 2 decimales
            }

            return 0; // Devolver 0 si no hay datos
        } catch (error) {
            console.error(`ERROR al obtener datos de la API G12: ${error}`);
            return 0; // Devolver 0 si hay un error
        }
    }
        // Función para montar la gráfica de CanvasJS
    async function mountCanvasJSChart() {
        const mediaSatisfaccion = await getG17DataForExtremadura();
        const electricityPercentage = await getG12DataForExtremadura();

        // Crear la gráfica de CanvasJS
        const chart = new CanvasJS.Chart("container-canvasjs", {
            animationEnabled: true,
            title: {
                text: "Indicadores Clave de Extremadura (2018)"
            },
            axisY: {
                title: "Porcentaje (%)",
                suffix: "%",
                lineColor: "#4F81BC",
                tickColor: "#4F81BC",
                labelFontColor: "#4F81BC",
                titleFontColor: "#4F81BC"
            },
            data: [{
                type: "column",
                name: "Satisfacción Media",
                showInLegend: true,
                yValueFormatString: "#,##0.##'%'",
                dataPoints: [
                    { label: "Satisfacción Media", y: parseFloat(mediaSatisfaccion) }
                ]
            },
            {
                type: "column",
                name: "Consumo de Electricidad",
                showInLegend: true,
                yValueFormatString: "#,##0.##'%'",
                dataPoints: [
                    { label: "Consumo de Electricidad", y: parseFloat(electricityPercentage) }
                ]
            }]
        });

        chart.render();
    }

    // Llamar a la función para montar la gráfica al cargar la página
    onMount(async () => {
        await mountCanvasJSChart();
    });
    


    // Función para obtener los datos de la API Películas
    async function getPelisData() {
        try {
            const response = await fetch(apipelis, { method: "GET" });
            if (!response.ok) {
                throw new Error(`Error al obtener datos de Películas: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("ERROR al obtener datos de Películas:", error);
            return [];
        }
    }
    function processPelisData(data) {
  const yearCounts = {};

  data.forEach(peli => {
    const year = peli.startYear;
    if (year && !isNaN(year)) {
      yearCounts[year] = (yearCounts[year] || 0) + 1;
    }
  });

  // Convertimos a array de objetos { x: año, y: cantidad }
  const dataPoints = Object.entries(yearCounts)
    .map(([year, count]) => ({ x: parseInt(year), y: count }))
    .sort((a, b) => a.x - b.x); // ordenado por año

  return dataPoints;
}

async function mountPelisChart() {
  const data = await getPelisData();
  const processed = processPelisData(data);

  const chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    exportEnabled: true,
    title: {
      text: "Películas estrenadas por año",
      fontSize: 24,
    },
    axisX: {
      title: "Año de estreno",
      labelFontSize: 14,
    },
    axisY: {
      title: "Número de películas",
      includeZero: true,
      labelFontSize: 14,
    },
    data: [{
      type: "spline", // Línea suave
      markerSize: 5,
      toolTipContent: "Año: {x}<br/>Películas: {y}",
      dataPoints: processed
    }]
  });

  chart.render();
}
onMount(async () => {
  await mountPelisChart();
});

async function getBebidasData() {
  try {
    const response = await fetch(apicerveza);
    if (!response.ok) {
      throw new Error(`Error al obtener datos de bebidas: ${response.status}`);
    }
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error("ERROR al obtener datos de bebidas:", error);
    return [];
  }
}

function procesarDatosBebidas(data) {
  const subcats = ["sub_category_1", "sub_category_2", "sub_category_3"];
  const subcatLabels = ["Subcategoría 1", "Subcategoría 2", "Subcategoría 3"];

  const conteos = {
    "Subcategoría 1": {},
    "Subcategoría 2": {},
    "Subcategoría 3": {}
  };

  data.forEach(item => {
    subcats.forEach((key, index) => {
      const valor = item[key]?.trim(); // Evita "undefined" y espacios
      const etiqueta = subcatLabels[index];
      if (valor) {
        conteos[etiqueta][valor] = (conteos[etiqueta][valor] || 0) + 1;
      }
    });
  });

  const categoriasUnicas = new Set();
  Object.values(conteos).forEach(cat => {
    Object.keys(cat).forEach(nombre => categoriasUnicas.add(nombre));
  });

  const dataSeries = [];

  categoriasUnicas.forEach(nombreCategoria => {
    const puntos = subcatLabels.map(etiqueta => ({
      y: conteos[etiqueta][nombreCategoria] || 0,
      label: etiqueta
    }));

    dataSeries.push({
      type: "stackedBar",
      name: nombreCategoria,
      showInLegend: true,
      dataPoints: puntos
    });
  });

  return dataSeries;
}

async function montarGraficoBebidas() {
  const data = await getBebidasData();
  const series = procesarDatosBebidas(data);

  const chart = new CanvasJS.Chart("chartContainerBebidas", {
    animationEnabled: true,
    title: {
      text: "Distribución de Valores por Subcategoría"
    },
    axisY: {
      title: "Subcategorías",
      reversed: true
    },
    axisX: {
      title: "Cantidad",
      includeZero: true
    },
    toolTip: {
      shared: true
    },
    legend: {
      verticalAlign: "top"
    },
    data: series
  });

  chart.render();
}

onMount(() => {
  montarGraficoBebidas();
});


async function getEquiposData() {
  try {
    const response = await fetch(apifurbo); // ← Sustituye con tu URL real
    const datos = await response.json();
    return datos.data; // ← Todos los equipos
  } catch (error) {
    console.error("Error al obtener datos:", error);
    return [];
  }
}

function procesarPieChart(data) {
  return data.map(equipo => ({
    y: parseInt(equipo.pg),
    indexLabel: equipo.equipo,
    exploded: false,
    radius: `${20 + parseInt(equipo.pg)}%`, // Custom radius proporcional a los partidos ganados
    toolTipContent: `<b>${equipo.equipo}</b>: ${equipo.pg} ganados`
  }));
}

async function montarPieChart() {
  const equipos = await getEquiposData();
  const dataPoints = procesarPieChart(equipos);

  const chart = new CanvasJS.Chart("container-pie", {
    animationEnabled: true,
    title: {
      text: "Distribución de partidos ganados por equipo",
      fontSize: 24
    },
    data: [{
      type: "pie",
      showInLegend: true,
      legendText: "{indexLabel}",
      indexLabelFontSize: 14,
      startAngle: 60,
      innerRadius: 0,
      dataPoints: dataPoints
    }]
  });

  chart.render();
}

onMount(() => {
  montarPieChart();
});
   
</script>


<style>
    #container {
        height: 600px;
    }

    .highcharts-figure,
    .highcharts-data-table table {
        min-width: 320px;
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

    .highcharts-description {
        margin: 0.3rem 10px;
    }
    #container-kpi {
        height: 400px;
        width: 600px;
        margin: 0 auto;
    }

    .highcharts-figure {
        min-width: 320px;
        max-width: 800px;
        margin: 1em auto;
    }

    .highcharts-description {
        margin: 0.3rem 10px;
        text-align: center;
        font-size: 1rem;
        color: #555;
    }
    .canvasjs-figure {
        min-width: 320px;
        max-width: 800px;
        margin: 1em auto;
    }

    .canvasjs-description {
        margin: 0.3rem 10px;
        text-align: center;
        font-size: 1rem;
        color: #555;
    }

    .canvasjs-figure {
    max-width: 900px;
    margin: 2em auto;
  }

  .canvasjs-description {
    text-align: center;
    color: #555;
  }
  
</style>