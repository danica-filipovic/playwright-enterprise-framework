import { test, expect } from '@playwright/test';
import { LogInPage } from '../pages/LogInPage';
import * as testData from '../data/testData.json';

test.describe('SauceDemo Login Automation Suite', () => {

    let loginPage: LogInPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LogInPage(page);
        await loginPage.navigate('https://www.saucedemo.com/');
    });

    test.describe('Successful Login Scenarios (Happy Path & Variants)', () => {

        test('Should log in successfully with standard user', async ({ page }) => {
            await loginPage.login(testData.users.standard.username, testData.users.standard.password);
            await expect(page).toHaveURL(/.*inventory.html/);
        });

        test('Should handle performance glitch user with extended load times', async ({ page }) => {
            // Playwright's auto-waiting handles the intentional lag automatically
            await loginPage.login(testData.users.performanceGlitch.username, testData.users.performanceGlitch.password);
            await expect(page).toHaveURL(/.*inventory.html/);
        });

        test('Should log in problem user despite UI bugs', async ({ page }) => {
            await loginPage.login(testData.users.problem.username, testData.users.problem.password);
            await expect(page).toHaveURL(/.*inventory.html/);
        });

        test('Should log in error user successfully', async ({ page }) => {
            await loginPage.login(testData.users.errorUser.username, testData.users.errorUser.password);
            await expect(page).toHaveURL(/.*inventory.html/);
        });

        test('Should log in visual user successfully', async ({ page }) => {
            await loginPage.login(testData.users.visualUser.username, testData.users.visualUser.password);
            await expect(page).toHaveURL(/.*inventory.html/);
        });

    });

    test.describe('Negative Login Scenarios', () => {

        test('Should display an error message with locked out credentials', async () => {
            await loginPage.login(testData.users.lockedOut.username, testData.users.lockedOut.password);
            
            const errorMessage = await loginPage.getErrorMessage();
            expect(errorMessage).toContain(testData.expectedMessages.lockedOutError);
        });

    });

});