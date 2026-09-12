import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LogInPage extends BasePage {
    //Define your locators as private properties for encapsulation, it ensures that test scripts cannot accidentally manipulate or misuse the page elements directly
    private usernameInput = this.page.locator('[data-test="username"]');
    private passwordInput = this.page.locator('[data-test="password"]');
    private loginButton = this.page.locator('[data-test="login-button"]');
    private errorMessage = this.page.locator('[data-test="error"]');

    constructor(page: Page) {
        super(page); //is a mandatory command that says: "Hey parent (BasePage), take this browser page instance and initialize yourself with it!"
    }

    async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async getErrorMessage(): Promise<string> {
        return await this.errorMessage.textContent() || '';
    }
};