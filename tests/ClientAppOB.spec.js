const {test, expect} = require ('@playwright/test');
const { CartPage } = require('../pageobjects/CartpAGE.JS');
const { ChecOutPage } = require('../pageobjects/CheckOutPage');
const { DashBoardPage } = require('../pageobjects/DashBoardPage');
const { LoginPage } = require('../pageobjects/LoginPage');
const dataset = JSON.parse(JSON.stringify(require('../utl/ClientAppOBPageData.json')));

test.only ("page Playwright test", async ({page})=> 
{
    

    const loginPage = new LoginPage (page);

    await loginPage.goTo(dataset.url);
    await loginPage.validLogIn(dataset.userName, dataset.password);
    
    
    const dashBoardPage = new DashBoardPage (page);
    await dashBoardPage.searchProductAddCart(dataset.productName);
    await dashBoardPage.navigateToCart();
    
    const cartPage = new CartPage (page);
    await cartPage.checkOutItem(); 
    await cartPage.navigateToCheckOut();

    const chekOutPage = new ChecOutPage (page);
    
   
    await chekOutPage.addCardInfo(dataset.cardNumber, dataset.option, dataset.year, dataset.cardCcv, dataset.nameCard, dataset.coup, dataset.countryName, dataset.countryFullName);    
    await chekOutPage.checkEmail(dataset.userName);
    await chekOutPage.placeOrder();
    
    //Upto with pageobejects//

    const thanks = page.locator(".hero-primary");
    await expect (thanks).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

    const orderMenu = page.locator("button[routerlink*='myorders']");
    await orderMenu.click();

    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
    const orderCount = await rows.count();

    for (let i=0; i < orderCount; ++i){
        const orderedIds = await rows.nth(i).locator("th").textContent();
        if (orderId.includes(orderedIds)){
            await rows.nth(i).locator(".btn-primary").click();
            break;
        }
    }

    
    const OrderIdFromDetails = await page.locator(".col-text").textContent()
    console.log(OrderIdFromDetails);
    await expect(orderId.includes(OrderIdFromDetails)).toBeTruthy();


});