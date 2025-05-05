<svelte:head>
<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/highcharts-more.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>
<script src="https://code.highcharts.com/modules/accessibility.js"></script>


  </svelte:head>




<figure class="highcharts-figure">
    <div id="container"></div>
</figure>

<figure class="highcharts-figure">
    <div id="container2"></div>
  </figure>


<script>

import { onMount } from "svelte";
let data_pab=[]
let data_Fines=[]
let data_sanctionsAndPoints=[]
let data_PrecipitacionStats=[]
let data_EmploymentData=[]
let data_RadarsStats=[]
let data_Astronomy=[]
let data_Anime=[]
let data_PokemonUnite=[]
let average_Fines;
let data_scatter;



async function getUniversityAcademicPerformance() {

try{
    await fetch("/api/v2/university-academic-performance/loadInitialData");
    const response = await fetch("/api/v2/university-academic-performance");
    return await response.json(); 
}catch (error){
    console.log("ERROR");
}
}

async function getFines() {

try{
    const response = await fetch("https://sos2425-20.onrender.com/api/v2/fines");
    
    
    return await response.json(); 
}catch (error){
    console.log("ERROR");
}
}


async function getSanctionsAndPoints() {

try{
    const response = await fetch("https://sos2425-19.onrender.com/api/v1/sanctions-and-points-stats");
    
    
    return await response.json(); 
}catch (error){
    console.log("ERROR");
}
}


async function getPrecipitationStats() {

try{
    const response = await fetch("https://sos2425-15.onrender.com/api/v1/precipitation-stats");
    
    
    return await response.json(); 
}catch (error){
    console.log("ERROR");
}
}


async function getEmploymentData() {

try{
    const response = await fetch("https://sos2425-14.onrender.com/api/v1/employment-data");
    
    
    return await response.json(); 
}catch (error){
    console.log("ERROR");
}
}


async function getRadarsStats() {

try{
    const response = await fetch("https://sos2425-10.onrender.com/api/v1/radars-stats");
    
    
    return await response.json(); 
}catch (error){
    console.log("ERROR");
}
}

async function getAstronomy() {

try{
    const response = await fetch("/api-astronomy");
    
    
    return await response.json(); 
}catch (error){
    console.log("ERROR");
}
}



async function getAnime() {

try{
    const response = await fetch("/api-anime");
    
    
    return await response.json(); 
}catch (error){
    console.log("ERROR");
}
}


async function getPokemon() {

try{
    const response = await fetch("/api-pokemon-unite");
    
    
    return await response.json(); 
}catch (error){
    console.log("ERROR");
}
}



async function alcoholSanctionsByCity() {
    await getFines();
    return data_Fines.map(item => ({
        x:item.itv,
        y: item.alcohol_rate,
        z: Number(((item.alcohol_rate / item.itv)*100).toFixed(2)),
        name: item.city.slice(0, 2).toUpperCase(),
        city: item.city
    }));
}

async function forScatterMap() {
  await getSanctionsAndPoints();

  const rawData = data_sanctionsAndPoints
  .filter(item => 
  !isNaN(Number(item.total_points_deducted)) && 
  Number(item.total_points_deducted) > 0 && 
  Number(item.total_points_deducted) <= 1000 && 
  !isNaN(Number(item.total_sanctions_with_points)) && 
  Number(item.total_sanctions_with_points) <= 1000
)
  .map(item => ({
    x: Number(item.total_points_deducted),  
    y: Number(item.total_sanctions_with_points),
    name: item.province
  }));

  const provinciasMap = {};

  // Agrupar por provincia
  rawData.forEach(p => {
    if (!provinciasMap[p.name]) {
      provinciasMap[p.name] = [];
    }
    provinciasMap[p.name].push({ x: p.x, y: p.y });
  });

  // Crear series
  return Object.entries(provinciasMap).map(([name, data]) => ({
    name: name,
    data: data
  }));
}















