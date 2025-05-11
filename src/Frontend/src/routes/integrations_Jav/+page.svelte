
<svelte:head>
    
<!--Cargo las bibliotecas de highcharts -->

    <script nonce="undefined" src="https://cdn.zingchart.com/zingchart.min.js"></script>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>	
    <link rel="stylesheet" href="https://code.highcharts.com/css/highcharts.css" />
</svelte:head>


<script>

    import { onMount } from "svelte";
    import { dev } from "$app/environment"; 
    import {Button,Table } from '@sveltestrap/sveltestrap';

    let DEVEL_HOST = "http://localhost:16078";

    let API = "/api/v2/university-demands";
    let API_LOAD = "/api/v2/university-demands/loadInitialData";

    if (dev) {
      API = DEVEL_HOST + API;
      API_LOAD = DEVEL_HOST + API_LOAD;      
    }

  let APIG21 = "https://sos2425-21.onrender.com/api/v1/public-transit-stats/";
  let APIG18 = "https://sos2425-18.onrender.com/api/v2/dana-erte-stats";
  let APIG10 = "https://sos2425-10.onrender.com/api/v1/accidents-stats";
  let APIG15 = "https://sos2425-15.onrender.com/api/v1/temperature-stats";
  let APIG20 = "https://sos2425-20.onrender.com/api/v1/accidents-with-animals";
  let APIF1 = "/api-f1";
  let APITRANSFERMARKET = "/api-transfermarket";
  let APISPOTY = "/api-spotify";
  let myDatag21 = [];
  let myDatag18 = [];
  let myDatag10 = [];
  let myDatag15 = [];
  let myDatag20 = [];
  let myDataF1 = [];
  let myData = [];
  let myDataTransfer = [];
  let myDataSpoty = [];
  let result = "";
  let resultStatus = "";
  
  async function getDataG21(){
        resultStatus = result = "";

        try {

            const res = await fetch(APIG21,{method:"GET"});
            const data = await res.json();
            result = JSON.stringify(data,null,2);

            myDatag21 = data;

            console.log(`Response received:\n${JSON.stringify(myDatag21,null,2)}`);

        } catch (error){
            console.log(`ERROR:  GET from ${APIG21}: ${error}`);
        }
    }
    
    console.log(getDataG21());
    async function getDataG18(){
        resultStatus = result = "";

        try {

            const res = await fetch(APIG18,{method:"GET"});

            const data = await res.json();
            result = JSON.stringify(data,null,2);

            myDatag18 = data;

            console.log(`Response received:\n${JSON.stringify(myDatag18,null,2)}`);

        } catch (error){
            console.log(`ERROR:  GET from ${APIG18}: ${error}`);
        }
    }

    
    console.log(getDataG18());

    
    async function getDataG10(){
        resultStatus = result = "";

        try {

            const res = await fetch(APIG10,{method:"GET"});

            const data = await res.json();
            result = JSON.stringify(data,null,2);

            myDatag10 = data;

            //console.log(`Response received:\n${JSON.stringify(myDatag10,null,2)}`);

        } catch (error){
            console.log(`ERROR:  GET from ${APIG10}: ${error}`);
        }
    }
    
    //console.log(getDataG10());

    async function victimsInBadajoz(location = "Badajoz") {
    await getDataG10(); 
    const total = myDatag10
        .filter(item => item.province === location)
        .map(item => ({
            total_victims: item.total_victims
        }))

    return total;
  }

  //console.log(victimsInBadajoz());


    async function getDataG15(){
        resultStatus = result = "";

        try {

            const res = await fetch(APIG15,{method:"GET"});

            const data = await res.json();
            result = JSON.stringify(data,null,2);

            myDatag15 = data;

            console.log(`Response received:\n${JSON.stringify(myDatag15,null,2)}`);

        } catch (error){
            console.log(`ERROR:  GET from ${APIG15}: ${error}`);
        }
    }
    
    //console.log(getDataG15());


    async function getDataG20(){
        resultStatus = result = "";
        try {
            await fetch("https://sos2425-20.onrender.com/api/v1/accidents-with-animals/loadInitialData")
            const res = await fetch(APIG20,{method:"GET"});

            const data = await res.json();
            result = JSON.stringify(data,null,2);

            myDatag20 = data;

            //console.log(`Response received:\n${JSON.stringify(myDatag20,null,2)}`);

        } catch (error){
            console.log(`ERROR:  GET from ${APIG20}: ${error}`);
        }
    }
    
    console.log(getDataG20());


    //km_road,anyo,province

    async function KmByProvince() {
    await getDataG20(); 
    const datosFiltrados = myDatag20
        .map(item => ({
            province: item.province,
            km_road: item.km_road
        }))
        .slice(0,5);

    return datosFiltrados;
    
    
  }
  KmByProvince().then(data => console.log(data));

    async function getMisDatos(){
        resultStatus = result = "";

        try {

            await fetch(API_LOAD)

            const res = await fetch(API,{method:"GET"});

            const data = await res.json();
            result = JSON.stringify(data,null,2);

            myData = data;
           // console.log(`Response received:\n${JSON.stringify(myData,null,2)}`);

        } catch (error){
            console.log(`ERROR:  GET from ${API}: ${error}`);
        }
    }

    //console.log(getMisDatos());

    async function graduatedTotalBadajoz(location = "BADAJOZ", año = "2016-2017") {
    await getMisDatos();

    const total = myData
        .filter(item => item.location === location && item.academicYear === año)
        .reduce((sum, item) => sum + (parseInt(item.graduated) || 0), 0);

    return { graduated: total };
  }

  //graduatedTotalBadajoz().then(console.log);

  async function porcentajeExtranjerosCiudad(año = "2016-2017") {
    await getMisDatos();

    const resultado = {};

    myData
        .filter(item => item.academicYear === año && item.foreigners != null)
        .forEach(item => {
            const ciudad = item.location;
            const extranjeros = item.foreigners;

            if (!resultado[ciudad]) {
                resultado[ciudad] = 0;
            }

            resultado[ciudad] += extranjeros;
        });

    return resultado;
}

