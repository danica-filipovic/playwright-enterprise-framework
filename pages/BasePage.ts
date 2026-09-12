import { Page } from '@playwright/test'; //Imports the Page interface type from the Playwright library

    //This will act as the parent class for all your other page objects
export class BasePage { 
    //Declares a variable called page of type Page. Marking it as protected means this page instance can be accessed directly by the class itself and any child page that extends it.
    protected page: Page;

    // Prepares a page
    constructor(page: Page) {
        this.page = page; 
    }

    // Common navigation method shared across pages.A reusable helper method that takes any URL string and tells the browser to navigate to it
    async navigate(url: string): Promise<void> { //Promise<void> translates to: "This is an async function that performs a task, finishes what it's doing, and returns nothing when it's complete."
        await this.page.goto(url);
    }

    // Common method to get and verify if we are on the wanted page
    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }







}