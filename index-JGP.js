// Datos de ejemplo (cada objeto representa una fila con datos geográficos y valores numéricos)
const dataset = [
    { region: "Norte", valor: 10 },
    { region: "Norte", valor: 20 },
    { region: "Norte", valor: 30 },
    { region: "Sur", valor: 25 },
    { region: "Sur", valor: 35 },
    { region: "Sur", valor: 45 },
    { region: "Este", valor: 50 },
    { region: "Este", valor: 60 },
    { region: "Oeste", valor: 40 }
];

// Región a filtrar
const regionFiltrada = "Norte";

// Filtrar los datos por la región seleccionada
const datosFiltrados = dataset.filter(d => d.region === regionFiltrada);

// Calcular la media de los valores numéricos
const media = datosFiltrados.reduce((acc, curr) => acc + curr.valor, 0) / datosFiltrados.length;

console.log(`La media de los valores en la región "${regionFiltrada}" es: ${media.toFixed(2)}`);
