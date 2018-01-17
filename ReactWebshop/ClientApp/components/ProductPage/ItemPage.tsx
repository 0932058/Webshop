import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {User} from "../User/User";
import { ItemsContainer } from "../Items/ItemsContainer";
import { NavLink } from 'react-router-dom';
import { Product, Wenslijst } from 'ClientApp/components/Items/ItemsInterfaces';
import {ReactInterval} from 'react-interval';
import {Review} from "../../../TypescriptModels/Review";
import {Comment} from "../../../TypescriptModels/Comment";


interface ItemPageState{
    product: Product | null;
    loaded : boolean;
    loggedIn : boolean;
    rating: number,
    comment: string
    averageReviewRating: number
    averageReviewStars: JSX.Element[];
    comments: Comment[],
    userHasCommented: boolean
}

export class ItemPage extends React.Component<RouteComponentProps<{}>, ItemPageState> {
    constructor(props){
        super(props);
        this.AddProductToShoppingCartLocalStorage = this.AddProductToShoppingCartLocalStorage.bind(this)
        this.AddProductToWishList = this.AddProductToWishList.bind(this)
        this.getItem = this.getItem.bind(this)
        this.ProcessReview = this.ProcessReview.bind(this);
        this.AddReviewToDatabase = this.AddReviewToDatabase.bind(this);
        this.GetReviewRelatedInfo = this.GetReviewRelatedInfo.bind(this);
        this.GetAverageReviewRatingApiCall = this.GetAverageReviewRatingApiCall.bind(this);
        this.DrawAverageReviewStars = this.DrawAverageReviewStars.bind(this);
        this.GetCommentsFromApi = this.GetCommentsFromApi.bind(this);
        this.CheckIfUserHasAlreadyCommented = this.CheckIfUserHasAlreadyCommented.bind(this);
        this.getReviewButtons = this.getReviewButtons.bind(this);
        this.setRating = this.setRating.bind(this);

        this.state = {
            product : null,
            loaded : false,
            loggedIn : false,
            rating: 0,
            comment: "",
            averageReviewRating: 0,
            averageReviewStars: [],
            comments: [],
            userHasCommented: false
        }
       

    }

    componentDidMount(){
        this.getItem();
    }
    getItem(){
        fetch('api/Items' + this.props.location.pathname)
        .then(response => response.json() as Promise<Product[]>)
        .then(data => {
            console.log(data[0].productId)
            this.setState({ product : data[0]})})
        .then(_ => this.GetReviewRelatedInfo(""))
        .then(_ => this.setState({loaded: true}))  
    }
    

