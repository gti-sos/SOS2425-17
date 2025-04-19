import dataStore from "nedb"; // Para la base de datos
const BASE_API = "/api/v2"; // URL base de la API

let db = new dataStore(); // Inicializar la base de datos

// Datos iniciales para la base de datos
const students_satisfaction_data = [
    { carrera: "GRADO EN MEDICINA", ciudad: "BADAJOZ", satisfaccion_total: 4.57, sat_estudiantes: 4.56, satisfaccion_pdi: 4.58 },
    { carrera: "GRADO EN ECONOMÍA", ciudad: "MÉRIDA", satisfaccion_total: 8.61, sat_estudiantes: 7.46, satisfaccion_pdi: 4.58 },
    { carrera: "GRADO EN DERECHO", ciudad: "CÁCERES", satisfaccion_total: 8.27, sat_estudiantes: 7.41, satisfaccion_pdi: 3.89 },
    { carrera: "GRADO EN EDUCACIÓN INFANTIL", ciudad: "ALMENDRALEJO", satisfaccion_total: 4.57, sat_estudiantes: null, satisfaccion_pdi: 4.89 },
    { carrera: "GRADO EN EDUCACIÓN INFANTIL", ciudad: "BADAJOZ", satisfaccion_total: 7.75, sat_estudiantes: null, satisfaccion_pdi: 3.77 },
    { carrera: "GRADO EN EDUCACIÓN PRIMARIA", ciudad: "ALMENDRALEJO", satisfaccion_total: 8.55, sat_estudiantes: 4.88, satisfaccion_pdi: 4.46 },
    { carrera: "GRADO EN INGENIERÍA ELECTRÓNICA Y AUTOMÁTICA", ciudad: "BADAJOZ", satisfaccion_total: 9, sat_estudiantes: null, satisfaccion_pdi: 4.59 },
    { carrera: "GRADO EN ENFERMERÍA", ciudad: "MÉRIDA", satisfaccion_total: 8.28, sat_estudiantes: null, satisfaccion_pdi: 4.58 },
    { carrera: "GRADO EN ADMINISTRACIÓN Y DIRECCIÓN DE EMPRESAS", ciudad: "CÁCERES", satisfaccion_total: 8.81, sat_estudiantes: 4.54, satisfaccion_pdi: null },
    { carrera: "GRADO EN ENFERMERÍA", ciudad: "PLASENCIA", satisfaccion_total: 4.58, sat_estudiantes: 4.53, satisfaccion_pdi: 4.45 }
];
// Función principal para configurar las rutas del backend v2
function loadBackendAlejandroV2(app) {

    // Cargar datos iniciales en la base de datos v2
    app.get(BASE_API + "/students_satisfaction/loadInitialData", (request, response) => {
        console.log("Loading initial data into the v2 database...");

        // Verificar si la base de datos ya tiene datos
        db.count({}, (err, count) => {
            if (err) {
                return response.status(500).json({ error: "Database error" });
            }

            if (count === 0) {
                db.insert(students_satisfaction_data, (err, newDocs) => {
                    if (err) {
                        return response.status(500).json({ error: "Error inserting initial data" });
                    }
                    response.status(201).json({ message: "The data was inserted successfully into v2" }); // Mensaje de éxito
                });
            } else {
                response.status(409).json({ message: "The database already contains data, no need to initialize" });
            }
        });
    });

    // GET: Obtener todos los registros con paginación
    app.get(BASE_API + "/students_satisfaction", (req, res) => {
        let {
            carrera, ciudad,
            satisfaccion_total, sat_estudiantes, satisfaccion_pdi,
            limit, offset
        } = req.query;
        
        let query = {};

        if (carrera) query.carrera = new RegExp("^" + carrera + "$", "i");   
        if (ciudad) query.ciudad = new RegExp("^" + ciudad + "$", "i");
        if (satisfaccion_total) query.satisfaccion_total = Number(satisfaccion_total);
        if (sat_estudiantes) query.sat_estudiantes = Number(sat_estudiantes);
        if (satisfaccion_pdi) query.satisfaccion_pdi = Number(satisfaccion_pdi);

        db.find(query, (err, data) => {
            if (err) {
                res.status(500).send("Internal Server Error");
                return;
            }
            //Esto es para que si te lo devuelve vacio se convierta en 404 para que en el front no te de error
            if (results.length === 0) {
                return res.status(404).json({ error: "No se encontraron resultados con esos filtros." });
            }
            // Paginación
            if (offset !== undefined) {
                results = results.slice(Number(offset));
            }
            if (limit !== undefined) {
                results = results.slice(0, Number(limit));
            }
    
            results.forEach(e => delete e._id); // Limpiar _id para front
            res.json(results);
        });
    });

            

    // GET: Obtener todos los registros
    app.get(BASE_API + "/students_satisfaction", (request, response) => {
        console.log("GET request to /students_satisfaction");
        db.find({}, (err, records) => {
            if (err) {
                response.status(500).json({ error: "Database error" });
            } else {
                response.json(records.map((r) => {
                    delete r._id; // Eliminar el campo _id para que no aparezca en la respuesta
                    return r;
                }));
            }
        });
    });

    // POST: Insertar un nuevo registro
    app.post(BASE_API + "/students_satisfaction", (request, response) => {
        console.log("POST request to /students_satisfaction");
        const body = request.body;

        // Validación de campos requeridos
        if (!body.carrera || !body.ciudad || !body.satisfaccion_total || !body.sat_estudiantes || !body.satisfaccion_pdi) {
            return response.status(400).json({ error: "Missing required fields" });
        }

        // Verificar si el registro ya existe
        db.findOne({ carrera: body.carrera, ciudad: body.ciudad }, (err, existingRecord) => {
            if (err) {
                return response.status(500).json({ error: "Database error" });
            }

            if (existingRecord) {
                return response.status(409).json({ error: "Record already exists" });
            }

            // Insertar el nuevo registro
            db.insert(body, (err, newDoc) => {
                if (err) {
                    return response.status(500).json({ error: "Error inserting data" });
                }
                delete newDoc._id;
                response.sendStatus(201); // Creado correctamente
            });
        });
    });
    //Post ERROR 405
    
    app.post(BASE_API + "/students_satisfaction/:carrera/:ciudad",(req,res)=>{    
        res.sendStatus(405);
    });

    // PUT: Modificar un registro específico
    app.put(BASE_API + "/students_satisfaction/:carrera/:ciudad", (request, response) => {
        console.log("PUT request to /students_satisfaction/:carrera/:ciudad");
        const carrera = request.params.carrera;
        const ciudad = request.params.ciudad;
        const body = request.body;

        // Validación de campos requeridos
        if (!body.carrera || !body.ciudad || !body.satisfaccion_total || !body.sat_estudiantes || !body.satisfaccion_pdi) {
            return response.status(400).json({ error: "Missing required fields" });
        }

        // Actualizar el registro
        db.update(
            { carrera: carrera, ciudad: ciudad },
            { $set: body },
            {},
            (err, numUpdated) => {
                if (err) {
                    return response.status(500).json({ error: "Internal error" });
                }

                if (numUpdated === 0) {
                    return response.status(404).json({ error: "No record found to update" });
                }

                response.sendStatus(200); // Actualización exitosa
            }
        );
    });

    //FALLO DE PUT a todos los datos
    app.put(BASE_API + "/students_satisfaction",(req,res)=>{    
        
        res.sendStatus(405);
    });

    // DELETE: Eliminar todos los registros
    app.delete(BASE_API + "/students_satisfaction", (request, response) => {
        console.log("DELETE request to /students_satisfaction");
        db.remove({}, { multi: true }, (err, numRemoved) => {
            if (err) {
                return response.status(500).json({ error: "Database error" });
            }
            if (numRemoved > 0) {
                response.sendStatus(200); // Todos los registros eliminados
            } else {
                response.sendStatus(404); // No se encontraron registros para eliminar
            }
        });
    });

    // DELETE: Eliminar un registro específico
    app.delete(BASE_API + "/students_satisfaction/:carrera/:ciudad", (request, response) => {
        console.log("DELETE request to /students_satisfaction/:carrera/:ciudad");
        const carrera = request.params.carrera;
        const ciudad = request.params.ciudad;

        db.remove({ carrera: carrera, ciudad: ciudad }, {}, (err, numRemoved) => {
            if (err) {
                response.status(500).send("Error code 01");                
                console.error(`ERROR: ${err}`);
            }

            if (numRemoved > 0) {
                response.sendStatus(200); // Registro eliminado correctamente
            } else {
                response.sendStatus(404); // No se encontró el registro
            }
        });
    });

    // Ruta para la documentación de la API
    app.get(BASE_API + "/students_satisfaction/docs", (request, response) => {
        response.redirect("https://documnpenter.getpostman.com/view/42373237/2sB2cUBicY");
    });
}

export { loadBackendAlejandroV2 };