//API JAVIER 


import dataStore from "nedb"; 
const BASE_API = "/api/v2"; 

let db = new dataStore(); 


//location,degree,over45,spanishFirst,foreigners,graduated,academicYear

const university_demands = [ 
    { location: "ALMENDRALEJO", degree: "GRADO EN EDUCACIÓN INFANTIL", over45: 1, spanishFirst: 5, foreigners: 1, graduated: 5, academicYear: "2016-2017" },
    { location: "ALMENDRALEJO", degree: "GRADO EN EDUCACIÓN PRIMARIA", over45: 7, spanishFirst: 5, foreigners: 7, graduated: 5, academicYear: "2016-2017" },
    { location: "MÉRIDA", degree: "GRADO EN ENFERMERÍA", over45: 5, spanishFirst: 57, foreigners: null, graduated: 8, academicYear: "2016-2017" },
    { location: "BADAJOZ", degree: "GRADO EN EDUCACIÓN INFANTIL", over45: 13, spanishFirst: 5, foreigners: 13, graduated: 5, academicYear: "2016-2017" },
    { location: "BADAJOZ", degree: "GRADO EN EDUCACIÓN PRIMARIA", over45: 117, spanishFirst: 5.01, foreigners: 158, graduated: 297, academicYear: "2016-2017" },
    { location: "BADAJOZ", degree: "GRADO EN INGENIERÍA ELECTRÓNICA Y AUTOMÁTICA", over45: 57, spanishFirst: 5, foreigners: 9, graduated: 65, academicYear: "2016-2017" },
    { location: "PLASENCIA", degree: "GRADO EN ENFERMERÍA", over45: 5.75, spanishFirst: 98, foreigners: null, graduated: 8, academicYear: "2016-2017" },
    { location: "CÁCERES", degree: "GRADO EN ADMINISTRACIÓN Y DIRECCIÓN DE EMPRESAS", over45: 67, spanishFirst: 6, foreigners: 78, graduated: 5, academicYear: "2016-2017" },
    { location: "BADAJOZ", degree: "GRADO EN MEDICINA", over45: 33, spanishFirst: 8, foreigners: 82, graduated: 113, academicYear: "2016-2017" },  
    { location: "CÁCERES", degree: "GRADO EN DERECHO", over45: 6.75, spanishFirst: 105, foreigners: 1, graduated: 9, academicYear: "2016-2017" },
    { location: "CÁCERES", degree: "GRADO EN EDUCACIÓN SOCIAL", over45: 12, spanishFirst: null, foreigners: 73, graduated: 87, academicYear: "2016-2017" },
    { location: "BADAJOZ", degree: "GRADO EN ECONOMÍA", over45: 24, spanishFirst: null, foreigners: 16, graduated: 42, academicYear: "2016-2017" },
    { location: "PLASENCIA", degree: "GRADO EN PODOLOGÍA", over45: 23, spanishFirst: null, foreigners: 42, graduated: 66, academicYear: "2016-2017" },
    { location: "CÁCERES", degree: "GRADO EN EDUCACIÓN INFANTIL", over45: 15, spanishFirst: 6, foreigners: 123, graduated: 137, academicYear: "2016-2017" },
    { location: "CÁCERES", degree: "GRADO EN EDUCACIÓN PRIMARIA", over45: 68, spanishFirst: null, foreigners: 71, graduated: 140, academicYear: "2016-2017" },
    { location: "CÁCERES", degree: "GRADO EN VETERINARIA", over45: 10, spanishFirst: 11, foreigners: 8, graduated: 106, academicYear: "2016-2017" },
    { location: "BADAJOZ", degree: "GRADO EN COMUNICACIÓN AUDIOVISUAL", over45: 7, spanishFirst: null, foreigners: 66, graduated: 31, academicYear: "2016-2017" },
    { location: "MÉRIDA", degree: "GRADO EN INGENIERÍA INFORMÁTICA EN TECNOLOGÍAS DE LA INFORMACIÓN", over45: 5, spanishFirst: null, foreigners: 19, graduated: 17, academicYear: "2016-2017" },
    { location: "MÉRIDA", degree: "GRADO EN INGENIERÍA INFORMÁTICA EN INGENIERÍA DE COMPUTADORES", over45: 5.32, spanishFirst: null, foreigners: 75, graduated: 70, academicYear: "2016-2017" },
    { location: "MÉRIDA", degree: "GRADO EN INGENIERÍA INFORMÁTICA EN INGENIERÍA DEL SOFTWARE", over45: 6, spanishFirst: 7, foreigners: 85, graduated: 83, academicYear: "2016-2017" },
    { location: "ALMENDRALEJO", degree: "GRADO EN EDUCACIÓN INFANTIL", over45: 5.14, spanishFirst: null, foreigners: 14, graduated: 1, academicYear: "2017-2018" },
    { location: "ALMENDRALEJO", degree: "GRADO EN EDUCACIÓN PRIMARIA", over45: 5, spanishFirst: null, foreigners: 22, graduated: 6, academicYear: "2017-2018" },
    { location: "MÉRIDA", degree: "GRADO EN ENFERMERÍA", over45: 8, spanishFirst: 7.88, foreigners: 59, graduated: 50, academicYear: "2017-2018" },
    { location: "BADAJOZ", degree: "GRADO EN EDUCACIÓN INFANTIL", over45: 5, spanishFirst: 7, foreigners: 130, graduated: 115, academicYear: "2017-2018" },
    { location: "BADAJOZ", degree: "GRADO EN EDUCACIÓN PRIMARIA", over45: 5, spanishFirst: 7.87, foreigners: 275, graduated: 178, academicYear: "2017-2018" },
    { location: "BADAJOZ", degree: "GRADO EN INGENIERÍA ELECTRÓNICA Y AUTOMÁTICA (Rama Industrial)", over45: 57, spanishFirst: 5, foreigners: 69, graduated: 5, academicYear: "2017-2018" },
    { location: "PLASENCIA", degree: "GRADO EN ENFERMERÍA", over45: 5.75, spanishFirst: 23, foreigners: 80, graduated: 8, academicYear: "2017-2018" },
    { location: "CÁCERES", degree: "GRADO EN ADMINISTRACIÓN Y DIRECCIÓN DE EMPRESAS", over45: 84, spanishFirst: 6, foreigners: 151, graduated: 5, academicYear: "2017-2018" },
    { location: "BADAJOZ", degree: "GRADO EN MEDICINA", over45: 39, spanishFirst: 9, foreigners: 88, graduated: 8, academicYear: "2017-2018" },
    { location: "CÁCERES", degree: "GRADO EN DERECHO", over45: 44, spanishFirst: 7.76, foreigners: 73, graduated: 5, academicYear: "2017-2018" },
    { location: "CÁCERES", degree: "GRADO EN EDUCACIÓN SOCIAL", over45: 11, spanishFirst: null, foreigners: 73, graduated: 7, academicYear: "2017-2018" },
    { location: "BADAJOZ", degree: "GRADO EN ECONOMÍA", over45: 15, spanishFirst: null, foreigners: 18, graduated: 6, academicYear: "2017-2018" },
    { location: "PLASENCIA", degree: "GRADO EN PODOLOGÍA", over45: 26, spanishFirst: 7.48, foreigners: 40, graduated: 85, academicYear: "2017-2018" },
    { location: "CÁCERES", degree: "GRADO EN EDUCACIÓN INFANTIL", over45: 13, spanishFirst: 7, foreigners: 120, graduated: 5, academicYear: "2017-2018" },
    { location: "CÁCERES", degree: "GRADO EN EDUCACIÓN PRIMARIA", over45: 66, spanishFirst: 8, foreigners: 74, graduated: 5, academicYear: "2017-2018" },
    { location: "CÁCERES", degree: "GRADO EN VETERINARIA", over45: 37, spanishFirst: null, foreigners: 60, graduated: 10, academicYear: "2017-2018" },
    { location: "BADAJOZ", degree: "GRADO EN COMUNICACIÓN AUDIOVISUAL", over45: 34, spanishFirst: null, foreigners: 33, graduated: 6, academicYear: "2017-2018" },
    { location: "MÉRIDA", degree: "GRADO EN INGENIERÍA INFORMÁTICA EN TECNOLOGÍAS DE LA INFORMACIÓN", over45: 25, spanishFirst: null, foreigners: 6, graduated: 5, academicYear: "2017-2018" },
    { location: "MÉRIDA", degree: "GRADO EN INGENIERÍA INFORMÁTICA EN INGENIERÍA DE COMPUTADORES", over45: 67, spanishFirst: null, foreigners: 7, graduated: 5, academicYear: "2017-2018" },
    { location: "MÉRIDA", degree: "GRADO EN INGENIERÍA INFORMÁTICA EN INGENIERÍA DEL SOFTWARE", over45: 80, spanishFirst: null, foreigners: 6, graduated: 7, academicYear: "2017-2018" },
    { location: "ALMENDRALEJO", degree: "GRADO EN EDUCACIÓN INFANTIL", over45: 1, spanishFirst: 5, foreigners: 1, graduated: 6, academicYear: "2018-2019" },
    { location: "ALMENDRALEJO", degree: "GRADO EN EDUCACIÓN PRIMARIA", over45: 10, spanishFirst: 5, foreigners: 8, graduated: 5, academicYear: "2018-2019" },
    { location: "MÉRIDA", degree: "GRADO EN ENFERMERÍA", over45: 13, spanishFirst: 57, foreigners: 13, graduated: 8.62, academicYear: "2018-2019" },
    { location: "BADAJOZ", degree: "GRADO EN EDUCACIÓN INFANTIL", over45: 6, spanishFirst: 5, foreigners: 6, graduated: 5, academicYear: "2018-2019" },
    { location: "BADAJOZ", degree: "GRADO EN EDUCACIÓN PRIMARIA", over45: 109, spanishFirst: 7, foreigners: 106, graduated: 8, academicYear: "2018-2019" },
    { location: "BADAJOZ", degree: "GRADO EN INGENIERÍA ELECTRÓNICA Y AUTOMÁTICA (Rama Industrial)", over45: 51, spanishFirst: 6, foreigners: 3, graduated: 9, academicYear: "2018-2019" },
    { location: "PLASENCIA", degree: "GRADO EN ENFERMERÍA", over45: 27, spanishFirst: 96, foreigners: 3, graduated: 8, academicYear: "2018-2019" },
    { location: "CÁCERES", degree: "GRADO EN ADMINISTRACIÓN Y DIRECCIÓN DE EMPRESAS", over45: 83, spanishFirst: 5, foreigners: 4, graduated: 5, academicYear: "2018-2019" },
    { location: "BADAJOZ", degree: "GRADO EN MEDICINA", over45: 45, spanishFirst: 116, foreigners: 11, graduated: 6, academicYear: "2018-2019" },
    { location: "CÁCERES", degree: "GRADO EN DERECHO", over45: 45, spanishFirst: 112, foreigners: 4, graduated: 5, academicYear: "2018-2019" },
    { location: "CÁCERES", degree: "GRADO EN EDUCACIÓN SOCIAL", over45: 15, spanishFirst: 84, foreigners: null, graduated: 7, academicYear: "2018-2019" },
    { location: "BADAJOZ", degree: "GRADO EN ECONOMÍA", over45: 26, spanishFirst: 38, foreigners: 2, graduated: 10, academicYear: "2018-2019" },
    { location: "PLASENCIA", degree: "GRADO EN PODOLOGÍA", over45: 12, spanishFirst: 63, foreigners: 1, graduated: 42, academicYear: "2018-2019" },
    { location: "CÁCERES", degree: "GRADO EN EDUCACIÓN INFANTIL", over45: 20, spanishFirst: 130, foreigners: 1, graduated: 6, academicYear: "2018-2019" },
    { location: "CÁCERES", degree: "GRADO EN EDUCACIÓN PRIMARIA", over45: 72, spanishFirst: 134, foreigners: 1, graduated: 7, academicYear: "2018-2019" },
    { location: "CÁCERES", degree: "GRADO EN VETERINARIA", over45: 31, spanishFirst: 101, foreigners: 2, graduated: 8, academicYear: "2018-2019" },
    { location: "BADAJOZ", degree: "GRADO EN COMUNICACIÓN AUDIOVISUAL", over45: 30, spanishFirst: 62, foreigners: null, graduated: 7, academicYear: "2018-2019" },
    { location: "MÉRIDA", degree: "GRADO EN INGENIERÍA INFORMÁTICA EN TECNOLOGÍAS DE LA INFORMACIÓN", over45: 21, spanishFirst: 21, foreigners: null, graduated: 5, academicYear: "2018-2019" },
    { location: "MÉRIDA", degree: "GRADO EN INGENIERÍA INFORMÁTICA EN INGENIERÍA DE COMPUTADORES", over45: 73, spanishFirst: 78, foreigners: 1, graduated: 5, academicYear: "2018-2019" },
    { location: "MÉRIDA", degree: "GRADO EN INGENIERÍA INFORMÁTICA EN INGENIERÍA DEL SOFTWARE", over45: 77, spanishFirst: 81, foreigners: 3, graduated: 9, academicYear: "2018-2019" },        
];


