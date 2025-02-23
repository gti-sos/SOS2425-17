// index-YYY.js
const data = [
    { ciudad: "Madrid", temperatura: 25, humedad: 60 },
    { ciudad: "Barcelona", temperatura: 22, humedad: 55 },
    { ciudad: "Madrid", temperatura: 27, humedad: 62 },
    { ciudad: "Valencia", temperatura: 24, humedad: 58 },
    { ciudad: "Madrid", temperatura: 26, humedad: 61 },
    { ciudad: "Barcelona", temperatura: 23, humedad: 54 },
    { ciudad: "Valencia", temperatura: 25, humedad: 59 },
    { ciudad: "Madrid", temperatura: 28, humedad: 63 },
    { ciudad: "Barcelona", temperatura: 21, humedad: 53 },
    { ciudad: "Valencia", temperatura: 26, humedad: 60 }
];

// Filtrar datos solo de "Madrid"
const ciudadFiltro = "Madrid";
const datosFiltrados = data.filter(d => d.ciudad === ciudadFiltro);

// Calcular la media de la temperatura de Madrid
const mediaTemperatura = datosFiltrados.reduce((acc, d) => acc + d.temperatura, 0) / datosFiltrados.length;

console.log(`La temperatura media en ${ciudadFiltro} es: ${mediaTemperatura.toFixed(2)}°C`);
