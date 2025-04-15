console.log("Init script");


import express from "express";
const app = express(); //para llamar al framework express
const Port = process.env.PORT || 16078; //Esto es para que si se ejecuta en la pagina web(la primera) que coja ese port y 


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

import {handler} from "./src/Frontend/build/handler.js"

//comentario
app.use("/about",express.static("./public/Readme.html")); //Esto es para que ponga el html  ya que coje la carpeta static


loadBackendPablo(app)
loadBackendJavier(app) //aqui pongo la funcion loadBackend importada de src/back para que se muestre en pantalla
loadBackendAlejandro(app)


app.use(handler);

app.listen(Port,()=>{
    console.log(`Server Running on Port ${Port}`);
}); //Esto es para usar el framework en ese puerto (poner un puerto alto)