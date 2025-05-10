import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

test('has title', async ({ page }) => {
  await page.goto('localhost:16078');

  await expect(page).toHaveTitle(/SOS2425-17/);
});

test('Funciona Borra Todo y LoadInitialData', async ({ page }) => {
  await page.goto('http://localhost:16078/university-academic-performance');

  await page.getByRole('button', { name: 'Cargar datos iniciales' }).click();

  const dataRows = page.locator('table tbody tr');

  await expect(dataRows).toHaveCount(67, { timeout: 5000 });

  await page.getByRole('button', { name: 'Borra todo' }).click();


  // Espera hasta que no haya filas de datos (con timeout por seguridad)
  await expect(dataRows).toHaveCount(1, { timeout: 5000 });

  // Carga datos iniciales
  await page.getByRole('button', { name: 'Cargar datos iniciales' }).click();

  // Espera hasta que haya 66 filas de datos
  await expect(dataRows).toHaveCount(67, { timeout: 5000 });
});


test('Error LoadInitialData ya tiene datos', async ({ page }) => {
  await page.goto('http://localhost:16078/university-academic-performance');

  await page.getByRole('button', { name: 'Cargar datos iniciales' }).click();

  const dataRows = page.locator('table tbody tr');

  await expect(dataRows).toHaveCount(67, { timeout: 5000 });

  // Carga datos iniciales
  await page.getByRole('button', { name: 'Cargar datos iniciales' }).click();

  // Espera hasta que haya 66 filas de datos
  await expect(dataRows).toHaveCount(67, { timeout: 5000 });
  const errorMessage = page.locator('.error-message');
  await expect(errorMessage).toHaveText('La página ya contiene datos; para insertar datos nuevos, borre los actuales.');

});


test('Error borra todo no tiene datos que borrar', async ({ page }) => {
  await page.goto('http://localhost:16078/university-academic-performance');

  await page.getByRole('button', { name: 'Cargar datos iniciales' }).click();

  const dataRows = page.locator('table tbody tr');

  await expect(dataRows).toHaveCount(67, { timeout: 5000 });

  await page.getByRole('button', { name: 'Borra todo' }).click();


  // Espera hasta que no haya filas de datos (con timeout por seguridad)
  await expect(dataRows).toHaveCount(1, { timeout: 5000 });

  await page.getByRole('button', { name: 'Borra todo' }).click();

  await expect(dataRows).toHaveCount(1, { timeout: 5000 });
  const errorMessage = page.locator('.error-message');
  await expect(errorMessage).toHaveText('No hay datos que borrar.');

});


test('Funciona el filtro', async ({ page }) => {
  const test_location= "ALMENDRALEJO" 

  await page.goto('http://localhost:16078/university-academic-performance');

  await page.getByRole('button', { name: 'Cargar datos iniciales' }).click();

  const dataRows = page.locator('table tbody tr');

  await expect(dataRows).toHaveCount(67, { timeout: 5000 });

  await page.getByRole('button', { name: 'Filtrado' }).click();
  await page.locator('input[placeholder="Grado"]').waitFor({ state: 'visible' });
  

await page.locator('input[placeholder="Localización"]').fill(test_location);

await page.getByRole('button', { name: 'Filtrar' }).click();
  await expect(dataRows).toHaveCount(7);
  await expect(dataRows.nth(1)).toContainText("GRADO EN EDUCACIÓN INFANTIL");

});


test('Funciona el filtro a uno en concreto', async ({ page }) => {
  const test_degree= "GRADO EN EDUCACIÓN INFANTIL"
  const test_location= "ALMENDRALEJO"
  const test_academicYear= "2016-2017" 

  await page.goto('http://localhost:16078/university-academic-performance');

  await page.getByRole('button', { name: 'Cargar datos iniciales' }).click();

  const dataRows = page.locator('table tbody tr');

  await expect(dataRows).toHaveCount(67, { timeout: 5000 });

  await page.getByRole('button', { name: 'Filtrado' }).click();
  await page.locator('input[placeholder="Grado"]').waitFor({ state: 'visible' });
  

await page.locator('input[placeholder="Grado"]').fill(test_degree);
await page.locator('input[placeholder="Localización"]').fill(test_location);
await page.locator('input[placeholder="Año académico"]').fill(test_academicYear);

await page.getByRole('button', { name: 'Filtrar' }).click();
  await expect(dataRows).toHaveCount(2);
  await expect(dataRows.nth(1)).toContainText(test_degree);

});


