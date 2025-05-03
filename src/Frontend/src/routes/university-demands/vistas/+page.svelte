<svelte:head>
    
<!--Cargo las bibliotecas de highcharts -->
<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/modules/heatmap.js"></script>
<script src="https://code.highcharts.com/modules/treemap.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>
<script src="https://code.highcharts.com/modules/accessibility.js"></script>
<script src="https://cdn.zingchart.com/zingchart.min.js"></script>

</svelte:head>

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

            //console.log(`Response received:\n${JSON.stringify(myData,null,2)}`);

        } catch (error){
            console.log(`ERROR:  GET from ${API}: ${error}`);
        }
    }

    //console.log(getData());

    
    async function foreignersByLocation() {
    await getData(); // espera a que myData se llene correctamente

    const datosFiltrados = myData.map(item => ({
        location: item.location,
        foreigners: item.foreigners,
        degree: item.degree
    }));

    const resultado = datosFiltrados.reduce((acc, item) => {
        if (!acc[item.location]) {
            acc[item.location] = 0;
        }
        acc[item.location] += item.foreigners;
        return acc;
    }, {});

    const datosOrdenados = Object.entries(resultado)
        .map(([location, foreigners]) => ({ location, foreigners }))
        .sort((a, b) => b.foreigners - a.foreigners); // orden descendente

    return datosOrdenados;
}

async function graduatedByYear(degree = "GRADO EN PODOLOGÍA") {
    await getData(); // espera a que myData se llene correctamente

    const datosFiltrados = myData
        .filter(item => item.degree === degree)
        .map(item => ({
            academicYear: item.academicYear,
            graduated: item.graduated
        }))
        .sort((a, b) => parseInt(a.academicYear.slice(0, 4)) - parseInt(b.academicYear.slice(0, 4)));

    return datosFiltrados;
    
    
}
    console.log(graduatedByYear());

        
    onMount(async () => {

        const resultado = await foreignersByLocation();
        const resultado2 = await graduatedByYear();

        const data = resultado.map(item => ({
        name: item.location,
        value: item.foreigners,
        colorValue: item.foreigners 
        }));

        const data2 = resultado2.map(item => ({
        name: item.academicYear,
        value: item.graduated,
        }));

        console.log(data);
        console.log(data2);
        console.log(data[0].colorValue);
        console.log(data2[0].name);
        console.log(data2[0].value);
        // @ts-ignore
        Highcharts.chart('container', {
        colorAxis: {
            minColor: '#ffe0e0',  
            maxColor: '#ff0000'   
        },
        series: [{
            type: 'treemap',
            layoutAlgorithm: 'squarified',
            clip: false,
            data: [{
                name: data[0].name,
                value: data[0].value,
                colorValue: data[0].colorValue
            }, {
                name: data[1].name,
                value: data[1].value,
                colorValue: data[1].colorValue
            }, {
                name: data[2].name,
                value: data[2].value,
                colorValue: data[2].colorValue
            }, {
                name: data[3].name,
                value: data[3].value,
                colorValue: data[3].colorValue
            }, {
                name: data[4].name,
                value: data[4].value,
                colorValue: data[4].colorValue
            }]
        }],
        title: {
            text: 'Numero de Extranjeros por provincia'
        },
        subtitle: {
            text:
                'Grafico de Highcharts (Tree map with color axis)'
        }
    });

    let myPalette = ['#94DBF9', '#2BBEFE', '#008ECC', '#005479'];
    let chartConfig = {
    type: 'area',
    title: {
        text: 'Evolución de graduados en podología en plasencia',
        align: 'left',
        color: '#5D7D9A',
        fontSize: '30px',
        padding: '30 0 0 35',
    },
    subtitle: {
        text: 'Grafico de ZingChart (Stacked Area Chart)',
        align: 'left',
        color: '#5D7D9A',
        fontSize: '15px',
        fontWeight: '300px',
        padding: '35 0 0 35',
    },
    plot: {
        tooltip: {
        visible: false,
        },
        alphaArea: 0.4,
        marker: {
        size: 4,
        },
        stacked: true,
    },
    plotarea: {
        margin: '120 40 60 80',
    },
    scaleX: {
        item: {
        color: '#6C6C6C',
        },
        labels: [data2[0].name,data2[1].name,data2[2].name],
        label: {
        padding: '20 0 0 0',
        text: 'Years',
        color: '#6C6C6C',
        },
        lineColor: '#D8D8D8',
        tick: {
        lineColor: '#D8D8D8',
        },
    },
    scaleY: {
        guide: {
        lineStyle: 'solid',
        },
        item: {
        color: '#6C6C6C',
        },
        label: {
        padding: '20 0 0 0',
        text: 'Graduados',
        color: '#6C6C6C',
        },
        lineColor: '#D8D8D8',
        maxItems: 8,
        tick: {
        lineColor: '#D8D8D8',
        },
        values: '0:150:50',
    },
    series: [
        {
        values: [data2[0].value,data2[1].value,data2[2].value],
        backgroundColor: '#94DBF9',
        lineColor: '#94DBF9',
        marker: {
            backgroundColor: '#94DBF9',
            borderColor: '#94DBF9',
        },
        },
        ],
    crosshairX: {
        plotLabel: {
        backgroundColor: '#fff',
        borderColor: '#EEE',
        borderRadius: '5px',
        fontColor: '#333',
        padding: '10px',
        },
        scaleLabel: {
        text: '%v',
        alpha: 0,
        fontFamily: 'Georgia',
        transform: {
            type: 'date',
            all: '%M %d, %Y<br>%g:%i %a',
        },
        },
    },
    };

    // render chart
    zingchart.render({
    id: 'myChart',
    data: chartConfig,
    height: '100%',
    width: '100%',
    });

    });

</script>

<style>
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

.zc-body { background:#fff; }

.chart--container {
  height: 100%;
  width: 100%;
  min-height: 530px;
}

.zc-ref {
  display: none;
}

</style>


<figure class="highcharts-figure">
    <div id="container"></div>
</figure>

<div id="myChart" class="chart--container">
    <a href="https://www.zingchart.com/" rel="noopener" class="zc-ref">Powered by ZingChart</a>
  </div>