    AddProductToShoppingCartLocalStorage(){
        var itemlist = [];
        itemlist = JSON.parse(localStorage.getItem("Winkelmand"));
        if (itemlist != null){
            var item = {"name" : this.state.product.productNaam, "id" : this.state.product.productId, "price": this.state.product.productPrijs, "index" : itemlist.length, "console": this.state.product.consoleType, "image": this.state.product.productImg};
            itemlist.push(item)
            localStorage.setItem("Winkelmand", JSON.stringify(itemlist));
            
        }
        else{
            var item = {"name" : this.state.product.productNaam, "id" : this.state.product.productId, "price": this.state.product.productPrijs, "index" : 0, "console": this.state.product.consoleType, "image": this.state.product.productImg};
            itemlist = [item]
            localStorage.setItem("Winkelmand", JSON.stringify(itemlist));
        }
    }
    async AddProductToWishList(){
        let apiUrl = 'api/Wenslijsten/Post'
        let productToPost: Wenslijst = {
            wenslijstId: 0, 
            klantId: User.getStorageId(),
            productNmr: this.state.product.productId
        }
        let apiResponse = await fetch(apiUrl, {method: 'POST', body:JSON.stringify(productToPost), headers: new Headers({'content-type' : 'application/json'})});
        
    }
    ProcessReview(event:any){
        event.preventDefault();
        if(this.state.comment == "" || this.state.rating == 0){
            alert("Fill both the star and review in!")
            return;
        }
        else{

            var newReview: Review = {
                ReviewId:0, 
                ProductId: this.state.product.productId,
                KlantId: User.GetPK(),
                Rating: this.state.rating,
                Comment: this.state.comment
            }     
            this.AddReviewToDatabase(newReview);
        }
    }
    async AddReviewToDatabase(reviewToAdd: Review){
        let apiUrl = 'api/Review/Post'
        let apiResponse = await fetch(apiUrl, {method: 'POST', body:JSON.stringify(reviewToAdd), headers: new Headers({'content-type' : 'application/json'})}); 
        alert("Review has been added!") 
        this. GetCommentsFromApi()
        .then((comments) => this.setState({comments: comments}))    
    }
    async GetReviewRelatedInfo(event:any){
        //event.preventDefault();
        this.GetAverageReviewRatingApiCall()
        .then(average => this.setState({averageReviewRating: average}))
        .then(() => this.DrawAverageReviewStars())
        .then((stars =>  this.setState({averageReviewStars: stars})))
        .then(() => this.GetCommentsFromApi())
        .then((comments => this.setState({comments :comments})))
        
    }
    async GetAverageReviewRatingApiCall() : Promise<number>{
        let apiUrl = 'api/Review/Get/' + this.state.product.productId;
        let apiResponse = await fetch(apiUrl, {method: 'Get', headers: new Headers({'content-type' : 'application/json'})}); 
        let responseConverted = apiResponse.json();
        return responseConverted;
    }
    DrawAverageReviewStars(){  
        var star = <img className="img-responsive" src={"https://i1.wp.com/audiobookreviewer.com/wp-content/uploads/sites/209/2015/07/star-rating-full.png?fit=24%2C24&ssl=1"}/>  
        var stars: JSX.Element[] = [];
        for (let index = 0; index < this.state.averageReviewRating; index++) {
            stars[index] = star;         
        }
        return Promise.resolve(stars);
      
    }
    async GetCommentsFromApi() : Promise<Comment[]>{
        let apiUrl = 'api/Review/Get/Comment/' + this.state.product.productId;
        let apiResponse = await fetch(apiUrl, {method: 'Get', headers: new Headers({'content-type' : 'application/json'})}); 
        let responseConverted = apiResponse.json();
        return responseConverted;
    }
    async CheckIfUserHasAlreadyCommented(){
        for(var c of this.state.comments){
            
        }
    }

    setRating(event){
        console.log(event.target.value)
        this.setState({
            rating : event.target.value
        })
    }

