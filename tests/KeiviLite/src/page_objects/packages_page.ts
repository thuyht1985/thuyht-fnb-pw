import { Page } from "playwright";
import { BasePage } from "./base_page";

export class PackagePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async navigate(merchantCode: string): Promise<void> {
        await this.goto(`/${merchantCode}/#/KmaManagement`);
        await this.waitForPageLoad();
    }

    async expectVisibleKeiviLitePackage(): Promise<void> {
        // await this.expectVisible(`//span[text()='Lite']`);
        // await this.expectVisible(`text=Lite`);
    }

    async expectVisibleKeiviStandardPackage(): Promise<void> {
        // await this.expectVisible(`//span[text()='Standard']`);
    }

    async expectVisibleKeiviTrialPackage(): Promise<void> {
        // await this.expectVisible(`//span[text()='Trial']`);
        // await this.expectVisible(`text=Trial`);
    }
}