//porcentajeExtranjerosCiudad().then(console.log);


  async function getCombinedData() {
    const [victims, graduated] = await Promise.all([
        victimsInBadajoz(),
        graduatedTotalBadajoz()
    ]);

    return {
        total_victims: victims[0]?.total_victims || 0,
        graduated: graduated.graduated
    };
}

//getCombinedData().then(console.log);

   

    async function getDataF1(){
        resultStatus = result = "";

        try {

            const res = await fetch(APIF1,{method:"GET"});

            const data = await res.json();
            result = JSON.stringify(data,null,2);

            myDataF1 = data.results;

            //console.log(`Response received:\n${JSON.stringify(myDataF1,null,2)}`);

        } catch (error){
            console.log(`ERROR:  GET from ${APIF1}: ${error}`);
        }
    }
    
    //console.log(getDataF1());
    
    async function getDataSpotify(){
        resultStatus = result = "";

        try {

            const res = await fetch(APISPOTY,{method:"GET"});

            const data = await res.json();
            result = JSON.stringify(data,null,2);

            myDataSpoty = data.topTracks;

            //console.log(`Response received:\n${JSON.stringify(myDataSpoty,null,2)}`);

        } catch (error){
            console.log(`ERROR:  GET from ${APISPOTY}: ${error}`);
        }
    }
    
    //console.log(getDataSpotify());
    
    
    
    async function getDataFifa(){
        resultStatus = result = "";

        try {

            const res = await fetch(APITRANSFERMARKET,{method:"GET"});

            const data = await res.json();
            result = JSON.stringify(data,null,2);

            myDataTransfer = data.marketValueDevelopment;

            console.log(`Response received:\n${JSON.stringify(myDataTransfer,null,2)}`);

        } catch (error){
            console.log(`ERROR:  GET from ${APITRANSFERMARKET}: ${error}`);
        }
    }
    
    console.log(getDataFifa());
    

    async function driverByPoints() {
    await getDataF1(); // espera a que myData se llene correctamente
    const datosFiltrados = myDataF1
        .map(item => ({
            driver_name: item.driver_name,
            points: Number(item.points)
        }))
        .sort((a, b) => b.points - a.points)
        .slice(0,10);

    return datosFiltrados;
    
    
}
driverByPoints().then(data => console.log(data));


