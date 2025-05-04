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
    console.log(response.json)
    console.log("1")
    return await response.json(); 
}catch (error){
    console.log("ERROR");
}
}


async function getSanctionsAndPoints() {

try{
    const response = await fetch("https://sos2425-19.onrender.com/api/v1/sanctions-and-points-stats");
    console.log(response.json)
    console.log("1")
    return await response.json(); 
}catch (error){
    console.log("ERROR");
}
}


async function getPrecipitationStats() {

try{
    const response = await fetch("https://sos2425-15.onrender.com/api/v1/precipitation-stats");
    console.log(response.json)
    console.log("1")
    return await response.json(); 
}catch (error){
    console.log("ERROR");
}
}


async function getEmploymentData() {

try{
    const response = await fetch("https://sos2425-14.onrender.com/api/v1/employment-data");
    console.log(response.json)
    console.log("1")
    return await response.json(); 
}catch (error){
    console.log("ERROR");
}
}


async function getRadarsStats() {

try{
    const response = await fetch("https://sos2425-10.onrender.com/api/v1/radars-stats");
    console.log(response.json)
    console.log("1")
    return await response.json(); 
}catch (error){
    console.log("ERROR");
}
}

async function getAstronomy() {

try{
    const response = await fetch("/api-astronomy");
    console.log(response.json)
    console.log("1")
    return await response.json(); 
}catch (error){
    console.log("ERROR");
}
}



async function getAnime() {

try{
    const response = await fetch("/api-anime");
    console.log(response.json)
    console.log("1")
    return await response.json(); 
}catch (error){
    console.log("ERROR");
}
}


async function getPokemon() {

try{
    const response = await fetch("/api-pokemon-unite");
    console.log(response.json)
    console.log("1")
    return await response.json(); 
}catch (error){
    console.log("ERROR");
}
}












onMount(async () => {
    /*
    data_pab=await getUniversityAcademicPerformance();
    console.log("MIS DATOS ",data_pab)
    data_Fines=await getFines();
    console.log("FINES G20",data_Fines)
    data_sanctionsAndPoints=await getSanctionsAndPoints();
    console.log("SANCTIONS AND POINTS G19 ",data_sanctionsAndPoints)
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



});





</script>