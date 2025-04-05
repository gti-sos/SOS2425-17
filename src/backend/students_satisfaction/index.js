import dataStore from "nedb"; //Esto es para importar la base de datos ndb que es un paquete que te descargas con node
const BASE_API = "/api/v1"; //Con esto lo que hago es crear la URL base de la api y digo que para encontrar la api pongas esa direccion 

let db = new dataStore();//Esto es para inicializar dataStore que sirve para incializar bases de datos

// https://sos2425-XX.onrender.com/api/v1/FFFFF

const students_satisfaction = [
    { satisfaccion_total: 4.57, sat_estudiantes: null, satisfaccion_pdi: 4.89, carrera: "GRADO EN EDUCACIÓN INFANTIL", ciudad: "ALMENDRALEJO" },
    { satisfaccion_total: 9.00, sat_estudiantes: null, satisfaccion_pdi: 4.59, carrera: "GRADO EN INGENIERÍA ELECTRÓNICA Y AUTOMÁTICA", ciudad: "BADAJOZ" },
    { satisfaccion_total: 4.58, sat_estudiantes: 4.53, satisfaccion_pdi: 4.45, carrera: "GRADO EN ENFERMERÍA", ciudad: "PLASENCIA" },
    { satisfaccion_total: 8.55, sat_estudiantes: 4.88, satisfaccion_pdi: 4.46, carrera: "GRADO EN EDUCACIÓN PRIMARIA", ciudad: "ALMENDRALEJO" },
    { satisfaccion_total: 8.81, sat_estudiantes: 4.54, satisfaccion_pdi: null, carrera: "GRADO EN ADMINISTRACIÓN Y DIRECCIÓN DE EMPRESAS", ciudad: "CÁCERES" },
    { satisfaccion_total: 4.57, sat_estudiantes: 4.56, satisfaccion_pdi: 4.58, carrera: "GRADO EN MEDICINA", ciudad: "BADAJOZ" },
    { satisfaccion_total: 8.28, sat_estudiantes: null, satisfaccion_pdi: 4.58, carrera: "GRADO EN ENFERMERÍA", ciudad: "MÉRIDA" },
    { satisfaccion_total: 8.27, sat_estudiantes: 7.41, satisfaccion_pdi: 3.89, carrera: "GRADO EN DERECHO", ciudad: "CÁCERES" },
    { satisfaccion_total: 8.61, sat_estudiantes: 7.46, satisfaccion_pdi: 4.58, carrera: "GRADO EN ECONOMÍA", ciudad: "MÉRIDA" },
    { satisfaccion_total: 7.75, sat_estudiantes: null, satisfaccion_pdi: 3.77, carrera: "GRADO EN EDUCACIÓN INFANTIL", ciudad: "BADAJOZ" }
];

