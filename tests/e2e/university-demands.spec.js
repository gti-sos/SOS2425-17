// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('localhost:16078');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/SOS2425-17/);
});

test('Get contact list', async ({ page }) => {
  await page.goto('localhost:16078');

  await page.getByRole('link', { name: 'Front university-demands' }).click();

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/University Demands/);
});

test('GetLoadInitialData', async ({ page }) => {
  // Ir a la página
  await page.goto('http://localhost:16078');

  // Click en el link al frontend
  await page.getByRole('link', { name: 'Front university-demands' }).click();

  // Click en el botón "Cargar Datos"
  await page.getByRole('button', { name: 'Cargar Datos' }).first().click();

  // Esperar a que haya al menos una fila de datos
  const dataRows = page.locator('table tbody tr').filter({ has: page.locator('td') });

  // Esperamos hasta que haya al menos 1 fila
  await expect(async () => {
    const count = await dataRows.count();
    expect(count).toBeGreaterThan(0);
  }).toPass();
});

//Filtro por un dato especifico y desde un año hasta otro y luego le doy a limpiar filtros
test('Filter', async ({ page }) => {
  const testLocation = "Badajoz";
  const testYearsFrom = "2017-2018";
  const testYearsTo = "2018-2019";

  // Ir a la página principal
  await page.goto('http://localhost:16078');

  // Entrar en el frontend de university-demands
  await page.getByRole('link', { name: 'Front university-demands' }).click();

  // Cargar los datos
  await page.getByRole('button', { name: 'Cargar Datos' }).first().click();

  // Abro el cuestionario de filtros dandole a filtrar
  await page.getByRole('button', { name: 'Filtrar' }).first().click();

  // Relleno los campos del filtro que
  await page.getByRole('textbox').nth(0).fill(testLocation);
  await page.getByRole('textbox').nth(7).fill(testYearsFrom);
  await page.getByRole('textbox').nth(8).fill(testYearsTo);

  // Aplicar el filtro
  await page.getByRole('button', { name: 'Aplicar' }).click();

 // Esperamos a que se muestren los resultados
 const rows = page.locator('table tbody tr');

 
 // Ahora buscamos las filas que contengan Badajoz específicamente
 const rowsWithBadajoz = rows.filter({ hasText: testLocation });


  // Esperamos a que aparezcan filas filtradas
  await expect(async () => {
    const count = await rowsWithBadajoz.count();
    expect(count).toBeGreaterThan(0);
  }).toPass();

  // Limpiar filtros
  await page.getByRole('button', { name: 'Limpiar Filtros' }).click();

  // Comprobar que vuelve a haber datos sin filtros
  const dataAfterClear = page.locator('table tbody tr').filter({ has: page.locator('td') });

  await expect(async () => {
    const count = await dataAfterClear.count();
    expect(count).toBeGreaterThan(0);
  }).toPass();
});




test('Create and delete demand', async ({ page }) => {
  
  //location,degree,over45,spanishFirst,foreigners,graduated,academicYear
  const testLocation = "__TEST_LOCATION__";
  const testDegree = "__TEST_DEGREE__";
  const testOver45 = "1224242429";
  const testSpanishFirst = "1895353";
  const testForeigners = "453555";
  const testGraduated = "14343";
  const testAcademicYear = "2037-2038";

  //Me voy a la pagina localhost:16078
  await page.goto('localhost:16078');

  // Pulso sobre el link contacts.
  await page.getByRole('link', { name: 'Front university-demands' }).click();
   
   // Click en el botón "Crear" que abre el formulario
   await page.getByRole('button', { name: 'Crear' }).first().click();
 
   // Esperar a que aparezca el formulario de creación
   await page.getByRole('heading', { name: 'Crear Demanda Universitaria' }).waitFor();
 

  // crear el contacto.
  await page.getByRole('textbox').nth(0).fill(testLocation);
  await page.getByRole('textbox').nth(1).fill(testDegree);
  await page.getByRole('textbox').nth(2).fill(testOver45);
  await page.getByRole('textbox').nth(3).fill(testSpanishFirst);
  await page.getByRole('textbox').nth(4).fill(testForeigners);
  await page.getByRole('textbox').nth(5).fill(testGraduated);
  await page.getByRole('textbox').nth(6).fill(testAcademicYear);


  //Pulso sobre el boton Create
  await page.getByRole('button', { name: 'Crear' }).click();

  //Creo una variable que busque dentro del tr un texto que sea la localización que hemos creado.
  const demandRow = page.locator('tr').filter({ hasText: testLocation });

  //Miro a ver si esa linea contiene los demas campos que hemos creado
  await expect(demandRow).toContainText(testDegree);
  await expect(demandRow).toContainText(testOver45);
  await expect(demandRow).toContainText(testSpanishFirst);
  await expect(demandRow).toContainText(testForeigners);
  await expect(demandRow).toContainText(testGraduated);
  await expect(demandRow).toContainText(testAcademicYear);

  //Busco el boton que tiene el nombre de Delete dentro de la fila que contiene el contacto
  const deleteButton = demandRow.getByRole('button', { name: 'Borrar' });
  //Borro el contacto 
  await deleteButton.click();
  //Miro a ver si la fila ya no tiene nada
  await expect(demandRow).toHaveCount(0);
});

