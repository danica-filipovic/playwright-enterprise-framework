import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
    private readonly checkoutButton = this.page.locator('[data-test="checkout"]');
    private readonly firstNameInput = this.page.locator('[data-test="firstName"]');
    private readonly lastNameInput = this.page.locator('[data-test="lastName"]');
    private readonly postalCodeInput = this.page.locator('[data-test="postalCode"]');
    private readonly continueButton = this.page.locator('[data-test="continue"]');
    private readonly finishButton = this.page.locator('[data-test="finish"]');
    private readonly completeHeader = this.page.locator('[data-test="complete-header"]');

    constructor(page: Page) {
        super(page);
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }

    async fillCustomerDetails(firstName: string, lastName: string, postalCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
        await this.continueButton.click();
    }

    async finishOrder() {
        await this.finishButton.click();
    }

    async getSuccessHeader(): Promise<string> {
        return await this.completeHeader.innerText();
    }
}