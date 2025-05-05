<svelte:head>
  <script src="https://code.highcharts.com/highcharts.js"></script>
  <script src="https://code.highcharts.com/highcharts-3d.js"></script>
  <script src="https://code.highcharts.com/modules/exporting.js"></script>
  <script src="https://code.highcharts.com/modules/export-data.js"></script>
  <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>


<div class="chart-container">
    <canvas bind:this={canvasEl} class="chart"></canvas>
  </div>

  
  <script>
    import Chart from 'chart.js/auto';
    import { onMount } from 'svelte';
  
    let canvasEl;
    let data = [];
    let dropoutByLocation = [];
    const labels = [
     "efficiencyRate", "successRate", "performanceRate", "cohortStudents", "dropoutRate", "graduationRate"
    ];

    const translate_labels = ["Tasa de eficiencia","Tasa de exito","Tasa de rendimiento","Estudiantes Cohorte (N)","Tasa de abandono","Tasa de graduacion"
    ];
  
    //GET DATA

async function getUniversityAcademicPerformance() {

  try{
      await fetch("/api/v2/university-academic-performance/loadInitialData");
      const response = await fetch("/api/v2/university-academic-performance");
      const json = await response.json();
      return json  
  }catch (error){
      console.log("ERROR");
  }
}

  //CALCULAR PROMEDIOS PARA INGENIERIAS

function averageByIngeniery(lista, labels) {
  const suma = {};

  for (const item of lista) {
    for (const key of labels) {
      suma[key] = (suma[key] || 0) + (item[key] || 0);
    }
  }

  const resultado = labels.map(key => [
    key,
    +(suma[key] / lista.length).toFixed(2)
  ]);

  return resultado;
}
    //PROCESAR DATOS PARA INGENIERIAS


function dataByIngeniery(data, labels) {

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

  const promedioIngenierias = averageByIngeniery(resultado.ingenierias, labels);
  const promedioOtros = averageByIngeniery(resultado.otros, labels);

  return {
    promedioIngenierias,
    promedioOtros
  };
}
 
  //CALCULA ABANDONO POR CIUDAD (DONUT)


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
  
    onMount(async () => {
      data=await getUniversityAcademicPerformance();
      dropoutByLocation = calculateDropoutRateByLocation(data);
      const { promedioIngenierias, promedioOtros } = dataByIngeniery(data,labels);


      //CHAR LOL
  
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
        size: 25,       
        weight: 'bold'  
      },
      color: '#000'      
          },
          subtitle: {
          display: true,
          text: "Gráfico de Angular_Chart (Radar-Chart)",
          font: {
        family: 'Georgia',
        size: 11,           
        weight: '200'    
      },
      padding: {
        bottom: 15          
      }
        }
        }
      }
    };


    //CHAR DONUT
  
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
    fontSize: '11px',  
    fontWeight: '200'
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
  
  <figure class="highcharts-figure">
    <div id="container"></div>
  </figure>
  
  <style>
  .chart-container {
    width: 400px;
    height: 400px;
    margin: 2rem auto 0 auto;
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
  