onMount(async () => {
    data_pab=await getUniversityAcademicPerformance();
    console.log("MIS DATOS ",data_pab)
    data_Fines=await getFines();
    console.log("FINES G20",data_Fines)
    average_Fines=await alcoholSanctionsByCity();
    console.log("AVERAGE",average_Fines)
    data_sanctionsAndPoints=await getSanctionsAndPoints();
    console.log("SANCTIONS AND POINTS G19 ",data_sanctionsAndPoints)
    data_scatter=await forScatterMap();
    console.log("FOR SCATTER MAP",data_scatter)
    /*

    data_PrecipitacionStats=await getPrecipitationStats();
    console.log("PRECIPITACIONSTATS G15 ",data_PrecipitacionStats)
    data_EmploymentData=await getEmploymentData();
    console.log("EMPLOYMENT DATA G14 ",data_EmploymentData);
    data_RadarsStats=await getRadarsStats();
    console.log("RADARS STATS G10 ",data_RadarsStats)
    */
    /*
    data_Astronomy=await getAstronomy();
    console.log("INTERNET ASTRONOMY  ",data_Astronomy)
    data_PokemonUnite=await getPokemon();
    console.log("INTERNET POKEMON UNITE  ",data_PokemonUnite)
    data_Anime=await getAnime();
    console.log("INTERNET ANIME  ",data_Anime)
    */

























    Highcharts.chart('container', {
    chart: {
        type: 'bubble',
        plotBorderWidth: 1,
        zoomType: 'xy'  
    },

    legend: {
        enabled: false
    },

    title: {
        text: 'Coches que han pasado la ITV y multas por alcoholemia por ciudad'
    },

    subtitle: {
        text: 'Highcharts (bubble chart)'
    },

    accessibility: {
        point: {
            valueDescriptionFormat: '{index}. {point.city}, nº ITVs: {point.x}g, ' +
                'nº multas alcohol: {point.y}g, multas alcohol/ITV%: {point.z}%.'
        }
    },

    xAxis: {
        gridLineWidth: 1,
        title: {
            text: 'nº ITVs'
        },
        labels: {
            format: '{value} uds'
        },
        plotLines: [{
            color: 'black',
            dashStyle: 'dot',
            width: 2,
            value: 65,
            label: {
                rotation: 0,
                y: 15,
                style: {
                    fontStyle: 'italic'
                },
                text: 'Límite seguro de ITVs'
            },
            zIndex: 3
        }],
        accessibility: {
            rangeDescription: 'Range: 60 to 100 ITVs.'
        }
    },

    yAxis: {
        startOnTick: false,
        endOnTick: false,
        title: {
            text: 'nº multas alcohol'
        },
        labels: {
            format: '{value} uds'
        },
        maxPadding: 0.2,
        plotLines: [{
            color: 'black',
            dashStyle: 'dot',
            width: 2,
            value: 50,
            label: {
                align: 'right',
                style: {
                    fontStyle: 'italic'
                },
                text: 'Límite seguro de multas alcohol',
                x: -10
            },
            zIndex: 3
        }],
        accessibility: {
            rangeDescription: 'Range: 0 to 160 multas.'
        }
    },

    tooltip: {
        useHTML: true,
        headerFormat: '<table>',
        pointFormat: '<tr><th colspan="2"><h3>{point.city}</h3></th></tr>' +
            '<tr><th>nº ITVs:</th><td>{point.x}uds</td></tr>' +
            '<tr><th>nº multas alcohol:</th><td>{point.y}uds</td></tr>' +
            '<tr><th>multas alcohol/ITVs (adults):</th><td>{point.z}%</td></tr>',
        footerFormat: '</table>',
        followPointer: true
    },

    plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                format: '{point.name}'  
            }
        }
    },

    series: [{
        data: average_Fines,  
        colorByPoint: true
    }]

});



Highcharts.chart('container2', {
  chart: {
    type: 'scatter',
    zoomType: 'xy'
  },
  title: {
    text: 'Sanciones con puntos deducidos por provincia excluyendo grandes ciudades '
  },
  subtitle: {
    text: 'HIGTCHART : scatter map'
  },
  xAxis: {
    title: { text: 'Total de puntos deducidos (uds)' },
    startOnTick: true,
    endOnTick: true,
    showLastLabel: true,
  },
  yAxis: {
    title: { text: 'Sanciones con puntos deducidos (uds)' }
  },
  legend: { enabled: true },
  tooltip: {
    pointFormat: 'Total de puntos deducidos: {point.x} uds<br/>Sanciones con puntos deducidos: {point.y} uds'
  },
  plotOptions: {
    scatter: {
      marker: {
        radius: 4,
        symbol: 'circle',
        states: {
          hover: {
            enabled: true,
            lineColor: 'rgb(100,100,100)'
          }
        }
      },
      jitter: { x: 0.01 }
    }
  },
  series: data_scatter
});




});





</script>





<style>

#container2 {
    max-width: 5000px; /* Aumenta el ancho máximo */
    height: 800px;      /* Altura fija más grande */
    margin: 40px auto;  /* Añade espacio arriba/abajo y centra */
}

.highcharts-figure,
.highcharts-data-table table {
    min-width: 360px;
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

.highcharts-figure,
.highcharts-data-table table {
    min-width: 310px;
    max-width: 800px;
    margin: 1em auto;
}

#container {
    height: 400px;
}

.highcharts-tooltip h3 {
    margin: 0.3em 0;
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