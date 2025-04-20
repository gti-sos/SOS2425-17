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
  const testfrom = "0";
  const testto = "10";

  // Ir a la página principal
  await page.goto('http://localhost:16078/students_satisfaction');
  
  // Cargar los datos
  await page.getByRole('button', { name: 'Cargar Datos' }).first().click();

  // Abrir el formulario de filtros
  await page.getByRole('button', { name: 'Filtrar' }).first().click();

  // Rellenar el filtro con la ciudad "BADAJOZ"
  await page.getByRole('textbox').nth(1).fill(testLocation);
  await page.getByRole('textbox').nth(5).fill(testfrom);
  await page.getByRole('textbox').nth(6).fill(testto);

  // Aplicar el filtro
  await page.getByRole('button', { name: 'Aplicar' }).click();

  // Esperar a que las filas de la tabla sean visibles
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

test('Create and delete demand', async ({ page }) => {
    const testcarrera = "testcarrera";
    const testciudad = "testciudad";
    const tests1 = "1";
    const tests2 = "2";
    const tests3 = "3";
  
    await page.goto('http://localhost:16078/students_satisfaction');
  
    // Abrir formulario
    await page.getByRole('button', { name: 'Crear' }).first().click();
    await page.getByRole('heading', { name: 'Crear Demanda de Satisfacción Estudiantil' }).waitFor();
  
    // Rellenar formulario
    await page.getByRole('textbox').nth(0).fill(testcarrera);
    await page.getByRole('textbox').nth(1).fill(testciudad);
    await page.getByRole('textbox').nth(2).fill(tests1);
    await page.getByRole('textbox').nth(3).fill(tests2);
    await page.getByRole('textbox').nth(4).fill(tests3);
  
    // Crear entrada
    await page.getByRole('button', { name: 'Crear' }).click();
  
    // Esperar a que aparezca la fila
    const demandRow = page.locator('tr').filter({ hasText: testcarrera });
  
    // Validar contenido exacto
    await expect(demandRow).toContainText(testciudad);
    await expect(demandRow).toContainText(tests1);
    await expect(demandRow).toContainText(tests2);
    await expect(demandRow).toContainText(tests3); // FIX: Este valor se mostraba en una celda diferente
  
    // Borrar la fila
    const deleteButton = demandRow.getByRole('button', { name: 'Borrar' });
    await deleteButton.click();
  
    // Confirmar que la fila ya no existe
    await expect(demandRow).toHaveCount(0);
  });
  

test('Create ERROR 400', async ({ page }) => {
    // Datos de prueba (incompletos)
    const testCarrera = "Ingeniería de Prueba";
    const testCiudad = "";
    const testSatisfaccionTotal = "4.5";
    const testSatisfaccionEstudiantes = "4.7";
    const testsatisfaccion_pdi="5"
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
    await page.getByRole('textbox').nth(3).fill(testSatisfaccionEstudiantes);
    await page.getByRole('textbox').nth(3).fill(testsatisfaccion_pdi);

    // Satisfacción Estudiantes
    // NOTA: No se rellena el campo .nth(4) = Satisfacción PDI
  
    // Clic en el botón "Crear"
    await page.getByRole('button', { name: 'Crear' }).click();
  
    // Verificar que se muestra el mensaje de error
    await expect(page.getByText(expectedMessage)).toBeVisible({ timeout: 5000 });
  });
  

  test('Create ERROR 409', async ({ page }) => {
  
    // Datos de prueba (mismos que se usarán para el conflicto)
    const testcarrera = "GRADO EN INGENIERÍA ELECTRÓNICA Y AUTOMÁTICA";
    const testciudad = "BADAJOZ";
    const tests1 = "1";
    const tests2 = "2";
    const tests3 = "3";
    const expectedMessage = "¡Esta demanda ya existe!";
  
    // Ir a la página principal
    await page.goto('http://localhost:16078/students_satisfaction');
  
    // Cargar los datos
    await page.getByRole('button', { name: 'Cargar Datos' }).first().click();
     
    // Crear el primer recurso (Demanda)
    await page.getByRole('button', { name: 'Crear' }).first().click();
    await page.getByRole('heading', { name: 'Crear Demanda de Satisfacción Estudiantil' }).waitFor();
  
    // Rellenar el formulario con los datos
    await page.getByRole('textbox').nth(0).fill(testcarrera);
    await page.getByRole('textbox').nth(1).fill(testciudad);
    await page.getByRole('textbox').nth(2).fill(tests1);
    await page.getByRole('textbox').nth(3).fill(tests2);
    await page.getByRole('textbox').nth(4).fill(tests3);
    
    // Pulsar el botón "Crear" para crear el primer recurso
    await page.getByRole('button', { name: 'Crear' }).click();
  
    
  
    // Comprobar que aparece el mensaje de error
    const errorMessage = page.getByText(expectedMessage); 
    await expect(errorMessage).toBeVisible({ timeout: 10000 });
});


