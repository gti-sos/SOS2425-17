// index-YYY.js

// Datos actualizados con todas las columnas de la tabla académica
const datos = [
    { ciudad: "Almendralejo", grado: "Educación Infantil", over45: 1, menFirstCourse: 8, foreigners: 1, womenFirstCourse: 8, menFirst: 8, womenFirst: 9, graduated: 5, spanishFirst: 5, athletes: null, general: 5.75, over25: null, over40: null, disabledAccess: null, academicYear: "2016-2017" },
    { ciudad: "Almendralejo", grado: "Educación Primaria", over45: 7, menFirstCourse: 14, foreigners: 7, womenFirstCourse: 14, menFirst: 5, womenFirst: 21, graduated: 5, spanishFirst: 5, athletes: null, general: 5.08, over25: null, over40: null, disabledAccess: null, academicYear: "2016-2017" },
    { ciudad: "Mérida", grado: "Enfermería", over45: 5, menFirstCourse: 9, foreigners: null, womenFirstCourse: 45, menFirst: 9, womenFirst: 48, graduated: 8, spanishFirst: 57, athletes: null, general: 7.6, over25: null, over40: null, disabledAccess: null, academicYear: "2016-2017" },
    { ciudad: "Badajoz", grado: "Educación Infantil", over45: 13, menFirstCourse: 121, foreigners: 13, womenFirstCourse: 125, menFirst: null, womenFirst: 138, graduated: 5, spanishFirst: 5, athletes: null, general: 6.1, over25: null, over40: null, disabledAccess: null, academicYear: "2016-2017" },
    { ciudad: "Badajoz", grado: "Educación Primaria", over45: 117, menFirstCourse: 3, foreigners: 158, womenFirstCourse: 120, menFirst: 180, womenFirst: 7, graduated: 297, spanishFirst: 5.01, athletes: null, general: 5, over25: null, over40: null, disabledAccess: null, academicYear: "2016-2017" },
    { ciudad: "Badajoz", grado: "Ingeniería Electrónica y Automática", over45: 57, menFirstCourse: 2, foreigners: 9, womenFirstCourse: 58, menFirst: 9, womenFirst: null, graduated: 65, spanishFirst: 5, athletes: null, general: 7.7, over25: null, over40: null, disabledAccess: null, academicYear: "2016-2017" },
    { ciudad: "Plasencia", grado: "Enfermería", over45: 5.75, menFirstCourse: 22, foreigners: null, womenFirstCourse: 73, menFirst: 20, womenFirst: 78, graduated: 7.8, spanishFirst: 98, athletes: null, general: 6.45, over25: null, over40: null, disabledAccess: null, academicYear: "2016-2017" },
    { ciudad: "", grado: "Administración y Dirección de Empresas", over45: 67, menFirstCourse: 51, foreigners: 78, womenFirstCourse: 60, menFirst: 8, womenFirst: 138, graduated: 5, spanishFirst: 6, athletes: 6, general: null, over25: null, over40: null, disabledAccess: null, academicYear: "2016-2017" },
    { ciudad: "", grado: "Medicina", over45: 33, menFirstCourse: 7, foreigners: 82, womenFirstCourse: 34, menFirst: 82, womenFirst: 9.1, graduated: 113, spanishFirst: 8, athletes: 12, general: 6.5, over25: null, over40: 8, disabledAccess: null, academicYear: "2016-2017" }
];

// Ciudad a filtrar
const ciudadFiltrada = "Badajoz";

// Filtrar los datos por la ciudad específica
const datosFiltrados = datos.filter(dato => dato.ciudad === ciudadFiltrada);

// Calcular la media del campo general
const media = datosFiltrados.reduce((acc, curr) => acc + (curr.general || 0), 0) / datosFiltrados.length;

// Mostrar el resultado
console.log(`La media de los valores generales para ${ciudadFiltrada} es: ${media.toFixed(2)}`);
