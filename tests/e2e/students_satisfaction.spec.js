// @ts-check
import { test, expect } from '@playwright/test';

test('título principal', async ({ page }) => {
  await page.goto('localhost:16078');
  await expect(page).toHaveTitle(/SOS2425-17/);
});

test('acceso a students satisfaction', async ({ page }) => {
  await page.goto('localhost:16078');
  await page.getByRole('link', { name: 'Front students_satisfaction' }).click();
  await expect(page).toHaveTitle(/Students Satisfaction/);
});

test('cargar datos iniciales', async ({ page }) => {
  await page.goto('localhost:16078');
  await page.getByRole('link', { name: 'Front students_satisfaction' }).click();
  await page.getByRole('button', { name: 'Cargar Datos' }).click();

  const dataRows = page.locator('table tbody tr').filter({ has: page.locator('td') });

  await expect(async () => {
    const count = await dataRows.count();
    expect(count).toBeGreaterThan(0);
  }).toPass();
});

test('filtrar por carrera y ciudad', async ({ page }) => {
    const testCarrera = 'GRADO EN ECONOMÍA';
    const testCiudad = 'MÉRIDA';
  
    await page.goto('localhost:16078');
    await page.getByRole('link', { name: 'Front students_satisfaction' }).click();
    await page.getByRole('button', { name: 'Cargar Datos' }).click();
    await page.getByRole('button', { name: 'Filtrar' }).click();
  
    await page.getByRole('textbox').nth(0).fill(testCarrera);
    await page.getByRole('textbox').nth(1).fill(testCiudad);
    await page.getByRole('button', { name: 'Aplicar' }).click();
  
    const filteredRows = page.locator('table tbody tr').filter({ hasText: testCiudad });
    await expect(async () => {
      const count = await filteredRows.count();
      expect(count).toBeGreaterThan(0);
    }).toPass();
  
    await page.getByRole('button', { name: 'Limpiar Filtros' }).click();
    const allRows = page.locator('table tbody tr').filter({ has: page.locator('td') });
    await expect(async () => {
      const count = await allRows.count();
      expect(count).toBeGreaterThan(0);
    }).toPass();
  });
  

test('crear y borrar registro de satisfacción', async ({ page }) => {
  const testCarrera = '__TEST_CARRERA__';
  const testCiudad = '__TEST_CIUDAD__';
  const testSatisfaccion = '8.5';
  const testTasaAbandono = '0.2';
  const testTasaRendimiento = '0.95';
  const testYear = '2042-2043';

  await page.goto('localhost:16078');
  await page.getByRole('link', { name: 'Front students_satisfaction' }).click();
  await page.getByRole('button', { name: 'Crear' }).click();

  await page.getByRole('textbox').nth(0).fill(testCarrera);
  await page.getByRole('textbox').nth(1).fill(testCiudad);
  await page.getByRole('textbox').nth(2).fill(testSatisfaccion);
  await page.getByRole('textbox').nth(3).fill(testTasaAbandono);
  await page.getByRole('textbox').nth(4).fill(testTasaRendimiento);
  await page.getByRole('textbox').nth(5).fill(testYear);

  await page.getByRole('button', { name: 'Crear' }).click();

  const row = page.locator('tr').filter({ hasText: testCarrera });
  await expect(row).toContainText(testCiudad);
  await expect(row).toContainText(testSatisfaccion);
  await expect(row).toContainText(testTasaAbandono);
  await expect(row).toContainText(testTasaRendimiento);
  await expect(row).toContainText(testYear);

  await row.getByRole('button', { name: 'Borrar' }).click();
  await expect(row).toHaveCount(0);
});

test('eliminar todos los datos', async ({ page }) => {
  await page.goto('localhost:16078');
  await page.getByRole('link', { name: 'Front students_satisfaction' }).click();
  await page.getByRole('button', { name: 'Cargar Datos' }).click();
  await page.getByRole('button', { name: 'Eliminar Datos' }).click();

  const dataRows = page.locator('table tbody tr').filter({ has: page.locator('td') });
  await expect(dataRows).toHaveCount(0);
});
