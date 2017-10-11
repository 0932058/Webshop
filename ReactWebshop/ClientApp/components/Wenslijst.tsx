import * as React from 'react';
import { RouteComponentProps } from 'react-router';

interface WinkelmandState {
    Storage: string | null;
}

class Product{
    name: string;
    price: Number;
    image: string;
    link: string;

    constructor(name : string, price : Number, image : string, link : string){
        this.name = name;
        this.price = price;
        this.image = image;
        this.link = link;
    }
}

export class Wenslijst extends React.Component<RouteComponentProps<{}>, WinkelmandState> {
    constructor(){
        super();

        var game;
        this.add = this.add.bind(this);
        this.retrieve = this.retrieve.bind(this);
        localStorage.setItem('wenslijst', JSON.stringify({list: [game] }));
    }

    add(){
        var Storage = localStorage.getItem("works");

        this.setState({
            Storage
        });
    }

    retrieve(){
        return this.state.Storage;
    }

    makeTable(array : Array<Product>){
        array.forEach(Product => {
            <div className="CartProduct">
            <a href={ Product.link } ><img src={ Product.image }/></a>
            <h2 className="CartProductPart">{ Product.name }</h2>
            <a href={ Product.link } className="CartProductPart">Naar product</a>           
            <button href="Winkelmand.html">In winkelmand</button>
            <button className="CartProductPart">Verwijderen</button>

        </div>
        });
    }

    public render() {

        //hier wordt de value van wenslijst naar string gecast om vervolgens naar een JSON object te worden gecast
        var voorbeeld = JSON.parse(String(localStorage.getItem('wenslijst')));

        
        //zo pas je een attribuut van een instantie in de lijst aan
        voorbeeld.list[0].price = 20;

        //hier wordt de lijst weer teruggezet naar de localstorage
        localStorage.setItem('wenslijst', JSON.stringify(voorbeeld));
        
        voorbeeld = JSON.parse(String(localStorage.getItem('wenslijst')));

        return <section>
    
        <h1>Wenslijst</h1>
 
        <div className="CartProduct">
            
                <a href= ><img src= style="height: 15em;"/></a>
            <h2 className="CartProductPart">Doom 2016</h2>
            <a href="Product1pagina" className="CartProductPart">Naar product</a>           
            <a href="Winkelmand.html">In winkelmand</a>
            <button className="CartProductPart">Verwijderen</button>

        </div>
        

    </section>;
    }
}
