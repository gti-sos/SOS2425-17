// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('localhost:16078');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/SOS2425-17/);
});

test('GetLoadInitialData', async ({ page }) => {
    // Ir a la página principal
    await page.goto(' http://localhost:16078/students_satisfaction')
  
    // Clic en el botón "Cargar Datos"
    await page.getByRole('button', { name: 'Cargar Datos' }).click();
  
    // Verificar que hay al menos una fila cargada
    const dataRows = page.locator('table tbody tr');
    await expect(async () => {
        const count = await dataRows.count();
        expect(count).toBeGreaterThan(0);
      }).toPass();
  });
//Filtro por un dato especifico y desde un año hasta otro y luego le doy a limpiar filtros
test('Filter', async ({ page }) => {
  const testLocation = "BADAJOZ";

  // Ir a la página principal
  await page.goto('http://localhost:16078/students_satisfaction');
  // Cargar los datos
  await page.getByRole('button', { name: 'Cargar Datos' }).first().click();

  // Abro el cuestionario de filtros dandole a filtrar
  await page.getByRole('button', { name: 'Filtrar' }).first().click();

  // Relleno los campos del filtro que
  await page.getByRole('textbox').nth(1).fill(testLocation);

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

//Filtro por un dato que no existe (404)
test('Filter 404', async ({ page }) => {
    const testLocation = "Huelva";
    
    // Ir a la página principal
    await page.goto('http://localhost:16078/students_satisfaction');

    // Cargar los datos
    await page.getByRole('button', { name: 'Cargar Datos' }).first().click();

    // Abrir los filtros
    await page.getByRole('button', { name: 'Filtrar' }).first().click();

    // Rellenar el filtro
    await page.getByRole('textbox').nth(1).fill(testLocation);

    // Aplicar el filtro
    await page.getByRole('button', { name: 'Aplicar' }).click();

    // Buscar filas con celdas reales que tengan el texto buscado
    const rows = page.locator('table tbody tr').filter({ has: page.locator('td') });

    // Esperar que no haya ninguna fila con celdas (es decir, ningún resultado válido)
    await expect(rows).toHaveCount(0);
});
/*
test('Create and delete demand', async ({ page }) => {
  
  //location,degree,over45,spanishFirst,foreigners,graduated,academicYear
  const testcarrera = "testcarrera";
  const testciudad = "testciudad";
  const tests1 = "1";
  const tests2 = "2";
  const tests3 = "3";

  //Me voy a la pagina localhost:16078
  await page.goto('http://localhost:16078/students_satisfaction');
   
   // Click en el botón "Crear" que abre el formulario
   await page.getByRole('button', { name: 'Crear' }).first().click();
 
   // Esperar a que aparezca el formulario de creación
   await page.getByRole('heading', { name: 'Crear Demanda de Satisfacción Estudiantil' }).waitFor();
 

  // crear el contacto.
  await page.getByRole('textbox').nth(0).fill(testcarrera);
  await page.getByRole('textbox').nth(1).fill(testciudad);
  await page.getByRole('textbox').nth(2).fill(tests1);
  await page.getByRole('textbox').nth(3).fill(tests2);
  await page.getByRole('textbox').nth(4).fill(tests3);



  //Pulso sobre el boton Create
  await page.getByRole('button', { name: 'Crear' }).click();

  //Creo una variable que busque dentro del tr un texto que sea la localización que hemos creado.
  const demandRow = page.locator('tr').filter({ hasText: testcarrera });

  //Miro a ver si esa linea contiene los demas campos que hemos creado
  await expect(demandRow).toContainText(testciudad);
  await expect(demandRow).toContainText(tests1);
  await expect(demandRow).toContainText(tests2);
  await expect(demandRow).toContainText(tests3);


  //Busco el boton que tiene el nombre de Delete dentro de la fila que contiene el contacto
  const deleteButton = demandRow.getByRole('button', { name: 'Borrar' });
  //Borro el contacto 
  await deleteButton.click();
  //Miro a ver si la fila ya no tiene nada
  await expect(demandRow).toHaveCount(0);
});

test('Create ERROR 400', async ({ page }) => {
    // Datos de prueba (incompletos)
    const testCarrera = "Ingeniería de Prueba";
    const testCiudad = "Ciudad de Prueba";
    const testSatisfaccionTotal = "4.5";
    const testSatisfaccionEstudiantes = "4.7";
    const expectedMessage = "¡Tienes que rellenar todos los campos!";
  
    // Navegar a la página principal
    await page.goto('http://localhost:16078/students_satisfaction');
  
    // Clic en el botón "Crear"
    await page.getByRole('button', { name: 'Crear' }).click();
  
    // Esperar a que se abra el formulario
    await page.getByRole('heading', { name: 'Crear Demanda de Satisfacción Estudiantil' }).waitFor();
  
    // Rellenar parcialmente el formulario (dejando vacío el campo de Satisfacción PDI)
    await page.getByRole('textbox').nth(0).fill(testCarrera);               // Carrera
    await page.getByRole('textbox').nth(1).fill(testCiudad);                // Ciudad
    await page.getByRole('textbox').nth(2).fill(testSatisfaccionTotal);     // Satisfacción Total
    await page.getByRole('textbox').nth(3).fill(testSatisfaccionEstudiantes); // Satisfacción Estudiantes
    // NOTA: No se rellena el campo .nth(4) = Satisfacción PDI
  
    // Clic en el botón "Crear"
    await page.getByRole('button', { name: 'Crear' }).click();
  
    // Verificar que se muestra el mensaje de error
    await expect(page.getByText(expectedMessage)).toBeVisible({ timeout: 5000 });
  });
  */

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
