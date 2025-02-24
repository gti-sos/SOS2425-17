const datos = [
    {
        degree: "GRADO EN EDUCACIÓN INFANTIL",
        location: "ALMENDRALEJO",
        dropoutSecondCourse: 0.0,
        efficiencyRate: 96.58,
        dropoutThirdCourse: 0.0,
        successRate: 99.39,
        dropoutFirstCourse: 3.33,
        dropoutsThirdCourse: 0,
        progressNormalized: 1.0,
        dropoutsFirstCourse: 3,
        performanceRate: 97.32,
        cohortStudents: 9,
        dropoutsSecondCourse: 0,
        dropoutRate: 28.57,
        graduationRate: 50.0,
        academicYear: "2016-2017"
    },
    {
        degree: "GRADO EN EDUCACIÓN PRIMARIA",
        location: "ALMENDRALEJO",
        dropoutSecondCourse: 1.43,
        efficiencyRate: 97.79,
        dropoutThirdCourse: 4.76,
        successRate: 98.03,
        dropoutFirstCourse: 9.52,
        dropoutsThirdCourse: 1,
        progressNormalized: 1.0,
        dropoutsFirstCourse: 2,
        performanceRate: 95.47,
        cohortStudents: 21,
        dropoutsSecondCourse: 3,
        dropoutRate: 31.58,
        graduationRate: 47.37,
        academicYear: "2016-2017"
    },
    {
        degree: "GRADO EN EDUCACIÓN INFANTIL",
        location: "ALMENDRALEJO",
        dropoutSecondCourse: 0.0,
        efficiencyRate: 99.29,
        dropoutThirdCourse: 0.0,
        successRate: 96.55,
        dropoutFirstCourse: 7.14,
        dropoutsThirdCourse: 0,
        progressNormalized: 0.99,
        dropoutsFirstCourse: 1,
        performanceRate: 95.73,
        cohortStudents: 14,
        dropoutsSecondCourse: 0,
        dropoutRate: 13.33,
        graduationRate: 66.67,
        academicYear: "2017-2018"
    }
];

const categoriaFiltro = "GRADO EN EDUCACIÓN INFANTIL";
const datosFiltrados = datos.filter(item => item.degree === categoriaFiltro);

const sumaEficiencia = datosFiltrados.reduce((acumulador, item) => acumulador + item.efficiencyRate, 0);
const mediaEficiencia = datosFiltrados.length > 0 ? sumaEficiencia / datosFiltrados.length : 0;

console.log(`La media de eficiencia para la categoría '${categoriaFiltro}' es: ${mediaEficiencia.toFixed(2)}%`);
