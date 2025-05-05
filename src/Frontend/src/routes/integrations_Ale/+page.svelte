<script>


let apitiktok = "/tiktok-data";
let apilol = "/lol-data";
let apionepiece = "/onepiece-data";
let apiG15="https://sos2425-15.onrender.com/ocupied-grand-stats";
let apiG10="https://sos2425-10.onrender.com/registrations-stats";
let apiG19="https://sos2425-19.onrender.com/ownerships-changes-stats";
let apiG12="https://sos2425-12.onrender.com/annual-consumptions";
let mydatatiktok = [];
let mydatalol = [];
let mydataonepiece = [];
let mydatag15 = [];
let mydatag10 = [];
let mydatag19 = [];
let mydatag12 = [];
let result = "";
let resultStatus = "";

async function getDataG15(){
        resultStatus = result = "";

        try {

            const res = await fetch(apiG15,{method:"GET"});

            const data = await res.json();
            result = JSON.stringify(data,null,2);

            mydatag15 = data;

            console.log(`Response received:\n${JSON.stringify(mydatag15,null,2)}`);

        } catch (error){
            console.log(`ERROR:  GET from ${apiG15}: ${error}`);
        }
    }
    
    console.log(getDataG15());







    fetch("http://localhost:16078/tiktok-data")
  .then(res => res.json())
  .then(data => console.log(data));

  fetch("http://localhost:16078/onepiece-data")
  .then(res => res.json())
  .then(data => console.log(data));

  fetch("http://localhost:16078/lol-data")
  .then(res => res.json())
  .then(data => console.log(data));
</script>