//marketValueUnformatted,seasonID
async function GotzeValueYears() {
    await getDataFifa(); // espera a que myData se llene correctamente

    const datosFiltrados = myDataTransfer
        .map(item => ({
          seasonID: item.seasonID,
          marketValueUnformatted: item.marketValueUnformatted
        }))
        .sort((a, b) => b.marketValueUnformatted - a.marketValueUnformatted)
        .slice(0, 10);

    return datosFiltrados;
    
    
}
GotzeValueYears().then(data => console.log(data));

async function trackByStreamCount() {
    await getDataSpotify(); // espera a que myData se llene correctamente

    const datosFiltrados = myDataSpoty
        .map(item => ({
            name: item.name,
            streamCount: item.streamCount
        }))
        .sort((a, b) => b.streamCount - a.streamCount)
        .slice(0, 10);

    return datosFiltrados;
    
    
}

//trackByStreamCount().then(data => console.log(data));


    onMount(async () => {

      const resultadoIntegracion1 = await getCombinedData(); 

      const dataInte1 = [
      { name: "Graduados", value: resultadoIntegracion1.graduated },
      { name: "Víctimas", value: resultadoIntegracion1.total_victims }
      ];


      const namesInt1 = dataInte1.map(item => item.name);
      const valuesInt1 = dataInte1.map(item => item.value);

      
      const resultadoIntegracion21 = await porcentajeExtranjerosCiudad();

      const dataInte21 = Object.entries(resultadoIntegracion21).map(([name, value]) => ({
        name,
        value
      }));

      const namesInt21 = dataInte21.map(item => item.name);
      const valuesInt21 = dataInte21.map(item => item.value);

      const resultadoIntegracion22 = await KmByProvince();

      const dataInte22 = resultadoIntegracion22.map(item => ({
        name: item.province,
        value: item.km_road,
        }));

      const namesInt22 = dataInte22.map(item => item.name);
      const valuesInt22 = dataInte22.map(item => parseFloat(item.value.replace(',', '.')));
      
        
        const resultado = await driverByPoints(); 
        const data = resultado.map(item => ({
            name: item.driver_name,
            value: Number(item.points) 
        }));


        const names = data.map(item => item.name);
        const values = data.map(item => item.value);
        
        
        
        const resultado2 = await GotzeValueYears(); 

        const data2 = resultado2.map(item => ({
            name: item.seasonID,
            value: Number(item.marketValueUnformatted) 
        }));


        const names2 = data2.map(item => item.name);
        const values2 = data2.map(item => item.value);
        console.log(names2);
        console.log(values2);
        console.log(names2[0]);
        console.log([values2[0]]);

        
    
        const resultado3 = await trackByStreamCount(); 

        const data3 = resultado3.map(item => ({
            name: item.name,
            value: Number(item.streamCount) 
        }));


        const names3 = data3.map(item => item.name);
        const values3 = data3.map(item => item.value);


        

      ZC.LICENSE = ["569d52cefae586f634c54f86dc99e6a9", "b55b025e438fa8a98e32482b5f768ff5"];
    let chartConfig4 = {
      globals: {
        fontFamily: 'Lucida Sans Unicode'
      },
      layout: '2x2',
      graphset: [{
          type: 'scorecard',
          border: '1px solid #ccc',
          options: {
            value: {
              text: valuesInt1[0],
              color: '#a00'
            },
            icon: {
              backgroundImage: 'https://api.iconify.design/fa-solid:user-graduate.svg',
              backgroundScale: 1.9,
            },
            title: {
              text: namesInt1[0],
              color: '#a00'
            }
          },
          plotarea: {
            margin: '10px'
          }
        },
        {
          type: 'scorecard',
          border: '1px solid #ccc',
          borderTop: '1px solid #ccc',
          borderBottom: '1px solid #ccc',
          borderRight: '1px solid #ccc',
          options: {
            value: {
              text: valuesInt1[1],
              color: '#0a0'
            },
            icon: {
              backgroundColor: '#8eba31 #8dcd41',
              backgroundImage: 'https://api.iconify.design/fa-solid:hospital.svg',
              backgroundScale: 1.9,
              borderColor: '#6fb023'
            },
            title: {
              text: namesInt1[1],
              color: '#0a0'
            }
          },
          plotarea: {
            margin: '10px'
          }
        }]
    };

    zingchart.render({
      id: 'myChart4',
      data: chartConfig4,
      height: '160px',
      width: '640px',
      modules: 'scorecard'
    });  
    ZC.LICENSE = ["569d52cefae586f634c54f86dc99e6a9", "b55b025e438fa8a98e32482b5f768ff5"]; // CHART CONFIG
    // -----------------------------
    let chartConfig5 = {
      globals: {
        fontFamily: 'Roboto',
      },
      layout: 'h',
      graphset: [{
          type: 'pie',
          backgroundColor: '#F4F4F4',
          title: {
            text: 'Numero de extranjeros por provincia',
            backgroundColor: 'none',
            color: '#626262',
            fontSize: '16px',
            x: '-20px',
            y: '80px',
          },
          legend: {
            margin: 'auto auto 16% auto',
            backgroundColor: 'none',
            borderWidth: '0px',
            item: {
              color: '%backgroundcolor',
            },
            layout: 'float',
            marker: {
              borderRadius: '3px',
              borderWidth: '0px',
            },
            shadow: false,
          },
          plot: {
            tooltip: {
              text: '%v Extranjeros',
              borderRadius: '3px',
              shadow: false,
            },
            valueBox: {
              visible: false,
            },
            marginRight: '100px',
            borderWidth: '0px',
            shadow: false,
            size: '100px',
            slice: 70,
          },
          plotarea: {
            margin: '15% 5%',
            backgroundColor: '#FFFFFF',
            borderColor: '#DFE1E3',
            borderRadius: '3px',
            borderWidth: '1px',
          },
          labels: [{
            fontSize: '24px',
            width: '10%',
            x: '45%',
            y: '47%',
          }, ],
          series: [{
              text: [namesInt21[0]],
              values: [valuesInt21[0]],
              backgroundColor: '#6CCFDF',
            },
            {
              text: [namesInt21[1]],
              values: [valuesInt21[1]],
              backgroundColor: '#E76D45',
            },
            {
              text: [namesInt21[2]],
              values: [valuesInt21[2]],
              backgroundColor: '#55BA72',
            },
            {
              text: [namesInt21[3]],
              values: [valuesInt21[3]],
              backgroundColor: '#F1C40F',
            },
            {
              text: [namesInt21[4]],
              values: [valuesInt21[4]],
              backgroundColor: '#9B59B6',
            }
          ],
        },
        {
          type: 'pie',
          backgroundColor: '#F4F4F4',
          title: {
            text: 'Numero de km por provincia',
            backgroundColor: 'none',
            color: '#626262',
            fontSize: '16px',
            x: '-52px',
            y: '80px',
          },
          legend: {
            margin: 'auto auto 16% auto',
            backgroundColor: 'none',
            borderWidth: '0px',
            item: {
              color: '%backgroundcolor',
            },
            layout: 'float',
            marker: {
              borderRadius: '3px',
              borderWidth: '0px',
            },
            shadow: false,
          },
          plot: {
            tooltip: {
              text: '%v km',
              borderRadius: '3px',
              shadow: false,
            },
            valueBox: {
              visible: false,
            },
            borderWidth: '0px',
            shadow: false,
            size: '100px',
            slice: 70,
          },
          plotarea: {
            margin: '15% 5%',
            backgroundColor: '#FFFFFF',
            borderColor: '#DFE1E3',
            borderRadius: '3px',
            borderWidth: '1px',
          },
          labels: [{
            fontSize: '24px',
            width: '10%',
            x: '45%',
            y: '47%',
          }, ],
          series: [{
              text: namesInt22[0],
              values: [valuesInt22[0]],
              backgroundColor: '#6CCFDF',
            },
            {
              text: namesInt22[1],
              values: [valuesInt22[1]],
              backgroundColor: '#E76D45',
            },
            {
              text: namesInt22[2],
              values: [valuesInt22[2]],
              backgroundColor: '#55BA72',
            },
            {
              text: namesInt22[3],
              values: [valuesInt22[3]],
              backgroundColor: '#F1C40F',
            },
            {
              text: namesInt22[4],
              values: [valuesInt22[4]],
              backgroundColor: '#9B59B6',
            }
          ],
        },
      ],
    };

    // RENDER CHARTS
    // -----------------------------
    
    zingchart.render({
      id: 'myChart5',
      data: chartConfig5,
    });
        
        ZC.LICENSE = ["569d52cefae586f634c54f86dc99e6a9", "b55b025e438fa8a98e32482b5f768ff5"]; // CHART CONFIG
    // -----------------------------
    let chartConfig = {
      type: 'hbar',
      title: {
        text: 'Pilotos de F1 con mas puntos',
        align: 'left',
        fontColor: '#555',
        fontFamily: 'Roboto',
        fontSize: '30px',
        fontWeight: 'normal',
        offsetX: '10px',
      },
      subtitle: {
        text: 'Grafica hecha con ZingChart (Rainbow Horizontal Bar Chart)',
        align: 'left',
        fontColor: '#777',
        fontFamily: 'Roboto',
        fontSize: '16px',
        offsetX: '10px',
        offsetY: '10px',
      },
      legend: {
        backgroundColor: 'transparent',
        borderWidth: '0px',
        cursor: 'hand',
        highlightPlot: true,
        item: {
          fontColor: '#333',
          fontFamily: 'Roboto',
          fontSize: '18px',
        },
        marker: {
          borderRadius: '10px',
          borderWidth: '0px',
        },
        offsetX: '0px',
        offsetY: '80px',
        padding: '10px',
      },
      plot: {
        tooltip: {
          text: '$%v Points ',
          padding: '10px',
          backgroundColor: '#fff',
          borderColor: '#333',
          borderRadius: '5px',
          borderWidth: '1px',
          fontColor: '#444',
          fontSize: '14px',
        },
        animation: {
          effect: 'ANIMATION_EXPAND_BOTTOM',
          method: 'ANIMATION_LINEAR',
          sequence: 'ANIMATION_BY_PLOT',
        },
        borderRadius: '0px 5px 5px 0px',
        highlightMarker: {
          backgroundColor: 'red',
        },
        highlightState: {
          backgroundColor: 'red',
        },
      },
      plotarea: {
        margin: '120px 130px 120px 100px',
      },
      scaleX: {
        item: {
          fontFamily: 'Roboto',
          fontSize: '14px',
        },
        labels: names,
        lineColor: '#DDD',
        tick: {
          visible: false,
        },
      },
      scaleY: {
        guide: {
          lineColor: '#DDD',
          lineStyle: 'solid',
        },
        item: {
          fontFamily: 'Roboto',
          fontSize: '12px',
          maxItems: 100,       
          autoFit: true 
        },
        label: {
          text: 'IPoints',
          fontColor: '#777',
          fontFamily: 'Roboto',
          fontSize: '14px',
          offsetY: '5px',
        },
        lineWidth: '0px',
        tick: {
          visible: false,
        },
      },
      source: {
        text: 'Puntos',
        fontColor: '#666',
        fontFamily: 'Roboto',
      },
      series: [
        {
          text: "",
          values: values,
          backgroundColor: '#494949',
          rules: [{
              backgroundColor: '#EB1C12',
              rule: '%i==0',
            },
            {
              backgroundColor: '#FBA30A',
              rule: '%i==1',
            },
            {
              backgroundColor: '#1c8976',
              rule: '%i==2',
            },
            {
              backgroundColor: '#016B88',
              rule: '%i==3',
            },
            {
              backgroundColor: '#588C08',
              rule: '%i==4',
            },
            {
              backgroundColor: '#781c7e',
              rule: '%i==5',
            },
          ],
        },
      ],
    };

    
    // RENDER CHARTS
    // -----------------------------
    zingchart.render({
      id: 'myChart',
      data: chartConfig,
      height: '100%',
      width: '100%',
    });

    
    
    
    ZC.LICENSE = ["569d52cefae586f634c54f86dc99e6a9", "b55b025e438fa8a98e32482b5f768ff5"];
    let colors = {
      blue: 'rgba(151,187,205,1)',
      gray: '#EBEBEB',
      grayDark: '#3F3F3F',
    };

    
    let chartConfig2 = {
      type: 'bar',
      title: {
        text: 'Los mayores valores de mercado de Mario Gotze',
        align: 'left',
        fontColor: '#555',
        fontFamily: 'Roboto',
        fontSize: '30px',
        fontWeight: 'normal',
        offsetX: '10px',
      },
      subtitle: {
        text: 'Grafica hecha con ZingChart (Styled Transparent Bar)',
        align: 'left',
        fontColor: '#777',
        fontFamily: 'Roboto',
        fontSize: '16px',
        offsetX: '10px',
        offsetY: '10px',
      },
      backgroundColor: '#FFF',
      plot: {
        backgroundColor2: 'rgba(151,187,205,1)',
        lineColor: 'rgba(151,187,205,1)',
        lineWidth: '2px',
        marker: {
          backgroundColor: 'rgba(151,187,205,1)',
          borderColor: 'white',
          shadow: false,
        },
      },
      plotarea: {
        backgroundColor: 'white',
      },
      scaleX: {
        guide: {
          alpha: 1,
          lineColor: colors.gray,
          lineStyle: 'solid',
        },
        item: {
          color: colors.grayDark,
        },
        labels: names2,
        lineColor: colors.gray,
        lineWidth: '1px',
        tick: {
          lineColor: '#C7C7C7',
          lineWidth: '1px',
        },
      },
      scaleY: {
        guide: {
          alpha: 1,
          lineColor: colors.gray,
          lineStyle: 'solid',
        },
        item: {
          color: colors.grayDark,
        },
        lineColor: colors.gray,
        lineWidth: '1px',
        tick: {
          lineColor: '#C7C7C7',
          lineWidth: '1px',
        },
      },
      series: [{
          values: values2,
          alpha: 0.5,
          backgroundColor1: 'rgba(220,220,220,1)',
          backgroundColor2: 'rgba(220,220,220,1)',
          borderBottom: '0px',
          borderColor: '#C7C7C7',
          borderTop: '2px solid #C7C7C7',
          borderWidth: '2px',
          lineColor: 'rgba(220,220,220,1)',
          lineWidth: '2px',
          marker: {
            backgroundColor: 'rgba(220,220,220,1)',
          },
        }
      ],
    };

    zingchart.render({
      id: 'myChart2',
      data: chartConfig2,
      height: '100%',
      width: '100%',
      hideprogresslogo: true,
    });
    
    
    Highcharts.chart('container5', {

    chart: {
        type: 'column',
        styledMode: true
    },

    title: {
        text: 'Tops canciones'
    },
    subtitle: {
    text: 'Grafico de Highcharts (Styled mode column)'  
    },

    xAxis: {
        categories: names3
    },

    yAxis: [{ // Primary axis
        className: 'highcharts-color-0',
        title: {
            text: 'Numero de visitas'
        }
    }, { // Secondary axis
        className: 'highcharts-color-1',
        opposite: true,
        title: {
            text: 'Años'
        }
    }],

    plotOptions: {
        column: {
            borderRadius: 5
        }
    },

    series: [{
            name: 'Nombre Canción',
            data: values3,
            tooltip: {
                valueSuffix: ' visitas'
            }
        }]

    });
    
    });
  
