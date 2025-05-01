<div class="chart-container">
    <canvas bind:this={canvasEl} class="chart"></canvas>
  </div>

  
  <script>
    import Chart from 'chart.js/auto';
    import { onMount } from 'svelte';
  
    let canvasEl;
    let data = [];
    let dropoutByLocation = [];
  
    // Etiquetas que usaremos para los promedios
    const labels = [
     "efficiencyRate", "successRate", "performanceRate", "cohortStudents", "dropoutRate", "graduationRate"
    ];

    const translate_labels = ["Tasa de eficiencia","Tasa de exito","Tasa de rendimiento","Estudiantes Cohorte (N)","Tasa de abandono","Tasa de graduacion"
    ];
  
    // Procesa los datos por tipo de grado y devuelve promedios
    function procesarDatosPorTipo(data) {
      const resultado = {
        ingenierias: [],
        otros: []
      };
  
      for (const item of data) {
        if (item.degree.toUpperCase().includes("INGENIERÍA")) {
          resultado.ingenierias.push(item);
        } else {
          resultado.otros.push(item);
        }
      }
  
      function calcularPromedio(lista) {
  if (lista.length === 0) return [];

  const suma = {};
  const keysNumericas = labels;

  for (const item of lista) {
    for (const key of keysNumericas) {
      suma[key] = (suma[key] || 0) + (item[key] || 0);
    }
  }

  const resultado = keysNumericas.map(key => [
    key,
    +(suma[key] / lista.length).toFixed(2)
  ]);
  console.log(resultado)
  return resultado;
}
  
      let promedioIngenierias = calcularPromedio(resultado.ingenierias);
      let promedioOtros = calcularPromedio(resultado.otros);
      console.log("INGENIERIAS", promedioIngenierias);
      console.log("OTROS", promedioOtros);
      return {
  promedioIngenierias,
  promedioOtros
};
}
    function calculateDropoutRateByLocation(allData) {
      const grouped = {};
  
      for (const entry of allData) {
        const { location, dropoutRate } = entry;
        if (!grouped[location]) {
          grouped[location] = { total: 0, count: 0 };
        }
        grouped[location].total += dropoutRate;
        grouped[location].count += 1;
      }
  
      return Object.entries(grouped).map(([location, { total, count }]) => [
        location,
        +(total / count).toFixed(2)
      ]);
    }
  
    async function getUniversityAcademicPerformance() {
      console.log("Cargado de datos...");
      await fetch("/api/v2/university-academic-performance/loadInitialData");
      const response = await fetch("/api/v2/university-academic-performance");
      const json = await response.json();
      data = json;
      return json;
    }
  
    onMount(async () => {
      const loadedData = await getUniversityAcademicPerformance();
      dropoutByLocation = calculateDropoutRateByLocation(loadedData);
      const { promedioIngenierias, promedioOtros } = procesarDatosPorTipo(loadedData);
  
      const chartConfig = {
        type: 'radar',
        data: {
          labels:translate_labels,
          datasets: [
            {
              label: "Otros Grados",
              data: [promedioOtros[0][1],promedioOtros[1][1],promedioOtros[2][1],promedioOtros[3][1],promedioOtros[4][1],promedioOtros[5][1]],
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgb(255, 99, 132)'
            },
            {
              label: "Ingenierías",
              data: [promedioIngenierias[0][1],promedioIngenierias[1][1],promedioIngenierias[2][1],promedioIngenierias[3][1],promedioIngenierias[4][1],promedioIngenierias[5][1]],
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgb(54, 162, 235)'
            }
          ]
        },
        options: {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Comparación de Indicadores Académicos',
      font: {
        size: 25,       // Tamaño de letra más grande
        weight: 'bold'  // Negrita
      },
      color: '#000'      // (opcional) Color del texto
          },
          subtitle: {
          display: true,
          text: "Gráfico de Angular_Chart (Radar-Chart)",
          font: {
        family: 'Georgia',
        size: 11,           // Tamaño de letra más pequeño
        weight: '200'    // Opcional: normal, si no quieres que sea negrita
      },
      padding: {
        bottom: 15          // Espacio debajo del subtítulo
      }
          

        }
        }
      }
    };
  
      new Chart(canvasEl.getContext('2d'), chartConfig);
  
      Highcharts.chart("container", {
        chart: {
          type: "pie",
          options3d: {
            enabled: true,
            alpha: 45,
          },
        },
        title: {
          text: "Tasa de abandono por ciudad en los últimos años",
        },
        subtitle: {
  text: "Gráfico de Highcharts (3D Donut Chart)",
  style: {
    fontFamily: 'Georgia',
    fontSize: '11px',        // Asegúrate de incluir las unidades
    fontWeight: '200'        // 'normal' o valores numéricos como '200'
  }
},
        plotOptions: {
          pie: {
            innerSize: 100,
            depth: 45,
          },
        },
        series: [
          {
            name: "Tasa",
            data: dropoutByLocation,
          },
        ],
      });
    });
  
  </script>
  
  <svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/highcharts-3d.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
  </svelte:head>
  
  <figure class="highcharts-figure">
    <div id="container"></div>
  </figure>
  
  <style>
  .chart-container {
    width: 400px;
    height: 400px;
    margin: 2rem auto 0 auto; /* solo centrado horizontal */
    position: relative;
  }
  
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
  </style>
  