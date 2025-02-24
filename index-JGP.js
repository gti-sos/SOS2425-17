// index-YYY.js

// Datos actualizados basados en la tabla académica
const datos = [
    { ciudad: "Almendralejo", grado: "Educación Infantil", valor: 5.75 },
    { ciudad: "Almendralejo", grado: "Educación Primaria", valor: 5.08 },
    { ciudad: "Mérida", grado: "Enfermería", valor: 7.6 },
    { ciudad: "Badajoz", grado: "Educación Infantil", valor: 6.1 },
    { ciudad: "Badajoz", grado: "Educación Primaria", valor: 5.01 },
    { ciudad: "Badajoz", grado: "Ingeniería Electrónica y Automática", valor: 7.7 },
    { ciudad: "Plasencia", grado: "Enfermería", valor: 6.45 },
    { ciudad: "", grado: "Administración y Dirección de Empresas", valor: 6 },
    { ciudad: "", grado: "Medicina", valor: 6.5 }
];

// Ciudad a filtrar
const ciudadFiltrada = "Badajoz";

// Filtrar los datos por la ciudad específica
const datosFiltrados = datos.filter(dato => dato.ciudad === ciudadFiltrada);

// Calcular la media del campo numérico
const media = datosFiltrados.reduce((acc, curr) => acc + curr.valor, 0) / datosFiltrados.length;

// Mostrar el resultado
console.log(`La media de los valores para ${ciudadFiltrada} es: ${media.toFixed(2)}`);
