import dataStore from "nedb"; // Para la base de datos
import dataStore from "nedb";

const BASE_API = "/api/v2";
let db = new dataStore();

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

function loadBackendAlejandroV2(app) {
    // Load initial data
    app.get(BASE_API + "/students_satisfaction/loadInitialData", (req, res) => {
        db.count({}, (err, count) => {
            if (err) return res.status(500).send("Error en la base de datos.");
            if (count > 0) return res.status(409).json({ message: "Datos ya cargados." });

            db.insert(students_satisfaction_data, (err) => {
                if (err) return res.status(500).send("Error insertando datos.");
                res.status(201).json({ message: "Datos iniciales insertados correctamente." });
            });
        });
    });

    // GET con filtros y paginación
    app.get(BASE_API + "/students_satisfaction", (req, res) => {
        let { carrera, ciudad, satisfaccion_total, sat_estudiantes, satisfaccion_pdi, limit, offset } = req.query;

        let query = {};
        if (carrera) query.carrera = new RegExp("^" + carrera + "$", "i");
        if (ciudad) query.ciudad = new RegExp("^" + ciudad + "$", "i");
        if (satisfaccion_total) query.satisfaccion_total = Number(satisfaccion_total);
        if (sat_estudiantes) query.sat_estudiantes = Number(sat_estudiantes);
        if (satisfaccion_pdi) query.satisfaccion_pdi = Number(satisfaccion_pdi);

        db.find(query, (err, results) => {
            if (err) return res.status(500).send("Error en la base de datos.");
            if (results.length === 0) return res.status(404).json({ error: "Sin resultados." });

            if (offset) results = results.slice(Number(offset));
            if (limit) results = results.slice(0, Number(limit));

            results.forEach(r => delete r._id);
            res.json(results);
        });
    });

    // POST nuevo registro
    app.post(BASE_API + "/students_satisfaction", (req, res) => {
        const body = req.body;

        if (!body.carrera || !body.ciudad || body.satisfaccion_total === undefined || body.sat_estudiantes === undefined || body.satisfaccion_pdi === undefined) {
            return res.status(400).json({ error: "Faltan campos obligatorios." });
        }

        db.findOne({ carrera: body.carrera, ciudad: body.ciudad }, (err, existing) => {
            if (err) return res.status(500).send("Error BD.");
            if (existing) return res.status(409).json({ error: "El registro ya existe." });

            db.insert(body, (err, newDoc) => {
                if (err) return res.status(500).send("Error al insertar.");
                delete newDoc._id;
                res.sendStatus(201);
            });
        });
    });

    app.post(BASE_API + "/students_satisfaction/:carrera/:ciudad", (req, res) => res.sendStatus(405));
    app.put(BASE_API + "/students_satisfaction", (req, res) => res.sendStatus(405));

    // PUT actualizar
    app.put(BASE_API + "/students_satisfaction/:carrera/:ciudad", (req, res) => {
        const { carrera, ciudad } = req.params;
        const body = req.body;

        if (!body.carrera || !body.ciudad || body.satisfaccion_total === undefined || body.sat_estudiantes === undefined || body.satisfaccion_pdi === undefined) {
            return res.status(400).json({ error: "Faltan campos." });
        }

        db.update({ carrera, ciudad }, { $set: body }, {}, (err, numUpdated) => {
            if (err) return res.status(500).send("Error BD.");
            if (numUpdated === 0) return res.status(404).json({ error: "No encontrado." });
            res.sendStatus(200);
        });
    });

    // DELETE todos
    app.delete(BASE_API + "/students_satisfaction", (req, res) => {
        db.remove({}, { multi: true }, (err, numRemoved) => {
            if (err) return res.status(500).send("Error al eliminar.");
            if (numRemoved === 0) return res.status(404).send("Nada que eliminar.");
            res.sendStatus(200);
        });
    });

    // DELETE uno
    app.delete(BASE_API + "/students_satisfaction/:carrera/:ciudad", (req, res) => {
        const { carrera, ciudad } = req.params;

        db.remove({ carrera, ciudad }, {}, (err, numRemoved) => {
            if (err) return res.status(500).send("Error BD.");
            if (numRemoved === 0) return res.status(404).send("No encontrado.");
            res.sendStatus(200);
        });
    });

    // Documentación
    app.get(BASE_API + "/students_satisfaction/docs", (_req, res) => {
        res.redirect("https://documenter.getpostman.com/view/42373237/2sB2cUBicY");
    });
}

export { loadBackendAlejandroV2 };
