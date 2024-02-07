const {test, expect, request} = require ('@playwright/test');
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



const orderPayLoad = {orders: [{country: "Bangladesh", productOrderedId: "6581ca979fd99c85e8ee7faf"}]}

let response;

test.beforeAll(async ()=>
{
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayLoad)
    console.log(await apiUtils.getToken())
    response = await apiUtils.createOrder(orderPayLoad)

})

test.beforeEach(()=>
{

})


test ("page Playwright test", async ({page})=> 
{

    page.addInitScript((value)=>
    {
        window.localStorage.setItem('token', value)
    }, response.token)
   
    //await loginPage.validLogIn(dataset.userName, dataset.password);
    //const loginPage = new LoginPage (page);
    //await loginPage.goTo(dataset.url);
    await page.goto("https://rahulshettyacademy.com/client/")

    const orderMenu = page.locator("button[routerlink*='myorders']");
    await orderMenu.click();

    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
    const orderCount = await rows.count();

    for (let i=0; i < orderCount; ++i){
        const orderedIds = await rows.nth(i).locator("th").textContent();
        if (response.orderId.includes(orderedIds)){
            await rows.nth(i).locator(".btn-primary").click();
            break;
        }
    }

    
    const OrderIdFromDetails = await page.locator(".col-text").textContent()
    console.log(OrderIdFromDetails);
    await page.pause();
    expect(response.orderId.includes(OrderIdFromDetails)).toBeTruthy();


});