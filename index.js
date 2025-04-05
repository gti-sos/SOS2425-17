console.log("Init script");
const BASE_API = "/api/v1";

import express from "express";
const app = express(); //para llamar al framework express
const Port = process.env.PORT || 16078; //Esto es para que si se ejecuta en la pagina web(la primera) que coja ese port y 


import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});



app.use(express.json()); //esto es para que todo lo que coja de express lo ponga como json


app.options('*', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.sendStatus(200);
});
import { loadBackendPablo } from "./src/backend/university-academic-performance/index.js";
import { loadBackendJavier } from "./src/backend/university-demands/index.js"; //con esto importo la funcion loadBackend del src/back
import { loadBackendAlejandro } from "./src/backend/students_satisfaction/index.js";


//En express siempre se pone "/" que es la ruta y la segunda opcion es el callback

app.use("/",express.static("./public/index.html")); //Esto es para que ponga el html  ya que coje la carpeta static 

app.use("/about",express.static("./public/Readme.html")); //Esto es para que ponga el html  ya que coje la carpeta static


app.get("/", (request,response)=>{
    response.send("Hello from the server, the sos2425-17 team greets you");
}) //Esto es para que cuando entres al localhost:16078 te lleve a una pagina que tenga un mensaje Hello from the server

loadBackendPablo(app)
loadBackendJavier(app) //aqui pongo la funcion loadBackend importada de src/back para que se muestre en pantalla
loadBackendAlejandro(app)

app.listen(Port,()=>{
    console.log(`Server Running on Port ${Port}`);
}); //Esto es para usar el framework en ese puerto (poner un puerto alto)

        



