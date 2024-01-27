class LoginPage{


constructor (page){

this.page = page;
this.userEmail = page.locator('#userEmail');
this.password = page.locator('#userPassword')
this.logIn = page.locator('#login');


}


async goTo (url){

    await this.page.goto(url);
}

async validLogIn(userEmail, password){
    await this.userEmail.fill(userEmail);
    await this.password.fill(password);
    await this.logIn.click()
}

}

module.exports = {LoginPage};