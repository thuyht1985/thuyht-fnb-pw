import { Page } from "playwright";
import { BasePage } from "./base_page";
import { expect } from '@playwright/test';

export class UsersPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async navigate(merchantCode: string): Promise<void> {
        await this.goto(`/${merchantCode}/#/Users`);
        await this.waitForPageLoad();
    }

    async selectInactiveUserFilter(): Promise<void> {
        // Find the radio button with value="2" for "Ngừng hoạt động"
        // Click on the anchor tag or label to trigger the radio selection
        const inactiveRadioLabel = this.page.locator('input[name="StatusRadio"][value="2"] + a, label:has-text("Ngừng hoạt động")').first();
        await inactiveRadioLabel.waitFor({ state: 'visible', timeout: 5000 });

        // Click the label or anchor to trigger radio selection
        await inactiveRadioLabel.click();

        // Wait for grid to reload after filter
        await this.page.waitForTimeout(1500);
    }

    async selectActiveUserFilter(): Promise<void> {
        // Find the radio button with value="2" for "Đang hoạt động"
        // Click on the anchor tag or label to trigger the radio selection
        const inactiveRadioLabel = this.page.locator('input[name="StatusRadio"][value="1"] + a, label:has-text("Đang hoạt động")').first();
        await inactiveRadioLabel.waitFor({ state: 'visible', timeout: 5000 });

        // Click the label or anchor to trigger radio selection
        await inactiveRadioLabel.click();

        // Wait for grid to reload after filter
        await this.page.waitForTimeout(1500);
    }

    async countNumberOfActive(expectNumberUser : number): Promise<number> {
        
        const activeUserCount = await this.page.locator('td.cell-status').count();
        // Verify count is expected number of user
        expect(activeUserCount).toBe(expectNumberUser);

        return activeUserCount;
    }

    async enableFirstInactiveUser(): Promise<void> {
        // Wait for page to load
        await this.page.waitForTimeout(1000);

        // Find and click "Cho phép hoạt động" button (detail row auto-expanded when only 1 item)
        const enableButton = this.page.locator('a:has-text("Cho phép hoạt động")');

        await enableButton.waitFor({ state: 'visible', timeout: 10000 });
        await enableButton.click();

        // Wait for action to complete
        await this.page.waitForTimeout(1000);
    }
}
