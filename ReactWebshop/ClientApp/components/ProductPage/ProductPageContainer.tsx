import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {game, wishList,shoppingCart, console, product} from "../DatabaseSimulation/TableTypes";
import {gameTableData, wishListData, shoppingCartdata, consoleTableData} from "../DatabaseSimulation/FakeDatabase";
import {consoleType} from "../DatabaseSimulation/ConsoleTable";
import {ProductPageComponent} from "./ProductPageComponent";

//The product page

interface ProductPageState{
    product: product
    consoleImage: string;
    loaded: boolean;
}
export class ProductPage extends React.Component<RouteComponentProps<{}>, ProductPageState> {
    constructor(){
        super();
        this.AddProductToWishList = this.AddProductToWishList.bind(this);
        this.AddProductToWinkelmand = this.AddProductToWinkelmand.bind(this);
        this.CheckChoosenConsole = this.CheckChoosenConsole.bind(this)
        this.NotificationAlert = this.NotificationAlert.bind(this);
        this.state = {product: consoleTableData.ElementAt(3) as product, consoleImage: "", loaded: false}; 
        //Game inserted from game database to test the page layout
    }
    //The console image will be loaded
    componentWillMount(){
        this.CheckChoosenConsole().then(consoleImage => this.setState({consoleImage: consoleImage, loaded: true}))
    }
    //wishlist PK and account manually inserted, this can be changed later that it checks the logged in user's PK.
    //See how to add the foreign key reference
    AddProductToWishList(){
        this.NotificationAlert(false);
        let loggedInUserPK = 1; 
        var wishlistItem: wishList = {pk:1 , accountFK: loggedInUserPK, productFK: [this.state.product.pk],productForeignKeyReference: null}
        var foundWishList = wishListData.Where(wishlist => wishlist.accountFK == loggedInUserPK )
        if(foundWishList.Count() == 0){
            wishListData.Add(wishlistItem)
        }
        else{
            foundWishList.ForEach(wishlist => wishlist.productFK.push(this.state.product.pk))
        }
        
      

        //If the user is not logged in then this code below will be activated

        // var wenslijst = JSON.parse(String(localStorage.getItem('Wenslijst')));
        // var wenslijstList: game[] = wenslijst.list;
        
        // if(this.state.game != null)   {
        //     wenslijstList.push(this.state.game);
        // }
        // localStorage.setItem('Wenslijst', JSON.stringify({list: wenslijstList}));
    }
     //shopping cart PK and account manually inserted, this can be changed later that it checks the logged in user's PK.
    AddProductToWinkelmand(){
        this.NotificationAlert(true);
        let loggedInUserPK = 1; 
        var shoppingCartItem: shoppingCart = {pk:1 , accountFK: loggedInUserPK, productFK: [this.state.product.pk], productForeignKeyReference: this.state.product.category}
        var foundShoppingCart = shoppingCartdata.Where(shoppingCart => shoppingCart.accountFK == loggedInUserPK )
        if(foundShoppingCart.Count() <= 0 || foundShoppingCart == null || foundShoppingCart == undefined){
            console.log("ADDING")
            shoppingCartdata.Add(shoppingCartItem)
        }
        else{
            foundShoppingCart.ForEach(shoppingCart => shoppingCart.productFK.push(this.state.product.pk))
        }

            //If the user is not logged in then this code below will be activated
        // var wenslijst = JSON.parse(String(localStorage.getItem('winkelmand')));

        // var wenslijstList: game[] = wenslijst.list;
        // if(this.state.game != null){
        //     wenslijstList.push(this.state.game);
        // }
        

        // localStorage.setItem('winkelmand', JSON.stringify({list: wenslijstList}));
    }  
    NotificationAlert(isForTheShoppingcart: boolean){
        if(shoppingCartdata){
            alert(this.state.product.name + " has been added to ShoppingCart!")
        }
        else{
            alert(this.state.product.name + " has been added to WishList!")
        }
    }
    CheckChoosenConsole() : Promise<string>{
        var xbox360Image = "https://www.blogcdn.com/www.joystiq.com/media/2012/09/xbox360logo.jpg"
        var xboxOneImage = "https://cdn.worldvectorlogo.com/logos/xbox-one-2.svg"
        var playstation3Image = "https://www.dafont.com/forum/attach/orig/3/6/36582.jpg"
        var playstation4Image = "https://www.geek.com/wp-content/uploads/2013/02/PlayStation4_logo.jpg"
        var consoleImage = ""

        switch(this.state.product.console){
            case(consoleType.xbox360):
                consoleImage = xbox360Image;
            case(consoleType.xboxOne):
                consoleImage = xboxOneImage;
            case(consoleType.playstation3):
                consoleImage = playstation3Image;
            case(consoleType.playstation4):
                consoleImage = playstation4Image
        }
        return Promise.resolve(consoleImage);
    }
    render() {   
        return ( 
            <div>
                {this.state.loaded ? 
                <ProductPageComponent product={this.state.product} consoleImage={this.state.consoleImage}
                AddProductToWinkelMand={this.AddProductToWinkelmand} AddProductToWishlist={this.AddProductToWishList}/>    
                :
                <div> Loading... </div>
                }
            </div>
        );
    }
}           