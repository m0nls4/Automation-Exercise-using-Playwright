const {test, expect} = require ('@playwright/test');

test ("page Playwright test", async ({page})=> 
{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    //selection related is better works for labels
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("123")
    await page.getByRole("button", {name: 'Submit'}).click();
    await page.getByText(" The Form has been submitted successfully!.").isVisible();
    await page.getByRole("link", {name: 'Shop'}).click();
    await page.locator("app-card").filter({hasText:'Nokia Edge'}).getByRole("button").click();




}); 

