console.log("Init script");
console.log("Se recuerda que han sido eliminados los DeprecationWarning");

process.removeAllListeners('warning');
process.on('warning', (warning) => {
  if (warning.name === 'DeprecationWarning') {
    // Silenciar solo los warnings deprecados
    return;
  }
  // Mostrar otros tipos de warning (opcional)
  console.warn(warning);
});



import express from "express"; 
import cors from "cors";
const app = express(); //para llamar al framework express
const Port = process.env.PORT || 16078; //Esto es para que si se ejecuta en la pagina web(la primera) que coja ese port y 


app.use(express.json()); //esto es para que todo lo que coja de express lo ponga como json
app.use(cors());

app.options('*', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.sendStatus(200);
});
import { loadBackendPabloV1 } from "./src/backend/v1/university-academic-performance/index.js";
import { loadBackendPabloV2 } from "./src/backend/v2/university-academic-performance/index.js";
import { loadBackendJavierV1 } from "./src/backend/v1/university-demands/index.js"; //con esto importo la funcion loadBackend del src/back
import { loadBackendJavierV2 } from "./src/backend/v2/university-demands/index.js"; //con esto importo la funcion loadBackend del src/back
import { loadBackendAlejandro } from "./src/backend/v1/students_satisfaction/indexAGP.js";
import { loadBackendAlejandroV2 } from "./src/backend/v2/students_satisfaction/indexAGP.js";

//En express siempre se pone "/" que es la ruta y la segunda opcion es el callback

import {handler} from "./src/Frontend/build/handler.js"

//comentario para probar
app.use("/about",express.static("./public/Readme.html")); //Esto es para que ponga el html  ya que coje la carpeta static


loadBackendPabloV1(app)
loadBackendPabloV2(app)
loadBackendJavierV1(app) //aqui pongo la funcion loadBackend importada de src/back para que se muestre en pantalla
loadBackendJavierV2(app)
loadBackendAlejandro(app)
loadBackendAlejandroV2(app)

app.get('/tiktok-data', async (req, res) => {
  const response = await fetch('https://tiktok-api23.p.rapidapi.com/api/user/followers?secUid=MS4wLjABAAAAqB08cUbXaDWqbD6MCga2RbGTuhfO2EsHayBYx08NDrN7IE3jQuRDNNN6YwyfH6_6&count=30&minCursor=0', {
    headers: {
      'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com',
      'x-rapidapi-key': '832d7a3793msh8bad502e0e83ac7p18cf18jsnf086ce2b9e55'
    }
  });

  const data = await response.json();
  res.json(data);
});

app.get('/onepiece-data', async (req, res) => {
  const response = await fetch('https://one-piece2.p.rapidapi.com/api/get-character-list ', {
    headers: {
      'x-rapidapi-host': 'one-piece2.p.rapidapi.com',
      'x-rapidapi-key': '832d7a3793msh8bad502e0e83ac7p18cf18jsnf086ce2b9e55'
    }
  });

  const data = await response.json();
  res.json(data);
});

app.get('/lol-data', async (req, res) => {
  const response = await fetch('https://lol_stats.p.rapidapi.com/euw1/SuperTony', {
    headers: {
      'x-rapidapi-host': 'lol_stats.p.rapidapi.com',
      'x-rapidapi-key': '832d7a3793msh8bad502e0e83ac7p18cf18jsnf086ce2b9e55'
    }
  });

  const data = await response.json();
  res.json(data);
});


app.get('/api-f1', async (req, res) => {
  const response = await fetch('https://f1-live-motorsport-data.p.rapidapi.com/drivers/standings/2020', {
    headers: {
      'x-rapidapi-host': 'f1-live-motorsport-data.p.rapidapi.com',
      'x-rapidapi-key': 'b2d6a0d8b4msh462405ed946447bp12d6f9jsn0f847fb047e9'
    }
  });

  const data = await response.json();
  res.json(data);
});

app.get('/boxing-data', async (req, res) => {
  const response = await fetch('https://boxing-data-api.p.rapidapi.com/v1/events/schedule?days=30&past_hours=12&date_sort=ASC&page_num=1&page_size=25', {
    headers: {
      'x-rapidapi-host': 'boxing-data-api.p.rapidapi.com',
      'x-rapidapi-key': 'b2d6a0d8b4msh462405ed946447bp12d6f9jsn0f847fb047e9'
    }
  });

  const data = await response.json();
  res.json(data);
});

app.get('/api-fifa', async (req, res) => {
  const response = await fetch('https://fifa23-players-data.p.rapidapi.com/list/2', {
    headers: {
      'x-rapidapi-host': 'fifa23-players-data.p.rapidapi.com',
      'x-rapidapi-key': 'b2d6a0d8b4msh462405ed946447bp12d6f9jsn0f847fb047e9'
    }
  });

  const data = await response.json();
  res.json(data);
});
/*
app.get('/api-sofascore', async (req, res) => {
  const response = await fetch('https://sofascore.p.rapidapi.com/players/get-all-statistics?playerId=155997', {
    headers: {
      'x-rapidapi-host': 'sofascore.p.rapidapi.com',
      'x-rapidapi-key': '14ab9a12c4mshc408dc06a83c6f1p18c6d0jsn714586264596'
    }
  });

  const data = await response.json();
  res.json(data);
});

app.get('/api-anime', async (req, res) => {
  const response = await fetch('https://animedb1.p.rapidapi.com/top/characters', {
    headers: {
      'x-rapidapi-host': 'animedb1.p.rapidapi.com',
      'x-rapidapi-key': '14ab9a12c4mshc408dc06a83c6f1p18c6d0jsn714586264596'
    }
  });

  const data = await response.json();
  res.json(data);
});


app.get('/api-pokemon-unite', async (req, res) => {
  const response = await fetch('https://pokemon-unite-pokemons.p.rapidapi.com/pokemon?page=1&pageSize=10', {
    headers: {
      'x-rapidapi-host': 'pokemon-unite-pokemons.p.rapidapi.com',
      'x-rapidapi-key': '14ab9a12c4mshc408dc06a83c6f1p18c6d0jsn714586264596'
    }
  });

  const data = await response.json();
  res.json(data);
});
*/


app.use(handler);

app.listen(Port,()=>{
    console.log(`Server Running on Port ${Port}`);
}); //Esto es para usar el framework en ese puerto (poner un puerto alto)

