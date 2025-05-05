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
    
    //console.log(getDataG21());
    
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

    
    //console.log(getDataG18());

    /*
    {
  "meta": {
    "title": "F1 Driver Standings - 2020",
    "description": "Driver Standings for 2020 season.",
    "fields": {
      "position": "Integer",
      "points": "Integer",
      "driver_id": "Integer - driver unique id",
      "driver_name": "String - driver full name",
      "team_id": "Integer - driver team id",
      "team_name": "String - driver team name",
      "nationality": "String",
      "is_reserve": "Integer - 0 = full time driver, 1 = reserve",
      "updated": "Timestamp - ISO 8601 Format UTC timezone - i.e. 2020-03-13T01:00:00+00:00",
      "season": "Integer"
    }
  },
  "results": [
    {
      "position": 1,
      "points": "347",
      "driver_id": 65527,
      "driver_name": "Lewis Hamilton",
      "team_id": 58685,
      "team_name": "Mercedes",
      "nationality": "Great Britain",
      "is_reserve": 0,
      "updated": "2021-03-25T03:00:01+00:00",
      "season": 2020
    },
    */
   
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
    
    


    /*
    {
    "title": "Golden Boy Fight Night",
    "date": "2025-05-30T07:00:00",
    "location": "Virgin Hotels, Las Vegas, United States",
    "broadcasters": [
      {
        "United States": "DAZN"
      },
      {
        "United Kingdom": "DAZN Global"
      }
    ],
    "promotion": "Golden Boy Promotions",
    "id": "681017105eec4a2114f825fa",
    "poster_image_url": "https://assets.boxing-data.com/public/events/poster_images/486587fd-dd06-4b5d-97e3-77797bf28326.jpg"
  },
    */

    /*
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

    /*
    {
      "ID": 173731,
      "Name": "G. Bale",
      "Age": 32,
      "Photo": "https://cdn.sofifa.net/players/173/731/23_60.png",
      "Nationality": "Wales",
      "Flag": "https://cdn.sofifa.net/flags/gb-wls.png",
      "Overall": 81,
      "Potential": 81,
      "Club": "Los Angeles FC",
      "Club_Logo": "https://cdn.sofifa.net/teams/112996/30.png",
      "Value£": "20500000.0",
      "Wage£": "14000.0",
      "Special": 2157,
      "Preferred_Foot": "Left",
      "International_Reputation": "4.0",
      "Weak_Foot": "3.0",
      "Skill_Moves": "4.0",
      "Work_Rate": "Medium/ Medium",
      "Body_Type": "Unique",
      "Real_Face": "Yes",
      "Position": "RS",
      "Joined": "2022-08-11",
      "Loaned_From": "None",
      "Contract_Valid_Until": "2031.0",
      "Heightcm": "185.0",
      "Weightlbs": "180.81",
      "Release_Clause£": "30800000.0",
      "Kit_Number": "11.0",
      "Best_Overall_Rating": "0.0",
      "Year_Joined": 2022
    },
    */

    /*
    async function getDataFifa(){
        resultStatus = result = "";

        try {

            const res = await fetch(APIFIFA,{method:"GET"});

            const data = await res.json();
            result = JSON.stringify(data,null,2);

            myDataFifa = data.result;

            //console.log(`Response received:\n${JSON.stringify(myDataFifa,null,2)}`);

        } catch (error){
            console.log(`ERROR:  GET from ${APIFIFA}: ${error}`);
        }
    }
    
    console.log(getDataFifa());
    */
    

    
    
    async function driverByPosition() {
    await getDataF1(); // espera a que myData se llene correctamente

    const datosFiltrados = myDataF1
        .map(item => ({
            driver_name: item.driver_name,
            points: item.points
        }))
        .sort((a, b) => b.points - a.points)

    return datosFiltrados;
    
    
}
driverByPosition().then(data => console.log(data));



/*
async function playersByOverall() {
    await getDataFifa(); // espera a que myData se llene correctamente

    const datosFiltrados = myDataFifa
        .map(item => ({
            Name: item.Name,
            Overall: item.Overall
        }))
        .sort((a, b) => b.Overall - a.Overall)
        .slice(0, 10);

    return datosFiltrados;
    
    
}
playersByOverall().then(data => console.log(data));

*/

    
    

  

  
</script>