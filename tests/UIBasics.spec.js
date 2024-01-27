const {test, expect} = require ('@playwright/test');


test ("browser context Playwright test", async ({browser})=> 
{
const context = await browser.newContext(); //to open fresh instance of a browser so its like incognito, use 'newContext'
const page = await context.newPage(); 
await page.goto("https://google.com");
console.log (await page.title());
await expect(page).toHaveTitle('Google');

});  // async and awaits come together, if want to use await then async should be 
//with function name, In JS codes are not run sequentially, await helps to finish one step and then next step

//functions that doo not have any name (anonymous) can also be written as '()=>' instead of 'function()' code becomes lighter

//'browser' is one kind of global fixture, test knows it. To use that browser inside function we need to use the ficture
//inside function parameter. Now for Playwright fixtures we need to write parameters like '{browser}' otherwise, 
//it will not be used as Playwright fixtures



test ("page Playwright test", async ({page})=> 
{
    

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
    const password = page.locator("[name='password']");
    const signIn = page.locator('#signInBtn');
    const errorMessage = page.locator("[style*='block']")
    const cardTitles = page.locator('.card-body a');
    console.log (await page.title());
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
    //CSS, xpath ; elements finder
    await userName.fill("monalisa");
    await password.fill("pass");
    await signIn.click();
    console.log ( errorMessage.textContent());
    await expect(errorMessage).toContainText('Incorrect username/password.');

    await userName.fill("rahulshettyacademy");
    await password.fill("learning");
    await signIn.click();
    //console.log(await cardTitles.first().textContent());
   //console.log(await cardTitles.nth(1).textContent());
   await cardTitles.last().waitFor(); 
   const allTitles = await cardTitles.allTextContents();
    console.log (allTitles);


}); 

test ("UI Controls", async ({page})=> 
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
    const password = page.locator("[name='password']");
    const dropdown = page.locator('select.form-control');
    const signIn = page.locator('#signInBtn');
    const radioBtn = page.locator('.customradio').last();
    const okayBtn = page.locator('#okayBtn');
    const terms = page.locator('#terms');
    const documentLink = page.locator("[href*='documents-request']");

    


    await userName.fill("rahulshettyacademy");
    await password.fill("learning");
    await dropdown.selectOption("consult");
    await radioBtn.check();
    await okayBtn.click();
    await terms.check();



    //await signIn.click();
    expect(await terms.isChecked()).toBeTruthy();
    await expect(radioBtn).toBeChecked();  
    await expect(terms).toBeChecked();
    await terms.uncheck();
    expect(await terms.isChecked()).toBeFalsy();
    await expect (documentLink).toHaveAttribute('class', 'blinkingText');

   


    //await page.pause();


});

test ("Child Windows", async ({browser})=> {
    const context = await browser.newContext(); //to open fresh instance of a browser so its like incognito, use 'newContext'
    const page = await context.newPage(); 
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
    const documentLink = page.locator("[href*='documents-request']");

    const [newPage] = await Promise.all([

    context.waitForEvent('page'),
    documentLink.click(),

    ])
    
    const redPara = newPage.locator('.red');
    const text = await redPara.textContent();
    await expect(redPara).toContainText("Please email us at mentor@rahulshettyacademy.com with below template to receive response");

    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    //console.log(domain);
    
    await userName.fill(domain);
    console.log(await userName.textContent());
    //await page.pause();



});