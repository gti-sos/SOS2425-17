console.log("Init script");
const BASE_API = "/api/v1";

const express = require("express");
const cool = require("cool-ascii-faces");
const app = express(); //para llamar al framework express
const Port = process.env.PORT || 24356; //Esto es para que si se ejecuta en la pagina web(la primera) que coja ese port y 
//que si se ejecuta en local coja el segundo 

app.use(express.json()); //esto es para que todo lo que coja de express lo ponga como json


app.options('*', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.sendStatus(200);
});

const university_academic_performance = [
    { degree: "GRADO EN EDUCACIÓN INFANTIL", location: "ALMENDRALEJO", dropoutSecondCourse: 0.0, efficiencyRate: 96.58, dropoutThirdCourse: 0.0, successRate: 99.39, dropoutFirstCourse: 3.33, dropoutsThirdCourse: 0, progressNormalized: 1.0, dropoutsFirstCourse: 3, performanceRate: 97.32, cohortStudents: 9, dropoutsSecondCourse: 0, dropoutRate: 28.57, graduationRate: 50.0, academicYear: "2016-2017" },
    { degree: "GRADO EN EDUCACIÓN PRIMARIA", location: "ALMENDRALEJO", dropoutSecondCourse: 1.43, efficiencyRate: 97.79, dropoutThirdCourse: 4.76, successRate: 98.03, dropoutFirstCourse: 9.52, dropoutsThirdCourse: 1, progressNormalized: 1.0, dropoutsFirstCourse: 2, performanceRate: 95.47, cohortStudents: 21, dropoutsSecondCourse: 3, dropoutRate: 31.58, graduationRate: 47.37, academicYear: "2016-2017" },
    { degree: "GRADO EN EDUCACIÓN INFANTIL", location: "ALMENDRALEJO", dropoutSecondCourse: 0.0, efficiencyRate: 99.29, dropoutThirdCourse: 0.0, successRate: 96.55, dropoutFirstCourse: 7.14, dropoutsThirdCourse: 0, progressNormalized: 0.99, dropoutsFirstCourse: 1, performanceRate: 95.73, cohortStudents: 14, dropoutsSecondCourse: 0, dropoutRate: 13.33, graduationRate: 66.67, academicYear: "2017-2018" },
    { degree: "GRADO EN EDUCACIÓN PRIMARIA", location: "ALMENDRALEJO", dropoutSecondCourse: 0.0, efficiencyRate: 94.94, dropoutThirdCourse: 4.76, successRate: 95.29, dropoutFirstCourse: 14.29, dropoutsThirdCourse: 1, progressNormalized: 0.95, dropoutsFirstCourse: 3, performanceRate: 91.28, cohortStudents: 21, dropoutsSecondCourse: 0, dropoutRate: 14.29, graduationRate: 60.71, academicYear: "2017-2018" },
    { degree: "GRADO EN EDUCACIÓN INFANTIL", location: "ALMENDRALEJO", dropoutSecondCourse: 0.0, efficiencyRate: 99.01, dropoutThirdCourse: 9.09, successRate: 99.46, dropoutFirstCourse: 18.18, dropoutsThirdCourse: 1, progressNormalized: 0.99, dropoutsFirstCourse: 2, performanceRate: 95.83, cohortStudents: 11, dropoutsSecondCourse: 0, dropoutRate: 33.33, graduationRate: 50.0, academicYear: "2018-2019" },
    { degree: "GRADO EN EDUCACIÓN PRIMARIA", location: "ALMENDRALEJO", dropoutSecondCourse: 0.0, efficiencyRate: 97.09, dropoutThirdCourse: 5.56, successRate: 97.27, dropoutFirstCourse: 22.22, dropoutsThirdCourse: 1, progressNormalized: 1.0, dropoutsFirstCourse: 4, performanceRate: 94.32, cohortStudents: 18, dropoutsSecondCourse: 0, dropoutRate: 20.69, graduationRate: 58.62, academicYear: "2018-2019" },
    { degree: "GRADO EN ENFERMERÍA", location: "MÉRIDA", dropoutSecondCourse: 1.3, efficiencyRate: 96.04, dropoutThirdCourse: 0.0, successRate: 94.64, dropoutFirstCourse: 5.56, dropoutsThirdCourse: 0, progressNormalized: 0.96, dropoutsFirstCourse: 3, performanceRate: 93.0, cohortStudents: 54, dropoutsSecondCourse: 7, dropoutRate: 9.26, graduationRate: 85.19, academicYear: "2017-2018" },
    { degree: "GRADO EN ENFERMERÍA", location: "MÉRIDA", dropoutSecondCourse: 1.45, efficiencyRate: 97.51, dropoutThirdCourse: 0.0, successRate: 93.75, dropoutFirstCourse: 18.18, dropoutsThirdCourse: 0, progressNormalized: 1.0, dropoutsFirstCourse: 1, performanceRate: 91.87, cohortStudents: 55, dropoutsSecondCourse: 8, dropoutRate: 21.82, graduationRate: 74.55, academicYear: "2018-2019" },
    { degree: "GRADO EN ENFERMERÍA", location: "MÉRIDA", dropoutSecondCourse: 0.0, efficiencyRate: 100.0, dropoutThirdCourse: 0.0, successRate: 96.61, dropoutFirstCourse: 5.56, dropoutsThirdCourse: 0, progressNormalized: 0.9, dropoutsFirstCourse: 3, performanceRate: 95.95, cohortStudents: 54, dropoutsSecondCourse: 0, dropoutRate: 17.54, graduationRate: 75.44, academicYear: "2016-2017" },
    { degree: "GRADO EN EDUCACIÓN INFANTIL", location: "BADAJOZ", dropoutSecondCourse: 2.29, efficiencyRate: 94.07, dropoutThirdCourse: 7.63, successRate: 95.34, dropoutFirstCourse: 10.69, dropoutsThirdCourse: 1, progressNormalized: 0.94, dropoutsFirstCourse: 14, performanceRate: 93.0, cohortStudents: 131, dropoutsSecondCourse: 3, dropoutRate: 14.81, graduationRate: 73.33, academicYear: "2017-2018" },
    { degree: "GRADO EN EDUCACIÓN PRIMARIA", location: "BADAJOZ", dropoutSecondCourse: 4.03, efficiencyRate: 93.43, dropoutThirdCourse: 3.66, successRate: 91.1, dropoutFirstCourse: 5.86, dropoutsThirdCourse: 10, progressNormalized: 0.94, dropoutsFirstCourse: 16, performanceRate: 86.9, cohortStudents: 273, dropoutsSecondCourse: 11, dropoutRate: 12.04, graduationRate: 54.74, academicYear: "2017-2018" },
    { degree: "GRADO EN EDUCACIÓN INFANTIL", location: "BADAJOZ", dropoutSecondCourse: 1.49, efficiencyRate: 94.48, dropoutThirdCourse: 1.49, successRate: 95.24, dropoutFirstCourse: 6.72, dropoutsThirdCourse: 2, progressNormalized: 1.0, dropoutsFirstCourse: 9, performanceRate: 93.51, cohortStudents: 134, dropoutsSecondCourse: 2, dropoutRate: 14.49, graduationRate: 65.94, academicYear: "2016-2017" },
    { degree: "GRADO EN EDUCACIÓN PRIMARIA", location: "BADAJOZ", dropoutSecondCourse: 2.91, efficiencyRate: 90.07, dropoutThirdCourse: 3.64, successRate: 90.46, dropoutFirstCourse: 13.09, dropoutsThirdCourse: 10, progressNormalized: 1.0, dropoutsFirstCourse: 36, performanceRate: 86.38, cohortStudents: 275, dropoutsSecondCourse: 8, dropoutRate: 21.05, graduationRate: 53.76, academicYear: "2016-2017" },
    { degree: "GRADO EN EDUCACIÓN INFANTIL", location: "BADAJOZ", dropoutSecondCourse: 0.0, efficiencyRate: 95.58, dropoutThirdCourse: 2.63, successRate: 95.52, dropoutFirstCourse: 3.51, dropoutsThirdCourse: 3, progressNormalized: 1.0, dropoutsFirstCourse: 4, performanceRate: 92.47, cohortStudents: 114, dropoutsSecondCourse: 0, dropoutRate: 7.52, graduationRate: 77.44, academicYear: "2018-2019" },
    { degree: "GRADO EN EDUCACIÓN PRIMARIA", location: "BADAJOZ", dropoutSecondCourse: 4.59, efficiencyRate: 91.53, dropoutThirdCourse: 2.0, successRate: 90.03, dropoutFirstCourse: 9.62, dropoutsThirdCourse: 5, progressNormalized: 1.0, dropoutsFirstCourse: 24, performanceRate: 84.75, cohortStudents: 250, dropoutsSecondCourse: 7, dropoutRate: 14.81, graduationRate: 65.19, academicYear: "2018-2019" },
    { degree: "GRADO EN INGENIERÍA ELECTRÓNICA Y AUTOMÁTICA (RAMA INDUSTRIAL)", location: "BADAJOZ", dropoutSecondCourse: 1.52, efficiencyRate: 76.01, dropoutThirdCourse: 4.55, successRate: 73.87, dropoutFirstCourse: 3.48, dropoutsThirdCourse: 3, progressNormalized: 0.68, dropoutsFirstCourse: 23, performanceRate: 61.13, cohortStudents: 66, dropoutsSecondCourse: 1, dropoutRate: 4.81, graduationRate: 15.19, academicYear: "2016-2017" },
    { degree: "GRADO EN INGENIERÍA ELECTRÓNICA Y AUTOMÁTICA (RAMA INDUSTRIAL)", location: "BADAJOZ", dropoutSecondCourse: 7.46, efficiencyRate: 80.39, dropoutThirdCourse: 1.49, successRate: 73.24, dropoutFirstCourse: 19.4, dropoutsThirdCourse: 1, progressNormalized: 0.79, dropoutsFirstCourse: 13, performanceRate: 63.01, cohortStudents: 67, dropoutsSecondCourse: 5, dropoutRate: 5.81, graduationRate: 12.5, academicYear: "2017-2018" },
    { degree: "GRADO EN INGENIERÍA ELECTRÓNICA Y AUTOMÁTICA (RAMA INDUSTRIAL)", location: "BADAJOZ", dropoutSecondCourse: 7.41, efficiencyRate: 81.79, dropoutThirdCourse: 3.7, successRate: 72.16, dropoutFirstCourse: 2.78, dropoutsThirdCourse: 2, progressNormalized: 1.0, dropoutsFirstCourse: 15, performanceRate: 61.29, cohortStudents: 54, dropoutsSecondCourse: 4, dropoutRate: 6.11, graduationRate: 13.5, academicYear: "2018-2019" },
    { degree: "GRADO EN ENFERMERÍA", location: "PLASENCIA", dropoutSecondCourse: 4.0, efficiencyRate: 98.77, dropoutThirdCourse: 0.0, successRate: 97.48, dropoutFirstCourse: 2.0, dropoutsThirdCourse: 0, progressNormalized: 0.99, dropoutsFirstCourse: 2, performanceRate: 96.58, cohortStudents: 100, dropoutsSecondCourse: 4, dropoutRate: 7.22, graduationRate: 87.63, academicYear: "2017-2018" },
    { degree: "GRADO EN EDUCACIÓN INFANTIL", location: "BADAJOZ", dropoutSecondCourse: 2.29, efficiencyRate: 94.07, dropoutThirdCourse: 7.63, successRate: 95.34, dropoutFirstCourse: 10.69, dropoutsThirdCourse: 1, progressNormalized: 0.94, dropoutsFirstCourse: 14, performanceRate: 93.0, cohortStudents: 131, dropoutsSecondCourse: 3, dropoutRate: 14.81, graduationRate: 73.33, academicYear: "2017-2018" },
    { degree: "GRADO EN EDUCACIÓN PRIMARIA", location: "BADAJOZ", dropoutSecondCourse: 4.03, efficiencyRate: 93.43, dropoutThirdCourse: 3.66, successRate: 91.1, dropoutFirstCourse: 5.86, dropoutsThirdCourse: 10, progressNormalized: 0.94, dropoutsFirstCourse: 16, performanceRate: 86.9, cohortStudents: 273, dropoutsSecondCourse: 11, dropoutRate: 12.04, graduationRate: 54.74, academicYear: "2017-2018" },
    { degree: "GRADO EN EDUCACIÓN INFANTIL", location: "BADAJOZ", dropoutSecondCourse: 1.49, efficiencyRate: 94.48, dropoutThirdCourse: 1.49, successRate: 95.24, dropoutFirstCourse: 6.72, dropoutsThirdCourse: 2, progressNormalized: 1.0, dropoutsFirstCourse: 9, performanceRate: 93.51, cohortStudents: 134, dropoutsSecondCourse: 2, dropoutRate: 14.49, graduationRate: 65.94, academicYear: "2016-2017" },
    { degree: "GRADO EN EDUCACIÓN PRIMARIA", location: "BADAJOZ", dropoutSecondCourse: 2.91, efficiencyRate: 90.07, dropoutThirdCourse: 3.64, successRate: 90.46, dropoutFirstCourse: 13.09, dropoutsThirdCourse: 10, progressNormalized: 1.0, dropoutsFirstCourse: 36, performanceRate: 86.38, cohortStudents: 275, dropoutsSecondCourse: 8, dropoutRate: 21.05, graduationRate: 53.76, academicYear: "2016-2017" },
    { degree: "GRADO EN EDUCACIÓN INFANTIL", location: "BADAJOZ", dropoutSecondCourse: 0.0, efficiencyRate: 95.58, dropoutThirdCourse: 2.63, successRate: 95.52, dropoutFirstCourse: 3.51, dropoutsThirdCourse: 3, progressNormalized: 1.0, dropoutsFirstCourse: 4, performanceRate: 92.47, cohortStudents: 114, dropoutsSecondCourse: 0, dropoutRate: 7.52, graduationRate: 77.44, academicYear: "2018-2019" },
    { degree: "GRADO EN EDUCACIÓN PRIMARIA", location: "BADAJOZ", dropoutSecondCourse: 4.59, efficiencyRate: 91.53, dropoutThirdCourse: 2.0, successRate: 90.03, dropoutFirstCourse: 9.62, dropoutsThirdCourse: 5, progressNormalized: 1.0, dropoutsFirstCourse: 24, performanceRate: 84.75, cohortStudents: 250, dropoutsSecondCourse: 7, dropoutRate: 14.81, graduationRate: 65.19, academicYear: "2018-2019" },
    { degree: "GRADO EN INGENIERÍA ELECTRÓNICA Y AUTOMÁTICA (RAMA INDUSTRIAL)", location: "BADAJOZ", dropoutSecondCourse: 1.52, efficiencyRate: 76.01, dropoutThirdCourse: 4.55, successRate: 73.87, dropoutFirstCourse: 3.48, dropoutsThirdCourse: 3, progressNormalized: 0.68, dropoutsFirstCourse: 23, performanceRate: 61.13, cohortStudents: 66, dropoutsSecondCourse: 1, dropoutRate: 4.81, graduationRate: 15.19, academicYear: "2016-2017" },
    { degree: "GRADO EN INGENIERÍA ELECTRÓNICA Y AUTOMÁTICA (RAMA INDUSTRIAL)", location: "BADAJOZ", dropoutSecondCourse: 7.46, efficiencyRate: 80.39, dropoutThirdCourse: 1.49, successRate: 73.24, dropoutFirstCourse: 19.4, dropoutsThirdCourse: 1, progressNormalized: 0.79, dropoutsFirstCourse: 13, performanceRate: 63.01, cohortStudents: 67, dropoutsSecondCourse: 5, dropoutRate: 5.81, graduationRate: 12.5, academicYear: "2017-2018" },
    { degree: "GRADO EN INGENIERÍA ELECTRÓNICA Y AUTOMÁTICA (RAMA INDUSTRIAL)", location: "BADAJOZ", dropoutSecondCourse: 7.41, efficiencyRate: 81.79, dropoutThirdCourse: 3.7, successRate: 72.16, dropoutFirstCourse: 2.78, dropoutsThirdCourse: 2, progressNormalized: 1.0, dropoutsFirstCourse: 15, performanceRate: 61.29, cohortStudents: 54, dropoutsSecondCourse: 4, dropoutRate: 6.11, graduationRate: 13.5, academicYear: "2018-2019" },
    { degree: "GRADO EN ENFERMERÍA", location: "PLASENCIA", dropoutSecondCourse: 4.0, efficiencyRate: 98.77, dropoutThirdCourse: 0.0, successRate: 97.48, dropoutFirstCourse: 2.0, dropoutsThirdCourse: 0, progressNormalized: 0.99, dropoutsFirstCourse: 2, performanceRate: 96.58, cohortStudents: 100, dropoutsSecondCourse: 4, dropoutRate: 7.22, graduationRate: 87.63, academicYear: "2017-2018" },
    { degree: "GRADO EN ENFERMERÍA", location: "PLASENCIA", dropoutSecondCourse: 1.0, efficiencyRate: 97.51, dropoutThirdCourse: 0.0, successRate: 97.79, dropoutFirstCourse: 5.0, dropoutsThirdCourse: 0, progressNormalized: 0.98, dropoutsFirstCourse: 5, performanceRate: 97.15, cohortStudents: 100, dropoutsSecondCourse: 1, dropoutRate: 8.91, graduationRate: 90.1, academicYear: "2016-2017" },
    { degree: "GRADO EN ENFERMERÍA", location: "PLASENCIA", dropoutSecondCourse: 9.09, efficiencyRate: 97.51, dropoutThirdCourse: 1.01, successRate: 96.98, dropoutFirstCourse: 10.1, dropoutsThirdCourse: 1, progressNormalized: 1.0, dropoutsFirstCourse: 1, performanceRate: 96.06, cohortStudents: 99, dropoutsSecondCourse: 9, dropoutRate: 10.0, graduationRate: 88.0, academicYear: "2018-2019" },
    { degree: "GRADO EN ADMINISTRACIÓN Y DIRECCIÓN DE EMPRESAS", location: "CÁCERES", dropoutSecondCourse: 5.08, efficiencyRate: 100.0, dropoutThirdCourse: 3.39, successRate: 83.76, dropoutFirstCourse: 11.86, dropoutsThirdCourse: 4, progressNormalized: 0.6, dropoutsFirstCourse: 14, performanceRate: 76.54, cohortStudents: 118, dropoutsSecondCourse: 6, dropoutRate: 11.76, graduationRate: 58.82, academicYear: "2016-2017" },
    { degree: "GRADO EN ADMINISTRACIÓN Y DIRECCIÓN DE EMPRESAS", location: "CÁCERES", dropoutSecondCourse: 6.15, efficiencyRate: 91.88, dropoutThirdCourse: 2.31, successRate: 82.51, dropoutFirstCourse: 20.77, dropoutsThirdCourse: 3, progressNormalized: 0.92, dropoutsFirstCourse: 27, performanceRate: 72.99, cohortStudents: 130, dropoutsSecondCourse: 8, dropoutRate: 21.17, graduationRate: 40.88, academicYear: "2017-2018" },
    { degree: "GRADO EN ADMINISTRACIÓN Y DIRECCIÓN DE EMPRESAS", location: "CÁCERES", dropoutSecondCourse: 3.68, efficiencyRate: 91.77, dropoutThirdCourse: 6.62, successRate: 84.81, dropoutFirstCourse: 16.18, dropoutsThirdCourse: 9, progressNormalized: 1.0, dropoutsFirstCourse: 22, performanceRate: 76.24, cohortStudents: 136, dropoutsSecondCourse: 5, dropoutRate: 17.74, graduationRate: 4.6, academicYear: "2018-2019" },
    { degree: "GRADO EN MEDICINA", location: "BADAJOZ", dropoutSecondCourse: 1.67, efficiencyRate: 94.86, dropoutThirdCourse: 0.0, successRate: 96.69, dropoutFirstCourse: 5.83, dropoutsThirdCourse: 0, progressNormalized: 0.93, dropoutsFirstCourse: 7, performanceRate: 94.55, cohortStudents: 120, dropoutsSecondCourse: 2, dropoutRate: 7.69, graduationRate: 86.01, academicYear: "2016-2017" },
    { degree: "GRADO EN MEDICINA", location: "BADAJOZ", dropoutSecondCourse: 1.67, efficiencyRate: 94.56, dropoutThirdCourse: 1.67, successRate: 96.72, dropoutFirstCourse: 8.33, dropoutsThirdCourse: 2, progressNormalized: 0.95, dropoutsFirstCourse: 1, performanceRate: 95.11, cohortStudents: 120, dropoutsSecondCourse: 2, dropoutRate: 5.0, graduationRate: 93.57, academicYear: "2017-2018" },
    { degree: "GRADO EN MEDICINA", location: "BADAJOZ", dropoutSecondCourse: 8.33, efficiencyRate: 96.18, dropoutThirdCourse: 8.33, successRate: 95.39, dropoutFirstCourse: 3.33, dropoutsThirdCourse: 1, progressNormalized: 1.0, dropoutsFirstCourse: 4, performanceRate: 93.04, cohortStudents: 120, dropoutsSecondCourse: 1, dropoutRate: 3.6, graduationRate: 94.24, academicYear: "2018-2019" },
    { degree: "GRADO EN DERECHO", location: "CÁCERES", dropoutSecondCourse: 6.48, efficiencyRate: 91.55, dropoutThirdCourse: 3.7, successRate: 82.3, dropoutFirstCourse: 14.81, dropoutsThirdCourse: 4, progressNormalized: 0.92, dropoutsFirstCourse: 16, performanceRate: 72.84, cohortStudents: 108, dropoutsSecondCourse: 7, dropoutRate: 14.43, graduationRate: 50.52, academicYear: "2017-2018" },
    { degree: "GRADO EN DERECHO", location: "CÁCERES", dropoutSecondCourse: 5.38, efficiencyRate: 100.0, dropoutThirdCourse: 5.38, successRate: 81.41, dropoutFirstCourse: 20.43, dropoutsThirdCourse: 5, progressNormalized: 0.76, dropoutsFirstCourse: 19, performanceRate: 74.11, cohortStudents: 93, dropoutsSecondCourse: 5, dropoutRate: 16.67, graduationRate: 4.57, academicYear: "2016-2017" },
    { degree: "GRADO EN DERECHO", location: "CÁCERES", dropoutSecondCourse: 5.5, efficiencyRate: 92.01, dropoutThirdCourse: 3.67, successRate: 79.86, dropoutFirstCourse: 15.6, dropoutsThirdCourse: 4, progressNormalized: 1.0, dropoutsFirstCourse: 17, performanceRate: 69.1, cohortStudents: 109, dropoutsSecondCourse: 6, dropoutRate: 10.89, graduationRate: 54.46, academicYear: "2018-2019" },
    { degree: "GRADO EN EDUCACIÓN SOCIAL", location: "CÁCERES", dropoutSecondCourse: 2.35, efficiencyRate: 97.34, dropoutThirdCourse: 0.0, successRate: 95.86, dropoutFirstCourse: 3.53, dropoutsThirdCourse: 0, progressNormalized: 1.0, dropoutsFirstCourse: 3, performanceRate: 95.0, cohortStudents: 85, dropoutsSecondCourse: 2, dropoutRate: 10.71, graduationRate: 78.57, academicYear: "2016-2017" },
    { degree: "GRADO EN EDUCACIÓN SOCIAL", location: "CÁCERES", dropoutSecondCourse: 1.19, efficiencyRate: 97.56, dropoutThirdCourse: 1.19, successRate: 97.24, dropoutFirstCourse: 3.57, dropoutsThirdCourse: 1, progressNormalized: 0.98, dropoutsFirstCourse: 3, performanceRate: 95.78, cohortStudents: 84, dropoutsSecondCourse: 1, dropoutRate: 8.43, graduationRate: 79.52, academicYear: "2017-2018" },
    { degree: "GRADO EN EDUCACIÓN SOCIAL", location: "CÁCERES", dropoutSecondCourse: 1.19, efficiencyRate: 96.44, dropoutThirdCourse: 2.38, successRate: 97.24, dropoutFirstCourse: 2.38, dropoutsThirdCourse: 2, progressNormalized: 1.0, dropoutsFirstCourse: 2, performanceRate: 95.59, cohortStudents: 84, dropoutsSecondCourse: 1, dropoutRate: 4.71, graduationRate: 90.59, academicYear: "2018-2019" },
    { degree: "GRADO EN ECONOMÍA", location: "BADAJOZ", dropoutSecondCourse: 10.0, efficiencyRate: 100.0, dropoutThirdCourse: 2.05, successRate: 83.49, dropoutFirstCourse: 25.0, dropoutsThirdCourse: 1, progressNormalized: 1.0, dropoutsFirstCourse: 10, performanceRate: 75.61, cohortStudents: 40, dropoutsSecondCourse: 4, dropoutRate: 1.89, graduationRate: 54.72, academicYear: "2016-2017" },
    { degree: "GRADO EN ECONOMÍA", location: "BADAJOZ", dropoutSecondCourse: 0.0, efficiencyRate: 93.25, dropoutThirdCourse: 3.03, successRate: 80.29, dropoutFirstCourse: 6.06, dropoutsThirdCourse: 1, progressNormalized: 0.93, dropoutsFirstCourse: 2, performanceRate: 73.56, cohortStudents: 33, dropoutsSecondCourse: 0, dropoutRate: 2.16, graduationRate: 54.05, academicYear: "2017-2018" },
    { degree: "GRADO EN ECONOMÍA", location: "BADAJOZ", dropoutSecondCourse: 5.56, efficiencyRate: 89.8, dropoutThirdCourse: 2.78, successRate: 81.6, dropoutFirstCourse: 2.22, dropoutsThirdCourse: 1, progressNormalized: 1.0, dropoutsFirstCourse: 8, performanceRate: 72.29, cohortStudents: 36, dropoutsSecondCourse: 2, dropoutRate: 3.61, graduationRate: 38.89, academicYear: "2018-2019" },
    { degree: "GRADO EN PODOLOGÍA", location: "PLASENCIA", dropoutSecondCourse: 7.19, efficiencyRate: 95.47, dropoutThirdCourse: 0.0, successRate: 95.95, dropoutFirstCourse: 1.08, dropoutsThirdCourse: 0, progressNormalized: 1.0, dropoutsFirstCourse: 5, performanceRate: 95.29, cohortStudents: 64, dropoutsSecondCourse: 5, dropoutRate: 1.27, graduationRate: 76.19, academicYear: "2018-2019" },
    { degree: "GRADO EN PODOLOGÍA", location: "PLASENCIA", dropoutSecondCourse: 0.0, efficiencyRate: 90.28, dropoutThirdCourse: 1.54, successRate: 96.6, dropoutFirstCourse: 7.69, dropoutsThirdCourse: 1, progressNormalized: 0.9, dropoutsFirstCourse: 5, performanceRate: 96.37, cohortStudents: 65, dropoutsSecondCourse: 0, dropoutRate: 1.9, graduationRate: 77.78, academicYear: "2016-2017" },
    { degree: "GRADO EN PODOLOGÍA", location: "PLASENCIA", dropoutSecondCourse: 4.62, efficiencyRate: 95.94, dropoutThirdCourse: 1.54, successRate: 95.84, dropoutFirstCourse: 1.08, dropoutsThirdCourse: 1, progressNormalized: 0.96, dropoutsFirstCourse: 7, performanceRate: 94.25, cohortStudents: 65, dropoutsSecondCourse: 3, dropoutRate: 4.68, graduationRate: 92.19, academicYear: "2017-2018" },
    { degree: "GRADO EN EDUCACIÓN INFANTIL", location: "CÁCERES", dropoutFirstCourse: 8.33, efficiencyRate: 97.98, dropoutSecondCourse: 1.52, successRate: 94.43, dropoutThirdCourse: 5.30, dropoutsThirdCourse: 2, progressNormalized: 0.98, dropoutsFirstCourse: 7, performanceRate: 91.85, cohortStudents: 132, dropoutsSecondCourse: 11, dropoutRate: 5.84, graduationRate: 83.21, academicYear: "2017-2018" },
    { degree: "GRADO EN EDUCACIÓN PRIMARIA", location: "CÁCERES", dropoutFirstCourse: 3.68, efficiencyRate: 96.66, dropoutSecondCourse: 1.05, successRate: 92.42, dropoutThirdCourse: 5.88, dropoutsThirdCourse: 17, progressNormalized: 0.94, dropoutsFirstCourse: 8, performanceRate: 87.53, cohortStudents: 136, dropoutsSecondCourse: 5, dropoutRate: 2.69, graduationRate: 54.81, academicYear: "2017-2018" },
    { degree: "GRADO EN EDUCACIÓN INFANTIL", location: "CÁCERES", dropoutFirstCourse: 3.62, efficiencyRate: 100.00, dropoutSecondCourse: 2.90, successRate: 96.45, dropoutThirdCourse: 5.07, dropoutsThirdCourse: 4, progressNormalized: 0.98, dropoutsFirstCourse: 7, performanceRate: 94.70, cohortStudents: 138, dropoutsSecondCourse: 5, dropoutRate: 1.04, graduationRate: 80.74, academicYear: "2016-2017" },
    { degree: "GRADO EN EDUCACIÓN PRIMARIA", location: "CÁCERES", dropoutFirstCourse: 2.16, efficiencyRate: 96.45, dropoutSecondCourse: 1.29, successRate: 93.19, dropoutThirdCourse: 7.91, dropoutsThirdCourse: 18, progressNormalized: 1.00, dropoutsFirstCourse: 11, performanceRate: 89.56, cohortStudents: 139, dropoutsSecondCourse: 3, dropoutRate: 1.83, graduationRate: 61.88, academicYear: "2016-2017" },
    { degree: "GRADO EN EDUCACIÓN INFANTIL", location: "CÁCERES", dropoutFirstCourse: 3.08, efficiencyRate: 97.39, dropoutSecondCourse: 0.00, successRate: 95.04, dropoutThirdCourse: 5.38, dropoutsThirdCourse: 0, progressNormalized: 1.00, dropoutsFirstCourse: 7, performanceRate: 92.61, cohortStudents: 130, dropoutsSecondCourse: 4, dropoutRate: 7.91, graduationRate: 82.01, academicYear: "2018-2019" },
    { degree: "GRADO EN EDUCACIÓN PRIMARIA", location: "CÁCERES", dropoutFirstCourse: 2.99, efficiencyRate: 92.79, dropoutSecondCourse: 4.48, successRate: 93.13, dropoutThirdCourse: 4.48, dropoutsThirdCourse: 6, progressNormalized: 1.00, dropoutsFirstCourse: 6, performanceRate: 89.32, cohortStudents: 134, dropoutsSecondCourse: 4, dropoutRate: 2.48, graduationRate: 54.37, academicYear: "2018-2019" },
    { degree: "GRADO EN VETERINARIA", location: "CÁCERES", dropoutFirstCourse: 3.03, efficiencyRate: 84.61, dropoutSecondCourse: 3.03, successRate: 87.24, dropoutThirdCourse: 3.03, dropoutsThirdCourse: 3, progressNormalized: 0.80, dropoutsFirstCourse: 3, performanceRate: 81.96, cohortStudents: 99, dropoutsSecondCourse: 3, dropoutRate: 7.84, graduationRate: 54.90, academicYear: "2016-2017" },
    { degree: "GRADO EN VETERINARIA", location: "CÁCERES", dropoutFirstCourse: 3.30, efficiencyRate: 86.69, dropoutSecondCourse: 1.10, successRate: 85.66, dropoutThirdCourse: 3.30, dropoutsThirdCourse: 1, progressNormalized: 0.87, dropoutsFirstCourse: 3, performanceRate: 79.17, cohortStudents: 91, dropoutsSecondCourse: 3, dropoutRate: 12.37, graduationRate: 60.82, academicYear: "2017-2018" },
    { degree: "GRADO EN VETERINARIA", location: "CÁCERES", dropoutFirstCourse: 0.00, efficiencyRate: 86.04, dropoutSecondCourse: 2.00, successRate: 83.98, dropoutThirdCourse: 3.00, dropoutsThirdCourse: 2, progressNormalized: 1.00, dropoutsFirstCourse: 3, performanceRate: 76.11, cohortStudents: 100, dropoutsSecondCourse: 0, dropoutRate: 8.16, graduationRate: 65.31, academicYear: "2018-2019" },
    { degree: "GRADO EN COMUNICACIÓN AUDIOVISUAL", location: "BADAJOZ", dropoutFirstCourse: 2.99, efficiencyRate: 91.74, dropoutSecondCourse: 2.99, successRate: 94.11, dropoutThirdCourse: 1.19, dropoutsThirdCourse: 2, progressNormalized: 0.92, dropoutsFirstCourse: 8, performanceRate: 89.58, cohortStudents: 67, dropoutsSecondCourse: 2, dropoutRate: 1.46, graduationRate: 59.76, academicYear: "2017-2018" },
    { degree: "GRADO EN COMUNICACIÓN AUDIOVISUAL", location: "BADAJOZ", dropoutFirstCourse: 4.69, efficiencyRate: 92.20, dropoutSecondCourse: 0.00, successRate: 92.37, dropoutThirdCourse: 15.79, dropoutsThirdCourse: 0, progressNormalized: 0.88, dropoutsFirstCourse: 5, performanceRate: 90.31, cohortStudents: 64, dropoutsSecondCourse: 3, dropoutRate: 2.21, graduationRate: 50.65, academicYear: "2016-2017" },
    { degree: "GRADO EN COMUNICACIÓN AUDIOVISUAL", location: "BADAJOZ", dropoutFirstCourse: 3.51, efficiencyRate: 93.05, dropoutSecondCourse: 1.75, successRate: 92.67, dropoutThirdCourse: 12.28, dropoutsThirdCourse: 1, progressNormalized: 1.00, dropoutsFirstCourse: 7, performanceRate: 87.58, cohortStudents: 57, dropoutsSecondCourse: 2, dropoutRate: 1.04, graduationRate: 72.73, academicYear: "2018-2019" },
    { degree: "GRADO EN INGENIERÍA INFORMÁTICA EN TECNOLOGÍAS DE LA INFORMACIÓN", location: "MÉRIDA", dropoutFirstCourse: 21.05, efficiencyRate: 100.00, dropoutSecondCourse: 5.26, successRate: 73.38, dropoutThirdCourse: 4.74, dropoutsThirdCourse: 1, progressNormalized: 1.00, dropoutsFirstCourse: 9, performanceRate: 57.12, cohortStudents: 19, dropoutsSecondCourse: 4, dropoutRate: 4.55, graduationRate: 90.91, academicYear: "2016-2017" },
    { degree: "GRADO EN INGENIERÍA INFORMÁTICA EN TECNOLOGÍAS DE LA INFORMACIÓN", location: "MÉRIDA", dropoutFirstCourse: 10.00, efficiencyRate: 87.27, dropoutSecondCourse: 10.00, successRate: 78.84, dropoutThirdCourse: 3.67, dropoutsThirdCourse: 3, progressNormalized: 0.87, dropoutsFirstCourse: 11, performanceRate: 62.37, cohortStudents: 30, dropoutsSecondCourse: 3, dropoutRate: 48.15, graduationRate: 14.81, academicYear: "2017-2018" },
    { degree: "GRADO EN INGENIERÍA INFORMÁTICA EN TECNOLOGÍAS DE LA INFORMACIÓN", location: "MÉRIDA", dropoutFirstCourse: 19.05, efficiencyRate: 97.56, dropoutSecondCourse: 4.76, successRate: 78.87, dropoutThirdCourse: 33.33, dropoutsThirdCourse: 1, progressNormalized: 1.00, dropoutsFirstCourse: 7, performanceRate: 66.14, cohortStudents: 21, dropoutsSecondCourse: 4, dropoutRate: 51.72, graduationRate: 20.69, academicYear: "2018-2019" },
    { degree: "GRADO EN INGENIERÍA INFORMÁTICA EN INGENIERÍA DE COMPUTADORES", location: "MÉRIDA", dropoutFirstCourse: 9.72, efficiencyRate: 78.99, dropoutSecondCourse: 0.00, successRate: 61.19, dropoutThirdCourse: 51.39, dropoutsThirdCourse: 0, progressNormalized: 0.79, dropoutsFirstCourse: 37, performanceRate: 46.13, cohortStudents: 72, dropoutsSecondCourse: 7, dropoutRate: 54.90, graduationRate: 13.73, academicYear: "2017-2018" },
    { degree: "GRADO EN INGENIERÍA INFORMÁTICA EN INGENIERÍA DEL SOFTWARE", location: "MÉRIDA", dropoutFirstCourse: 10.00, efficiencyRate: 83.76, dropoutSecondCourse: 6.25, successRate: 78.21, dropoutThirdCourse: 17.54, dropoutsThirdCourse: 5, progressNormalized: 0.84, dropoutsFirstCourse: 14, performanceRate: 65.95, cohortStudents: 80, dropoutsSecondCourse: 8, dropoutRate: 42.31, graduationRate: 23.08, academicYear: "2017-2018" },
    { degree: "GRADO EN INGENIERÍA INFORMÁTICA EN INGENIERÍA DE COMPUTADORES", location: "MÉRIDA", dropoutFirstCourse: 15.07, efficiencyRate: 87.57, dropoutSecondCourse: 5.48, successRate: 65.20, dropoutThirdCourse: 35.62, dropoutsThirdCourse: 4, progressNormalized: 1.00, dropoutsFirstCourse: 26, performanceRate: 50.72, cohortStudents: 73, dropoutsSecondCourse: 11, dropoutRate: 64.10, graduationRate: 12.82, academicYear: "2016-2017" },
    { degree: "GRADO EN INGENIERÍA INFORMÁTICA EN INGENIERÍA DEL SOFTWARE", location: "MÉRIDA", dropoutFirstCourse: 10.26, efficiencyRate: 84.62, dropoutSecondCourse: 6.41, successRate: 79.95, dropoutThirdCourse: 20.51, dropoutsThirdCourse: 5, progressNormalized: 1.00, dropoutsFirstCourse: 16, performanceRate: 68.53, cohortStudents: 78, dropoutsSecondCourse: 8, dropoutRate: 36.49, graduationRate: 33.78, academicYear: "2016-2017" },
    { degree: "GRADO EN INGENIERÍA INFORMÁTICA EN INGENIERÍA DE COMPUTADORES", location: "MÉRIDA", dropoutFirstCourse: 15.38, efficiencyRate: 76.76, dropoutSecondCourse: 6.41, successRate: 66.34, dropoutThirdCourse: 46.15, dropoutsThirdCourse: 5, progressNormalized: 1.00, dropoutsFirstCourse: 36, performanceRate: 48.12, cohortStudents: 78, dropoutsSecondCourse: 12, dropoutRate: 61.84, graduationRate: 92.11, academicYear: "2018-2019" },
        
    ];

    const university_demands = [ 
        { ciudad: "Almendralejo", grado: "Educación Infantil", over45: 1, spanishFirst: 5, foreigners: 1, graduated: 5, academicYear: "2016-2017" },
        { ciudad: "Almendralejo", grado: "Educación Primaria", over45: 7, spanishFirst: 5, foreigners: 7, graduated: 5, academicYear: "2016-2017" },
        { ciudad: "Mérida", grado: "Enfermería", over45: 5, spanishFirst: 57, foreigners: null, graduated: 8, academicYear: "2016-2017" },
        { ciudad: "Badajoz", grado: "Educación Infantil", over45: 13, spanishFirst: 5, foreigners: 13, graduated: 5, academicYear: "2016-2017" },
        { ciudad: "Badajoz", grado: "Educación Primaria", over45: 117, spanishFirst: 5.01, foreigners: 158, graduated: 297, academicYear: "2016-2017" },
        { ciudad: "Badajoz", grado: "Ingeniería Electrónica y Automática", over45: 57, spanishFirst: 5, foreigners: 9, graduated: 65, academicYear: "2016-2017" },
        { ciudad: "Plasencia", grado: "Enfermería", over45: 5.75, spanishFirst: 98, foreigners: null, graduated: 7.8, academicYear: "2016-2017" },
        { ciudad: "Cáceres", grado: "Administración y Dirección de Empresas", over45: 67, spanishFirst: 6, foreigners: 78, graduated: 5, academicYear: "2016-2017" },
        { ciudad: "Badajoz", grado: "Medicina", over45: 33, spanishFirst: 8, foreigners: 82, graduated: 113, academicYear: "2016-2017" },  
        { ciudad: "Cáceres", grado: "Grado en Derecho", over45: 6.75, spanishFirst: 105, foreigners: 1, graduated: 8.98, academicYear: "2016-2017" },
        { ciudad: "Cáceres", grado: "Grado en Educación Social", over45: 12, spanishFirst: null, foreigners: 73, graduated: 87, academicYear: "2016-2017" },
        { ciudad: "Badajoz", grado: "Grado en Economía", over45: 24, spanishFirst: null, foreigners: 16, graduated: 42, academicYear: "2016-2017" },
        { ciudad: "Plasencia", grado: "Grado en Podología", over45: 23, spanishFirst: null, foreigners: 42, graduated: 66, academicYear: "2016-2017" },
        { ciudad: "Cáceres", grado: "Grado en Educación Infantil", over45: 15, spanishFirst: 6, foreigners: 123, graduated: 137, academicYear: "2016-2017" },
        { ciudad: "Cáceres", grado: "Grado en Educación Primaria", over45: 68, spanishFirst: null, foreigners: 71, graduated: 140, academicYear: "2016-2017" }        
    ];
    

