import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {game, wishList,shoppingCart, console, product, category, storage, storageCategory} from "../../DatabaseSimulation/TableTypes";
import {gameTableData, wishListData, shoppingCartdata, consoleTableData} from "../../DatabaseSimulation/FakeDatabase";
import {consoleType} from "../../DatabaseSimulation/ConsoleTable";
import {AccessoiresComponent} from "./AccessoiresComponent";
import {List} from "linqts";
import {ProductPage} from "../../ProductPage/ProductPageContainer";
import {accessoires} from "../../DatabaseSimulation/TableTypes";
import {accessoiresType} from "../../DatabaseSimulation/AccessoiresTable";
import {Visitor,  QueryVisitor, ICategory, ICategoryState} from "../MainReusableComponent/ReusableComponent";


export class AccessoiresContainer  extends React.Component<RouteComponentProps<{}>, ICategoryState<accessoires>> implements ICategory {
    constructor(){
        super(); 
        this.state = {foundProductToShow: new List<accessoires>(), categoryTitle: "", loaded:false, productPageClicked: false, clickedOnProduct: null}
        this.ToProductPage = this.ToProductPage.bind(this);
        this.PrepareForProductQuery = this.PrepareForProductQuery.bind(this);
        this.ToLowerCase = this.ToLowerCase.bind(this);   
    }
    //Gets the selected category from the url 
    componentWillMount(){
        var currentPath: string = this.props.location.pathname;
        
        var convertedPath = currentPath.replace("/Accessoires/", "")
        var convertedPathLowercased = this.ToLowerCase(convertedPath);
       
        let convertedPathToEnum: accessoiresType = accessoiresType[convertedPathLowercased]  
    
        this.PrepareForProductQuery(convertedPathToEnum).then(AccessoiresListToShow => this.setState({foundProductToShow: AccessoiresListToShow, categoryTitle:convertedPathLowercased, loaded: true}));  
    }
    //The url's first letter are  with uppercase (Sport for example) but they get converted to lowercase to match the enum' name(genrecategory)
    ToLowerCase(categoryToCapatalize: string){
        return categoryToCapatalize[0].toLowerCase() + categoryToCapatalize.slice(1).toLowerCase();
    }
    //Gets the Accessoires (by a query) based on the category
    PrepareForProductQuery(clickedOnSubCategory: any): Promise<List<any>> {
        var visitor = new QueryVisitor();
        return visitor.MakeQueryForAccessoires(clickedOnSubCategory);     
    }
    //When the productpage button is clicked it goes to the product page
    ToProductPage(event: any, game: accessoires){
        this.setState({productPageClicked: true, clickedOnProduct: game})
    }
    render() {   
        return <div className={"Container"}>
            {this.state.productPageClicked? 
            <ProductPage clickedOnProduct={this.state.clickedOnProduct} /> :
            this.state.loaded? 
            <div>
            <h1> {this.state.categoryTitle} </h1>
            <h1> Items found: {this.state.foundProductToShow.Count()} </h1> 
            {this.state.foundProductToShow.ToArray().map((accessoires, index) =>
            <AccessoiresComponent key={index} accessoiresToShow={accessoires} ToProductPage ={this.ToProductPage}/>)}
            </div>
            :
            <div> loading... </div>                   
        }   
        </div>         
    }       
}
               
export default AccessoiresContainer;

