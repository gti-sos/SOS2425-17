const data = [
    { satisfaccion_total: 4.57, sat_estudiantes: 4.89, satisfaccion_pdi: 4.55, carrera: "GRADO EN EDUCACIÓN INFANTIL" },
    { satisfaccion_total: 9, sat_estudiantes: 4.89, satisfaccion_pdi: 4.55, carrera: "GRADO EN EDUCACIÓN INFANTIL" },
    { satisfaccion_total: 4.58, sat_estudiantes: 4.89, satisfaccion_pdi: 4.55, carrera: "GRADO EN EDUCACIÓN INFANTIL" },
    { satisfaccion_total: 4.55, sat_estudiantes: 4.89, satisfaccion_pdi: 4.55, carrera: "GRADO EN EDUCACIÓN INFANTIL" },
    { satisfaccion_total: 8.81, sat_estudiantes: 4.89, satisfaccion_pdi: 4.55, carrera: "GRADO EN EDUCACIÓN INFANTIL" },
    { satisfaccion_total: 4.57, sat_estudiantes: 4.89, satisfaccion_pdi: 4.55, carrera: "GRADO EN EDUCACIÓN INFANTIL" },
    { satisfaccion_total: 8.28, sat_estudiantes: 4.89, satisfaccion_pdi: 4.55, carrera: "GRADO EN EDUCACIÓN INFANTIL" },
    { satisfaccion_total: 8.27, sat_estudiantes: 4.89, satisfaccion_pdi: 4.55, carrera: "GRADO EN EDUCACIÓN INFANTIL" },
    { satisfaccion_total: 8.61, sat_estudiantes: 4.89, satisfaccion_pdi: 4.55, carrera: "GRADO EN EDUCACIÓN INFANTIL" },
    { satisfaccion_total: 4.57, sat_estudiantes: 4.89, satisfaccion_pdi: 4.55, carrera: "GRADO EN EDUCACIÓN INFANTIL" }
];

// Filtrar los datos para la carrera "GRADO EN EDUCACIÓN INFANTIL"
const carreraFiltro = "GRADO EN EDUCACIÓN INFANTIL";
const datosFiltrados = data.filter(d => d.carrera === carreraFiltro);

// Calcular la media de satisfaccion_total
const mediaSatisfaccion = datosFiltrados.reduce((acc, d) => acc + d.satisfaccion_total, 0) / datosFiltrados.length;

console.log(`La satisfacción media en ${carreraFiltro} es: ${mediaSatisfaccion.toFixed(2)}`);