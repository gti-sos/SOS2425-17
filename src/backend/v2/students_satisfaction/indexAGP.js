import dataStore from "nedb";

const BASE_API = "/api/v2";
let db = new dataStore();

const students_satisfaction_data = [
    { carrera: "GRADO EN EDUCACIÓN INFANTIL", ciudad: "ALMENDRALEJO", satisfaccion_total: 8.31, sat_estudiantes: 4.89, satisfaccion_pdi: 4.55, año_academico: "2018-2019" },
    { carrera: "GRADO EN EDUCACIÓN INFANTIL", ciudad: "ALMENDRALEJO", satisfaccion_total: 8, sat_estudiantes: 4.89, satisfaccion_pdi: 4.55, año_academico: "2018-2019" },
    { carrera: "GRADO EN EDUCACIÓN INFANTIL", ciudad: "ALMENDRALEJO", satisfaccion_total: 7.46, sat_estudiantes: 4.59, satisfaccion_pdi: 3.89, año_academico: "2017-2018" },
    { carrera: "GRADO EN EDUCACIÓN INFANTIL", ciudad: "ALMENDRALEJO", satisfaccion_total: 8.31, sat_estudiantes: 4.53, satisfaccion_pdi: 4.45, año_academico: "2016-2017" },
    { carrera: "GRADO EN EDUCACIÓN PRIMARIA", ciudad: "ALMENDRALEJO", satisfaccion_total: 6.56, sat_estudiantes: 4.88, satisfaccion_pdi: 4.46, año_academico: "2018-2019" },
    { carrera: "GRADO EN EDUCACIÓN PRIMARIA", ciudad: "ALMENDRALEJO", satisfaccion_total: 7.2, sat_estudiantes: 4.54, satisfaccion_pdi: 3.89, año_academico: "2017-2018" },
    { carrera: "GRADO EN EDUCACIÓN PRIMARIA", ciudad: "ALMENDRALEJO", satisfaccion_total: 8.31, sat_estudiantes: 4.56, satisfaccion_pdi: 4.58, año_academico: "2016-2017" },
    { carrera: "GRADO EN ENFERMERÍA", ciudad: "MÉRIDA", satisfaccion_total: 8.31, sat_estudiantes: 4.58, satisfaccion_pdi: 3.0, año_academico: "2018-2019" },
    { carrera: "GRADO EN ENFERMERÍA", ciudad: "MÉRIDA", satisfaccion_total: 7.41, sat_estudiantes: 3.89, satisfaccion_pdi: 3.89, año_academico: "2017-2018" },
    { carrera: "GRADO EN ENFERMERÍA", ciudad: "MÉRIDA", satisfaccion_total: 7.46, sat_estudiantes: 4.58, satisfaccion_pdi: 4.58, año_academico: "2016-2017" },
    { carrera: "GRADO EN EDUCACIÓN INFANTIL", ciudad: "BADAJOZ", satisfaccion_total: 8.31, sat_estudiantes: 3.77, satisfaccion_pdi: 3.36, año_academico: "2018-2019" },
    { carrera: "GRADO EN EDUCACIÓN INFANTIL", ciudad: "BADAJOZ", satisfaccion_total: 7.82, sat_estudiantes: 3.72, satisfaccion_pdi: 3.89, año_academico: "2017-2018" },
    { carrera: "GRADO EN EDUCACIÓN INFANTIL", ciudad: "BADAJOZ", satisfaccion_total: 7.37, sat_estudiantes: 4.58, satisfaccion_pdi: 3.55, año_academico: "2016-2017" },
    { carrera: "GRADO EN EDUCACIÓN PRIMARIA", ciudad: "BADAJOZ", satisfaccion_total: 8.31, sat_estudiantes: 4.59, satisfaccion_pdi: 3.28, año_academico: "2018-2019" },
    { carrera: "GRADO EN EDUCACIÓN PRIMARIA", ciudad: "BADAJOZ", satisfaccion_total: 7.21, sat_estudiantes: 3.79, satisfaccion_pdi: 3.89, año_academico: "2017-2018" },
    { carrera: "GRADO EN EDUCACIÓN PRIMARIA", ciudad: "BADAJOZ", satisfaccion_total: 7.32, sat_estudiantes: 3.68, satisfaccion_pdi: 4.58, año_academico: "2016-2017" },
    { carrera: "GRADO EN INGENIERÍA ELECTRÓNICA Y AUTOMÁTICA", ciudad: "BADAJOZ", satisfaccion_total: 8.31, sat_estudiantes: 3.75, satisfaccion_pdi: 3.89, año_academico: "2018-2019" },
    { carrera: "GRADO EN INGENIERÍA ELECTRÓNICA Y AUTOMÁTICA", ciudad: "BADAJOZ", satisfaccion_total: 7.49, sat_estudiantes: 3.88, satisfaccion_pdi: 3.89, año_academico: "2017-2018" },
    { carrera: "GRADO EN INGENIERÍA ELECTRÓNICA Y AUTOMÁTICA", ciudad: "BADAJOZ", satisfaccion_total: 6.73, sat_estudiantes: 3.77, satisfaccion_pdi: 4.59, año_academico: "2016-2017" },
    { carrera: "GRADO EN ENFERMERÍA", ciudad: "PLASENCIA", satisfaccion_total: 8.31, sat_estudiantes: 4.16, satisfaccion_pdi: 4.0, año_academico: "2018-2019" },
    { carrera: "GRADO EN ENFERMERÍA", ciudad: "PLASENCIA", satisfaccion_total: 7.48, sat_estudiantes: 4.58, satisfaccion_pdi: 3.89, año_academico: "2017-2018" },
    { carrera: "GRADO EN ENFERMERÍA", ciudad: "PLASENCIA", satisfaccion_total: 7.13, sat_estudiantes: 3.76, satisfaccion_pdi: 4.22, año_academico: "2016-2017" },
    { carrera: "GRADO EN ADMINISTRACIÓN Y DIRECCIÓN DE EMPRESAS", ciudad: "CÁCERES", satisfaccion_total: 8.31, sat_estudiantes: 3.73, satisfaccion_pdi: 3.54, año_academico: "2018-2019" },
    { carrera: "GRADO EN ADMINISTRACIÓN Y DIRECCIÓN DE EMPRESAS", ciudad: "CÁCERES", satisfaccion_total: 7.62, sat_estudiantes: 3.69, satisfaccion_pdi: 3.89, año_academico: "2017-2018" },
    { carrera: "GRADO EN ADMINISTRACIÓN Y DIRECCIÓN DE EMPRESAS", ciudad: "CÁCERES", satisfaccion_total: 7.18, sat_estudiantes: 4.58, satisfaccion_pdi: 3.45, año_academico: "2016-2017" },
    { carrera: "GRADO EN MEDICINA", ciudad: "BADAJOZ", satisfaccion_total: 8.31, sat_estudiantes: 3.49, satisfaccion_pdi: 3.45, año_academico: "2018-2019" },
    { carrera: "GRADO EN MEDICINA", ciudad: "BADAJOZ", satisfaccion_total: 7.54, sat_estudiantes: 3.24, satisfaccion_pdi: 3.89, año_academico: "2017-2018" },
    { carrera: "GRADO EN MEDICINA", ciudad: "BADAJOZ", satisfaccion_total: 7.33, sat_estudiantes: 3.29, satisfaccion_pdi: 3.42, año_academico: "2016-2017" },
    { carrera: "GRADO EN DERECHO", ciudad: "CÁCERES", satisfaccion_total: 8.31, sat_estudiantes: 3.75, satisfaccion_pdi: 3.64, año_academico: "2018-2019" },
    { carrera: "GRADO EN DERECHO", ciudad: "CÁCERES", satisfaccion_total: 7.23, sat_estudiantes: 3.74, satisfaccion_pdi: 3.89, año_academico: "2017-2018" },
    { carrera: "GRADO EN DERECHO", ciudad: "CÁCERES", satisfaccion_total: 6.94, sat_estudiantes: 3.71, satisfaccion_pdi: 3.43, año_academico: "2016-2017" },
    { carrera: "GRADO EN EDUCACIÓN SOCIAL", ciudad: "CÁCERES", satisfaccion_total: 8.31, sat_estudiantes: 3.76, satisfaccion_pdi: 4.0, año_academico: "2018-2019" },
    { carrera: "GRADO EN EDUCACIÓN SOCIAL", ciudad: "CÁCERES", satisfaccion_total: 7.36, sat_estudiantes: 4.58, satisfaccion_pdi: 3.89, año_academico: "2017-2018" },
    { carrera: "GRADO EN EDUCACIÓN SOCIAL", ciudad: "CÁCERES", satisfaccion_total: 6, sat_estudiantes: 4.58, satisfaccion_pdi: 4.58, año_academico: "2016-2017" },
    { carrera: "GRADO EN ECONOMÍA", ciudad: "BADAJOZ", satisfaccion_total: 8.31, sat_estudiantes: 4.58, satisfaccion_pdi: 4.59, año_academico: "2018-2019" },
    { carrera: "GRADO EN ECONOMÍA", ciudad: "BADAJOZ", satisfaccion_total: 7.23, sat_estudiantes: 3.92, satisfaccion_pdi: 3.89, año_academico: "2017-2018" },
    { carrera: "GRADO EN ECONOMÍA", ciudad: "BADAJOZ", satisfaccion_total: 7.44, sat_estudiantes: 3.87, satisfaccion_pdi: 3.65, año_academico: "2016-2017" },
    { carrera: "GRADO EN PODOLOGÍA", ciudad: "PLASENCIA", satisfaccion_total: 8.31, sat_estudiantes: 4.42, satisfaccion_pdi: 4.0, año_academico: "2018-2019" },
    { carrera: "GRADO EN PODOLOGÍA", ciudad: "PLASENCIA", satisfaccion_total: 8.26, sat_estudiantes: 4.27, satisfaccion_pdi: 3.89, año_academico: "2017-2018" },
    { carrera: "GRADO EN PODOLOGÍA", ciudad: "PLASENCIA", satisfaccion_total: 4.59, sat_estudiantes: 3.79, satisfaccion_pdi: 4.0, año_academico: "2016-2017" },
    { carrera: "GRADO EN EDUCACIÓN INFANTIL", ciudad: "CÁCERES", satisfaccion_total: 8.31, sat_estudiantes: 4.17, satisfaccion_pdi: 3.27, año_academico: "2018-2019" },
    { carrera: "GRADO EN EDUCACIÓN INFANTIL", ciudad: "CÁCERES", satisfaccion_total: 6.87, sat_estudiantes: 4.58, satisfaccion_pdi: 3.89, año_academico: "2017-2018" },
    { carrera: "GRADO EN EDUCACIÓN INFANTIL", ciudad: "CÁCERES", satisfaccion_total: 4.59, sat_estudiantes: 3.91, satisfaccion_pdi: 3.35, año_academico: "2016-2017" },
    { carrera: "GRADO EN EDUCACIÓN PRIMARIA", ciudad: "CÁCERES", satisfaccion_total: 8.31, sat_estudiantes: 3.85, satisfaccion_pdi: 3.25, año_academico: "2018-2019" },
    { carrera: "GRADO EN EDUCACIÓN PRIMARIA", ciudad: "CÁCERES", satisfaccion_total: 7.27, sat_estudiantes: 3.75, satisfaccion_pdi: 3.89, año_academico: "2017-2018" },
    { carrera: "GRADO EN EDUCACIÓN PRIMARIA", ciudad: "CÁCERES", satisfaccion_total: 7.19, sat_estudiantes: 3.86, satisfaccion_pdi: 3.21, año_academico: "2016-2017" },
    { carrera: "GRADO EN VETERINARIA", ciudad: "CÁCERES", satisfaccion_total: 8.31, sat_estudiantes: 3.75, satisfaccion_pdi: 3.52, año_academico: "2018-2019" },
    { carrera: "GRADO EN VETERINARIA", ciudad: "CÁCERES", satisfaccion_total: 7.65, sat_estudiantes: 3.81, satisfaccion_pdi: 3.89, año_academico: "2017-2018" },
    { carrera: "GRADO EN VETERINARIA", ciudad: "CÁCERES", satisfaccion_total: 7.28, sat_estudiantes: 4.58, satisfaccion_pdi: 3.43, año_academico: "2016-2017" },
    { carrera: "GRADO EN COMUNICACIÓN AUDIOVISUAL", ciudad: "BADAJOZ", satisfaccion_total: 8.31, sat_estudiantes: 3.16, satisfaccion_pdi: 3.89, año_academico: "2018-2019" },
    { carrera: "GRADO EN COMUNICACIÓN AUDIOVISUAL", ciudad: "BADAJOZ", satisfaccion_total: 7.43, sat_estudiantes: 3.17, satisfaccion_pdi: 3.89, año_academico: "2017-2018" },
    { carrera: "GRADO EN COMUNICACIÓN AUDIOVISUAL", ciudad: "BADAJOZ", satisfaccion_total: 7.45, sat_estudiantes: 4.6, satisfaccion_pdi: 4.58, año_academico: "2016-2017" },
    { carrera: "GRADO EN INGENIERÍA INFORMÁTICA EN TECNOLOGÍAS DE LA INFORMACIÓN", ciudad: "MÉRIDA", satisfaccion_total: 8.31, sat_estudiantes: 4.58, satisfaccion_pdi: 4.0, año_academico: "2018-2019" },
    { carrera: "GRADO EN INGENIERÍA INFORMÁTICA EN TECNOLOGÍAS DE LA INFORMACIÓN", ciudad: "MÉRIDA", satisfaccion_total: 7.48, sat_estudiantes: 4.67, satisfaccion_pdi: 3.89, año_academico: "2017-2018" },
    { carrera: "GRADO EN INGENIERÍA INFORMÁTICA EN TECNOLOGÍAS DE LA INFORMACIÓN", ciudad: "MÉRIDA", satisfaccion_total: 7.93, sat_estudiantes: 4.71, satisfaccion_pdi: 4.58, año_academico: "2016-2017" },
    { carrera: "GRADO EN INGENIERÍA INFORMÁTICA EN INGENIERÍA DE COMPUTADORES", ciudad: "MÉRIDA", satisfaccion_total: 8.31, sat_estudiantes: 4.0, satisfaccion_pdi: 3.71, año_academico: "2018-2019" },
    { carrera: "GRADO EN INGENIERÍA INFORMÁTICA EN INGENIERÍA DE COMPUTADORES", ciudad: "MÉRIDA", satisfaccion_total: 7.35, sat_estudiantes: 3.0, satisfaccion_pdi: 3.89, año_academico: "2017-2018" },
    { carrera: "GRADO EN INGENIERÍA INFORMÁTICA EN INGENIERÍA DE COMPUTADORES", ciudad: "MÉRIDA", satisfaccion_total: 7.42, sat_estudiantes: 4.33, satisfaccion_pdi: 3.69, año_academico: "2016-2017" },
    { carrera: "GRADO EN INGENIERÍA INFORMÁTICA EN INGENIERÍA DEL SOFTWARE", ciudad: "MÉRIDA", satisfaccion_total: 8.31, sat_estudiantes: 3.79, satisfaccion_pdi: 3.67, año_academico: "2018-2019" },
    { carrera: "GRADO EN INGENIERÍA INFORMÁTICA EN INGENIERÍA DEL SOFTWARE", ciudad: "MÉRIDA", satisfaccion_total: 7.23, sat_estudiantes: 3.83, satisfaccion_pdi: 3.89, año_academico: "2017-2018" },
    { carrera: "GRADO EN INGENIERÍA INFORMÁTICA EN INGENIERÍA DEL SOFTWARE", ciudad: "MÉRIDA", satisfaccion_total: 7.93, sat_estudiantes: 4.71, satisfaccion_pdi: 4.58, año_academico: "2016-2017" }
];