test('Create EROR 400', async ({ page }) => {
  
  //location,degree,over45,spanishFirst,foreigners,graduated,academicYear
  const testLocation = "__TEST_LOCATION__";
  const testDegree = "__TEST_DEGREE__";
  const testOver45 = "1224242429";
  const testSpanishFirst = "1895353";
  const testForeigners = "453555";
  const testGraduated = "14343";
  const expectedMessage = "¡Tienes que rellenar todos los campos!";

  //Me voy a la pagina localhost:16078
  await page.goto('localhost:16078');

  // Pulso sobre el link contacts.
  await page.getByRole('link', { name: 'Front university-demands' }).click();
   
   // Click en el botón "Crear" que abre el formulario
   await page.getByRole('button', { name: 'Crear' }).first().click();
 
   // Esperar a que aparezca el formulario de creación
   await page.getByRole('heading', { name: 'Crear Demanda Universitaria' }).waitFor();
 

  // crear el contacto.
  await page.getByRole('textbox').nth(0).fill(testLocation);
  await page.getByRole('textbox').nth(1).fill(testDegree);
  await page.getByRole('textbox').nth(2).fill(testOver45);
  await page.getByRole('textbox').nth(3).fill(testSpanishFirst);
  await page.getByRole('textbox').nth(4).fill(testForeigners);
  await page.getByRole('textbox').nth(5).fill(testGraduated);

  //Pulso sobre el boton Create
  await page.getByRole('button', { name: 'Crear' }).click();

  // Comprobar que aparece el mensaje de error
  const errorMessage = page.getByText(expectedMessage); 
  await expect(errorMessage).toBeVisible({ timeout: 10000 });

  
});

test('Create EROR 409', async ({ page }) => {
  
  //location,degree,over45,spanishFirst,foreigners,graduated,academicYear
  const testLocation = "Badajoz";
  const testDegree = "Educación Infantil";
  const testOver45 = "13";
  const testSpanishFirst = "5";
  const testForeigners = "13";
  const testGraduated = "5";
  const testAcademicYear = "2016-2017";
  const expectedMessage = "¡Esta demanda ya existe!";

  //Me voy a la pagina localhost:16078
  await page.goto('localhost:16078');

  // Pulso sobre el link contacts.
  await page.getByRole('link', { name: 'Front university-demands' }).click();

  // Cargar los datos
  await page.getByRole('button', { name: 'Cargar Datos' }).first().click();
   
   // Click en el botón "Crear" que abre el formulario
   await page.getByRole('button', { name: 'Crear' }).first().click();
 
   // Esperar a que aparezca el formulario de creación
   await page.getByRole('heading', { name: 'Crear Demanda Universitaria' }).waitFor();
 

  // crear el contacto.
  await page.getByRole('textbox').nth(0).fill(testLocation);
  await page.getByRole('textbox').nth(1).fill(testDegree);
  await page.getByRole('textbox').nth(2).fill(testOver45);
  await page.getByRole('textbox').nth(3).fill(testSpanishFirst);
  await page.getByRole('textbox').nth(4).fill(testForeigners);
  await page.getByRole('textbox').nth(5).fill(testGraduated);
  await page.getByRole('textbox').nth(6).fill(testAcademicYear);
  

  //Pulso sobre el boton Create
  await page.getByRole('button', { name: 'Crear' }).click();

  // Comprobar que aparece el mensaje de error
  const errorMessage = page.getByText(expectedMessage); 
  await expect(errorMessage).toBeVisible({ timeout: 10000 });

  
});

