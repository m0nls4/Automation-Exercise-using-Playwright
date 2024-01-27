class DashBoardPage{


    constructor(page){

        this.page = page;
        this.cardTitles = page.locator('.card-body b');
        this.products = page.locator('.card-body');
        this.cart = page.locator("[routerlink*='cart']")

    }

    async searchProductAddCart(productName){

        await this.cardTitles.first().waitFor();
        const allTitles = await this.cardTitles.allTextContents(); 
        console.log(allTitles);

    //find ADDIDAS ORIGINAL
    const count = await this.products.count();

    for (let i=0; i < count; ++i){
       if (await this.products.nth(i).locator('b').textContent() === productName){

        await this.products.nth(i).locator("text= Add To Cart").click();
        break;

       }
    }


    }

    async navigateToCart (){
        await this.cart.click();
    }





}

module.exports = {DashBoardPage};