test('Error filtro por UNO que no existe', async ({ page }) => {
  const test_degree= "GRADO EN EDUCACIÓN INFANTIL"
  const test_location= "ALMENDRALEJ"
  const test_academicYear= "2016-2017" 

  await page.goto('http://localhost:16078/university-academic-performance');

  await page.getByRole('button', { name: 'Cargar datos iniciales' }).click();

  const dataRows = page.locator('table tbody tr');

  await expect(dataRows).toHaveCount(67, { timeout: 5000 });

  await page.getByRole('button', { name: 'Filtrado' }).click();
  await page.locator('input[placeholder="Grado"]').waitFor({ state: 'visible' });
  

await page.locator('input[placeholder="Grado"]').fill(test_degree);
await page.locator('input[placeholder="Localización"]').fill(test_location);
await page.locator('input[placeholder="Año académico"]').fill(test_academicYear);

await page.getByRole('button', { name: 'Filtrar' }).click();
const errorMessage = page.locator('.error-message');
  await expect(errorMessage).toHaveText('No se encontró ningún registro con los parámetros especificados.');

});


test('Funciona Crear registro', async ({ page }) => {
  const test_degree= "ete es el tes de prueba ninio"
  const test_location= "AAAAA"
  const test_dropoutSecondCourse= 0.0
  const test_efficiencyRate= 96.58
  const test_dropoutThirdCourse= 0.0
  const test_successRate= 99.39
  const test_dropoutFirstCourse= 3.33
  const test_dropoutsThirdCourse= 0
  const test_progressNormalized= 1.0
  const test_dropoutsFirstCourse= 3
  const test_performanceRate= 97.32
  const test_cohortStudents= 9
  const test_dropoutsSecondCourse= 0
  const test_dropoutRate= 28.57
  const test_graduationRate= 50.0
  const test_academicYear= "2010" 

  await page.goto('http://localhost:16078/university-academic-performance');
  
  await page.getByRole('button', { name: 'Cargar datos iniciales' }).click();

  const dataRows = page.locator('table tbody tr');

  await expect(dataRows).toHaveCount(67, { timeout: 5000 });

  await page.getByRole('button', {name: 'Crear nuevo registro' }).click();
  await page.locator('input[placeholder="Grado"]').waitFor({ state: 'visible' });

  await page.locator('input[placeholder="Grado"]').fill(test_degree);
  await page.locator('input[placeholder="Localización"]').fill(test_location);
  await page.locator('input[placeholder="Año académico"]').fill(test_academicYear);
  await page.locator('input[placeholder="Tasa abandono 1er curso (%)"]').fill(String(test_dropoutFirstCourse));
  await page.locator('input[placeholder="Tasa abandono 2º curso (%)"]').fill(String(test_dropoutSecondCourse));
  await page.locator('input[placeholder="Tasa abandono 3º curso (%)"]').fill(String(test_dropoutThirdCourse));
  await page.locator('input[placeholder="Nº abandonos 1er curso"]').fill(String(test_dropoutsFirstCourse));
  await page.locator('input[placeholder="Nº abandonos 2º curso"]').fill(String(test_dropoutsSecondCourse));
  await page.locator('input[placeholder="Nº abandonos 3º curso"]').fill(String(test_dropoutsThirdCourse));
  await page.locator('input[placeholder="Tasa abandono (%)"]').fill(String(test_dropoutRate));  
  await page.locator('input[placeholder="Tasa eficiencia (%)"]').fill(String(test_efficiencyRate));
  await page.locator('input[placeholder="Tasa éxito (%)"]').fill(String(test_successRate));
  await page.locator('input[placeholder="Progreso normalizado (%)"]').fill(String(test_progressNormalized));
  await page.locator('input[placeholder="Tasa de rendimiento (%)"]').fill(String(test_performanceRate));
  await page.locator('input[placeholder="Estudiantes cohorte"]').fill(String(test_cohortStudents));
  await page.locator('input[placeholder="Tasa graduación (%)"]').fill(String(test_graduationRate));

  await page.getByRole('button', { name: 'Guardar' }).click();
    await expect(dataRows).toHaveCount(68);
    await expect(dataRows.nth(1)).toContainText(test_degree);

});




