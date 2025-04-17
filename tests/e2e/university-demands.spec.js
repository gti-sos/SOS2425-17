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