test('PUT ', async ({ page }) => {
  // Datos que NO existen en la base de datos
  const testciudad = "8fdfdf0";
  const successMessage = page.getByText('¡Demanda actualizada con éxito!');
  
  
  // Ir a la app
  await page.goto('http://localhost:16078/students_satisfaction');
  
  // Cargar los datos
  await page.getByRole('button', { name: 'Cargar Datos' }).first().click();

  // Ir al formulario de edición
  //El first click es para que una vez dentro de la pagina pulse sobre el primer boton editar que encuentre
  await page.getByRole('button', { name: 'Editar' }).first().click(); 

  // Rellenar el formulario con academicYear vacio para que me de error 400 de que falta rellenar un campo
  await page.getByRole('textbox').nth(2).fill(testciudad);

  // Pulsar el botón "Actualizar"
  await page.getByRole('button', { name: 'Actualizar' }).click();

  // Esperar a que aparezca el mensaje de éxito (si lo tienes)
  await expect(successMessage).toBeVisible({ timeout: 10000 });

});

test('PUT ERROR 404 ', async ({ page }) => {
  // Datos que NO existen en la base de datos
  const testcarrera = "";
  const testciudad = "";
  const tests1 = "";
  const tests2 = "";
  const tests3 = "";
  

  const expectedErrorMessage = "No se encontró la demanda a actualizar";

  // Ir a la app
  await page.goto('http://localhost:16078/students_satisfaction');

  // Cargar los datos
  await page.getByRole('button', { name: 'Cargar Datos' }).first().click();

  // Ir al formulario de edición
  //El first click es para que una vez dentro de la pagina pulse sobre el primer boton editar que encuentre
  await page.getByRole('button', { name: 'Editar' }).first().click(); 

  // Rellenar el formulario con los datos inexistentes
  await page.getByRole('textbox').nth(0).fill(testcarrera);
  await page.getByRole('textbox').nth(1).fill(testciudad);
  await page.getByRole('textbox').nth(2).fill(tests1);
  await page.getByRole('textbox').nth(3).fill(tests2);
  await page.getByRole('textbox').nth(4).fill(tests3);

  // Pulsar el botón "Actualizar"
  await page.getByRole('button', { name: 'Actualizar' }).click();

  // Verificar que aparece el mensaje de error (ajústalo si tu frontend lo muestra diferente)
  const errorMessage = page.getByText(expectedErrorMessage);
  await expect(errorMessage).toBeVisible({ timeout: 10000 });
});

test('PUT ERROR 400', async ({ page }) => {
  // Datos que provocarán el error (en este caso, campo vacío para "ciudad")
  const testciudad = "";  // Ciudad vacía para causar el error
  const expectedErrorMessage = "No se encontró la demanda a actualizar.";

  // Ir a la aplicación
  await page.goto('http://localhost:16078/students_satisfaction');

  // Cargar los datos
  await page.getByRole('button', { name: 'Cargar Datos' }).first().click();

  // Ir al formulario de edición
  await page.getByRole('button', { name: 'Editar' }).first().click();

  // Rellenar el formulario con "ciudad" vacío para provocar el error 400
  await page.getByRole('textbox').nth(1).fill(testciudad);

  // Pulsar el botón "Actualizar"
  await page.getByRole('button', { name: 'Actualizar' }).click();

  // Verificar que aparece el mensaje de error
  const errorMessageLocator = page.locator(`text=${expectedErrorMessage}`);
  await expect(errorMessageLocator).toBeVisible({ timeout: 10000 });

  // Verificar que el mensaje de error tiene el texto esperado
  await expect(errorMessageLocator).toHaveText(expectedErrorMessage);
});


//Borro todos los datos
test('Delete all', async ({ page }) => {
  //Me voy a la pagina localhost:16078
  await page.goto('http://localhost:16078/students_satisfaction');

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
