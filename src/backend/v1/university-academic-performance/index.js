    //API PABLO


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
    { degree: "GRADO EN INGENIERÍA INFORMÁTICA EN INGENIERÍA DEL SOFTWARE", location: "MÉRIDA", dropoutFirstCourse: 10.26, efficiencyRate: 84.62, dropoutSecondCourse: 6.41, successRate: 79.95, dropoutThirdCourse: 20.51, dropoutsThirdCourse: 5, progressNormalized: 1.00, dropoutsFirstCourse: 16, performanceRate: 68.53, cohortStudents: 78, dropoutsSecondCourse: 8, dropoutRate: 36.49, graduationRate: 33.78, academicYear: "2018-2019" },
    ];

    const BASE_API = "/api/v1";
    let university_academic_performance_db = new dataStore(); 
    import dataStore from "nedb";



    function loadBackendPabloV1(app){
        
    
        //GET TODO
        app.get(BASE_API + "/university-academic-performance", (request, response) => {
            console.log("--------------------------------------------------------------------")
            const url = `/university-academic-performance?${new URLSearchParams(request.query).toString()}`;
            console.log("NEW GET ", url);
            
            let {
                degree, location, dropoutFirstCourse, efficiencyRate,dropoutSecondCourse, successRate, dropoutThirdCourse, dropoutsThirdCourse, progressNormalized, dropoutsFirstCourse, performanceRate, cohortStudents, dropoutsSecondCourse, dropoutRate, graduationRate, academicYear
               } = request.query
        
            let query = {};
        
            if (degree !== undefined) query.degree = new RegExp("^" + degree + "$", "i");
            if (location !== undefined) query.location = new RegExp("^" + location + "$", "i");
            if (academicYear !== undefined) query.academicYear = academicYear;
            if (dropoutRate !== undefined) query.dropoutRate = Number(dropoutRate);
            if (dropoutFirstCourse !== undefined) query.dropoutFirstCourse = Number(dropoutFirstCourse);
            if (dropoutsFirstCourse !== undefined) query.dropoutsFirstCourse = Number(dropoutsFirstCourse);
            if (dropoutSecondCourse !== undefined) query.dropoutSecondCourse = Number(dropoutSecondCourse);
            if (dropoutsSecondCourse !== undefined) query.dropoutsSecondCourse = Number(dropoutsSecondCourse);
            if (dropoutThirdCourse !== undefined) query.dropoutThirdCourse = Number(dropoutThirdCourse);
            if (dropoutsThirdCourse !== undefined) query.dropoutsThirdCourse = Number(dropoutsThirdCourse);
            if (efficiencyRate !== undefined) query.efficiencyRate = Number(efficiencyRate);
            if (successRate !== undefined) query.successRate = Number(successRate);
            if (performanceRate !== undefined) query.performanceRate = Number(performanceRate);
            if (progressNormalized !== undefined) query.progressNormalized = Number(progressNormalized);
            if (graduationRate !== undefined) query.graduationRate = Number(graduationRate);
            if (cohortStudents !== undefined) query.cohortStudents = Number(cohortStudents);
        
            university_academic_performance_db.find(query).exec((err, data) => {
                if (err) {
                    return response.status(500).json({ error: "Database error" });
                }
                const cleaned = data.map(({ _id, ...rest }) => rest);
        
                return response.status(200).json(cleaned);
            });
        });
        


        // GET uno en concreto

        
        app.get(BASE_API + "/university-academic-performance/:degree/:location/:academicYear", (request, response) => {
            console.log("--------------------------------------------------------------------")
            console.log("NEW GET /university-academic-performance/:degree/:location/:academicYear");
        
            const degree = request.params.degree;
            const location = request.params.location;
            const academicYear = request.params.academicYear;
        
            university_academic_performance_db.findOne(
                { degree: degree, location: location, academicYear: academicYear },
                (err, demand) => {
                    if (err) {
                        return response.status(500).json({ error: "Database error" });
                    }
        
                    if (demand) {
                        delete demand._id;
                        return response.status(200).json(demand);
                    } else {
                        return response.sendStatus(404);
                    }
                }
            );
        });

        //LOAD INITIAL DATA

        app.get(BASE_API + "/university-academic-performance/loadInitialData", (request, response) => {
            console.log("--------------------------------------------------------------------")
            console.log("NEW GET /university-academic-performance/loadInitialData");
        
            university_academic_performance_db.count({}, (err, count) => {
                if (err) {
                    return response.status(500).json({ error: "Database error" });
                }
        
                if (count === 0) {
        
                    university_academic_performance_db.insert(university_academic_performance, (err, newDocs) => {
                        if (err) {
                            return response.status(500).json({ error: "Database error" });
                        }
                        const cleanDocs = newDocs.map(doc => {
                            const { _id, ...rest } = doc;
                            return rest;
                        });
        
                        return response.status(201).json({
                            message: "The data was inserted successfully",
                            data: cleanDocs
                        });
                    });
        
                } else {
                    return response.status(409).json({ message: "empty the database first to initialize it" });
                }
            });
        });
        
        


        //POST PABLO

        app.post(BASE_API + "/university-academic-performance", (request, response) => {
            console.log("--------------------------------------------------------------------")
            console.log("NEW POST to /university-academic-performance");

            const body = request.body;
            console.log("EL BODY ES ", body.degree )
            if ([
                body.degree, body.location, body.dropoutFirstCourse, body.efficiencyRate, 
                body.dropoutSecondCourse, body.successRate, body.dropoutThirdCourse, 
                body.dropoutsThirdCourse, body.progressNormalized, body.dropoutsFirstCourse, 
                body.performanceRate, body.cohortStudents, body.dropoutsSecondCourse, 
                body.dropoutRate, body.graduationRate, body.academicYear
            ].some(value => value === undefined || value === null)) {
                return response.status(400).json({ error: "All fields needs a value" });
            }

            university_academic_performance_db.findOne({degree: body.degree, academicYear: body.academicYear, location: body.location }, (err, existingRecord) => {
                if (err) {
                    return response.status(500).json({ error: "Database error" });
                }
        
                if (existingRecord) {
                    return response.status(409).json({ error: "Record already exists" });
                }
        
                university_academic_performance_db.insert(body, (err, newDoc) => {
                    if (err) {
                        return response.status(500).json({ error: "Database error" });
                    }
                    return response.status(201).json({message: "Created successfully"});
                });
             });
        });


         // POST a uno

        app.post(BASE_API + "/university-academic-performance/:degree/:location/:academicYear", (request,response) => {   
            console.log("--------------------------------------------------------------------")
            console.log("NEW POST /university-academic-performance/:degree/:location/:academicYear") 
            return response.sendStatus(405); 
        });
    

        // PUT a todo

        app.put(BASE_API + "/university-academic-performance", (request,response) => {
            console.log("--------------------------------------------------------------------")   
            console.log("NEW PUT /university-academic-performance")
            return response.sendStatus(405);
        });


        // PUT a uno

        app.put(BASE_API + "/university-academic-performance/:degree/:location/:academicYear", (request,response) => {
            console.log("--------------------------------------------------------------------")
            console.log("NEW PUT /university-academic-performance/:degree/:location/:academicYear")

            const degree= request.params.degree
            const location = request.params.location;
            const academicYear = request.params.academicYear
            const body = request.body;

            if (body.degree != degree || body.location != location || body.academicYear != academicYear){
                return response.status(400).json({ error: " degree, location or academicyear cant be changed" })
            }

            if ([
                body.degree, body.location, body.dropoutFirstCourse, body.efficiencyRate, 
                body.dropoutSecondCourse, body.successRate, body.dropoutThirdCourse, 
                body.dropoutsThirdCourse, body.progressNormalized, body.dropoutsFirstCourse, 
                body.performanceRate, body.cohortStudents, body.dropoutsSecondCourse, 
                body.dropoutRate, body.graduationRate, body.academicYear
            ].some(value => value === undefined)) 

            {
                return response.status(400).json({error: "All fields needs a value"});
            }
            university_academic_performance_db.update({ degree, location, academicYear },  {$set: body},(err, numReplaced) => {
                    if (err) {
                        return response.status(500).json({ error: "Database error" });
                    }
                    if (numReplaced === 0) {
                        return response.sendStatus(404);
                    }
                    return response.status(200).json({ message: "Record updated successfully" });
                }
            );
        });


        // Elimina todo

        app.delete(BASE_API + "/university-academic-performance", (request,response) => {
            console.log("--------------------------------------------------------------------")
            console.log("NEW DELETE /university-academic-performance")
            university_academic_performance_db.find({}, (err, docs) => {
                if (err) {
                    return response.status(500).json({ error: "Database error" });
                }
            
                if (docs.length === 0) {
                    return response.status(409).json({ error: "Database is empty, nothing to delete" });
                }
            else{
                university_academic_performance_db.remove({}, { multi: true }, (err, numRemoved) => {
                    if (err) {
                        return response.status(500).json({ error: "Database error" });
                    }
                    
                    else {
    
    
                        
                        return response.status(200).json({ message: `${numRemoved} records deleted successfully` });
                    }
                    
                });
            }})

        
            
        });
        

        // Eliminar un registro existente

        app.delete(BASE_API+"/university-academic-performance/:degree/:location/:academicYear",(request,response)=>{
            console.log("--------------------------------------------------------------------")
            console.log("NEW DELETE /university-academic-performance/:degree/:location/:academicYear")

            const degree= request.params.degree;
            const location = request.params.location;
            const academicYear = request.params.academicYear;
    
            
            university_academic_performance_db.remove({"degree" : degree , "location" : location , "academicYear" : academicYear},{},(err,numRemoved)=>{
                if(err){
                    return response.status(500).json({ error: "Database error" });
                }else{
                    if(numRemoved >= 1){
                        return response.status(200).json({ message: "records deleted successfully" });;
                    }else{
                        return response.sendStatus(404);
                    }
                }
            });
    
        });

        //DOCUMENTACION POSTMAN 

        app.get(BASE_API+"/university-academic-performance/docs",(request,response)=>{
            console.log("--------------------------------------------------------------------")
            console.log("NEW GET /university-academic-performance/docs")

           return response.redirect("https://documenter.getpostman.com/view/43694449/2sB2cUBica");
        });
        
    }

    export {loadBackendPabloV1}