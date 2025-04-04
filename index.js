console.log("Init script");
const BASE_API = "/api/v1";



import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


import express from "express";
const app = express(); //para llamar al framework express
const Port = process.env.PORT || 16078; //Esto es para que si se ejecuta en la pagina web(la primera) que coja ese port y 
//que si se ejecuta en local coja el segundo 

app.use(express.json()); //esto es para que todo lo que coja de express lo ponga como json


app.options('*', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.sendStatus(200);
});
import { loadBackendPablo } from "./src/backend/university-academic-performance/index.js";
import { loadBackendJavier } from "./src/backend/university-demands/index.js"; //con esto importo la funcion loadBackend del src/back

loadBackendPablo(app)

const students_satisfaction = [
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

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.use("/about",express.static("./public/Readme.html")); //Esto es para que ponga el html  ya que coje la carpeta static


app.get("/", (request,response)=>{
    response.send("Hello from the server, the sos2425-17 team greets you");
}) //Esto es para que cuando entres al localhost:16078 te lleve a una pagina que tenga un mensaje Hello from the server


loadBackendJavier(app) //aqui pongo la funcion loadBackend importada de src/back para que se muestre en pantalla

app.listen(Port,()=>{
    console.log(`Server Running on Port ${Port}`);
}); //Esto es para usar el framework en ese puerto (poner un puerto alto)

        



//API ALEJANDRO 

app.get(BASE_API+"/students_satisfaction", (request,response)=>{
    console.log("New GET to /students_satisfaction");
    response.send(JSON.stringify(students_satisfaction))
});

let myNullArray=[]
app.get(BASE_API+"/students_satisfaction/loadInitialData",(request,response)=>{
    if (myNullArray.length ===0){
        myNullArray.push(...students_satisfaction) // Los puntos suspensivos sirven para añadirlos de 1 en 1
    }
        
        response.send(JSON.stringify(myNullArray));

})
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//POST

app.post(BASE_API+"/students_satisfaction",(request,response)=>{ //Para hacer un post necesitamos postman

    console.log("POST to /students_satisfaction");
    console.log(`<${request.body}>`);

    let newstudents_satisfaction = request.body; //Creo una variable donde guardo el nuevo contacto y para ello hago request.body porque 
    //en postman se esqcribe en body y haces request.body para que te coja el codigo de body de postman
    const body = request.body;

    if (!body.satisfaccion_total || !body.sat_estudiantes|| !body.satisfaccion_pdi || !body.carrera || !body.ciudad ) {
        return response.status(400).json({ error: "Missing required fields" });
    }
    if (students_satisfaction.find(d => d.satisfaccion_total === body.satisfaccion_total && d.carrera === body.carrera && d.ciudad==body.ciudad)) {
        return response.status(409).json({ error: "Record already exists" });
    }

    students_satisfaction.push(newstudents_satisfaction); //Para enviar los datos 

    response.sendStatus(201); //Para que la persona vea que esos datos se han enviado . Esto siempre se hace con el sendStatus
});
app.put(BASE_API + "/students_satisfaction/:carrera/:ciudad", (req, res) => {
    const { carrera, ciudad } = req.params;
    const index = students_satisfaction.findIndex(d => d.carrera === carrera && d.ciudad === ciudad);

    if (index === -1) {
        return res.status(404).json({ error: "Registro no encontrado" });
    }

    // Validar que carrera y ciudad en el body coincidan con los de la URL
    if (req.body.carrera !== carrera || req.body.ciudad !== ciudad) {
        return res.status(400).json({ error: "Carrera y ciudad en el body deben coincidir con los parámetros de la URL" });
    }

    // Actualizar datos del registro
    students_satisfaction[index] = { ...students_satisfaction[index], ...req.body };

    res.status(200).json({ message: "Registro actualizado correctamente" });
});


app.delete(BASE_API + "/students_satisfaction/:carrera/:ciudad", (req, res) => {
    const { carrera, ciudad } = req.params;
    const index = students_satisfaction.findIndex(d => d.carrera === carrera && d.ciudad === ciudad);

    if (index === -1) {
        return res.status(404).json({ error: "Registro no encontrado" });
    }

    students_satisfaction.splice(index, 1);

    res.status(200).json({ message: "Registro eliminado correctamente" });
})