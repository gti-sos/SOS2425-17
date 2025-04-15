//API JAVIER 


import dataStore from "nedb"; //Esto es para importar la base de datos ndb que es un paquete que te descargas con node
const BASE_API = "/api/v1"; //Con esto lo que hago es crear la URL base de la api y digo que para encontrar la api pongas esa direccion 

let db = new dataStore(); //Esto es para inicializar dataStore que sirve para incializar bases de datos

// https://sos2425-XX.onrender.com/api/v1/FFFFF

//Obtener todos los registros con filtros

const university_demands = [ 
    { location: "Almendralejo", degree: "Educación Infantil", over45: 1, spanishFirst: 5, foreigners: 1, graduated: 5, academicYear: "2016-2017" },
    { location: "Almendralejo", degree: "Educación Primaria", over45: 7, spanishFirst: 5, foreigners: 7, graduated: 5, academicYear: "2016-2017" },
    { location: "Mérida", degree: "Enfermería", over45: 5, spanishFirst: 57, foreigners: null, graduated: 8, academicYear: "2016-2017" },
    { location: "Badajoz", degree: "Educación Infantil", over45: 13, spanishFirst: 5, foreigners: 13, graduated: 5, academicYear: "2016-2017" },
    { location: "Badajoz", degree: "Educación Primaria", over45: 117, spanishFirst: 5.01, foreigners: 158, graduated: 297, academicYear: "2016-2017" },
    { location: "Badajoz", degree: "Ingeniería Electrónica y Automática", over45: 57, spanishFirst: 5, foreigners: 9, graduated: 65, academicYear: "2016-2017" },
    { location: "Plasencia", degree: "Enfermería", over45: 5.75, spanishFirst: 98, foreigners: null, graduated: 7.8, academicYear: "2016-2017" },
    { location: "Cáceres", degree: "Administración y Dirección de Empresas", over45: 67, spanishFirst: 6, foreigners: 78, graduated: 5, academicYear: "2016-2017" },
    { location: "Badajoz", degree: "Medicina", over45: 33, spanishFirst: 8, foreigners: 82, graduated: 113, academicYear: "2016-2017" },  
    { location: "Cáceres", degree: "Grado en Derecho", over45: 6.75, spanishFirst: 105, foreigners: 1, graduated: 8.98, academicYear: "2016-2017" },
    { location: "Cáceres", degree: "Grado en Educación Social", over45: 12, spanishFirst: null, foreigners: 73, graduated: 87, academicYear: "2016-2017" },
    { location: "Badajoz", degree: "Grado en Economía", over45: 24, spanishFirst: null, foreigners: 16, graduated: 42, academicYear: "2016-2017" },
    { location: "Plasencia", degree: "Grado en Podología", over45: 23, spanishFirst: null, foreigners: 42, graduated: 66, academicYear: "2016-2017" },
    { location: "Cáceres", degree: "Grado en Educación Infantil", over45: 15, spanishFirst: 6, foreigners: 123, graduated: 137, academicYear: "2016-2017" },
    { location: "Cáceres", degree: "Grado en Educación Primaria", over45: 68, spanishFirst: null, foreigners: 71, graduated: 140, academicYear: "2016-2017" }        
];

//db.find({},(err,demands)=>{ //EL {} es para que te busque todo y el segundo parametro es lo que te va a devolver 
     //El err esque te devolvera error y el contacts es lo que te va a devolver 
  //   if (demands.length < 1){ //Si no encuentra nada entonces le inserto el initialContacts para que asi tenga base de datos
    //     db.insert(university_demands);
     //}
 //});

function loadBackendJavier(app){
    app.get(BASE_API + "/university-demands", (req, res) => {
        let {
            location, degree, academicYear,
            over45, spanishFirst, foreigners, graduated,
            limit, offset
        } = req.query;
    
        let results = university_demands.filter((entry) => {
            if (location && !new RegExp("^" + location + "$", "i").test(entry.location)) return false;
            if (degree && !new RegExp("^" + degree + "$", "i").test(entry.degree)) return false;
            if (academicYear && entry.academicYear !== academicYear) return false;
            if (over45 && Number(entry.over45) !== Number(over45)) return false;
            if (spanishFirst && Number(entry.spanishFirst) !== Number(spanishFirst)) return false;
            if (foreigners && Number(entry.foreigners) !== Number(foreigners)) return false;
            if (graduated && Number(entry.graduated) !== Number(graduated)) return false;
            return true;
        });
    
        // Paginación
        if (offset !== undefined) {
            results = results.slice(Number(offset));
        }
        if (limit !== undefined) {
            results = results.slice(0, Number(limit));
        }
    
        res.json(results);
    });
    
    // Obtener registros por año y ciudad
    app.get(BASE_API + "/university-demands/:degree/:location/:academicYear", (req, res) => {
        console.log("New GET to /university-demands/:degree/:location/:academicYear");
    
        const degree = req.params.degree;
        const location = req.params.location;
        const academicYear = req.params.academicYear;
    
        db.findOne({ degree, location, academicYear }, (err, demand) => {
            if (err) {
                res.status(500).send("Internal Server Error");
                return;
            }
    
            if (demand) {
                delete demand._id;
                res.status(200).json(demand);
            } else {
                res.sendStatus(404);
            }
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
    
    //El post es para meter nuevos datos a la api 
    app.post(BASE_API+"/university-demands",(request,response)=>{ //Para hacer un post necesitamos postman
        
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

    
    //Post ERROR 405
    
    app.post(BASE_API + "/university-demands/:degree/:location/:academicYear",(req,res)=>{    
        res.sendStatus(405);
    });
    
    // PUT . Modificar un registro existente //Mirar porque no esta bien 
    app.put(BASE_API + "/university-demands/:degree/:location/:academicYear", (req, res) => {
        const degree = req.params.degree;
        const location = req.params.location;
        const academicYear = req.params.academicYear;
        const body = req.body;
    
        // Validar que todos los campos esten en el body 
        if (
            !body.location || !body.degree || !body.over45 || !body.spanishFirst ||
            !body.foreigners || !body.graduated || !body.academicYear
        ) {
            return res.status(400).json({ error: "Missing required fields" });
        }
    
        // Validar que los datos del body coincidan con los de la URL
        if (
            body.degree !== degree ||
            body.location !== location ||
            body.academicYear !== academicYear
        ) {
            return res.status(400).json({
                error: "degree, location and academicYear in body must match URL parameters"
            });
        }
    
        //  Hacer el put
        db.update(
            { degree: degree, location: location, academicYear: academicYear },
            { $set: body },
            {},
            (err, numUpdated) => {
                if (err) {
                    console.error("Error al actualizar en la base de datos:", err);
                    return res.status(500).json({ error: "Internal Error" });
                }
    
                if (numUpdated === 0) {
                    return res.status(404).json({
                        error: "No record found to update"
                    });
                }
    
                return res.sendStatus(200); // Solo devuelve 200 OK, sin datos
            }
        );
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
        response.redirect("https://documenter.getpostman.com/view/42357894/2sB2cUAN1D");
    });

}

export {loadBackendJavier}
