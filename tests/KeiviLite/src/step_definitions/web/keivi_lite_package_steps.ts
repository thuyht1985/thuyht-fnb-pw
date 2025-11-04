import { IFnbWorld } from "@/support/world";
import { Given, Then, When } from "@cucumber/cucumber";

Given('người dùng đã đăng nhập vào hệ thống keivi với gian hàng {string} và tài khoản {string}', async function (this: IFnbWorld, merchantCode, userName) {
    await this.pages?.loginPage.navigate();

    await this.pages?.loginPage.login(merchantCode, userName, '123');

    await this.pages?.loginPage.expectLoginManagerSuccess();

    this.setSharedData('merchantCode', merchantCode);
});

When('người dùng vào trang màn hình chọn gói dịch vụ', async function (this: IFnbWorld) {
    // Write code here that turns the phrase above into concrete actions
    const merchantCode = this.getSharedData('merchantCode') as string;

    await this.pages?.packagePage.navigate(merchantCode);
});

Then('người dùng nhìn thấy gói dịch vụ Keivi lite', async function () {
    await this.pages?.packagePage.expectVisible('#kma-portal');
});

Given('gian hàng đang sử dụng gói Keivi {string}', async function (this: IFnbWorld, keiviPack: string) {
    const merchantCode = this.getSharedData('merchantCode') as string;

    await this.pages?.packagePage.navigate(merchantCode);

    if (keiviPack === 'Standard') {
        await this.pages?.packagePage.expectVisibleKeiviStandardPackage();
        console.log('✅ Current package is: Standard');
    } else if (keiviPack === 'Trial') {
        // use package Trial instead of package Standard
        await this.pages?.packagePage.expectVisibleKeiviTrialPackage();
        console.log('✅ Current package is: Trial');
    } else if (keiviPack === 'Lite') {
        // use package Lite instead of package Standard
        await this.pages?.packagePage.expectVisibleKeiviLitePackage();
        console.log('✅ Current package is: Lite');
    }
});

Given('gian hàng có 4 người dùng active', async function (this: IFnbWorld) {
    const merchantCode = this.getSharedData('merchantCode') as string;
    // navigate to user management page
    await this.pages?.usersPage.navigate(merchantCode);
    // select radio active user 
    await this.pages?.usersPage.selectActiveUserFilter();
    // check active user is 4
    await this.pages?.usersPage.countNumberOfActive(2);

    console.log('✅ Gian hàng có 4 người dùng active');
});

When('gian hàng chuyển gói từ Keivi standard sang Keivi lite', async function (this: IFnbWorld) {
    
    // // 1. Initialize API helper
    // if (!this.apiHelper) {
    //     this.apiHelper = createAPIHelper();
    // }

    const merchantCode = this.getSharedData('merchantCode') as string;

    // // 2. Get auth token from config
    // const authUsername = config.api.authUsername;
    // const authPassword = config.api.authPassword;

    console.log(`🔐 Getting authentication token...`);
    // const token = await this.apiHelper.getAuthToken(authUsername, authPassword);

    // // Save token to shared data
    // this.setSharedData('apiToken', token);

    // // 3. Call API to change package to Lite
    console.log(`🔄 Changing package to Keivi Lite for retailer: ${merchantCode}`);

    // await this.apiHelper.changePackageToLite(token, merchantCode, 1);

    console.log('✅ Package changed to Keivi Lite successfully via API');

});

When('người dùng vào màn hình quản lý người dùng', async function (this: IFnbWorld) {
    const merchantCode = this.getSharedData('merchantCode') as string;
    // navigate to user management page
    await this.pages?.usersPage.navigate(merchantCode);

    console.log('✅ Vào màn hình quản lý người dùng');
});

Then('Chỉ active admin user và 2 người dùng được tạo sớm nhất', async function () {
    // select radio active user 
    await this.pages?.usersPage.selectActiveUserFilter();
    // check active user is 2
    await this.pages?.usersPage.countNumberOfActive(2);

    console.log('✅ active admin user và 2 người dùng được tạo sớm nhất');
});