const BASE_API = "/api/v2";
let dataStore = require("nedb");
let db = new dataStore();

const students_satisfaction_data = [
    { carrera: "GRADO EN MEDICINA", ciudad: "BADAJOZ", satisfaccion_total: 4.57, sat_estudiantes: 4.56, satisfaccion_pdi: 4.58, año_academico: "2018-2019" },
    { carrera: "GRADO EN ECONOMÍA", ciudad: "MÉRIDA", satisfaccion_total: 8.61, sat_estudiantes: 7.46, satisfaccion_pdi: 4.58, año_academico: "2016-2017" },
    { carrera: "GRADO EN DERECHO", ciudad: "CÁCERES", satisfaccion_total: 8.27, sat_estudiantes: 7.41, satisfaccion_pdi: 3.89, año_academico: "2018-2019" },
    { carrera: "GRADO EN EDUCACIÓN INFANTIL", ciudad: "ALMENDRALEJO", satisfaccion_total: 4.57, sat_estudiantes: null, satisfaccion_pdi: 4.89, año_academico: "2017-2018" },
    { carrera: "GRADO EN EDUCACIÓN INFANTIL", ciudad: "BADAJOZ", satisfaccion_total: 7.75, sat_estudiantes: null, satisfaccion_pdi: 3.77, año_academico: "2018-2019" },
    { carrera: "GRADO EN EDUCACIÓN PRIMARIA", ciudad: "ALMENDRALEJO", satisfaccion_total: 8.55, sat_estudiantes: 4.88, satisfaccion_pdi: 4.46, año_academico: "2017-2018" },
    { carrera: "GRADO EN INGENIERÍA ELECTRÓNICA Y AUTOMÁTICA", ciudad: "BADAJOZ", satisfaccion_total: 9, sat_estudiantes: null, satisfaccion_pdi: 4.59, año_academico: "2016-2017" },
    { carrera: "GRADO EN ENFERMERÍA", ciudad: "MÉRIDA", satisfaccion_total: 8.28, sat_estudiantes: null, satisfaccion_pdi: 4.58, año_academico: "2018-2019" },
    { carrera: "GRADO EN ADMINISTRACIÓN Y DIRECCIÓN DE EMPRESAS", ciudad: "CÁCERES", satisfaccion_total: 8.81, sat_estudiantes: 4.54, satisfaccion_pdi: null, año_academico: "2016-2017" },
    { carrera: "GRADO EN ENFERMERÍA", ciudad: "PLASENCIA", satisfaccion_total: 4.58, sat_estudiantes: 4.53, satisfaccion_pdi: 4.45, año_academico: "2016-2017" }
];

function loadBackendAlejandroV2(app) {
    // Cargar datos iniciales
    app.get(BASE_API + "/students_satisfaction/loadInitialData", (req, res) => {
        db.count({}, (err, count) => {
            if (err) return res.status(500).send("Error en la base de datos.");
            if (count > 0) return res.status(409).json({ message: "Datos ya cargados." });

            db.insert(students_satisfaction_data, (err) => {
                if (err) return res.status(500).send("Error al insertar los datos.");
                res.status(201).json({ message: "Datos iniciales cargados correctamente." });
            });
        });
    });

    // Obtener datos con paginación basada en año académico
    app.get(BASE_API + "/students_satisfaction", (req, res) => {
        let { año_academico, limit, offset } = req.query;

        let query = {};
        if (año_academico) query.año_academico = año_academico;

        db.find(query).sort({ año_academico: 1 }).exec((err, results) => {
            if (err) return res.status(500).send("Error en la base de datos.");
            if (results.length === 0) return res.status(404).json({ error: "Sin resultados." });

            // Aplicar paginación
            if (offset) results = results.slice(Number(offset));
            if (limit) results = results.slice(0, Number(limit));

            results.forEach(r => delete r._id); // Eliminar el campo `_id` de los resultados
            res.json(results);
        });
    });

    // Crear un nuevo registro
    app.post(BASE_API + "/students_satisfaction", (req, res) => {
        const body = req.body;

        if (!body.carrera || !body.ciudad || body.satisfaccion_total === undefined || body.sat_estudiantes === undefined || body.satisfaccion_pdi === undefined || !body.año_academico) {
            return res.status(400).json({ error: "Faltan campos obligatorios." });
        }

        db.findOne({ carrera: body.carrera, ciudad: body.ciudad }, (err, existing) => {
            if (err) return res.status(500).send("Error en la base de datos.");
            if (existing) return res.status(409).json({ error: "El registro ya existe." });

            db.insert(body, (err, newDoc) => {
                if (err) return res.status(500).send("Error al insertar el registro.");
                delete newDoc._id;
                res.status(201).json(newDoc);
            });
        });
    });

    // Actualizar un registro existente
    app.put(BASE_API + "/students_satisfaction/:carrera/:ciudad", (req, res) => {
        const { carrera, ciudad } = req.params;
        const { satisfaccion_total, sat_estudiantes, satisfaccion_pdi, año_academico } = req.body;

        db.findOne({ carrera, ciudad }, (err, record) => {
            if (err) return res.status(500).send("Error en la base de datos.");
            if (!record) return res.status(404).json({ error: "Registro no encontrado." });

            const updatedRecord = {
                ...record,
                satisfaccion_total: satisfaccion_total || record.satisfaccion_total,
                sat_estudiantes: sat_estudiantes || record.sat_estudiantes,
                satisfaccion_pdi: satisfaccion_pdi || record.satisfaccion_pdi,
                año_academico: año_academico || record.año_academico
            };

            db.update({ carrera, ciudad }, updatedRecord, {}, (err) => {
                if (err) return res.status(500).send("Error al actualizar el registro.");
                res.status(200).json(updatedRecord);
            });
        });
    });

    // Eliminar un registro
    app.delete(BASE_API + "/students_satisfaction/:carrera/:ciudad", (req, res) => {
        const { carrera, ciudad } = req.params;

        db.remove({ carrera, ciudad }, {}, (err, numRemoved) => {
            if (err) return res.status(500).send("Error en la base de datos.");
            if (numRemoved === 0) return res.status(404).json({ error: "Registro no encontrado." });

            res.status(200).json({ message: "Registro eliminado correctamente." });
        });
    });

    // Eliminar todos los registros
    app.delete(BASE_API + "/students_satisfaction", (req, res) => {
        db.remove({}, { multi: true }, (err, numRemoved) => {
            if (err) return res.status(500).send("Error en la base de datos.");
            res.status(200).json({ message: `Se eliminaron ${numRemoved} registros.` });
        });
    });
}

module.exports = loadBackendAlejandroV2;