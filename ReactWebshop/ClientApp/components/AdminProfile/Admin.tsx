export class Admin{
    private static isAdminLoggedIn: boolean = false;
    private constructor(){
    }
    public static AdminIsLoggedIn(){
        Admin.isAdminLoggedIn = true;
    }
    public static IsAdminLoggedIn(){
        return Admin.isAdminLoggedIn;
    }
    public static LogoutAdmin(){
        Admin.isAdminLoggedIn = false;
    }
}