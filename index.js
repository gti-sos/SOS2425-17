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
import { loadBackendJavierV1 } from "./src/backend/v1/university-demands/index.js"; //con esto importo la funcion loadBackend del src/back
import { loadBackendJavierV2 } from "./src/backend/v2/university-demands/index.js"; //con esto importo la funcion loadBackend del src/back
import { loadBackendAlejandro } from "./src/backend/v1/university-demands/students_satisfaction/indexAGP.js";
import { loadBackendAlejandroV2 } from "./src/backend/v2/university-demands/students_satisfaction/indexAGP.js";

//En express siempre se pone "/" que es la ruta y la segunda opcion es el callback

import {handler} from "./src/Frontend/build/handler.js"

//comentario para probar
app.use("/about",express.static("./public/Readme.html")); //Esto es para que ponga el html  ya que coje la carpeta static


loadBackendPabloV1(app)
loadBackendJavierV1(app) //aqui pongo la funcion loadBackend importada de src/back para que se muestre en pantalla
loadBackendJavierV2(app)
loadBackendAlejandro(app)
loadBackendAlejandroV2(app)



app.use(handler);

app.listen(Port,()=>{
    console.log(`Server Running on Port ${Port}`);
}); //Esto es para usar el framework en ese puerto (poner un puerto alto)