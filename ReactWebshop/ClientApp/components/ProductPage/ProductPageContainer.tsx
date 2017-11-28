import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {ProductPageComponent} from "./ProductPageComponent";
import {List} from "linqts";
import {User} from "../User/User";

//The product page
interface ProductPageProps{
    clickedOnProduct: null
}
interface ProductPageState{
    product: string; //the product to show is an JSON object because this.state doesn't allow a single object
    consoleImage: string; //The consoleimge that will be shown on the header
    loaded: boolean;
    PKUser: number;
}
export class ProductPage extends React.Component<ProductPageProps, ProductPageState>{
    constructor(props: ProductPageProps){
        super(props);
        //Gets the pk of the logged in user
        var loggedInUserPK = User.IsUserLoggedIn? User.GetPK() : 0

        this.CheckChoosenConsole = this.CheckChoosenConsole.bind(this)
        this.AddToStorage = this.AddToStorage.bind(this);
        this.StorageAddHandler = this.StorageAddHandler.bind(this);
        this.NotificationAlert = this.NotificationAlert.bind(this);    
        this.state = {product: JSON.stringify(this.props.clickedOnProduct), consoleImage: "", loaded: false, PKUser: loggedInUserPK}; 
    }
    //The console image will be loaded
    componentWillMount(){
          
        this.CheckChoosenConsole().then(consoleImage => this.setState({consoleImage: consoleImage, loaded: true}))     
    }
    //The child component (ProductPageComponent) will come into this method when a button is clicked
    StorageAddHandler(isShoppingCart: boolean){
        this.AddToStorage(this.state.product, isShoppingCart);
    }
    //wishlist PK and account manually inserted, this can be changed later that it checks the logged in user's PK.
    AddToStorage(productObjectAsString: string, isShoppingcart: boolean ){
         var product = JSON.parse(productObjectAsString); //the product is parsed to an object to bypass React's this.state rules
     
         //Depending if the paramter Isshoppingcart, a different type of pk and categorykind is choosen
    //     var productToAddToStorage = {pk: isShoppingcart? shoppingCartdata.Count()+ 1 : wishListData.Count() + 1, 
    //     accountFK: this.state.PKUser, productFK: product.pk, productForeignKeyReference: product.category, 
    // categoryKind: isShoppingcart? storageCategory.shoppingCart : storageCategory.wishlist} 

    //     if(productToAddToStorage.categoryKind == storageCategory.shoppingCart){
    //         shoppingCartdata.Add(productToAddToStorage)
    //     }
    //     else{
    //         wishListData.Add(productToAddToStorage);
    //     }
   
        this.NotificationAlert(product, isShoppingcart);
    } 
    //Notifcation pop up when user adds an item to the wishlist or shopping cart
    NotificationAlert(product: any, isForTheShoppingcart: boolean){
        if(isForTheShoppingcart){
            alert(product.name + " is aan de winkelmand toegevoegd")
        }
        else{
            alert(product.name + " is aan uw wenslijst toegevoegd")
        }
    }
    //Depending on the category of the product, the console header gets displayed
    CheckChoosenConsole() : Promise<string>{
        var xbox360Image = "https://www.blogcdn.com/www.joystiq.com/media/2012/09/xbox360logo.jpg"
        var xboxOneImage = "https://cdn.worldvectorlogo.com/logos/xbox-one-2.svg"
        var playstation3Image = "https://www.dafont.com/forum/attach/orig/3/6/36582.jpg"
        var playstation4Image = "https://www.geek.com/wp-content/uploads/2013/02/PlayStation4_logo.jpg"
        var consoleImage = ""

        // switch(JSON.parse(this.state.product).console){
        //     case(consoleType.xbox360):
        //         consoleImage = xbox360Image;
        //         break;
        //     case(consoleType.xboxone):
        //         consoleImage = xboxOneImage;
        //         break;
        //     case(consoleType.playstation3):
        //         consoleImage = playstation3Image;
        //         break;
        //     case(consoleType.playstation4):
        //         consoleImage = playstation4Image
        //         break;
        // }

        return Promise.resolve(consoleImage);
    }
    render() {   
        return ( 
            <div>
                {this.state.loaded ? 
                <ProductPageComponent  product={this.state.product} consoleImage={this.state.consoleImage}
                AddProductToStorage={this.StorageAddHandler}/>    
                :
                <div> Laden... </div>
                }
            </div>
        );
    }
}           
export default ProductPage;