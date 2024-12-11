package project.backend.controller_bodies.account_controller;



public class AccountLoginBody {
    public String email;
    public String password;

    public AccountLoginBody() {
    }

    public AccountLoginBody(AccountLoginBody body) {
        this.email = body.email;
        this.password = body.password;
    }
}
