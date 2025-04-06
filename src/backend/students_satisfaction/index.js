import express from 'express';
import dataStore from 'nedb'; // Asegúrate de que este paquete está instalado
import cors from 'cors';

const BASE_API = '/api/v1'; // Base URL para la API

function loadBackendAlejandro(app) {
    let db = new dataStore(); // Base de datos NeDB

    app.use(express.json()); // Middleware para parsear JSON en el cuerpo de las solicitudes
    app.use(cors()); // Middleware para permitir solicitudes CORS, si es necesario

    // Cargar datos iniciales si la base de datos está vacía
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

    // Función para eliminar acentos de los textos y hacer comparaciones consistentes
    function removeAccents(str) {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }

    // API para cargar datos iniciales si la base de datos está vacía
    app.get(BASE_API + "/students_satisfaction/loadInitialData", (request, response) => {
        console.log("Loading initial data into the database...");

        db.count({}, (err, count) => {
            if (err) {
                return response.status(500).json({ error: "Database error" });
            }

            if (count === 0) {
                db.insert(students_satisfaction, (err, newDocs) => {
                    if (err) {
                        return response.status(500).json({ error: "Error inserting initial data" });
                    }
                    response.status(201).json("Datos insertados con éxito");
                });
            } else {
                response.status(200).json({ message: "Database already initialized" });
            }
        });
    });

    // GET para obtener todos los registros de satisfacción de los estudiantes
    app.get(BASE_API + "/students_satisfaction", (request, response) => {
        console.log("New GET to /students_satisfaction");

        db.find({}, (err, demands) => {
            if (err) {
                return response.status(500).json({ error: "Database error" });
            }

            response.status(200).json(demands.map(c => {
                delete c._id; // No mostrar el id en la respuesta
                return c;
            }));
        });
    });

    // GET para obtener registros por carrera y ciudad
    app.get(BASE_API + "/students_satisfaction/:carrera/:ciudad", (req, response) => {
        console.log("New GET to /students_satisfaction/:carrera/:ciudad");

        const carreraParam = removeAccents(req.params.carrera);
        const ciudadParam = removeAccents(req.params.ciudad);

        db.find({}, (err, demands) => {
            if (err) {
                return response.status(500).json({ error: "Database error" });
            }

            const filtered = demands.filter(record =>
                removeAccents(record.carrera) === carreraParam &&
                removeAccents(record.ciudad) === ciudadParam
            );

            if (filtered.length > 0) {
                response.status(200).json(filtered.map(c => {
                    delete c._id; // No mostrar el id en la respuesta
                    return c;
                }));
            } else {
                response.sendStatus(404); // Si no se encuentra el registro
            }
        });
    });

    // POST para insertar un nuevo registro
    app.post(BASE_API + "/students_satisfaction", (request, response) => {
        console.log("POST to /students_satisfaction");
        const body = request.body;

        // Verificar si los campos están completos
        if (!body.satisfaccion_total || !body.sat_estudiantes || !body.satisfaccion_pdi || !body.carrera || !body.ciudad) {
            return response.status(400).json({ error: "Missing required fields" });
        }

        // Verificar si el registro ya existe en la base de datos
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
                delete newDoc._id; // Eliminar _id antes de devolverlo
                response.status(201).json(newDoc);
            });
        });
    });

    // PUT para actualizar un registro específico por carrera y ciudad
    app.put(BASE_API + "/students_satisfaction/:carrera/:ciudad", (req, res) => {
        const { carrera, ciudad } = req.params;
        const body = req.body;

        // Verificar si los campos están completos
        if (!body.satisfaccion_total || !body.sat_estudiantes || !body.satisfaccion_pdi || !body.carrera || !body.ciudad) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Verificar si los parámetros de la URL coinciden con los del cuerpo
        const carreraParam = removeAccents(carrera);
        const ciudadParam = removeAccents(ciudad);
        const carreraBody = removeAccents(body.carrera);
        const ciudadBody = removeAccents(body.ciudad);

        if (carreraParam !== carreraBody || ciudadParam !== ciudadBody) {
            return res.status(400).json({
                error: `The 'carrera' and 'ciudad' in the body must match the URL parameters. You provided 'carrera': ${body.carrera}, 'ciudad': ${body.ciudad}`
            });
        }

        // Actualizar el registro en la base de datos
        db.update(
            { carrera, ciudad },
            { $set: body },
            { multi: false }, // Solo actualizar un registro
            (err, numUpdated) => {
                if (err) {
                    return res.status(500).json({ error: "Database error" });
                }

                if (numUpdated === 0) {
                    return res.status(404).json({ error: "No record found to update" });
                }

                res.status(200).json({ message: "Record updated successfully" });
            }
        );
    });

    // DELETE para eliminar todos los registros
    app.delete(BASE_API + "/students_satisfaction", (req, response) => {
        console.log("DELETE request received - Removing all records");

        // Eliminar todos los registros
        db.remove({}, { multi: true }, (err, numRemoved) => {
            if (err) {
                response.status(500).send("Error deleting records");
                console.error(`ERROR: ${err}`);
            } else {
                if (numRemoved > 0) {
                    response.sendStatus(200); // Respuesta exitosa, eliminados
                } else {
                    response.sendStatus(404); // No se encontraron registros para eliminar
                }
            }
        });
    });

    // DELETE para eliminar un registro específico
    app.delete(BASE_API + "/students_satisfaction/:carrera/:ciudad", (req, response) => {
        const carreraParam = removeAccents(req.params.carrera.toLowerCase());
        const ciudadParam = removeAccents(req.params.ciudad.toLowerCase());

        console.log(`DELETE request to /students_satisfaction/${carreraParam}/${ciudadParam}`);

        db.find({}, (err, records) => {
            if (err) {
                console.error("Error finding records:", err);
                return response.status(500).send("Database error");
            }

            const match = records.find(r =>
                removeAccents(r.carrera.toLowerCase()) === carreraParam &&
                removeAccents(r.ciudad.toLowerCase()) === ciudadParam
            );

            if (!match) {
                return response.sendStatus(404); // No se encontró el registro
            }

            db.remove({ carrera: match.carrera, ciudad: match.ciudad }, {}, (err, numRemoved) => {
                if (err) {
                    return response.status(500).send("Error deleting record");
                }

                return response.sendStatus(numRemoved > 0 ? 200 : 404);
            });
        });
    });
}

export default loadBackendAlejandro;
