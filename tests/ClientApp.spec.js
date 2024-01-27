const {test, expect} = require ('@playwright/test');

test ("page Playwright test", async ({page})=> 
{
    

    await page.goto("https://rahulshettyacademy.com/client/");
    const userEmail = page.locator('#userEmail');
    const password = page.locator('#userPassword');
    const logIn = page.locator('#login');
    const cardTitles = page.locator('.card-body b');
    const products = page.locator('.card-body');
    const productName = "adidas original";
    const cart = page.locator("[routerlink*='cart']");
    const email = "anshika@gmail.com";


    await userEmail.fill(email);
    await password.fill("Iamking@000");
    await logIn.click()
    //await page.waitForLoadState('networkidle'); //DISCOURAGED wait until there are no network connections 
    //for at least 500 ms. Don't use this method for testing, rely on web assertions to assess readiness instead.
    await cardTitles.first().waitFor();
    const allTitles = await cardTitles.allTextContents(); 
    console.log(allTitles);

    //find ADDIDAS ORIGINAL
    const count = await products.count();

    for (let i=0; i < count; ++i){
       if (await products.nth(i).locator('b').textContent() === productName){

        await products.nth(i).locator("text= Add To Cart").click();
        break;

       }
    }
    
    await cart.click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('adidas original')").isVisible();
    await expect(bool).toBeTruthy();
    const checkOut = page.locator("text=Checkout");
    await checkOut.click();
    const cardNum = page.locator('[class*="validate"]').first();
    cardNum.fill("4542 9931 9292 2293");
    const expMonth = page.locator('.ddl').first();
    await expMonth.selectOption("05");
    const expYear = page.locator('.ddl').last();
    await expYear.selectOption("23");
    const ccv = page.locator(".small [type='text']").first();
    await ccv.fill("223");
    const nameOnCard = await page.locator(".field .txt").nth(2);
    await nameOnCard.fill("anshika");
    const coupon = page.locator(".small [type='text']").last();
    await coupon.fill("4576");

    
    const country = page.locator("[placeholder*='Country']");
    await country.type("bang", {delay:1000});
    const countrydropdown = page.locator('.ta-results');
    await countrydropdown.waitFor();
    const listbtn = countrydropdown.locator("button");
    const ctCount = await listbtn.count();
    
    for (let i=0; i< ctCount; ++i){
        const text = await listbtn.nth(i).textContent();

        if (text === " Bangladesh")
        {
            await listbtn.nth(i).click();
            break;
        }

    }
    
    const emailLabel = await page.locator(".user__name [type='text']").first();
    expect(emailLabel).toHaveText(email);
    const placeOrder = page.locator('.action__submit');
    await placeOrder.click();
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