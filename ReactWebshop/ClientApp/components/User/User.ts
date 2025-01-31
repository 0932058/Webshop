import Klant from "../../../TypescriptModels/Klant";
import { Admin } from "../AdminProfile/Admin";

//The class for the user that logs in
//It stores the data of the user
//It has also a method that can be used to check if an user is logged in.


export class User{
    private static pk: number;
    private static firstName: string;
    private static lastName: string;
    private static email: string;
    private static username:string;
    private static password: string;
    private static streetname: string;
    private static streetnumber: string;
    private static plaats: string;
    private static postcode: string;
    private static wishListFK: number;
    private static shoppingCartFK: number;
    private static orderFK: number | number[]
    private static user: User;
    private static isLoggedIn: boolean = false;
    private constructor(){
    }
    //The singleton pattern, only one instance of this class can be created (notice private constructor)
    public static CreateUser() : User{
        if(User.user == null){
            User.user = new User();
            User.isLoggedIn = true;
            Admin.LogoutAdmin();
            return User.user;
        }
        throw new Error("There is already a user logged in!")
    }
    public static IsUserLoggedIn() : boolean{
        return User.isLoggedIn;
    }
    public static getStorageId() : number{
        let locId = Number(localStorage.getItem("currentklant"))
        if(locId === 0){
            return locId
        }

        locId = locId - 547

        return  locId
    }

    public static putStorageId(id : number) : void {
        let locId = Number(localStorage.getItem("currentklant"))
        
        locId = locId - 547
        
        locId = locId * 0.0001 
        
        localStorage.setItem("currentklant", locId.toString())
    }

    //When the user logs the data
    //Come into this method and then the user gets created
    public SetAccount(account: Klant){
        User.isLoggedIn = true;
        User.pk = account.klantId;
        User.firstName = account.klantNaam;
        User.lastName = account.klantAchternaam;
        User.email = account.klantMail;
        User.username = account.username;
        User.password = account.password;
        User.streetname = account.klantStraat;
        User.streetnumber = account.klantStraatnmr;
        User.postcode = account.klantPostcode;
        User.plaats = account.klantPlaats;

    }
    public static LogUserOut(){
        User.isLoggedIn = false;
        User.user = null;
        Admin.LogoutAdmin();
    }
    public static GetPK(){
        return User.pk;
    }
    public static GetFirstname(){
        return User.firstName;
    }
    public static GetLastname(){
        return User.lastName;
    }
    public static GetEmail(){
        return User.email;
    }
    public static GetPlaats(){
        return User.plaats;
    }
    public static GetUsername(){
        return User.username;
    }
    public static GetPassword(){
        return User.password;
    }
    public static GetStreetname(){
        return User.streetname;
    }
    public static GetStreetnumber(){
        return User.streetnumber;
    }
    public static getPostcode(){
        return User.postcode;
    }
    public static GetWishListFK(){
        return User.wishListFK;
    }
    public static GetShoppingCartFK(){
        return User.shoppingCartFK;
    }
    public GetOrderFK(){
        return User.orderFK;
    }
}
export default User;