    getReviewButtons(){
        var index = 1;
        var btnList = [];
        while(index < 6){
            if(index <= this.state.rating){
                btnList[index] = (<button className={"btn btn btn-success glyphicon glyphicon-star"} value={index} onClick={this.setRating} ></button>)
            }else{
                btnList[index] = (<button className={"btn glyphicon glyphicon-star-empty"} value={index} onClick={this.setRating} ></button>)
            }
            index += 1;
        }
        return btnList;
    }
    //The objects have to be parsed to json because this.state doesn't allow an single object in the state
    render() {
        return <div  className={"ItemPageComponent"}>
                <ReactInterval timeout={100} enabled={true}
                    callback={ () => { User.IsUserLoggedIn()? this.setState({ loggedIn : true}) : this.setState({ loggedIn : false}) } } />

                { this.state.loaded ?
                    <div className="container">
                    <div className='row'>
                        <div className='col-md-12'>
                        <h1> { this.state.product.productNaam } </h1>
                        </div>
                    </div>
                        <div className='col-md-3'>      
                            <img className="img-responsive" src={ this.state.product.productImg }/> 
                        </div>
                        <div className='col-md-5'>  
                         
                        <h2> Beschrijving:</h2>
                             <p> { this.state.product.productOmschr } </p>
                            <h3> Genre:</h3><p> { this.state.product.productGenre } </p>
                            <h3> Console:</h3><p> { this.state.product.consoleType } </p>
                                
                              
                            
     
           
                            {User.IsUserLoggedIn() && this.state.userHasCommented == false ?
                            <div>
                            <h2> Geef een ster en review:</h2>
                            
                            {this.getReviewButtons()}


                            <input type="review" name="review" className="form-control" id="review" onChange={(e:any) => this.setState({comment: e.target.value})} />
                            <button onClick={(e:any) => this.ProcessReview(e)}> Send Review </button>
                            </div>
                            :
                            null
                            }

                            <h1> Aantal Reviews: {this.state.comments.length} </h1>:
                            {this.state.comments.length <= 0? 
                            <div> geen reviews beschikbaars </div>
                            :
                            this.state.comments.map(function(comment,key)  {
                                return([
                                    <h1> Review {key + 1} </h1>,
                                    <div> <strong> Naam: </strong> {comment.klantNaam} </div> ,
                                    <div> <strong> Rating: </strong> {comment.rating} </div> ,
                                    <div> <strong> Review: </strong> {comment.comment} </div> ,                                        
                                ])})}              

                        </div>  
                            <div className='col-md-4'>
                            <div className='col-md-12'>
                            <h4>gemiddelde review</h4>  
                            {this.state.averageReviewStars.length <= 0?
                            <div> no reviews available </div>                    
                            :     
                            this.state.averageReviewStars.map(element => {
                                return <div className='glyphicon glyphicon-star col-sm-1'></div>;
                                
                            }
                            )}
                            </div>
                            <div className='col-md-12'>
                            <h3>Prijs: {this.state.product.productPrijs}</h3>
                            </div>
                        
                        
                       
                           
                            
                        <div className='col-md-3'>
                                {this.state.loggedIn ?
                                <div>
                                    <button className="btn btn-primary" onClick={this.AddProductToWishList} data-toggle="modal" data-target="#myModalWIngelogd">
                                    Toevoegen aan wenslijst
                                    </button>
                                    <div className="modal fade" id="myModalWIngelogd" role="dialog">
                                    <div className="modal-dialog modal-sm">
                                    <div className="modal-content">
                                    <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    <h4 className="modal-title">Product is toevoegd!</h4>
                                    </div>
                                    <div className="modal-body">
                                    <h5>het door u gekozen item is succesvol toegevoegd aan de wenslijst</h5>
                                    <button type="button" className="btn btn-default" data-dismiss="modal" data-backdrop="false">Terug</button>
                                    <a href='/Wenslijst'><button type="button" className="btn btn-default" data-backdrop="false" >Naar wenslijst</button></a>
                                    </div>
                                </div>
                                </div>
                                </div>
                                </div>
                                    :
                                    <NavLink to={"/Registratie"}> <button className="btn btn-danger">Registreer om gebruik te maken van de wenslijst </button> </NavLink>
                                         }
                                                      
                                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModalM" onClick={this.AddProductToShoppingCartLocalStorage}>Toevoegen aan winkelmand</button>
                                <div className="modal fade" id="myModalM" role="dialog">
                                    <div className="modal-dialog modal-sm">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                                        <h4 className="modal-title">Product is toegevoegd!</h4>
                                        </div>
                                        <div className="modal-body">
                                        <p>het door u gekozen item is succesvol toegevoegd aan de winkelmand</p>
                                        <button type="button" className="btn btn-default" data-dismiss="modal" data-backdrop="false">verder winkelen</button>
                                        <a href='/Winkelmand'><button type="button" className="btn btn-default" data-backdrop="false" >naar winkelmand</button></a>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        </div> 
                        </div>
                        

                        <div className='col-md-3'>

                        </div>                
                    </div> 

                : <div> <h2> item is still being loaded... </h2> </div>
                }   
            </div>                     
    }
}