import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { List } from "linqts";
import { Product } from 'ClientApp/components/Items/ItemsInterfaces';
import {IAdmin} from "./AdminInterface";
import { Link, NavLink } from 'react-router-dom';

//When the profile gets clicked it gets redirected to this empty profile page

interface ProductsState{
    allItems : Product[]
    items : Product[]
    loaded : boolean
    search : string
    change : number
    page : number

    productNaam: string;
    productUitgever: string;
    productOmschr: string;
    aantalInVooraad: number;
    productPrijs: number;
    productType: string;
    productOntwikkelaar: string;
    isNoEmptyInputFields: boolean;
    productGenre : string 
    consoleType : string 
    productImage: string
    showModal: boolean
}

export class ProductsPage extends React.Component<{}, ProductsState> implements IAdmin{
    constructor(){
        super();

        this.handleChange = this.handleChange.bind(this)
        this.updateSearch = this.updateSearch.bind(this)
        this.setChange = this.setChange.bind(this)
        this.handleChangeSubmit = this.handleChangeSubmit.bind(this);
        this.getProducts = this.getProducts.bind(this);

        this.state = {
            allItems : [],
            items : [],
            loaded : false,
            search : "",
            change : 0,
            page : 20,

            productNaam : "",
            productUitgever : "",
            productOmschr : "",
            aantalInVooraad : 0,
            productPrijs : 0,
            productType : "",
            productOntwikkelaar : "",
            isNoEmptyInputFields : false,
            productGenre : "",
            consoleType : "",
            productImage: "",
            showModal: false
        }
    }

    componentDidMount(){
        this.getProducts()
    }

    getProducts(){
        this.setState(
            {
                loaded: false,
                showModal: false,
            }
        )
        fetch("api/Admin/GetAllProducts")
        .then(response => response.json() as Promise<Product[]>)
        .then(data => {
            this.setState({allItems : data, items : data, loaded : true});
            console.log(data[0])
        }).catch(
            error => {
                this.setState({ loaded : false })
            }
        )
    }

    handleChange(event : any){
        console.log(event.target.value)
        this.setState({
            search : event.target.value
        })

        this.updateSearch(event)
    }

    updateSearch(event : any){
        event.preventDefault()
        let newItemList = [];
        console.log(this.state.search)
        for(let p of this.state.allItems){
            if(
                p.productNaam.toLowerCase().includes(this.state.search.toLowerCase())   ||
                p.productImg.toLowerCase().includes(this.state.search.toLowerCase())    ||
                p.productOmschr.toLowerCase().includes(this.state.search.toLowerCase())
            ){
                newItemList.push(p)
            }
        }
        this.setState({
            items : newItemList
        })
    }

    setChange(item : Product){
        this.setState({
            change : item.productId,
            productNaam : item.productNaam,
            productUitgever : item.productUitgever,
            productOmschr : item.productOmschr,
            aantalInVooraad : item.aantalInVooraad,
            productPrijs : item.productPrijs,
            productType : item.productType,
            productOntwikkelaar : item.productOntwikkelaar,
            productGenre : item.productGenre,
            consoleType : item.consoleType,
            productImage: item.productImg,
        })
    }

    async handleChangeSubmit(event: any){
        event.preventDefault();

        let apiUrl = 'api/Items/Post/'

        let productToPost: Product = {
            productId : this.state.change,
            productNaam : this.state.productNaam,
            productGenre : this.state.productGenre,
            productOmschr : this.state.productOmschr,
            productOntwikkelaar : this.state.productOntwikkelaar,
            productPrijs : this.state.productPrijs,
            productType : this.state.productType,
            productUitgever : this.state.productUitgever,
            aantalInVooraad : this.state.aantalInVooraad,
            consoleType: this.state.consoleType,
            productImg: this.state.productImage,
        }
        let apiResponse = await fetch(apiUrl, {method: 'POST', body:JSON.stringify(productToPost), headers: new Headers({'content-type' : 'application/json'})})
        .then(
            resp =>
            {
                this.setState({
                    showModal: true
                })
            }
        );
        console.log(apiResponse + " Response")
        this.setState({isNoEmptyInputFields: true})

    }

