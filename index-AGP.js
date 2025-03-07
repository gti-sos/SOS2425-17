const data = [
    { satisfaccion_total: 4.57, sat_estudiantes: null, satisfaccion_pdi: 4.89, carrera: "GRADO EN EDUCACIÓN INFANTIL", ciudad: "ALMENDRALEJO" },
    { satisfaccion_total: 9.00, sat_estudiantes: null, satisfaccion_pdi: 4.59, carrera: "GRADO EN EDUCACIÓN INFANTIL", ciudad: "ALMENDRALEJO" },
    { satisfaccion_total: 4.58, sat_estudiantes: 4.53, satisfaccion_pdi: 4.45, carrera: "GRADO EN EDUCACIÓN INFANTIL", ciudad: "ALMENDRALEJO" },
    { satisfaccion_total: 8.55, sat_estudiantes: 4.88, satisfaccion_pdi: 4.46, carrera: "GRADO EN EDUCACIÓN PRIMARIA", ciudad: "ALMENDRALEJO" },
    { satisfaccion_total: 8.81, sat_estudiantes: 4.54, satisfaccion_pdi: null, carrera: "GRADO EN EDUCACIÓN PRIMARIA", ciudad: "ALMENDRALEJO" },
    { satisfaccion_total: 4.57, sat_estudiantes: 4.56, satisfaccion_pdi: 4.58, carrera: "GRADO EN EDUCACIÓN PRIMARIA", ciudad: "ALMENDRALEJO" },
    { satisfaccion_total: 8.28, sat_estudiantes: null, satisfaccion_pdi: 4.58, carrera: "GRADO EN ENFERMERÍA", ciudad: "MÉRIDA" },
    { satisfaccion_total: 8.27, sat_estudiantes: 7.41, satisfaccion_pdi: 3.89, carrera: "GRADO EN ENFERMERÍA", ciudad: "MÉRIDA" },
    { satisfaccion_total: 8.61, sat_estudiantes: 7.46, satisfaccion_pdi: 4.58, carrera: "GRADO EN ENFERMERÍA", ciudad: "MÉRIDA" },
    { satisfaccion_total: 7.75, sat_estudiantes: null, satisfaccion_pdi: 3.77, carrera: "GRADO EN EDUCACIÓN INFANTIL", ciudad: "BADAJOZ" }
];


// Filtrar los datos para la carrera "GRADO EN EDUCACIÓN INFANTIL"
const carreraFiltro = "GRADO EN EDUCACIÓN INFANTIL";
const datosFiltrados = data.filter(d => d.carrera === carreraFiltro);

// Calcular la media de satisfaccion_total
const mediaSatisfaccion = datosFiltrados.reduce((acc, d) => acc + d.satisfaccion_total, 0) / datosFiltrados.length;

console.log(`La satisfacción media en ${carreraFiltro} es: ${mediaSatisfaccion.toFixed(2)}`);