test('Error Campos no rellenos Crear registro', async ({ page }) => {
  const test_degree= "ete es el tes de prueba ninio"
  const test_location= "AAAAA"
  const test_dropoutSecondCourse= 0.0
  const test_dropoutThirdCourse= 0.0


  await page.goto('http://localhost:16078/university-academic-performance');
  
  await page.getByRole('button', { name: 'Cargar datos iniciales' }).click();

  const dataRows = page.locator('table tbody tr');

  await expect(dataRows).toHaveCount(67, { timeout: 5000 });

  await page.getByRole('button', {name: 'Crear nuevo registro' }).click();
  await page.locator('input[placeholder="Grado"]').waitFor({ state: 'visible' });

  await page.locator('input[placeholder="Grado"]').fill(test_degree);
  await page.locator('input[placeholder="Localización"]').fill(test_location);
  await page.locator('input[placeholder="Tasa abandono 2º curso (%)"]').fill(String(test_dropoutSecondCourse));
  await page.locator('input[placeholder="Tasa abandono 3º curso (%)"]').fill(String(test_dropoutThirdCourse));
 

  await page.getByRole('button', { name: 'Guardar' }).click();
  const errorMessage = page.locator('.error-message');
await expect(errorMessage).toBeVisible();
await expect(errorMessage).toHaveText('Todos los campos deben estar rellenos.');


});

test('Error crear dos registros iguales', async ({ page }) => {
  const test_degree= "GRADO EN ADMINISTRACIÓN Y DIRECCIÓN DE EMPRESAS"
  const test_location= "CÁCERES"
  const test_dropoutSecondCourse= 0.0
  const test_efficiencyRate= 96.58
  const test_dropoutThirdCourse= 0.0
  const test_successRate= 99.39
  const test_dropoutFirstCourse= 3.33
  const test_dropoutsThirdCourse= 0
  const test_progressNormalized= 1.0
  const test_dropoutsFirstCourse= 3
  const test_performanceRate= 97.32
  const test_cohortStudents= 9
  const test_dropoutsSecondCourse= 0
  const test_dropoutRate= 28.57
  const test_graduationRate= 	58.82
  const test_academicYear= "2016-2017" 

  await page.goto('http://localhost:16078/university-academic-performance');
  
  await page.getByRole('button', { name: 'Cargar datos iniciales' }).click();

  const dataRows = page.locator('table tbody tr');

  await expect(dataRows).toHaveCount(67, { timeout: 5000 });

  await page.getByRole('button', {name: 'Crear nuevo registro' }).click();
  await page.locator('input[placeholder="Grado"]').waitFor({ state: 'visible' });

  await page.locator('input[placeholder="Grado"]').fill(test_degree);
  await page.locator('input[placeholder="Localización"]').fill(test_location);
  await page.locator('input[placeholder="Año académico"]').fill(test_academicYear);
  await page.locator('input[placeholder="Tasa abandono 1er curso (%)"]').fill(String(test_dropoutFirstCourse));
  await page.locator('input[placeholder="Tasa abandono 2º curso (%)"]').fill(String(test_dropoutSecondCourse));
  await page.locator('input[placeholder="Tasa abandono 3º curso (%)"]').fill(String(test_dropoutThirdCourse));
  await page.locator('input[placeholder="Nº abandonos 1er curso"]').fill(String(test_dropoutsFirstCourse));
  await page.locator('input[placeholder="Nº abandonos 2º curso"]').fill(String(test_dropoutsSecondCourse));
  await page.locator('input[placeholder="Nº abandonos 3º curso"]').fill(String(test_dropoutsThirdCourse));
  await page.locator('input[placeholder="Tasa abandono (%)"]').fill(String(test_dropoutRate));  
  await page.locator('input[placeholder="Tasa eficiencia (%)"]').fill(String(test_efficiencyRate));
  await page.locator('input[placeholder="Tasa éxito (%)"]').fill(String(test_successRate));
  await page.locator('input[placeholder="Progreso normalizado (%)"]').fill(String(test_progressNormalized));
  await page.locator('input[placeholder="Tasa de rendimiento (%)"]').fill(String(test_performanceRate));
  await page.locator('input[placeholder="Estudiantes cohorte"]').fill(String(test_cohortStudents));
  await page.locator('input[placeholder="Tasa graduación (%)"]').fill(String(test_graduationRate));

  await page.getByRole('button', { name: 'Guardar' }).click();
  const errorMessage = page.locator('.error-message');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveText('Ya existe un registro con el mismo Grado, Ciudad y Año académico.');

});












