import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { List } from "linqts";

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
}

export class ProductsPage extends React.Component<{}, ProductsState> {
    constructor(){
        super();
        this.HandleInputFieldsChange = this.HandleInputFieldsChange.bind(this);
        this.IsNoEmptyField = this.IsNoEmptyField.bind(this);

        this.handleChange = this.handleChange.bind(this)
        this.updateSearch = this.updateSearch.bind(this)
        this.setChange = this.setChange.bind(this)

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

    //When an input field gets typed in this method gets called
    HandleInputFieldsChange(event: any){    

        switch(event.target.name){

            case("productNaam"):
                this.setState({productNaam : event.target.value});    
                break;
            case("productUitgever"):
                this.setState({productUitgever : event.target.value});  
                break;
            case("productOmschr"):
                this.setState({productOmschr : event.target.value});  
                break;
            case("aantalInVooraad"):
                this.setState({aantalInVooraad : event.target.value});  
                break;
            case("productPrijs"):
                this.setState({productPrijs : event.target.value});  
                break;
            case("productType"):   
                this.setState({productType : event.target.value});  
                break;
            case("productOntwikkelaar"):
                this.setState({productOntwikkelaar : event.target.value});  
                break;
            case("productGenre"):
                this.setState({productGenre : event.target.value});  
                break;
            case("consoleType"):
                this.setState({consoleType : event.target.value});  
                break;
            
            default:
                break;
        }           
    }

    //Check if there are no empty input fields
    IsNoEmptyField() : boolean{
        var inputFields = new List<string>();
        inputFields.Add(this.state.productNaam)
        inputFields.Add(this.state.productUitgever)
        inputFields.Add(this.state.productPrijs.toString())
        inputFields.Add(this.state.aantalInVooraad.toString())
        inputFields.Add(this.state.productOmschr);
        inputFields.Add(this.state.productType);
        inputFields.Add(this.state.productOntwikkelaar);
    
        var EmptyFieldCheckResult = inputFields.Where(input => input.length == 0)
        if(EmptyFieldCheckResult.Count() == 0){
            return true;
        }
        else{
            return false;
        }
    }

    handleChange(event : any){
    }

    updateSearch(){
    }

    setChange(item : Product){
        if(item.productId === this.state.change){
            this.setState({
                change : 0,
                productNaam : item.productNaam,
                productUitgever : item.productUitgever,
                productOmschr : item.productOmschr,
                aantalInVooraad : item.aantalInVooraad,
                productPrijs : item.productPrijs,
                productType : item.productType,
                productOntwikkelaar : item.productOntwikkelaar,
                productGenre : item.productGenre,
                consoleType : item.consoleType,
            })
        }else{
            this.setState({
                change : item.productId
            })

        }
    }

    async handleChangeSubmit(){

        let apiUrl = 'api/User/Post'
        let userToPost: Product = {
            productId : 0,
            productNaam : this.state.productNaam,
            productGenre : this.state.productGenre,
            productOmschr : ,
            productOntwikkelaar : ,
            productPrijs : ,
            productType : ,
            productUitgever : ,
        }
        let apiResponse = await fetch(apiUrl, {method: 'POST', body:JSON.stringify(userToPost), headers: new Headers({'content-type' : 'application/json'})});
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
                                                    <ul className='reg_ul'><form action="/action_page.php"  onSubmit={ this.handleChangeSubmit } onChange={this.HandleInputFieldsChange}>
                                                    
                                                        <li className='reg_li'>
                                                            <p></p>
                                                            <p>productNaam</p>
                                                            <input placeholder="productNaam" pattern="[a-zA-Z]{1,15}" title="productNaam moet bestaan uit 1 tot en met 15 letters"
                                                            type="text" name="productNaam" className="form-control" value={this.state.productNaam} />
                                                        </li>              
                                                        <li className='reg_li'>
                                                            <p>productUitgever</p>
                                                            <input placeholder="productUitgever" pattern="[a-zA-Z]{1,30}" title="productUitgever moet bestaan uit 1 tot 30 letters" 
                                                            type="text" name="productUitgever" className="form-control"  value={this.state.productUitgever} />
                                                        </li>            
                                                        <li className='reg_li'>
                                                            <p>productOmschr</p>
                                                            <input placeholder="productOmschr" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+[.]+[a-z]{2,3}$" 
                                                            title='zorg dat het een juist productOmschr is vb. characters@characters.domain'
                                                            type="text" name="productOmschr"className="form-control"  value={this.state.productOmschr} />
                                                        </li>            
                                                        <li className='reg_li'>
                                                            <p>aantalInVoorraad</p>
                                                            <input placeholder="aantalInVoorraad" pattern="[a-zA-Z0-9]{3,15}" title="gebruikers naam mag maximaal uit 8 tekens bestaan"
                                                            type="text" name="aantalInVooraad"className="form-control"  value={this.state.aantalInVooraad} />
                                                        </li>            
                                                        <li className='reg_li'>
                                                            <p>productPrijs</p>
                                                            <input placeholder="productPrijs" pattern=".{6,}"  title="productPrijs moet minstens 6 waardes bevatten"
                                                            type="productPrijs" name="productPrijs"className="form-control"  value={this.state.productPrijs} /> 
                                                        </li>            
                                                        <li className='reg_li'>
                                                            <p>productType</p>
                                                            <input placeholder='productType' pattern="([a-zA-Z]).{2,30}([0-9]).{0,3}" title="vul een juist adres in"
                                                            type="text" name="productType"className="form-control"  value={this.state.productType} />
                                                        </li>            
                                                        <li className='reg_li'>
                                                            <p>productOntwikkelaar</p>
                                                            <input placeholder="productOntwikkelaar" pattern="([0-9]){4}([A-Z]){2}" title="productOntwikkelaar moet uit 4 cijfers en 2 letters bestaan" 
                                                            type="text" name="productOntwikkelaar"className="form-control"  value={this.state.productOntwikkelaar} />
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