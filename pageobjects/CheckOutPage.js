const {expect} = require ('@playwright/test');

class ChecOutPage {

constructor (page){
    this.page = page;
    this.cardNum = page.locator('[class*="validate"]');
    //.first();
    this.expMonth = page.locator('.ddl');
    //.first();
    this.expYear = page.locator('.ddl');
    //last();
    this.ccv = page.locator(".small [type='text']");
    //.first();
    this.nameOnCard = page.locator(".field .txt")
    //.nth(2);
    this.coupon = page.locator(".small [type='text']")
    //.last();
    this.country = page.locator("[placeholder*='Country']");
    this.countrydropdown = page.locator('.ta-results');
    this.listbtn = this.countrydropdown.locator("button");
    this.emailLabel = page.locator(".user__name [type='text']")
    //.first();
    this.placeOrderbtn = page.locator('.action__submit');


}

async addCardInfo (cardNumber, option, year, cardCcv, nameCard, coup, countryName, countryFullName){
    await this.cardNum.first().fill(cardNumber);
    await this.expMonth.first().selectOption(option);
    await this.expYear.last().selectOption(year);
    await this.ccv.first().fill(cardCcv);
    await this.nameOnCard.nth(2).fill(nameCard);
    await this.coupon.last().fill(coup);
    await this.country.type(countryName, {delay:1000});
    
    await this.countrydropdown.waitFor();
    const ctCount = await this.listbtn.count();
    
    for (let i=0; i< ctCount; ++i){
        const text = await this.listbtn.nth(i).textContent();

        if (text === countryFullName)
        {
            await this.listbtn.nth(i).click();
            break;
        }

    }

}


async checkEmail (userName){
   
    await expect(this.emailLabel.first()).toHaveText(userName);
    
}

async placeOrder(){
    await this.placeOrderbtn.click();
}


}

module.exports = {ChecOutPage};