test('Funciona Update registro', async ({ page }) => {

  const test_degree= "GRADO EN ADMINISTRACIÓN Y DIRECCIÓN DE EMPRESAS"
  const test_location= "CÁCERES"
  const test_dropoutSecondCourse= 17000
  const test_efficiencyRate= 96.58
  const test_dropoutThirdCourse= 0.0
  const test_successRate= 0.0
  const test_dropoutFirstCourse= 3.33
  const test_dropoutsThirdCourse= 0
  const test_progressNormalized= 1.0
  const test_dropoutsFirstCourse= 3
  const test_performanceRate= 97.32
  const test_cohortStudents= 9
  const test_dropoutsSecondCourse= 0
  const test_dropoutRate= 28.57
  const test_graduationRate= 50.0
  const test_academicYear= "2016-2017"

await page.goto('http://localhost:16078/university-academic-performance');

await page.getByRole('button', { name: 'Cargar datos iniciales' }).click();  

const dataRows = page.locator('table tbody tr');

await expect(dataRows).toHaveCount(67, { timeout: 5000 });

await page.getByRole('button', { name: 'Editar registro' }).click();
await page.locator('input[placeholder="Grado"]').waitFor({ state: 'visible' });

await page.locator('input[placeholder="Grado"]').fill(test_degree);
await page.locator('input[placeholder="Localización"]').fill(test_location);
await page.locator('input[placeholder="Año académico"]').fill(test_academicYear);
await page.locator('input[placeholder="Tasa abandono 1er curso (%)"]').fill(String(test_dropoutFirstCourse));
await page.locator('input[placeholder="Tasa abandono 2º curso (%)"]').fill(String(test_dropoutSecondCourse));
await page.locator('input[placeholder="Tasa abandono 3º curso (%)"]').fill(String(test_dropoutThirdCourse));
await page.locator('input[placeholder="Nº abandonos 1er curso"]').fill(String(test_dropoutsFirstCourse));
await page.locator('input[placeholder="Nº abandonos 2º curso"]').fill(String(test_dropoutsSecondCourse));
await page.locator('input[placeholder="Nº abandonos 3º curso"]').fill(String(test_dropoutsThirdCourse));
await page.locator('input[placeholder="Tasa abandono (%)"]').fill(String(test_dropoutRate));  
await page.locator('input[placeholder="Tasa eficiencia (%)"]').fill(String(test_efficiencyRate));
await page.locator('input[placeholder="Tasa éxito (%)"]').fill(String(test_successRate));
await page.locator('input[placeholder="Progreso normalizado (%)"]').fill(String(test_progressNormalized));
await page.locator('input[placeholder="Tasa de rendimiento (%)"]').fill(String(test_performanceRate));
await page.locator('input[placeholder="Estudiantes cohorte"]').fill(String(test_cohortStudents));
await page.locator('input[placeholder="Tasa graduación (%)"]').fill(String(test_graduationRate));

await page.getByRole('button', { name: 'Actualizar' }).click();
  await expect(dataRows).toHaveCount(67);
  await expect(dataRows.nth(1)).toContainText(test_degree);
  await expect(dataRows.nth(1)).toContainText(String(17000));
});

