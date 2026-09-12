import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
    // Private locators for encapsulation
    private readonly addToCartSauceLabsBackpack = this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    private readonly cartButton = this.page.locator('[data-test="shopping-cart-link"]');
    private readonly cartBadge = this.page.locator('[data-test="shopping-cart-badge"]');

    constructor(page: Page) {
        super(page);
    }
    async addBackpackToCart() {
        await this.addToCartSauceLabsBackpack.click();
    }

    async verifyCartBadgeCount(expectedCount: string) {
        await expect(this.cartBadge).toHaveText(expectedCount);
    }

    async goToCart() {
        await this.cartButton.click();
    }
}