const students_satisfaction = [
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


//En express siempre se pone "/" que es la ruta y la segunda opcion es el callback

app.use("/",express.static("./public/index.html")); //Esto es para que ponga el html  ya que coje la carpeta static 

app.use("/about",express.static("./public/Readme.html")); //Esto es para que ponga el html  ya que coje la carpeta static

app.use("/samples/JGP",express.static("./samples/JGP.js")); //Esto es para que ponga el html  ya que coje la carpeta static

app.get("/", (request,response)=>{
    response.send("Hello from the server, the sos2425-17 team greets you");
}) //Esto es para que cuando entres al localhost:16078 te lleve a una pagina que tenga un mensaje Hello from the server

app.get("/cool", (request,response)=>{
    response.send(cool());
}) //Esto es para que cuando entres al localhost:16078 te lleve a una pagina que tenga un mensaje Hello from the server


app.get("/samples/JGP", (req, res) => {
    const ciudadFiltrada = "Badajoz";
    const datosFiltrados = university_demands.filter(dato => dato.ciudad === ciudadFiltrada);
    const media = datosFiltrados.reduce((acc, curr) => acc + (curr.general || 0), 0) / datosFiltrados.length;
    
    res.json({ ciudad: ciudadFiltrada, mediaGeneral: media.toFixed(2) });
});

app.get("/samples/AGP", (req, res) => {
const carreraFiltro = "GRADO EN EDUCACIÓN INFANTIL";
const datosFiltrados = students_satisfaction.filter(d => d.carrera === carreraFiltro);
const mediaSatisfaccion = datosFiltrados.reduce((acc, d) => acc + d.satisfaccion_total, 0) / datosFiltrados.length;

res.json(`La satisfacción media en ${carreraFiltro} es: ${mediaSatisfaccion.toFixed(2)}`);
});


app.get("/samples/PAB", (req, res) => {
    const categoriaFiltro = "GRADO EN EDUCACIÓN INFANTIL";
    const datosFiltrados = university_academic_performance.filter(item => item.degree === categoriaFiltro);

    const sumaEficiencia = datosFiltrados.reduce((acumulador, item) => acumulador + item.efficiencyRate, 0);
    const mediaEficiencia = datosFiltrados.length > 0 ? sumaEficiencia / datosFiltrados.length : 0;

    res.json({ mensaje: `La media de eficiencia para la categoría '${categoriaFiltro}' es: ${mediaEficiencia.toFixed(2)}%` });
});

app.listen(Port,()=>{
    console.log(`Server Running on Port ${Port}`);
}); //Esto es para usar el framework en ese puerto (poner un puerto alto)

        
//API JAVIER 

// https://sos2425-XX.onrender.com/api/v1/FFFFF

//Obtener todos los registros con filtros

app.get(BASE_API + "/university-demands", (request,response)=>{ //El como buscas la api en la url y seria BASE_API + /contacts
    //para que sea /api/v1/university-demands
        console.log("New get to /university-demands")
        response.send(JSON.stringify(university_demands,null,2)); //Te responde con los contactos convertidos a JSON
        //Lo de null y 2 es para que quede mas bonito . 2 es el numero de espacios por tabulador y el null es para que no haga callbaks


    });

// Obtener registros por año y ciudad
app.get(BASE_API + "/university-demands/:grado/:ciudad/:academicYear", (req,response)=>{ //El como buscas la api en la url y seria BASE_API + /contacts
    //para que sea /api/v1/contacts
        console.log("New get to /university-demands/:grado/:ciudad/:academicYear")
        const grado= req.params.grado
        const ciudad = req.params.ciudad;
        const academicYear = req.params.academicYear
// Filtramos los datos según los parámetros recibidos
    const filteredData = university_demands.filter(item =>item.grado === grado &&item.ciudad === ciudad &&item.academicYear === academicYear);

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

//POST JAVIER 

//El post es para meter nuevos datos a la api 
app.post(BASE_API+"/university-demands",(request,response)=>{ //Para hacer un post necesitamos postman
    
    console.log("POST to /university-demands");
    console.log(`<${request.body}>`);

    const body = request.body

    let newUniversityDemand = request.body; //Creo una variable donde guardo el nuevo contacto y para ello hago request.body porque 
    //en postman se esqcribe en body y haces request.body para que te coja el codigo de body de postman

    //ciudad,grado,over45,spanishFirst,foreigners,graduated,academicYear

    //Si existe algun campo que no se ha rellenado , mostrar error 
    if (!body.ciudad || !body.grado || !body.over45 || !body.spanishFirst || !body.foreigners || !body.graduated || !body.academicYear) {
        return response.status(400).json({ error: "Missing required fields" });
    }

    //Si esos campos son iguales que los nuevos que pones sale error 
    if (university_demands.find(d => d.academicYear === body.academicYear && d.ciudad === body.ciudad && d.grado === body.grado)) {
        return response.status(409).json({ error: "Record already exists" });
    }
    
    university_demands.push(newUniversityDemand); //Para enviar los datos 

    response.sendStatus(201); //Para que la persona vea que esos datos se han enviado . Esto siempre se hace con el sendStatus
});

// Modificar un registro existente
app.put(BASE_API + "/university-demands/:academicYear/:ciudad", (req, res) => {
    const academicYear = parseInt(req.params.academicYear);
    const ciudad = req.params.ciudad;
    const index = university_demands.findIndex(d => d.academicYear === academicYear && d.ciudad === ciudad);
    if (index === -1) return res.status(404).json({ error: "Record not found" });
    if (req.body.academicYear !== academicYear || req.body.ciudad !== ciudad) {
        return res.status(400).json({ error: "AcademicYear and city in body must match URL parameters" });
    }
    university_demands[index] = { ...university_demands[index], ...req.body };
    res.status(200).json({ message: "Record updated successfully" });
});
//FALLO DE PUT a todos los datos
app.put(BASE_API + "/university-demands/:ciudad",(req,res)=>{    
    
    res.sendStatus(405);
});

// Eliminar un registro existente
app.delete(BASE_API + "/university-demands/:academicYear/:ciudad", (req, res) => {
    const academicYear = parseInt(req.params.academicYear);
    const ciudad = req.params.ciudad;
    const index = university_demands.findIndex(d => d.academicYear === academicYear && d.ciudad === ciudad);
    if (index === -1) return res.status(404).json({ error: "Record not found" });
    registrationsData.splice(index, 1);
    res.status(200).json({ message: "Record deleted successfully" });
});


//API ALEJANDRO 

app.get(BASE_API+"/students_satisfaction", (request,response)=>{
    console.log("New GET to /students_satisfaction");
    response.send(JSON.stringify(students_satisfaction))
});

let myNullArray=[]
app.get(BASE_API+"/students_satisfaction/loadInitialData",(request,response)=>{
    if (myNullArray.length ===0){
        myNullArray.push(...students_satisfaction) // Los puntos suspensivos sirven para añadirlos de 1 en 1
    }
        
        response.send(JSON.stringify(myNullArray));

})
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//POST

app.post(BASE_API+"/students_satisfaction",(request,response)=>{ //Para hacer un post necesitamos postman

    console.log("POST to /students_satisfaction");
    console.log(`<${request.body}>`);

    let newstudents_satisfaction = request.body; //Creo una variable donde guardo el nuevo contacto y para ello hago request.body porque 
    //en postman se esqcribe en body y haces request.body para que te coja el codigo de body de postman
    const body = request.body;

    if (!body.satisfaccion_total || !body.sat_estudiantes|| !body.satisfaccion_pdi || !body.carrera || !body.ciudad ) {
        return response.status(400).json({ error: "Missing required fields" });
    }
    if (students_satisfaction.find(d => d.satisfaccion_total === body.satisfaccion_total && d.carrera === body.carrera && d.ciudad==body.ciudad)) {
        return response.status(409).json({ error: "Record already exists" });
    }

    students_satisfaction.push(newstudents_satisfaction); //Para enviar los datos 

    response.sendStatus(201); //Para que la persona vea que esos datos se han enviado . Esto siempre se hace con el sendStatus
});
app.put(BASE_API + "/students_satisfaction/:carrera/:ciudad", (req, res) => {
    const { carrera, ciudad } = req.params;
    const index = students_satisfaction.findIndex(d => d.carrera === carrera && d.ciudad === ciudad);

    if (index === -1) {
        return res.status(404).json({ error: "Registro no encontrado" });
    }

    // Validar que carrera y ciudad en el body coincidan con los de la URL
    if (req.body.carrera !== carrera || req.body.ciudad !== ciudad) {
        return res.status(400).json({ error: "Carrera y ciudad en el body deben coincidir con los parámetros de la URL" });
    }

    // Actualizar datos del registro
    students_satisfaction[index] = { ...students_satisfaction[index], ...req.body };

    res.status(200).json({ message: "Registro actualizado correctamente" });
});


app.delete(BASE_API + "/students_satisfaction/:carrera/:ciudad", (req, res) => {
    const { carrera, ciudad } = req.params;
    const index = students_satisfaction.findIndex(d => d.carrera === carrera && d.ciudad === ciudad);

    if (index === -1) {
        return res.status(404).json({ error: "Registro no encontrado" });
    }

    students_satisfaction.splice(index, 1);

    res.status(200).json({ message: "Registro eliminado correctamente" });
})
//API PABLO

let  myNullArrayUniversityAcademicPerformance=[]





app.get(BASE_API + "/university-academic-performance", (request,response)=>{ //El como buscas la api en la url y seria BASE_API + /contacts
    //para que sea /api/v1/contacts
        console.log("New get to /university-academic-performance")
        response.send(JSON.stringify(myNullArrayUniversityAcademicPerformance,null,2)); //Te responde con los contactos convertidos a JSON
        //Lo de null y 2 es para que quede mas bonito . 2 es el numero de espacios por tabulador y el null es para que no haga callbaks


    });

    app.get(BASE_API + "/university-academic-performance/:degree/:location/:academicYear", (req,response)=>{ //El como buscas la api en la url y seria BASE_API + /contacts
        //para que sea /api/v1/contacts
            console.log("New get to /university-academic-performance/:degree/:location/:academicYear")
            const degree= req.params.degree
            const location = req.params.location;
            const academicYear = req.params.academicYear
    // Filtramos los datos según los parámetros recibidos
        const filteredData = myNullArrayUniversityAcademicPerformance.filter(item =>item.degree === degree &&item.location === location &&item.academicYear === academicYear);

    if (filteredData.length === 0) {
        return response.status(404).json({ error: "No data found for the given parameters" });
    }

    // Enviamos los datos filtrados en formato JSON
    response.send(JSON.stringify(filteredData))
    
        });



app.get(BASE_API+"/university-academic-performance/loadInitialData",(request,response)=>{
    if (myNullArrayUniversityAcademicPerformance.length ===0){
        myNullArrayUniversityAcademicPerformance.push(...university_academic_performance) // Los puntos suspensivos sirven para añadirlos de 1 en 1
    }
        
        response.send(JSON.stringify(myNullArrayUniversityAcademicPerformance));

        response.sendStatus(201);











})

//POST PABLO
/*degree: "GRADO EN EDUCACIÓN INFANTIL", location: "ALMENDRALEJO", dropoutSecondCourse: 0.0, efficiencyRate: 96.58, dropoutThirdCourse: 0.0, successRate: 99.39, dropoutFirstCourse: 3.33, dropoutsThirdCourse: 0, progressNormalized: 1.0, dropoutsFirstCourse: 3, performanceRate: 97.32, cohortStudents: 9, dropoutsSecondCourse: 0, dropoutRate: 28.57, graduationRate: 50.0, academicYear: "2016-2017"*/
app.post(BASE_API+"/university-academic-performance",(request,response)=>{
    
    console.log("POST to /university-academic-performance");
    console.log(`<${request.body}>`);

    const body = request.body

    let newUniversityAcademicPerformance = request.body; //Creo una variable donde guardo el nuevo contacto y para ello hago request.body porque 
    //en postman se escribe en body y haces request.body para que te coja el codigo de body de postman
    
    //Si existe algun campo que no se ha rellenado , mostrar error 
    if ([body.degree, body.location, body.dropoutFirstCourse, body.efficiencyRate, body.dropoutSecondCourse, body.successRate, body.dropoutThirdCourse, body.dropoutsThirdCourse, body.progressNormalized, body.dropoutsFirstCourse, body.performanceRate, body.cohortStudents, body.dropoutsSecondCourse, body.dropoutRate, body.graduationRate, body.academicYear]
        .some(value => value === undefined || value === null || value === "")) {        
        return response.status(400).json({ error: "Missing required fields" });
    }

    //Si esos campos son iguales que los nuevos que pones sale error 
    // if (university_academic_performance.find(u => u.degree  === body.degree  && u.location === body.location && u.dropoutSecondCourse === body.dropoutSecondCourse && u.efficiencyRate=== body.efficiencyRate && u.dropoutFirstCourse === body.dropoutFirstCourse && u.dropoutsThirdCourse  === body.dropoutsThirdCourse  && u.successRate === body.successRate && u.dropoutFirstCourse === body.dropoutFirstCourse && u.dropoutsThirdCourse === body.dropoutsThirdCourse && u.progressNormalized === body.progressNormalized && u.dropoutsFirstCourse === body.dropoutsFirstCourse && u.performanceRate === body.performanceRate &&u.cohortStudents === body.cohortStudents && u.dropoutsSecondCourse === body.dropoutsSecondCourse &&u.dropoutRate === body.dropoutRate && u.graduationRate === body.graduationRate && u.academicYear === body.academicYear)) {

    if (myNullArrayUniversityAcademicPerformance.find(u => u.degree  === body.degree  &&  u.academicYear === body.academicYear &&  u.location  === body.location)) {
        return response.status(409).json({ error: "Record already exists" });
    }
    
    myNullArrayUniversityAcademicPerformance.push(newUniversityAcademicPerformance); //Para enviar los datos 

    response.sendStatus(201); //Para que la persona vea que esos datos se han enviado . Esto siempre se hace con el sendStatus
});

// Modificar un registro existente
app.put(BASE_API + "/university-academic-performance/:degree/:location/:academicYear", (req, res) => {
    const degree= req.params.degree
    const location = req.params.location;
    const academicYear = req.params.academicYear;
    
    
    const index = myNullArrayUniversityAcademicPerformance.findIndex(d => d.degree === degree && d.location === location && d.academicYear === academicYear);
    if (index === -1) return res.status(404).json({ error: "Record not found" });
    if (req.body.degree !== degree || req.body.location !==location || req.body.academicYear !==academicYear) {
        return res.status(400).json({ error: "degree, location and academicYear in body must match URL parameters" });
    }
    myNullArrayUniversityAcademicPerformance[index] = { ...myNullArrayUniversityAcademicPerformance[index], ...req.body };
    res.status(200).json({ message: "Record updated successfully" });
});





//FALLO DE PUT a todos los datos
app.put(BASE_API + "/university-academic-performance",(req,res)=>{    
    
    res.sendStatus(405);
});


// Eliminar todos los registros
app.delete(BASE_API + "/university-academic-performance", (req, res) => {
    console.log("DELETE request received");

    myNullArrayUniversityAcademicPerformance = [];
    
    res.status(200).json({ message: "All records deleted successfully" });
});




// Eliminar un registro existente
app.delete(BASE_API + "/university-academic-performance/:degree/:location/:academicYear", (req, res) => {
    const degree= req.params.degree
    const location = req.params.location;
    const academicYear = req.params.academicYear


    const index = myNullArrayUniversityAcademicPerformance.findIndex(d => d.degree === degree && d.location === location && d.academicYear === academicYear);
    if (index === -1) return res.status(404).json({ error: "Record not found" });
    myNullArrayUniversityAcademicPerformance.splice(index, 1);
    res.status(200).json({ message: "Record deleted successfully" });
});


