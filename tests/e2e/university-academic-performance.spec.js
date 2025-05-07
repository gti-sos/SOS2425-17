import { test, expect } from '@playwright/test';


test('has title', async ({ page }) => {
  await page.goto('localhost:16078');

  await expect(page).toHaveTitle(/SOS2425-17/);
});


test('GetLoadInitialData', async ({ page }) => {
  await page.goto(' http://localhost:16078/university-academic-performance')
  await page.getByRole('button', { name: 'Cargar Datos' }).click();
  const dataRows = page.locator('table tbody tr');
  await expect(async () => {
      const count = await dataRows.count();
      expect(count).toBeGreaterThan(0);
    }).toPass();
    
});