test('Error Update no encuentra', async ({ page }) => {
  const test_degree= "GRADO EN ADMINISTRASAS"
  const test_location= "CÁCERES"
  const test_dropoutSecondCourse= 17000
  const test_efficiencyRate= 96.58
  const test_dropoutThirdCourse= 0.0
  const test_successRate= 0.0
  const test_dropoutFirstCourse= 3.33
  const test_dropoutsThirdCourse= 0
  const test_progressNormalized= 1.0
  const test_dropoutsFirstCourse= 3
  const test_performanceRate= 97.32
  const test_cohortStudents= 9
  const test_dropoutsSecondCourse= 0
  const test_dropoutRate= 28.57
  const test_graduationRate= 50.0
  const test_academicYear= "2016-2017"


  await page.goto('http://localhost:16078/university-academic-performance');
  
  await page.getByRole('button', { name: 'Cargar datos iniciales' }).click();

  const dataRows = page.locator('table tbody tr');

  await expect(dataRows).toHaveCount(67, { timeout: 5000 });

  await page.getByRole('button', { name: 'Editar registro' }).click();
  await page.locator('input[placeholder="Grado"]').waitFor({ state: 'visible' });

  await page.locator('input[placeholder="Grado"]').fill(test_degree);
  await page.locator('input[placeholder="Localización"]').fill(test_location);
  await page.locator('input[placeholder="Año académico"]').fill(test_academicYear);
  await page.locator('input[placeholder="Tasa abandono 1er curso (%)"]').fill(String(test_dropoutFirstCourse));
  await page.locator('input[placeholder="Tasa abandono 2º curso (%)"]').fill(String(test_dropoutSecondCourse));
  await page.locator('input[placeholder="Tasa abandono 3º curso (%)"]').fill(String(test_dropoutThirdCourse));
  await page.locator('input[placeholder="Nº abandonos 1er curso"]').fill(String(test_dropoutsFirstCourse));
  await page.locator('input[placeholder="Nº abandonos 2º curso"]').fill(String(test_dropoutsSecondCourse));
  await page.locator('input[placeholder="Nº abandonos 3º curso"]').fill(String(test_dropoutsThirdCourse));
  await page.locator('input[placeholder="Tasa abandono (%)"]').fill(String(test_dropoutRate));  
  await page.locator('input[placeholder="Tasa eficiencia (%)"]').fill(String(test_efficiencyRate));
  await page.locator('input[placeholder="Tasa éxito (%)"]').fill(String(test_successRate));
  await page.locator('input[placeholder="Progreso normalizado (%)"]').fill(String(test_progressNormalized));
  await page.locator('input[placeholder="Tasa de rendimiento (%)"]').fill(String(test_performanceRate));
  await page.locator('input[placeholder="Estudiantes cohorte"]').fill(String(test_cohortStudents));
  await page.locator('input[placeholder="Tasa graduación (%)"]').fill(String(test_graduationRate));
 

  await page.getByRole('button', { name: 'Actualizar' }).click();
  const errorMessage = page.locator('.error-message');
await expect(errorMessage).toBeVisible();
await expect(errorMessage).toHaveText('No existe ningún registro con ese Grado, Ciudad y/o Año Académico.');
});



test('Error Update faltan campos', async ({ page }) => {
  const test_degree= "ete es el tes de prueba ninio"
  const test_location= "AAAAA"
  const test_dropoutSecondCourse= 0.0
  const test_dropoutThirdCourse= 0.0


  await page.goto('http://localhost:16078/university-academic-performance');
  
  await page.getByRole('button', { name: 'Cargar datos iniciales' }).click();

  const dataRows = page.locator('table tbody tr');

  await expect(dataRows).toHaveCount(67, { timeout: 5000 });

  await page.getByRole('button', { name: 'Editar registro' }).click();
  await page.locator('input[placeholder="Grado"]').waitFor({ state: 'visible' });

  await page.locator('input[placeholder="Grado"]').fill(test_degree);
  await page.locator('input[placeholder="Localización"]').fill(test_location);
  await page.locator('input[placeholder="Tasa abandono 2º curso (%)"]').fill(String(test_dropoutSecondCourse));
  await page.locator('input[placeholder="Tasa abandono 3º curso (%)"]').fill(String(test_dropoutThirdCourse));
 

  await page.getByRole('button', { name: 'Actualizar' }).click();
  const errorMessage = page.locator('.error-message');
await expect(errorMessage).toBeVisible();
await expect(errorMessage).toHaveText('Todos los campos deben estar rellenos.');
});

