//API ALEJANDRO 
function loadBackendAlejandro(app){
    app.get(BASE_API+"/students_satisfaction", (request,response)=>{
        console.log("New get to /students_satisfaction")
            db.find({},(err,demands)=>{//Busco todo y el contacts es lo que devolveria 
                response.send(JSON.stringify(demands.map((c)=>{ //Esto es que para cada contatacto hago lo que sea y para acceder 
                    //a cualquier propiedad lo hago con map 
                    delete c._id; //con esto lo que hago esque quito el id para que asi no se muestre en la api al hacer un get
                    return c; //Quito id porque al usar db , db le pone id a todo entonces lo quito para que el usuario no lo vea
                }),null,2));
            });
        });

    // Función para quitar tildes
function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Obtener registros por carrera y ciudad
app.get(BASE_API + "/students_satisfaction/:carrera/:ciudad", (req, response) => {
    console.log("New GET to /students_satisfaction/:carrera/:ciudad");

    const carreraParam = removeAccents(req.params.carrera.toLowerCase());
    const ciudadParam = removeAccents(req.params.ciudad.toLowerCase());

    // Buscar en la base de datos ignorando mayúsculas, minúsculas y tildes
    db.find({}, (err, demands) => {
        if (err) {
            response.status(500).send("Internal Server Error");
            return;
        }

        const filtered = demands.filter(record =>
            removeAccents(record.carrera.toLowerCase()) === carreraParam &&
            removeAccents(record.ciudad.toLowerCase()) === ciudadParam
        );

        if (filtered.length > 0) {
            response.status(200).json(filtered.map((c) => {
                delete c._id;
                return c;
            }));
        } else {
            response.sendStatus(404);
        }
    });
});




        app.get(BASE_API + "/students_satisfaction/loadInitialData", (request, response) => {
            console.log("Loading initial data into the database...");
        
            // Verificar si la base de datos ya tiene datos
            db.count({}, (err, count) => {
                if (err) {
                    return response.status(500).json({ error: "Database error" });
                }
        
                if (count === 0) {
        
                    // Insertar datos en la base de datos
                    db.insert(students_satisfaction , (err, newDocs) => {
                        if (err) {
                            return response.status(500).json({ error: "Error inserting initial data" });
                        }
                        response.status(201).json("Datos insertados con éxito"); // Devuelve los datos insertados
                    });
                } else {
                    response.status(200).json({ message: "Database already initialized" });
                }
            });
        });

//POST

app.post(BASE_API+"/students_satisfaction",(request,response)=>{ //Para hacer un post necesitamos postman

    console.log("POST to /students_satisfaction");
    console.log(`<${request.body}>`);
    const body = request.body;

    if (!body.satisfaccion_total || !body.sat_estudiantes|| !body.satisfaccion_pdi || !body.carrera || !body.ciudad ) {
        return response.status(400).json({ error: "Missing required fields" });
    }
    db.findOne({ carrera: body.carrera, ciudad: body.ciudad}, (err, existingRecord) => {
        if (err) {
            return response.status(500).json({ error: "Database error" });
        }

        if (existingRecord) {
            return response.status(409).json({ error: "Record already exists" });
        }

        // Insertar el nuevo registro en la base de datos
        db.insert(body, (err, newDoc) => {
            if (err) {
                return response.status(500).json({ error: "Error inserting data" });
            }
            delete newDoc._id;
            response.sendStatus(201);;
        });
    }); 
});
app.post(BASE_API + "/students_satisfaction/:carrera/:ciudad",(req,res)=>{    
    res.sendStatus(405);
});


app.put(BASE_API + "/students_satisfaction/:carrera/:ciudad", (req, res) => {
    const { carrera, ciudad } = req.params;  // Parámetros de la URL
    const body = req.body;  // Cuerpo de la solicitud

    // Verificación de que todos los campos requeridos están presentes en el cuerpo de la solicitud
    if (!body.satisfaccion_total || !body.sat_estudiantes || !body.satisfaccion_pdi || !body.carrera || !body.ciudad) {
        return res.status(400).json({ 
            error: "Missing required fields. Ensure 'satisfaccion_total', 'sat_estudiantes', 'satisfaccion_pdi', 'carrera', and 'ciudad' are all included." 
        });
    }

    // Normalizamos tanto los parámetros de la URL como los del cuerpo de la solicitud (sin tildes y en minúsculas)
    const carreraParam = removeAccents(carrera);
    const ciudadParam = removeAccents(ciudad);
    const carreraBody = removeAccents(body.carrera);
    const ciudadBody = removeAccents(body.ciudad);

    // Comprobamos si los valores en el cuerpo coinciden con los valores de la URL
    if (carreraParam !== carreraBody || ciudadParam !== ciudadBody) {
        return res.status(400).json({
            error: `The 'carrera' and 'ciudad' in the body must match the URL parameters. You provided 'carrera': ${body.carrera}, 'ciudad': ${body.ciudad}`
        });
    }

    // Realizamos la actualización en la base de datos
    db.update(
        { carrera: carrera, ciudad: ciudad },  // Filtro para encontrar el registro a actualizar
        { $set: body },  // Nuevos valores que queremos establecer
        {},  // Configuración adicional (vacío en este caso)
        (err, numUpdated) => {
            if (err) {
                console.error("Error al actualizar en la base de datos:", err);
                return res.status(500).json({ error: "Internal Server Error. There was an issue updating the record." });
            }

            // Si no se encuentra el registro, respondemos con un 404
            if (numUpdated === 0) {
                return res.status(404).json({
                    error: "No record found to update. Ensure the 'carrera' and 'ciudad' exist in the database."
                });
            }

            // Si la actualización es exitosa, respondemos con un 200 OK
            return res.sendStatus(200);
        }
    );
});

//FALLO DE PUT a todos los datos
app.put(BASE_API + "/students_satisfaction",(req,res)=>{            
    res.sendStatus(405);
});

//elimino todos los registros
app.delete(BASE_API+"/students_satisfaction",(req,response)=>{
        
    console.log("DELETE request received - Removing all records");
        
    db.remove({},{multi: true},(err,numRemoved)=>{
        if(err){
            response.status(500).send("Error code 01");                
            console.error(`ÈRROR: ${err}`);
        }else{
            if(numRemoved >= 1){
                response.sendStatus(200);
            }else{
                response.sendStatus(404);
            }
        }
    });

});
// Eliminar un registro especifico
app.delete(BASE_API + "/students_satisfaction/:carrera/:ciudad", (req, response) => {
    const carreraParam = removeAccents(req.params.carrera.toLowerCase());
    const ciudadParam = removeAccents(req.params.ciudad.toLowerCase());

    console.log(`DELETE request to /students_satisfaction/${carreraParam}/${ciudadParam}`);

    db.find({}, (err, records) => {
        if (err) {
            console.error("Error finding records:", err);
            return response.status(500).send("Database error");
        }

        // Log the records to see what is being retrieved from the database
        console.log("Records found:", records);

        const match = records.find(r =>
            removeAccents(r.carrera.toLowerCase()) === carreraParam &&
            removeAccents(r.ciudad.toLowerCase()) === ciudadParam
        );

        if (!match) {
            console.log("No matching record found");
            return response.sendStatus(404); // No match found, send 404
        }

        db.remove({ carrera: match.carrera, ciudad: match.ciudad }, {}, (err, numRemoved) => {
            if (err) {
                console.error("Error deleting record:", err);
                return response.status(500).send("Error deleting");
            }

            console.log(`Number of records removed: ${numRemoved}`);
            return response.sendStatus(numRemoved > 0 ? 200 : 404);
        });
    });
});

}
export {loadBackendAlejandro}
