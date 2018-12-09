import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { AuthService } from 'aurelia-auth';

@inject(Router, AuthService)
export class NavBar {

    constructor(router, auth) {
        this.authenticated = false;
        this.auth = auth;
        this.router = router;
    }

    bind() {
        this.isAuthenticated = this.auth.isAuthenticated();
    }

    attached() {
        $('.navbar-nav a').on('click', function () {
            $('.navbar-nav').find('li.active').removeClass('active');
            $(this).parent('li').addClass('active');
        });
    }

    login() {
        return this.auth.login(this.email, this.password)
            .then(response => {
                this.fooObj = response.foo;
                sessionStorage.setItem("fooObj", JSON.stringify(this.fooObj));
                this.loginError = "";
                this.isAuthenticated = this.auth.isAuthenticated();
                this.router.navigate('home');
            })
            .catch(error => {
                console.log(error);
                this.authenticated = false;
                this.loginError = "Invalid credentials.";
            });
    }

    logout() {
        if (this.fooObj) this.auth.logout(this.fooObj.email);
        sessionStorage.removeItem('foo');
        this.isAuthenticated = this.auth.isAuthenticated();
        this.auth.logout();
    }

}