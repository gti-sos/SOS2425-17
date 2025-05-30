import dataStore from "nedb"; // Para la base de datos
const BASE_API = "/api/v1"; // URL base de la API

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
/*
// Cargar datos iniciales si la base de datos está vacía
db.count({}, (err, count) => {
    if (count === 0) {
        db.insert(students_satisfaction_data, (err, newDocs) => {
            if (err) {
                console.error("Error al insertar datos iniciales", err);
            }
        });
    }
});
*/

// Función principal para configurar las rutas del backend
function loadBackendAlejandro(app) {

    

    // Cargar datos iniciales en la base de datos
    app.get(BASE_API + "/students_satisfaction/loadInitialData", (request, response) => {
        console.log("Loading initial data into the database...");

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
                    response.status(201).json({ message: "The data was inserted successfully" }); // Devuelve el mensaje
                });
            } else {
                response.status(409).json({ message: "The database already contains data, no need to initialize" });
            }
        });
    });

    app.get(BASE_API + "/students_satisfaction/paginated", (req, res) => {
        let {
            carrera, ciudad,
            satisfaccion_total, sat_estudiantes, satisfaccion_pdi,
            limit, offset
        } = req.query;
    
        db.find({}, (err, data) => {
            if (err) {
                return res.status(500).json({ error: "Database error" });
            }
    
            let results = data.filter((entry) => {
                if (carrera && !new RegExp("^" + carrera + "$", "i").test(entry.carrera)) return false;
                if (ciudad && !new RegExp("^" + ciudad + "$", "i").test(entry.ciudad)) return false;
                if (satisfaccion_total && Number(entry.satisfaccion_total) !== Number(satisfaccion_total)) return false;
                if (sat_estudiantes && Number(entry.sat_estudiantes) !== Number(sat_estudiantes)) return false;
                if (satisfaccion_pdi && Number(entry.satisfaccion_pdi) !== Number(satisfaccion_pdi)) return false;
                return true;
            });
    
            if (offset !== undefined) {
                results = results.slice(Number(offset));
            }
    
            if (limit !== undefined) {
                results = results.slice(0, Number(limit));
            }
    
            results = results.map(r => {
                delete r._id;
                return r;
            });
    
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

    // GET: Obtener un registro específico por carrera y ciudad
app.get(BASE_API + "/students_satisfaction/:carrera/:ciudad", (req, res) => {
    console.log("GET request to /students_satisfaction/:carrera/:ciudad");

    const { carrera, ciudad } = req.params;
    console.log(`Buscando satisfacción para carrera="${carrera}", ciudad="${ciudad}"`);

    db.findOne({ carrera, ciudad }, (err, record) => {
        if (err) {
            console.error("Error al acceder a la base de datos:", err);
            res.status(500).send("Internal Server Error");
            return;
        }

        if (record) {
            delete record._id;
            console.log("Registro encontrado:", record);
            res.status(200).json(record); // Devuelve un solo objeto
        } else {
            console.log("No se encontró ningún registro.");
            res.sendStatus(404);
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
    // POST: Intentar modificar un registro específico, no permitido en esta ruta
app.post(BASE_API + "/students_satisfaction/:carrera/:ciudad", (request, response) => {
    console.log("POST request to /students_satisfaction/:carrera/:ciudad");
    response.sendStatus(405); // Método no permitido
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
/*
        // Validar que los parámetros de la URL coincidan con los del cuerpo
        if (body.carrera !== carrera || body.ciudad !== ciudad) {
            
            return response.status(400).json({
                error: "carrera and ciudad in body must match URL parameters"
            });
        }
*/
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

    // PUT: Intentar modificar todos los registros
    app.put(BASE_API + "/students_satisfaction", (request, response) => {
        console.log("PUT request to /students_satisfaction");
        response.sendStatus(405); // Método no permitido
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
                return response.status(500).json({ error: "Database error" });
            }

            if (numRemoved > 0) {
                response.sendStatus(200); // Registro eliminado correctamente
            } else {
                response.sendStatus(404); // No se encontró el registro
            }
        });
    });
    app.get(BASE_API+"/students_satisfaction/docs",(request,response)=>{
        response.redirect("https://documnpenter.getpostman.com/view/42373237/2sB2cUBicY");
    });
    
}

export { loadBackendAlejandro };