function loadBackendAlejandroV2(app) {
    // Cargar datos iniciales
    app.get(BASE_API + "/students_satisfaction/loadInitialData", (req, res) => {
        console.log("Cargando datos iniciales...");
        db.count({}, (err, count) => {
            if (err) return res.status(500).send("Error en la base de datos.");
            if (count > 0) return res.status(409).json({ message: "Datos ya cargados." });

            db.insert(students_satisfaction_data, (err) => {
                if (err) return res.status(500).send("Error insertando datos.");
                res.status(201).json({ message: "Datos iniciales insertados correctamente." });
            });
        });
    });

    // Obtener datos con filtros y paginación
    app.get(BASE_API + "/students_satisfaction", (req, res) => {
        let { carrera, ciudad, satisfaccion_total, sat_estudiantes, satisfaccion_pdi, año_academico, from, to, limit, offset } = req.query;
    
        let query = {};
    
        // Filtros básicos
        if (carrera) query.carrera = new RegExp("^" + carrera + "$", "i");
        if (ciudad) query.ciudad = new RegExp("^" + ciudad + "$", "i");
        if (satisfaccion_total) query.satisfaccion_total = Number(satisfaccion_total);
        if (sat_estudiantes) query.sat_estudiantes = Number(sat_estudiantes);
        if (satisfaccion_pdi) query.satisfaccion_pdi = Number(satisfaccion_pdi);
        if (año_academico) query.año_academico = año_academico;
    
        // Filtro por rango de satisfacción total (from y to)
        if (from || to) {
            query.satisfaccion_total = {};
            if (from) query.satisfaccion_total.$gte = Number(from); // Mayor o igual a "from"
            if (to) query.satisfaccion_total.$lte = Number(to); // Menor o igual a "to"
        }
    
        // Buscar y ordenar por satisfacción total
        db.find(query).sort({ satisfaccion_total: 1 }).exec((err, results) => {
            
            if (results.length === 0) return res.status(404).json({ error: "Sin resultados." });
    
            // Paginación
            if (offset) results = results.slice(Number(offset));
            if (limit) results = results.slice(0, Number(limit));
    
            results.forEach(r => delete r._id); // Eliminar el campo _id
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
            if (existing) return res.status(409).json({ error: "El registro ya existe." });

            db.insert(body, (err, newDoc) => {
                if (err) return res.status(500).send("Error al insertar.");
                delete newDoc._id;
                res.sendStatus(201);
            });
        });
    });

     //Post ERROR 405
    
     app.post(BASE_API + "/students_satisfaction/:carrera/:ciudad",(req,res)=>{    
        res.sendStatus(405);
    });
    // Actualizar un registro existente
    app.put(BASE_API + "/students_satisfaction/:carrera/:ciudad", (req, res) => {
        const { carrera, ciudad } = req.params;
        const body = req.body;

        if (!body.carrera || !body.ciudad || body.satisfaccion_total === undefined || body.sat_estudiantes === undefined || body.satisfaccion_pdi === undefined || !body.año_academico) {
            return res.status(400).json({ error: "Faltan campos obligatorios." });
        }

        db.update({ carrera, ciudad }, { $set: body }, {}, (err, numUpdated) => {
            if (numUpdated === 0) return res.status(404).json({ error: "Registro no encontrado." });
            res.sendStatus(200);
        });
    });

    //FALLO DE PUT a todos los datos
    app.put(BASE_API + "/students_satisfaction",(req,res)=>{    
        
        res.sendStatus(405);
    });

    // Eliminar todos los registros
    app.delete(BASE_API + "/students_satisfaction", (req, res) => {
        db.remove({}, { multi: true }, (err, numRemoved) => {
            if (err) return res.status(500).send("Error al eliminar.");
            if (numRemoved === 0) return res.status(404).send("Nada que eliminar.");
            res.sendStatus(200);
        });
    });

    // Eliminar un registro específico
    app.delete(BASE_API + "/students_satisfaction/:carrera/:ciudad", (req, res) => {
        const { carrera, ciudad } = req.params;

        db.remove({ carrera, ciudad }, {}, (err, numRemoved) => {
            if (err) return res.status(500).send("Error en la base de datos.");
            if (numRemoved === 0) return res.status(404).send("Registro no encontrado.");
            res.sendStatus(200);
        });
    });

    // Inspeccionar datos en la base de datos (Solución 1)
    app.get(BASE_API + "/students_satisfaction/debug", (req, res) => {
        db.find({}, (err, docs) => {
            if (err) return res.status(500).send("Error al consultar la base de datos.");
            res.json(docs);
        });
    });

    // Documentación
    app.get(BASE_API + "/students_satisfaction/docs", (_req, res) => {
        res.redirect("https://documenter.getpostman.com/view/42373237/2sB2jAaSsb");
    });
}

export { loadBackendAlejandroV2 };