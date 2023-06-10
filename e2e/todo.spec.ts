import { expect, test } from '@playwright/test'

test('has proper title', async ({ page }) => {
  await page.goto('localhost:5173')

  await expect(page).toHaveTitle('Todos | 0✅ / 0❌')

  // Fill in the new todo input with the value "buy milk"
  // Find aria-label="Add a Todo"
  await page.getByLabel('Add a Todo').fill('buy milk')
  await page.getByLabel('Add a Todo').press('Enter')

  await expect(page).toHaveTitle('Todos | 0✅ / 1❌')

  // Mark the todo as completed
  // Find aria-label="Mark buy milk as completed"
  await page.getByLabel('Mark buy milk as completed').click()

  await expect(page).toHaveTitle('Todos | 1✅ / 0❌')
})

test('removes a todo', async ({ page }) => {
  await page.goto('localhost:5173')

  // Fill in the new todo input with the value "buy milk"
  await page.getByLabel('Add a Todo').fill('buy milk')
  await page.getByLabel('Add a Todo').press('Enter')

  // Click the remove button
  await page.getByLabel('Remove buy milk').click()

  // Assert that the todo is gone
  await expect(page.getByText('buy milk')).not.toBeVisible()
})

test('snapshot of the todo list', async ({ page }) => {
  await page.goto('localhost:5173')

  // Fill in the new todo input with the value "buy milk"
  await page.getByLabel('Add a Todo').fill('buy milk 1')
  await page.getByLabel('Add a Todo').press('Enter')
  await page.getByLabel('Add a Todo').fill('buy milk 2')
  await page.getByLabel('Add a Todo').press('Enter')
  await page.getByLabel('Add a Todo').fill('buy milk 3')
  await page.getByLabel('Add a Todo').press('Enter')
  await page.getByLabel('Add a Todo').fill('buy milk 4')
  await page.getByLabel('Add a Todo').press('Enter')
  await page.getByLabel('Add a Todo').fill('buy milk 5')
  await page.getByLabel('Add a Todo').press('Enter')

  await page.getByLabel('Mark buy milk 1 as completed').click()

  // Take a snapshot of the todo list
  await expect(page).toHaveScreenshot('todo-list.png', {
    maxDiffPixels: 21,
  })
})
