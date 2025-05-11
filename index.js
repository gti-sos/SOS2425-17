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
const app = express(); 
const Port = process.env.PORT || 16078;  


app.use(express.json()); 
app.use(cors());

app.options('*', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.sendStatus(200);
});


import { loadBackendPabloV1 } from "./src/backend/v1/university-academic-performance/index.js";
import { loadBackendPabloV2 } from "./src/backend/v2/university-academic-performance/index.js";
import { loadBackendJavierV1 } from "./src/backend/v1/university-demands/index.js"; 
import { loadBackendJavierV2 } from "./src/backend/v2/university-demands/index.js"; 
import { loadBackendAlejandro } from "./src/backend/v1/students_satisfaction/indexAGP.js";
import { loadBackendAlejandroV2 } from "./src/backend/v2/students_satisfaction/indexAGP.js";


//En express siempre se pone "/" que es la ruta y la segunda opcion es el callback

import {handler} from "./src/Frontend/build/handler.js"

//comentario para probar
app.use("/about",express.static("./public/Readme.html"));


loadBackendPabloV1(app)
loadBackendPabloV2(app)
loadBackendJavierV1(app) 
loadBackendJavierV2(app)
loadBackendAlejandro(app)
loadBackendAlejandroV2(app)



app.get('/cerveza-data', async (req, res) => {
  const response = await fetch('https://beer9.p.rapidapi.com/?brewery=Berkshire%20brewing%20company', {
    headers: {
      'x-rapidapi-host': 'beer9.p.rapidapi.com',
      'x-rapidapi-key': '832d7a3793msh8bad502e0e83ac7p18cf18jsnf086ce2b9e55'
    }
  });

  const data = await response.json();
  res.json(data);
});

app.get('/furbo-data', async (req, res) => {
  const response = await fetch('https://api-futbol-espana.p.rapidapi.com/api/liga/espana/tabla ', {
    headers: {
      'x-rapidapi-host': 'api-futbol-espana.p.rapidapi.com',
      'x-rapidapi-key': '832d7a3793msh8bad502e0e83ac7p18cf18jsnf086ce2b9e55'
    }
  });

  const data = await response.json();
  res.json(data);
});

app.get('/pelis-data', async (req, res) => {
  const response = await fetch('https://imdb236.p.rapidapi.com/imdb/lowest-rated-movies', {
    headers: {
      'x-rapidapi-host': 'imdb236.p.rapidapi.com',
      'x-rapidapi-key': '832d7a3793msh8bad502e0e83ac7p18cf18jsnf086ce2b9e55'
    }
  });

  const data = await response.json();
  res.json(data);
});


*/
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

app.get('/api-spotify', async (req, res) => {
  const response = await fetch('https://spotify-statistics-and-stream-count.p.rapidapi.com/artist/7Ln80lUS6He07XvHI8qqHH', {
    headers: {
      'x-rapidapi-host': 'spotify-statistics-and-stream-count.p.rapidapi.com',
      'x-rapidapi-key': 'b2d6a0d8b4msh462405ed946447bp12d6f9jsn0f847fb047e9'
    }
  });

  const data = await response.json();
  res.json(data);
});

app.get('/api-transfermarket', async (req, res) => {
  const response = await fetch('https://transfermarket.p.rapidapi.com/players/get-market-value?id=74842&domain=de', {
    headers: {
      'x-rapidapi-host': 'transfermarket.p.rapidapi.com',
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
}); 
