import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Foo } from '../resources/data/foos-object'

@inject(Router, Foo)

export class Foos {
    constructor(router, foos) {
        this.router = router;
        this.foos = foos;
        this.message = 'Foos';
        this.showFooEditForm = false;

    }

    async activate() {
        await this.getFoos();
    }

    attached() {
        feather.replace()
    }

    async getFoos() {
        await this.foos.getFoos();
    }
    newFoo() {
        this.foo = {
            firstName: "",
            lastName: "",
            active: true,
            role: "foo",
            email: "",
            password: ""
        }
        this.openEditForm();
    }

    editFoo(foo) {
        this.foo = foo;
        this.showFooEditForm = true;
    }

    openEditForm() {
        this.showFooEditForm = true;
        setTimeout(() => { $("#firstName").focus(); }, 500);
    }

    changeActive(foo) {
        this.foo = foo;
        this.save();
    }

    async save() {
        if (this.foo && this.foo.firstName && this.foo.lastName
            && this.foo.email && this.foo.password) {
            await this.foos.saveFoo(this.foo);
            await this.getFoos();
            this.back();
        }
    }

    async delete() {
        if (this.foo) {
            await this.foos.delete(this.foo);
            await this.getFoos();
            this.back();
        }
    }

    back() {
        this.showFooEditForm = false;
    }

    logout() {
        this.router.navigate('home');
    }

}