    render(){  
        return(         
            <div className={"ProductsComponent col-md-10"} > 
                {/* <h2> Products </h2>

                <input type="text" name="zoek" value={this.state.search} onChange={(e) => {this.handleChange(e); console.log(this.state.search)}} /> */}
                <h1> Producten </h1>

                <form className="navbar-form navbar-left" onSubmit={ this.updateSearch }>
                    <div className="input-group">
                    <input type="text" className="form-control" placeholder="Zoek naar product" value={this.state.search} onChange={this.handleChange}/>
                        <div className="input-group-btn">
                            <button className={"btn btn-default"} type={"submit"}> 
                                <i className="glyphicon glyphicon-search"/> 
                            </button>
                        </div>
                    </div>
                </form>

                <button className={"btn btn-danger-lg"} onClick={()=> this.setState({ search : "", items : this.state.allItems})}> - verwijder zoekterm</button>
                <h3> { "Aantal producten gevonden: " + this.state.items.length } </h3>  

                {this.state.loaded? 

                    this.state.items.map(
                        
                        (item, index) => {

                            if( (this.state.page) >= index.valueOf() && ( (this.state.page) - 20) <= index.valueOf() ) {return (
                                <div>
                                    <p>______________________________________________________________________________________________________</p>
                                        <div className="col-md-2">
                                            <img className="img-responsive" src={ item.productImg }/>
                                        </div> 
                                        <div className="col-md-5">                                       
                                            <h4><b>{ item.productNaam } </b></h4>

                                            <p> Console: {item.consoleType} </p>

                                            <p> Prijs: {"€" + item.productPrijs } </p>

                                            <p> { item.aantalInVooraad + " " } in voorraad </p>

                                            <NavLink to={ '/Item/' + item.productId } exact activeClassName='Active'className='button_to_product'>
                                                <button className={"btn btn-primary"} > naar product </button>
                                            </NavLink>
                                        </div>
                                            <div className="col-md-offset-7"><button className={"btn btn-primary"} onClick={() => this.setChange(item)} data-toggle='collapse' data-target='#AdminForm'> pas aan </button>
                                        {
                                            item.productId === this.state.change?
                                                <div className="collapse" id='AdminForm'>
                                                    <form action="/action_page.php" onSubmit={ this.handleChangeSubmit } >

                                                        <p>productNaam</p>
                                                            <input placeholder="productNaam" pattern="[a-zA-Z0-9/s]{2,100}" title="Productnaam moet bestaan uit 1 tot en met 15 letters"
                                                            type="text" name="productNaam" className="form-control" value={this.state.productNaam} required={true}
                                                            onChange={(event:any) => this.setState({productNaam: event.target.value})}
                                                             />

                                                        <p>productUitgever</p>
                                                            <input placeholder="productUitgever" pattern="[a-zA-Z /s]{2,30}" title="Geen geldige uitgeven" 
                                                            type="text" name="productUitgever" className="form-control"  value={this.state.productUitgever} required={true} 
                                                            onChange={(event:any) => this.setState({productUitgever: event.target.value})}
                                                            
                                                            />
                                                        <p>productOmschr</p>
                                                            <input placeholder="productOmschr"
                                                            title='Omschrijving moet alleen uit letters bestaan'
                                                            type="text" name="productOmschr" pattern="{6, 750}" className="form-control"  value={this.state.productOmschr} required={true} 
                                                            onChange={(event:any) => this.setState({productOmschr: event.target.value})}
                                                            />
                                                        <p>aantalInVoorraad</p>
                                                            <input placeholder="aantalInVoorraad" pattern="[0-9]{.5}" title="gebruikers naam mag maximaal uit 8 tekens bestaan"
                                                            type="text" name="aantalInVooraad"className="form-control"  value={this.state.aantalInVooraad} required={true}
                                                            onChange={(event:any) => this.setState({aantalInVooraad: event.target.value})}
                                                            />
                                                        <p>productPrijs</p>
                                                            <input placeholder="productPrijs" pattern="[0-9]{1,3}" title="productPrijs moet minstens 6 waardes bevatten"
                                                            type="productPrijs" name="productPrijs"className="form-control"  value={this.state.productPrijs} required={true} 
                                                            onChange={(event:any) => this.setState({productPrijs: event.target.value})}
                                                            /> 
                                                        <p>productType</p>
                                                            <input placeholder='productType' pattern="[a-zA-Z]{4,11}" title="vul een juiste type in"
                                                            type="text" name="productType"className="form-control"  value={this.state.productType} required={true} 
                                                            onChange={(event:any) => this.setState({productType: event.target.value})}
                                                            
                                                            />
                                                        <p>ProductImage</p>
                                                            <input placeholder='productImage' title="vul een juist image in"
                                                            type="text" name="productImage"className="form-control"  value={this.state.productImage} required={true} 
                                                            onChange={(event:any) => this.setState({productImage: event.target.value})}
                                                            
                                                            />
                                                        <p>productOntwikkelaar</p>
                                                            <input placeholder="productOntwikkelaar"  pattern="[a-zA-Z0-9 /s]{4,25}" title="Geen geldige ontwikkelaar"
                                                            type="text" name="productOntwikkelaar"className="form-control"  value={this.state.productOntwikkelaar} required={true} 
                                                            onChange={(event:any) => this.setState({productOntwikkelaar: event.target.value})} />          
                                                        <br/>
                                                        {this.state.showModal === true?
                                                        <div>
                                                            <input className="btn btn-primary" placeholder="pas het product aan" type="submit" value="pas het product aan" data-toggle="modal" data-target="#productModal"/>
                                                            <div className="modal fade" id="productModal" role="dialog">
                                                            <div className="modal-dialog modal-sm">
                                                            <div className="modal-content">
                                                            <div className="modal-header">
                                                                <button type="button" className="close" data-dismiss="modal" data-backdrop="false" onClick={this.getProducts}>&times;</button>
                                                                <h4 className="modal-title">Product is aangepast!</h4>
                                                            </div>
                                                            <div className="modal-body">
                                                                <br />
                                                                <button className="btn btn-default" data-backdrop="false" data-dismiss="modal" onClick={this.getProducts}>Terug</button>
                                                            </div>
                                                        </div>
                                                        </div>
                                                        </div>
                                                        </div>
                                                        :
                                                        <input className="btn btn-primary" placeholder="pas het product aan" type="submit" value="pas het product aan"/>
                                                        }
                                                        
                                                    </form>
                                                    </div> 
                                            :
                                            null
                                            }

                                        </div>
                                    </div>
                            )
                        }
                        }
                    )
                    :
                    <div className="sk-fading-circle">
                        <div className="sk-circle1 sk-circle"></div>
                        <div className="sk-circle2 sk-circle"></div>
                        <div className="sk-circle3 sk-circle"></div>
                        <div className="sk-circle4 sk-circle"></div>
                        <div className="sk-circle5 sk-circle"></div>
                        <div className="sk-circle6 sk-circle"></div>
                        <div className="sk-circle7 sk-circle"></div>
                        <div className="sk-circle8 sk-circle"></div>
                        <div className="sk-circle9 sk-circle"></div>
                        <div className="sk-circle10 sk-circle"></div>
                        <div className="sk-circle11 sk-circle"></div>
                        <div className="sk-circle12 sk-circle"></div>
                    </div>
                }

                <div className='col-md-10'> 
                        <ul className="pagination">
                            {
                                this.state.items.map(
                                    (item, index) => {
                                        if( index % 20 == 0 && index < (this.state.page + 100) && index > (this.state.page - 100) && index != 0){
                                            return (
                                                <li ><button className={"btn btn-primary"} onClick={() => this.setState({ page : index})}> {index / 20} </button></li>
                                        )
                                        }else{
                                            if(index === (this.state.page + 101)){
                                                return (<li > <button className={"btn btn-default"} onClick={()=> this.setState({ page : this.state.page + 20 })} >volgende -></button> </li>)
                                            }else{
                                                if(index === (this.state.page - 101)){
                                                    return (<li > <button className={"btn btn-default"} onClick={()=> this.setState({ page : this.state.page - 20 })} >{"<-"} vorige</button> </li>)
                                                }
                                            }
                                        }
                                    }
                                )
                            }
                        </ul>
                    </div>

                <div>
                    
                </div>

            </div>
        )
    }     
}