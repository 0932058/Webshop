import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { List } from "linqts";
import { Product } from 'ClientApp/components/Items/ItemsInterfaces';

//When the profile gets clicked it gets redirected to this empty profile page

interface ProductsState{
    allItems : Product[]
    items : Product[]
    loaded : boolean
    search : string
    change : number

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
}

export class ProductsPage extends React.Component<{}, ProductsState> {
    constructor(){
        super();

        this.handleChange = this.handleChange.bind(this)
        this.updateSearch = this.updateSearch.bind(this)
        this.setChange = this.setChange.bind(this)
        this.handleChangeSubmit = this.handleChangeSubmit.bind(this);

        this.state = {
            allItems : [],
            items : [],
            loaded : false,
            search : "",
            change : 0,

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
            productImage: ""
        }

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
    }

    updateSearch(){
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
            productImage: item.productImg
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
            productImg: this.state.productImage
        }
        let apiResponse = await fetch(apiUrl, {method: 'POST', body:JSON.stringify(productToPost), headers: new Headers({'content-type' : 'application/json'})});
        console.log(apiResponse + " Response")

        this.setState({isNoEmptyInputFields: true})

    }

    render(){  
        return(         
            <div className={"ProductsComponent col-sm-5s"} > 
                <h2> Products </h2>

                <input type="text" name="zoek" value={this.state.search} onChange={(e) => {this.handleChange(e); console.log(this.state.search)}} />

                <h1> Products </h1>

                {this.state.loaded? 

                    this.state.items.map(
                        
                        item => {

                            return (
                                <div className={"Component"}>
                                    <div className='container' id='maingame'>
                                        <div className='col-md-2'>
                                            <img className="img-responsive" src={ item.productImg }/>
                                        </div>
                                        <div className='col-md-2'>
                                            
                                            <h2>{ item.productNaam } </h2>

                                            <p> Console: {item.consoleType} </p>

                                            <p> Prijs: {"€" + item.productPrijs } </p>

                                            <p> { item.aantalInVooraad + " " } in voorraad </p>

                                            <button className={"btn btn-primary"} onClick={() => this.setChange(item)} > pas aan </button>
                                        </div>

                                        {
                                            item.productId === this.state.change?
                                                <div>
                                                    <ul className='reg_ul'><form action="/action_page.php"  onSubmit={ this.handleChangeSubmit } >
                                                    
                                                        <li className='reg_li'>
                                                            <p></p>
                                                            <p>productNaam</p>
                                                            <input placeholder="productNaam" title="productNaam moet bestaan uit 1 tot en met 15 letters"
                                                            type="text" name="productNaam" className="form-control" value={this.state.productNaam} required={true}
                                                            onChange={(event:any) => this.setState({productNaam: event.target.value})}
                                                             />
                                                        </li>              
                                                        <li className='reg_li'>
                                                            <p>productUitgever</p>
                                                            <input placeholder="productUitgever" title="productUitgever moet bestaan uit 1 tot 30 letters" 
                                                            type="text" name="productUitgever" className="form-control"  value={this.state.productUitgever} required={true} 
                                                            onChange={(event:any) => this.setState({productUitgever: event.target.value})}
                                                            
                                                            />
                                                        </li>            
                                                        <li className='reg_li'>
                                                            <p>productOmschr</p>
                                                            <input placeholder="productOmschr"
                                                            title='Omschrijving moet alleen uit letters bestaan'
                                                            type="text" name="productOmschr"className="form-control"  value={this.state.productOmschr} required={true} 
                                                            onChange={(event:any) => this.setState({productOmschr: event.target.value})}
                                                            />
                                                        </li>            
                                                        <li className='reg_li'>
                                                            <p>aantalInVoorraad</p>
                                                            <input placeholder="aantalInVoorraad" title="gebruikers naam mag maximaal uit 8 tekens bestaan"
                                                            type="text" name="aantalInVooraad"className="form-control"  value={this.state.aantalInVooraad} required={true}
                                                            onChange={(event:any) => this.setState({aantalInVooraad: event.target.value})}
                                                            />
                                                        </li>            
                                                        <li className='reg_li'>
                                                            <p>productPrijs</p>
                                                            <input placeholder="productPrijs" title="productPrijs moet minstens 6 waardes bevatten"
                                                            type="productPrijs" name="productPrijs"className="form-control"  value={this.state.productPrijs} required={true} 
                                                            onChange={(event:any) => this.setState({productPrijs: event.target.value})}
                                                            /> 
                                                        </li>            
                                                        <li className='reg_li'>
                                                            <p>productType</p>
                                                            <input placeholder='productType' title="vul een juist adres in"
                                                            type="text" name="productType"className="form-control"  value={this.state.productType} required={true} 
                                                            onChange={(event:any) => this.setState({productType: event.target.value})}
                                                            
                                                            />
                                                        </li>            
                                                        <li className='reg_li'>
                                                            <p>ProductImage</p>
                                                            <input placeholder='productImage' title="vul een juist image in"
                                                            type="text" name="productImage"className="form-control"  value={this.state.productImage} required={true} 
                                                            onChange={(event:any) => this.setState({productImage: event.target.value})}
                                                            
                                                            />
                                                        </li>            
                                                        <li className='reg_li'>
                                                            <p>productOntwikkelaar</p>
                                                            <input placeholder="productOntwikkelaar"  title="productOntwikkelaar moet uit 4 cijfers en 2 letters bestaan" 
                                                            type="text" name="productOntwikkelaar"className="form-control"  value={this.state.productOntwikkelaar} required={true} 
                                                            onChange={(event:any) => this.setState({productOntwikkelaar: event.target.value})} />
                                                        </li>            
                                                        <li><input className="btn-primary" placeholder="pas het product aan" type="submit" value="pas het product aan"/> </li>
                                                    </form></ul>
                                                </div>
                                            :
                                            null
                                        }
                                    </div>
                                </div> 
                            )
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

                <div>
                    
                </div>

            </div>
        )
    }     
}