import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {game, wishList,shoppingCart, console, product, category, storage, storageCategory} from "../DatabaseSimulation/TableTypes";
import {gameTableData, wishListData, shoppingCartdata, consoleTableData} from "../DatabaseSimulation/FakeDatabase";
import {consoleType} from "../DatabaseSimulation/ConsoleTable";
import {accessoires} from "../DatabaseSimulation/TableTypes";
import {ProductPageComponent} from "./ProductPageComponent";
import {List} from "linqts";



//The product page
interface ProductPageProps{
    clickedOnProduct: game | console | accessoires; 
}

interface ProductPageState{
    product: string; //the product to show is an JSON object because this.state doesn't allow a single object
    consoleImage: string; //The consoleimge that will be shown on the header
    loaded: boolean;
}
export class ProductPage extends React.Component<ProductPageProps, ProductPageState>{
    constructor(props: ProductPageProps){
        super(props);
        this.CheckChoosenConsole = this.CheckChoosenConsole.bind(this)
        this.AddToStorage = this.AddToStorage.bind(this);
        this.StorageAddHandler = this.StorageAddHandler.bind(this);
        this.NotificationAlert = this.NotificationAlert.bind(this);    
        this.state = {product: JSON.stringify(this.props.clickedOnProduct), consoleImage: "", loaded: false}; 
    }
    //The console image will be loaded
    componentWillMount(){
        this.CheckChoosenConsole().then(consoleImage => this.setState({consoleImage: consoleImage, loaded: true}))     
    }
    //The child component (ProductPageComponent) will come into this method when a button is clicked
    StorageAddHandler(isShoppingCart: boolean){
        this.AddToStorage(this.state.product, 1, isShoppingCart);
    }
    //wishlist PK and account manually inserted, this can be changed later that it checks the logged in user's PK.
    AddToStorage(productObjectAsString: string, loggedInUser: number, isShoppingcart: boolean ){
         var product = JSON.parse(productObjectAsString); //the product is parsed to an object to bypass React's this.state rules
     
         //Depending if the paramter Isshoppingcart, a different type of pk and categorykind is choosen
        var productToAddToStorage = {pk: isShoppingcart? shoppingCartdata.Count()+ 1 : wishListData.Count() + 1, 
        accountFK: loggedInUser, productFK: product.pk, productForeignKeyReference: product.category, 
    categoryKind: isShoppingcart? storageCategory.shoppingCart : storageCategory.wishlist} 
 
  
        if(productToAddToStorage.categoryKind == storageCategory.shoppingCart){
            shoppingCartdata.Add(productToAddToStorage)
        }
        else{
            wishListData.Add(productToAddToStorage);
        }
   
        this.NotificationAlert(product, isShoppingcart);
    } 
    //Notifcation pop up when user adds an item to the wishlist or shopping cart
    NotificationAlert(product: product, isForTheShoppingcart: boolean){
        if(isForTheShoppingcart){
            alert(product.name + " has been added to ShoppingCart!")
        }
        else{
            alert(product.name + " has been added to Wishlist!")
        }
    }
    //Depending on the category of the product, the console header gets displayed
    CheckChoosenConsole() : Promise<string>{
        var xbox360Image = "https://www.blogcdn.com/www.joystiq.com/media/2012/09/xbox360logo.jpg"
        var xboxOneImage = "https://cdn.worldvectorlogo.com/logos/xbox-one-2.svg"
        var playstation3Image = "https://www.dafont.com/forum/attach/orig/3/6/36582.jpg"
        var playstation4Image = "https://www.geek.com/wp-content/uploads/2013/02/PlayStation4_logo.jpg"
        var consoleImage = ""

        switch(JSON.parse(this.state.product).console){
            case(consoleType.xbox360):
                consoleImage = xbox360Image;
                break;
            case(consoleType.xboxone):
                consoleImage = xboxOneImage;
                break;
            case(consoleType.playstation3):
                consoleImage = playstation3Image;
                break;
            case(consoleType.playstation4):
                consoleImage = playstation4Image
                break;
        }

        return Promise.resolve(consoleImage);
    }
    render() {   
        return ( 
            <div>
                {this.state.loaded ? 
                <ProductPageComponent  product={this.state.product} consoleImage={this.state.consoleImage}
                AddProductToStorage={this.StorageAddHandler}/>    
                :
                <div> Loading... </div>
                }
            </div>
        );
    }
}           
export default ProductPage;