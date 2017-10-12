import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { BestellingenGame } from './Bestellingen';

interface ProductPageState{
    game: BestellingenGame;
    des: String;
}

export class ProductPage extends React.Component<RouteComponentProps<{}>, ProductPageState> {
    constructor(){
        super();

        this.ConvertJson = this.ConvertJson.bind(this);
        this.Initiate = this.Initiate.bind(this);
        this.addGameToWenslijst = this.addGameToWenslijst.bind(this);
        this.addGameToWinkelmand = this.addGameToWinkelmand.bind(this);

        var game: BestellingenGame = {name: "GTA V", console: "Xbox", price: 60, category: "Games", orderdate: "MMM Do YY", status:"Onderweg",
        image: "http://gamesofpc.com/wp-content/uploads/2015/02/GTA-5-Download.jpg"};
        this.state = {game, des: "sajdfjljsdfjskdajfkl;sd sdjfksdjfklsdjfklsdjflk; dsjfikldjsflkdsjfkl;sdjfkl;sdfdsafsdk" };
    }
    addGameToWenslijst(){
        var wenslijst = JSON.parse(String(localStorage.getItem('Wenslijst')));

        var wenslijstList: BestellingenGame[] = wenslijst.list;
        
        wenslijstList.push(this.state.game);

        localStorage.setItem('Wenslijst', JSON.stringify({list: wenslijstList}));
    }

    addGameToWinkelmand(){
        var wenslijst = JSON.parse(String(localStorage.getItem('winkelmand')));

        var wenslijstList: BestellingenGame[] = wenslijst.list;
        
        wenslijstList.push(this.state.game);

        localStorage.setItem('winkelmand', JSON.stringify({list: wenslijstList}));
    }

    ConvertJson() : any{
        //hier wordt de value van wenslijst naar string gecast om vervolgens naar een JSON object te worden gecast
    }

    Initiate(){
    }
    //This will get called when the component gets mounted (loaded)
    componentWillMount(){
        this.Initiate();
    }
    render() {
        return <div  className={"ProductPage"}>      
                <h1>Product Page</h1>
                <div>
                   <li> <img src={this.state.game.image}  height={300}/> </li>
                   <div> <h2> {this.state.game.name} </h2> </div>
                   <div> <h2> Price: {this.state.game.price} </h2></div>
                   <div> <h2> Description: {this.state.des} </h2></div>
                   <button onClick={ this.addGameToWenslijst }> add to wenslijst </button>   

                    <button onClick={ this.addGameToWinkelmand }> add to winkelmand </button> 

                   <div> _________________________ </div>
                </div>

            </div>; 
    }
}
