console.log("Init script");

const express = require("express");
const cool = require("cool-ascii-faces");
const app = express(); //para llamar al framework express
const Port = process.env.PORT || 16078; //Esto es para que si se ejecuta en la pagina web(la primera) que coja ese port y 
//que si se ejecuta en local coja el segundo 

const datosJGP = [
    { ciudad: "Almendralejo", grado: "Educación Infantil", general: 5.75 },
    { ciudad: "Almendralejo", grado: "Educación Primaria", general: 5.08 },
    { ciudad: "Mérida", grado: "Enfermería", general: 7.6 },
    { ciudad: "Badajoz", grado: "Educación Infantil", general: 6.1 },
    { ciudad: "Badajoz", grado: "Educación Primaria", general: 5 },
    { ciudad: "Badajoz", grado: "Ingeniería Electrónica y Automática", general: 7.7 },
    { ciudad: "Plasencia", grado: "Enfermería", general: 6.45 },
    { ciudad: "", grado: "Administración y Dirección de Empresas", general: null },
    { ciudad: "", grado: "Medicina", general: 6.5 }
];

const dataAGP = [
    { satisfaccion_total: 4.57, sat_estudiantes: null, satisfaccion_pdi: 4.89, carrera: "GRADO EN EDUCACIÓN INFANTIL", ciudad: "ALMENDRALEJO" },
    { satisfaccion_total: 9.00, sat_estudiantes: null, satisfaccion_pdi: 4.59, carrera: "GRADO EN EDUCACIÓN INFANTIL", ciudad: "ALMENDRALEJO" },
    { satisfaccion_total: 4.58, sat_estudiantes: 4.53, satisfaccion_pdi: 4.45, carrera: "GRADO EN EDUCACIÓN INFANTIL", ciudad: "ALMENDRALEJO" },
    { satisfaccion_total: 8.55, sat_estudiantes: 4.88, satisfaccion_pdi: 4.46, carrera: "GRADO EN EDUCACIÓN PRIMARIA", ciudad: "ALMENDRALEJO" },
    { satisfaccion_total: 8.81, sat_estudiantes: 4.54, satisfaccion_pdi: null, carrera: "GRADO EN EDUCACIÓN PRIMARIA", ciudad: "ALMENDRALEJO" },
    { satisfaccion_total: 4.57, sat_estudiantes: 4.56, satisfaccion_pdi: 4.58, carrera: "GRADO EN EDUCACIÓN PRIMARIA", ciudad: "ALMENDRALEJO" },
    { satisfaccion_total: 8.28, sat_estudiantes: null, satisfaccion_pdi: 4.58, carrera: "GRADO EN ENFERMERÍA", ciudad: "MÉRIDA" },
    { satisfaccion_total: 8.27, sat_estudiantes: 7.41, satisfaccion_pdi: 3.89, carrera: "GRADO EN ENFERMERÍA", ciudad: "MÉRIDA" },
    { satisfaccion_total: 8.61, sat_estudiantes: 7.46, satisfaccion_pdi: 4.58, carrera: "GRADO EN ENFERMERÍA", ciudad: "MÉRIDA" },
    { satisfaccion_total: 7.75, sat_estudiantes: null, satisfaccion_pdi: 3.77, carrera: "GRADO EN EDUCACIÓN INFANTIL", ciudad: "BADAJOZ" }
];


//En express siempre se pone "/" que es la ruta y la segunda opcion es el callback

app.use("/",express.static("./public/index.html")); //Esto es para que ponga el html  ya que coje la carpeta static 

app.use("/about",express.static("./public/Readme.html")); //Esto es para que ponga el html  ya que coje la carpeta static

app.use("/samples/JGP",express.static("./samples/JGP.js")); //Esto es para que ponga el html  ya que coje la carpeta static

app.get("/", (request,response)=>{
    response.send("Hello from the server");
}) //Esto es para que cuando entres al localhost:16078 te lleve a una pagina que tenga un mensaje Hello from the server

app.get("/cool", (request,response)=>{
    response.send(cool());
}) //Esto es para que cuando entres al localhost:16078 te lleve a una pagina que tenga un mensaje Hello from the server

app.get("/", (request,response)=>{
    response.send("Hello from the server");
}) //Esto es para que cuando entres al localhost:16078 te lleve a una pagina que tenga un mensaje Hello from the server

app.get("/samples/JGP", (req, res) => {
    const ciudadFiltrada = "Badajoz";
    const datosFiltrados = datosJGP.filter(dato => dato.ciudad === ciudadFiltrada);
    const media = datosFiltrados.reduce((acc, curr) => acc + (curr.general || 0), 0) / datosFiltrados.length;
    
    res.json({ ciudad: ciudadFiltrada, mediaGeneral: media.toFixed(2) });
});

app.get("/samples/AGP", (req, res) => {
const carreraFiltro = "GRADO EN EDUCACIÓN INFANTIL";
const datosFiltrados = dataAGP.filter(d => d.carrera === carreraFiltro);
const mediaSatisfaccion = datosFiltrados.reduce((acc, d) => acc + d.satisfaccion_total, 0) / datosFiltrados.length;

res.json(`La satisfacción media en ${carreraFiltro} es: ${mediaSatisfaccion.toFixed(2)}`);
});

app.listen(Port,()=>{
    console.log(`Server Running on Port ${Port}`);
}); //Esto es para usar el framework en ese puerto (poner un puerto alto)

