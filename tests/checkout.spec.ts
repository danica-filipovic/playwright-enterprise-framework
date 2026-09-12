import { test, expect } from '@playwright/test';
import { LogInPage } from '../pages/LogInPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import * as testData from '../data/testData.json';

test.describe('SauceDemo End-to-End Checkout Flow', () => {

    let loginPage: LogInPage;
    let inventoryPage: InventoryPage;
    let checkoutPage: CheckoutPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LogInPage(page);
        inventoryPage = new InventoryPage(page);
        checkoutPage = new CheckoutPage(page);

        await loginPage.navigate('https://www.saucedemo.com/');
    });

    test('Should complete full purchase journey successfully', async ({ page }) => {
        // 1. Login
        await loginPage.login(testData.users.standard.username, testData.users.standard.password);
        await expect(page).toHaveURL(/.*inventory.html/);

        // 2. Add item to cart and verify badge
        await inventoryPage.addBackpackToCart();
        await inventoryPage.verifyCartBadgeCount('1');
        await inventoryPage.goToCart();
        await expect(page).toHaveURL(/.*cart.html/);

        // 3. Proceed to checkout and fill details
        await checkoutPage.proceedToCheckout();
        await expect(page).toHaveURL(/.*checkout-step-one.html/);
        
        await checkoutPage.fillCustomerDetails(
            testData.checkoutInfo.firstName,
            testData.checkoutInfo.lastName,
            testData.checkoutInfo.postalCode
        );
        await expect(page).toHaveURL(/.*checkout-step-two.html/);

        // 4. Finish order and assert success message
        await checkoutPage.finishOrder();
        await expect(page).toHaveURL(/.*checkout-complete.html/);

        const successMessage = await checkoutPage.getSuccessHeader();
        expect(successMessage).toContain(testData.expectedMessages.successOrder);
    });

});