const { test, expect, request } = require('@playwright/test');
const { CartPage } = require('../pageobjects/CartpAGE.JS');
const { ChecOutPage } = require('../pageobjects/CheckOutPage');
const { DashBoardPage } = require('../pageobjects/DashBoardPage');
const { LoginPage } = require('../pageobjects/LoginPage');
const { APIUtils } = require('../utl/APIUtils');
const dataset = JSON.parse(JSON.stringify(require('../utl/ClientAppOBPageData.json')));
const loginPayLoad = {
    userEmail: "anshika@gmail.com",
    userPassword: "Iamking@000"
};
const fakePayLoadOrders = {
    data: [],
    message: "No Orders"
}



const orderPayLoad = { orders: [{ country: "Bangladesh", productOrderedId: "6581ca979fd99c85e8ee7faf" }] }

let response;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayLoad)
    console.log(await apiUtils.getToken())
    response = await apiUtils.createOrder(orderPayLoad)

})

test.beforeEach(() => {

})


test("page Playwright test", async ({ page }) => {

    page.addInitScript((value) => {
        window.localStorage.setItem('token', value)
    }, response.token)

    //await loginPage.validLogIn(dataset.userName, dataset.password);
    //const loginPage = new LoginPage (page);
    //await loginPage.goTo(dataset.url);
    await page.goto("https://rahulshettyacademy.com/client/")

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            //intercepting response: API response -> { Playwright fake response } -> browser -> render
            const response = await page.request.fetch(route.request())
            let body = JSON.stringify(fakePayLoadOrders)
            route.fulfill(
                {
                    response,
                    body
                })
        }
    )

    const orderMenu = page.locator("button[routerlink*='myorders']");
    await orderMenu.click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    console.log(await page.locator(".mt-4").textContent())

});