<script>
    import { onMount } from 'svelte';
    let data;
    let dropoutByLocation = [];

    async function getUniversityAcademicPerformance() {
        console.log("Cargado de datos");
        await fetch("/api/v2/university-academic-performance/loadInitialData")
        data = await fetch("/api/v2/university-academic-performance", { method: "GET" }).then(response => response.json());
        console.log(data)
        dropoutByLocation = calculateDropoutRateByLocation(data)
        console.log(dropoutByLocation)
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

    // Convertimos el objeto agrupado a una lista de listas
    return Object.entries(grouped).map(([location, { total, count }]) => [
      location,
      +(total / count).toFixed(2) // redondeado a 2 decimales
    ]);
  }






  
    onMount(async() => {
       await getUniversityAcademicPerformance();

      // Esperamos a que el DOM esté montado
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
          text: "3D donut in Highcharts",
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
            data:dropoutByLocation,
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
    <p class="highcharts-description">
      A variation of a 3D pie chart with an inner radius added.
      These charts are often referred to as donut charts.
    </p>
  </figure>
  
  <style>
    #container {
      height: 400px;
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
  
    .highcharts-description {
      margin: 0.3rem 10px;
    }
  </style>
  