//location,degree,over45,spanishFirst,foreigners,graduated,academicYear
function loadBackendJavierV2(app){
    

    app.get(BASE_API + "/university-demands", (req, res) => {
        let {
            location, degree, academicYear,
            over45, spanishFirst, foreigners, graduated,
            limit, offset ,from, to
        } = req.query;
    
        let query = {};
    
        if (location) query.location = new RegExp("^" + location + "$", "i");   
        if (degree) query.degree = new RegExp("^" + degree + "$", "i");
        if (academicYear) query.academicYear = academicYear;
        if (over45) query.over45 = Number(over45);
        if (spanishFirst) query.spanishFirst = Number(spanishFirst);
        if (foreigners) query.foreigners = Number(foreigners);
        if (graduated) query.graduated = Number(graduated);
        

        if (from || to) {
            query.academicYear = {};
            if (from) query.academicYear.$gte = from;
            if (to) query.academicYear.$lte = to;
        }
    
        db.find(query, (err, results) => {
            if (err) {
                res.status(500).send("Internal Server Error");
                return;
            }

            if (results.length === 0) {
                return res.status(404).json({ error: "No se encontraron resultados con esos filtros." });
            }              
            
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
    
    
    //Cargar datos iniciales
    app.get(BASE_API + "/university-demands/loadInitialData", (request, response) => {
        console.log("Loading initial data into the database...");
    
        // Verificar si la base de datos ya tiene datos
        db.count({}, (err, count) => {
            if (err) {
                return response.status(500).json({ error: "Database error" });
            }
    
            if (count === 0) {
                db.insert(university_demands, (err, newDocs) => {
                    if (err) {
                        return response.status(500).json({ error: "Error inserting initial data" });
                    }
                    response.status(201).json({message: "the data was inserted successfully"}); // Devuelve los datos insertados
                    
                    });
            } else {
                response.status(409).json({ message: "empty the database first to initialize it" });
            }
        });
        
    });
    
    //POST  
    
    app.post(BASE_API+"/university-demands",(request,response)=>{ 
        
        console.log("POST to /university-demands");
        console.log(`<${request.body}>`);
    //location,degree
        const body = request.body

        if (!body.location || !body.degree || !body.over45 || !body.spanishFirst || !body.foreigners || !body.graduated || !body.academicYear) {
            return response.status(400).json({ error: "Missing required fields" });
        }
    
        db.findOne({ degree: body.degree, academicYear: body.academicYear, location: body.location }, (err, existingRecord) => {
            if (err) {
                return response.status(500).json({ error: "Database error" });
            }
    
            if (existingRecord) {
                return response.status(409).json({ error: "Record already exists" });
            }
            
            db.insert(body, (err, newDoc) => {
                if (err) {
                    return response.status(500).json({ error: "Error inserting data" });
                }
                delete newDoc._id;
                response.sendStatus(201);;
            });
        }); 
    });

    
    //Post ERROR 405
    
    app.post(BASE_API + "/university-demands/:degree/:location/:academicYear",(req,res)=>{    
        res.sendStatus(405);
    });
    
    // PUT   
    app.put(BASE_API + "/university-demands/:degree/:location/:academicYear", (req, res) => {
        const degree = req.params.degree;
        const location = req.params.location;
        const academicYear = req.params.academicYear;
        const body = req.body;
    
        if (
            body.degree !== degree ||
            body.location !== location ||
            body.academicYear !== academicYear
        ) {
            return res.status(400).json({
                error: "degree, location and academicYear in body must match URL parameters"
            });
        }
        
        
        db.findOne({ degree, location, academicYear }, (err, existing) => {
            if (err) {
                console.error("Error al buscar:", err);
                return res.status(500).json({ error: "Internal error" });
            }
    
            if (!existing) {
                return res.status(404).json({ error: "Record not found" });
            }
    
            const requiredFields = ["location", "degree", "over45", "spanishFirst", "foreigners", "graduated", "academicYear"];
            const removedFields = requiredFields.filter(field => {
                return existing[field] !== "" && body[field] === "";
            });
    
            if (removedFields.length > 0) {
                return res.status(400).json({ error: `No puedes eliminar estos campos: ${removedFields.join(", ")}` });
            }
    
            // Todo bien, proceder a actualizar
            db.update(
                { degree, location, academicYear },
                { $set: body },
                {},
                (err, numUpdated) => {
                    if (err) {
                        console.error("Error al actualizar en la base de datos:", err);
                        return res.status(500).json({ error: "Internal Error" });
                    }
    
                    if (numUpdated === 0) {
                        return res.status(404).json({ error: "No record found to update" });
                    }
    
                    return res.sendStatus(200);
                }
                
            );
            
        });
    });
    
    
    
    //FALLO DE PUT a todos los datos
    app.put(BASE_API + "/university-demands",(req,res)=>{    
        
        res.sendStatus(405);
    });
    
    
    // Eliminar todos los registros
    app.delete(BASE_API+"/university-demands",(req,response)=>{
        
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
    
    // Eliminar un registro existente
    app.delete(BASE_API+"/university-demands/:degree/:location/:academicYear",(req,response)=>{
    
        const degree= req.params.degree;
        const location = req.params.location;
        const academicYear = req.params.academicYear;

        console.log(`DELETE to /university-demands/${degree}/${location},${academicYear}`);
       
            
        db.remove({"degree" : degree , "location" : location , "academicYear" : academicYear},{},(err,numRemoved)=>{
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
    
    //Esto es para que te redirija a la documentacion de la api cuando pongas /base_api//university-demands/docs
    app.get(BASE_API+"/university-demands/docs",(request,response)=>{
        response.redirect("https://documenter.getpostman.com/view/42357894/2sB2iwFETH");
    });

}

export {loadBackendJavierV2}