test('Funciona borrar un registro Botón principal y botón en la tabla ', async ({ page }) => {
  const test_degree= "GRADO EN ADMINISTRACIÓN Y DIRECCIÓN DE EMPRESAS"
  const test_location= "CÁCERES"
  const test_academicYear= "2016-2017" 

  await page.goto('http://localhost:16078/university-academic-performance');
  
  await page.getByRole('button', { name: 'Cargar datos iniciales' }).click();

  const dataRows = page.locator('table tbody tr');

  await expect(dataRows).toHaveCount(67, { timeout: 5000 });

  await page.getByRole('button', {name: 'Borrar registro' }).click();
  await page.locator('input[placeholder="Grado"]').waitFor({ state: 'visible' });

  await page.locator('input[placeholder="Grado"]').fill(test_degree);
  await page.locator('input[placeholder="Localización"]').fill(test_location);
  await page.locator('input[placeholder="Año académico"]').fill(test_academicYear);

  await page.getByRole('button', { name: 'Borrar Uno' }).click();
  await expect(dataRows).toHaveCount(66);
  await expect(dataRows.nth(1)).toContainText("GRADO EN COMUNICACIÓN AUDIOVISUAL");



  await page.locator('table tr').nth(1).getByRole('button', { name: 'Borrar' }).click();
  await expect(dataRows).toHaveCount(65);
  await expect(dataRows.nth(1)).toContainText("GRADO EN DERECHO");


});



test('Error borrar uno que no encuentra', async ({ page }) => {
  const test_degree= "GRADO"
  const test_location= "CÁCERES"
  const test_academicYear= "2016-2017" 

  await page.goto('http://localhost:16078/university-academic-performance');
  
  await page.getByRole('button', { name: 'Cargar datos iniciales' }).click();

  const dataRows = page.locator('table tbody tr');

  await expect(dataRows).toHaveCount(67, { timeout: 5000 });

  await page.getByRole('button', {name: 'Borrar registro' }).click();
  await page.locator('input[placeholder="Grado"]').waitFor({ state: 'visible' });

  await page.locator('input[placeholder="Grado"]').fill(test_degree);
  await page.locator('input[placeholder="Localización"]').fill(test_location);
  await page.locator('input[placeholder="Año académico"]').fill(test_academicYear);

  await page.getByRole('button', { name: 'Borrar Uno' }).click();
  const errorMessage = page.locator('.error-message');
  await expect(errorMessage).toHaveText('No se ha encontrado ningún registro con ese Grado, Localización y/o Año Académico.');



});





test('Funciona ver datos botón principal y tabla)', async ({ page }) => {
  const test_academicYear= "2016-2017" 

  await page.goto('http://localhost:16078/university-academic-performance');

  await page.getByRole('button', { name: 'Cargar datos iniciales' }).click();

  const dataRows = page.locator('table tbody tr');

  await expect(dataRows).toHaveCount(67, { timeout: 5000 });

  await page.getByRole('button', { name: 'Filtrado' }).click();
  await page.locator('input[placeholder="Grado"]').waitFor({ state: 'visible' });
  
await page.locator('input[placeholder="Año académico"]').fill(test_academicYear);

await page.getByRole('button', { name: 'Filtrar' }).click();
  await expect(dataRows).toHaveCount(21);

 await page.getByRole('button', { name: 'Mira Datos' }).click();
 await expect(dataRows).toHaveCount(67);

 await page.locator('table tr').nth(1).getByRole('button', { name: 'Mirar' }).click();
 await expect(dataRows).toHaveCount(2);
 await expect(dataRows.nth(1)).toContainText("GRADO EN ADMINISTRACIÓN Y DIRECCIÓN DE EMPRESAS");
 





});



