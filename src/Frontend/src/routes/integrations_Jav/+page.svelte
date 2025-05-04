Hola mundo

<script>

  let APIG21 = "https://sos2425-21.onrender.com/api/v1/public-transit-stats/";
  let APIG18 = "https://sos2425-18.onrender.com/api/v2/dana-erte-stats";
  let APIF1 = "/api-f1";
  let APIFIFA = "/api-fifa";
  let APIBOX = "/boxing-data";
  let myDatag21 = [];
  let myDatag18 = [];
  let myDataF1 = [];
  let myDataFifa = [];
  let myDataBox = [];
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

    /*
    async function getDataF1(){
        resultStatus = result = "";

        try {

            const res = await fetch(APIF1,{method:"GET"});

            const data = await res.json();
            result = JSON.stringify(data,null,2);

            myDataF1 = data;

            console.log(`Response received:\n${JSON.stringify(myDataF1,null,2)}`);

        } catch (error){
            console.log(`ERROR:  GET from ${APIF1}: ${error}`);
        }
    }
    
    console.log(getDataF1());

    
    async function getDataBox(){
        resultStatus = result = "";

        try {

            const res = await fetch(APIBOX,{method:"GET"});

            const data = await res.json();
            result = JSON.stringify(data,null,2);

            myDataBox = data;

            console.log(`Response received:\n${JSON.stringify(myDataBox,null,2)}`);

        } catch (error){
            console.log(`ERROR:  GET from ${APIBOX}: ${error}`);
        }
    }
    
    console.log(getDataBox());

    async function getDataFifa(){
        resultStatus = result = "";

        try {

            const res = await fetch(APIFIFA,{method:"GET"});

            const data = await res.json();
            result = JSON.stringify(data,null,2);

            myDataFifa = data;

            console.log(`Response received:\n${JSON.stringify(myDataFifa,null,2)}`);

        } catch (error){
            console.log(`ERROR:  GET from ${APIFIFA}: ${error}`);
        }
    }
    
    console.log(getDataFifa());

    */

    

  

  
</script>