</script>

  <div style="text-align:center; font-family:'Lucida Sans Unicode'; margin-bottom:10px; margin-top:10px;">
    <h2 style="margin:0; font-size:20px; color:#333;">Estadísticas de Badajoz en un año</h2>
    <p style="margin:0; font-size:14px; color:#666;">Gráfico de ZingChart (Scorecard Chart)</p>
    <p style="margin:0; font-size:14px; color:#666;">Integracion con grupo 10 </p>
  </div>

  <div id="myChart4" class="chart--container4">
    <a href="https://www.zingchart.com/" rel="noopener" class="zc-ref4">Powered by ZingChart</a>
  </div> 

  <div style="text-align:center; font-family:'Lucida Sans Unicode'; margin-top:10px;">
    <h2 style="margin:0; font-size:20px; color:#333;">Porcentajes</h2>
    <p style="margin:0; font-size:14px; color:#666;">Gráfico de ZingChart (Double Ring Chart)</p>
    <p style="margin:0; font-size:14px; color:#666;">Integracion con grupo 20 </p>
  </div>
  
  <div id="myChart5" class="chart--container5">
    <a href="https://www.zingchart.com/" rel="noopener" class="zc-ref5">Powered by ZingChart</a>
  </div>

   <div id="myChart" class="chart--container">
    <a href="https://www.zingchart.com/" rel="noopener" class="zc-ref">Powered by ZingChart</a>
  </div>

  <div id="myChart2" class="chart--container2"><a class="zc-ref2" href="https://www.zingchart.com/">Powered by ZingChart</a></div>

   <figure class="highcharts-figure">
    <div id="container5"></div>
    </figure>


  <h2>GRUPO 21</h2>

  <Table>
      <thead>
          <tr>
              <th>year</th>
              <th>province</th>
              <th>ticket_price</th>
              <th>total_trips</th>
              <th>route_length</th>
          </tr>
      </thead>

      <tbody>
          {#each myDatag21 as datag21}
              <tr>
                  <td>
                      {datag21.year}
                  </td>
                  <td>
                      {datag21.province}
                  </td>
                  <td>
                    {datag21.ticket_price}
                </td>
                  <td>
                    {datag21.total_trips}
                </td>
                <td>
                    {datag21.route_length}
                </td>
              </tr>
              {/each}
      </tbody>
  </Table>

  <h2>GRUPO 18</h2>

  <Table>
      <thead>
          <tr>
              <th>request_month</th>
              <th>request_year</th>
              <th>cnae_descr</th>
              <th>company_municipality</th>
              <th>work_center_locality</th>
              <th>sector</th>
              <th>total_work_sus</th>
              <th>total_man_sus</th>
              <th>total_woman_sus</th>
          </tr>
      </thead>

      <tbody>
          {#each myDatag18 as datag18}
              <tr>
                  <td>
                      {datag18.request_month}
                  </td>
                  <td>
                      {datag18.request_year}
                  </td>
                  <td>
                    {datag18.cnae_descr}
                </td>
                  <td>
                    {datag18.company_municipality}
                </td>
                <td>
                    {datag18.work_center_locality}
                </td>
                <td>
                  {datag18.sector}
              </td>
              <td>
                {datag18.total_work_sus}
            </td>
              <td>
                {datag18.total_man_sus}
            </td>
            <td>
                {datag18.total_woman_sus}
            </td>
              </tr>
              {/each}
      </tbody>
  </Table>


<style>
    .zc-body {
      background-color: #fff;
    }

    .chart--container {
      height: 100%;
      width: 100%;
      min-height: 530px;
    }

    .zc-ref {
      display: none;
    }

    .chart--container2 {
      height: 100%;
      width: 100%;
      min-height: 530px;
    }

    .zc-ref2 {
      display: none;
    }

    .chart--container4 {
      margin: auto;
      min-height: 150px;
      width: 640px;
      height: 160px;
    }

    .zc-ref4 {
      display: none;
    }

    .chart--container5 {
      height: 100%;
      width: 100%;
      min-height: 530px;
    }

    .zc-ref5 {
      display: none;
    }

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

    #container5 {
  height: 500px;
  width: 100%;
}

    
  </style>