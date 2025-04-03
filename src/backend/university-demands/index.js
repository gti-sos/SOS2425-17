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

db.find({},(err,demands)=>{ //EL {} es para que te busque todo y el segundo parametro es lo que te va a devolver 
    //El err esque te devolvera error y el contacts es lo que te va a devolver 
    if (demands.length < 1){ //Si no encuentra nada entonces le inserto el initialContacts para que asi tenga base de datos
        db.insert(university_demands);
    }
});

function loadBackendJavier(app){
    app.get(BASE_API + "/university-demands", (request,response)=>{ //El como buscas la api en la url y seria BASE_API + /contacts
        //para que sea /api/v1/university-demands
            console.log("New get to /university-demands")
            db.find({},(err,contacts)=>{//Busco todo y el contacts es lo que devolveria 
                response.send(JSON.stringify(contacts.map((c)=>{ //Esto es que para cada contatacto hago lo que sea y para acceder 
                    //a cualquier propiedad lo hago con map 
                    delete c._id; //con esto lo que hago esque quito el id para que asi no se muestre en la api al hacer un get
                    return c; //Quito id porque al usar db , db le pone id a todo entonces lo quito para que el usuario no lo vea
                }),null,2));
            });
        });
    
    // Obtener registros por año y ciudad
    app.get(BASE_API + "/university-demands/:degree/:location/:academicYear", (req,response)=>{ //El como buscas la api en la url y seria BASE_API + /contacts
        //para que sea /api/v1/contacts
            console.log("New get to /university-demands/:degree/:location/:academicYear")
            const degree= req.params.degree
            const location = req.params.location;
            const academicYear = req.params.academicYear
    // Filtramos los datos según los parámetros recibidos
        const filteredData = university_demands.filter(item =>item.degree === degree &&item.location === location &&item.academicYear === academicYear);
    
    if (filteredData.length === 0) {
        return response.status(404).json({ error: "No data found for the given parameters" });
    }
    
    // Enviamos los datos filtrados en formato JSON
    response.send(JSON.stringify(filteredData))
        });
        
    
    //Cargar datos iniciales
    let myNullArray1=[]
    app.get(BASE_API+"/university-demands/loadInitialData",(request,response)=>{
            if (myNullArray1.length ===0){
                myNullArray1.push(...university_demands) // Los puntos suspensivos sirven para añadirlos de 1 en 1
            }
                
                response.send(JSON.stringify(myNullArray1));
        
    })
    
    //POST  
    
    //El post es para meter nuevos datos a la api 
    app.post(BASE_API+"/university-demands",(request,response)=>{ //Para hacer un post necesitamos postman
        
        console.log("POST to /university-demands");
        console.log(`<${request.body}>`);
    //location,degree
        const body = request.body
    
        let newUniversityDemand = request.body; //Creo una variable donde guardo el nuevo contacto y para ello hago request.body porque 
        //en postman se esqcribe en body y haces request.body para que te coja el codigo de body de postman
    
        //location,degree,over45,spanishFirst,foreigners,graduated,academicYear
    
        //Si existe algun campo que no se ha rellenado , mostrar error 
        if (!body.location || !body.degree || !body.over45 || !body.spanishFirst || !body.foreigners || !body.graduated || !body.academicYear) {
            return response.status(400).json({ error: "Missing required fields" });
        }
    
        //Si esos campos son iguales que los nuevos que pones sale error 
        if (university_demands.find(d => d.academicYear === body.academicYear && d.location === body.location && d.degree === body.degree)) {
            return response.status(409).json({ error: "Record already exists" });
        }
        
        university_demands.push(newUniversityDemand); //Para enviar los datos 
    
        response.sendStatus(201); //Para que la persona vea que esos datos se han enviado . Esto siempre se hace con el sendStatus
    });
    
    //Post ERROR 405
    
    app.post(BASE_API + "/university-demands/:degree/:location/:academicYear",(req,res)=>{    
        res.sendStatus(405);
    });
    
    // Modificar un registro existente
    app.put(BASE_API + "/university-demands/:degree/:location/:academicYear", (req, res) => {
        const degree= req.params.degree
        const location = req.params.location;
        const academicYear = req.params.academicYear;
        
        
        const index = university_demands.findIndex(d => d.degree === degree && d.location === location && d.academicYear === academicYear);
        if (index === -1) return res.status(404).json({ error: "Record not found" });
        if (req.body.degree !== degree || req.body.location !==location || req.body.academicYear !==academicYear) {
            return res.status(400).json({ error: "degree, location and academicYear in body must match URL parameters" });
        }
        university_demands[index] = { ...university_demands[index], ...req.body };
        res.status(200).json({ message: "Record updated successfully" });
    });
    
    //FALLO DE PUT a todos los datos
    app.put(BASE_API + "/university-demands",(req,res)=>{    
        
        res.sendStatus(405);
    });
    
    
    // Eliminar todos los registros
    app.delete(BASE_API + "/university-demands", (req, res) => {
        console.log("DELETE request received");
    
        university_demands = [];
        
        res.status(200).json({ message: "All records deleted successfully" });
    });
    
    
    // Eliminar un registro existente
    app.delete(BASE_API + "/university-demands/:degree/:location/:academicYear", (req, res) => {
        const degree= req.params.degree
        const location = req.params.location;
        const academicYear = req.params.academicYear
    
    
        const index = university_demands.findIndex(d => d.degree === degree && d.location === location && d.academicYear === academicYear);
        if (index === -1) return res.status(404).json({ error: "Record not found" });
        university_demands.splice(index, 1);
        res.status(200).json({ message: "Record deleted successfully" });
    });
}

export {loadBackendJavier}