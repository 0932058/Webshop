import {account} from "../DatabaseSimulation/TableTypes";

//The class for the user that logs in
//It stores the data of the user
//It has also a method that can be used to check if an user is logged in.

export class User{
    private static pk: number;
    private firstName: string;
    private lastName: string;
    private email: string;
    private username:string;
    private password:string;
    private wishListFK: number;
    private shoppingCartFK: number;
    private orderFK: number | number[]
    private static user: User;
    private static isLoggedIn: boolean = false;
    private constructor(){
    }
    //The singleton pattern, only one instance of this class can be created (notice private constructor)
    public static CreateUser() : User{
        if(User.user == null){
            User.user = new User();
            User.isLoggedIn = true;
            return User.user;
        }
        throw new Error("There is already a user created!")

    }
    public static IsUserLoggedIn() : boolean{
        return User.isLoggedIn;
    }
    //When the user logs the data
    //Come into this method and then the user gets created
    public SetAccount(account: account){
        User.isLoggedIn = true;
        User.pk = account.pk;
        this.firstName = account.firstName;
        this.lastName = account.lastName;
        this.email = account.email;
        this.username = account.username;
        this.password = account.password;
        this.wishListFK = account.wishListFK;
        this.shoppingCartFK = account.shoppingCartFK;
        this.orderFK = account.orderFK
    }
    public static LogUserOut(){
        User.isLoggedIn = false;
        User.user = null;
    }
    public static GetPK(){
        return User.pk;
    }
    public GetFirstname(){
        return this.firstName;
    }
    public GetLastname(){
        return this.lastName;
    }
    public GetEmail(){
        return this.email;
    }
    public GetUsername(){
        return this.username;
    }
    public GetPassword(){
        return this.password;
    }
    public GetWishListFK(){
        return this.wishListFK;
    }
    public GetShoppingCartFK(){
        return this.shoppingCartFK;
    }
    public GetOrderFK(){
        return this.orderFK;
    }
}
export default User;
