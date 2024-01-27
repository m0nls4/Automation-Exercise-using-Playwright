const {expect} = require ('@playwright/test');
class CartPage {

constructor(page){

this.page = page;
this.checkOut = page.locator("text=Checkout");
this.bool = this.page.locator("h3:has-text('adidas original')");



}

async checkOutItem(){
    await this.page.locator("div li").last().waitFor();
    await this.bool.isVisible();
    await expect(this.bool).toBeTruthy();
    
}

async navigateToCheckOut (){
    await this.checkOut.click();
}



}

module.exports = {CartPage};