test('PUT ', async ({ page }) => {
  // Datos que NO existen en la base de datos
  const testOver45 = "80";
  const successMessage = page.getByText('¡Demanda actualizada con éxito!');
  
  
  // Ir a la app
  await page.goto('http://localhost:16078');

  // Ir al frontend de university-demands
  await page.getByRole('link', { name: 'Front university-demands' }).click();

  // Cargar los datos
  await page.getByRole('button', { name: 'Cargar Datos' }).first().click();

  // Ir al formulario de edición
  //El first click es para que una vez dentro de la pagina pulse sobre el primer boton editar que encuentre
  await page.getByRole('button', { name: 'Editar' }).first().click(); 

  // Rellenar el formulario con academicYear vacio para que me de error 400 de que falta rellenar un campo
  await page.getByRole('textbox').nth(2).fill(testOver45);

  // Pulsar el botón "Actualizar"
  await page.getByRole('button', { name: 'Actualizar' }).click();

  // Esperar a que aparezca el mensaje de éxito (si lo tienes)
  await expect(successMessage).toBeVisible({ timeout: 10000 });

});

test('PUT ERROR 404 ', async ({ page }) => {
  // Datos que NO existen en la base de datos
  const testLocation = "";
  const testDegree = "";
  const testAcademicYear = "";
  const testOver45 = "";
  const testSpanishFirst = "";
  const testForeigners = "";
  const testGraduated = "";

  const expectedErrorMessage = "No se encontró la demanda a actualizar";

  // Ir a la app
  await page.goto('http://localhost:16078');

  // Ir al frontend de university-demands
  await page.getByRole('link', { name: 'Front university-demands' }).click();

  // Cargar los datos
  await page.getByRole('button', { name: 'Cargar Datos' }).first().click();

  // Ir al formulario de edición
  //El first click es para que una vez dentro de la pagina pulse sobre el primer boton editar que encuentre
  await page.getByRole('button', { name: 'Editar' }).first().click(); 

  // Rellenar el formulario con los datos inexistentes
  await page.getByRole('textbox').nth(0).fill(testLocation);
  await page.getByRole('textbox').nth(1).fill(testDegree);
  await page.getByRole('textbox').nth(2).fill(testOver45);
  await page.getByRole('textbox').nth(3).fill(testSpanishFirst);
  await page.getByRole('textbox').nth(4).fill(testForeigners);
  await page.getByRole('textbox').nth(5).fill(testGraduated);
  await page.getByRole('textbox').nth(6).fill(testAcademicYear);

  // Pulsar el botón "Actualizar"
  await page.getByRole('button', { name: 'Actualizar' }).click();

  // Verificar que aparece el mensaje de error (ajústalo si tu frontend lo muestra diferente)
  const errorMessage = page.getByText(expectedErrorMessage);
  await expect(errorMessage).toBeVisible({ timeout: 10000 });
});

test('PUT ERROR 400 ', async ({ page }) => {
  // Datos que NO existen en la base de datos
  const testOver45 = "";
  
  const expectedErrorMessage = "Datos incompletos o no coinciden con los parámetros de la URL";

  // Ir a la app
  await page.goto('http://localhost:16078');

  // Ir al frontend de university-demands
  await page.getByRole('link', { name: 'Front university-demands' }).click();

  // Cargar los datos
  await page.getByRole('button', { name: 'Cargar Datos' }).first().click();

  // Ir al formulario de edición
  //El first click es para que una vez dentro de la pagina pulse sobre el primer boton editar que encuentre
  await page.getByRole('button', { name: 'Editar' }).first().click(); 

  // Rellenar el formulario con academicYear vacio para que me de error 400 de que falta rellenar un campo
  await page.getByRole('textbox').nth(2).fill(testOver45);

  // Pulsar el botón "Actualizar"
  await page.getByRole('button', { name: 'Actualizar' }).click();

  // Verificar que aparece el mensaje de error (ajústalo si tu frontend lo muestra diferente)
  const errorMessage = page.getByText(expectedErrorMessage);
  await expect(errorMessage).toBeVisible({ timeout: 10000 });
});


//Borro todos los datos
test('Delete all', async ({ page }) => {
  //Me voy a la pagina localhost:16078
  await page.goto('localhost:16078');

  // Pulso sobre el link Front university-demands para que me lleve a mi frontend.
  await page.getByRole('link', { name: 'Front university-demands' }).click();

  // Cargar datos para que puedas borrarlos
  await page.getByRole('button', { name: 'Cargar Datos' }).click();

  //Pulso sobre el boton Elminar Datos
  await page.getByRole('button', { name: 'Eliminar Datos' }).click();
  
  //Selecciono todas las filas de la tabla y filtro para que me devuelva solo los que tienen td dentro . Esto lo hago porque 
  //los nombres de los campos aparece en la primera fila y me la detecta al ver si queda algo asi que asi no la cuento

  const dataRows = page.locator('table tbody tr').filter({
    has: page.locator('td')
  });
  
  //Miro a ver si la tabla ya no tiene nada
  await expect(dataRows).toHaveCount(0);

});
