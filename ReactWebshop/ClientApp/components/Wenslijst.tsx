import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import Img from 'react-image';

interface WenslijstState{ 
    games: BestellingenGame[] 
}

type BestellingenGame = {
    name:string,
    console: string,
    price: number,
    category:string,
    orderdate: number | null,
    status: string | null,
    image: string
}

export class Wenslijst extends React.Component<RouteComponentProps<{}>, WenslijstState> {
    constructor(){
        super();
        this.createStorageAndState = this.createStorageAndState.bind(this);
        this.ConvertJson = this.ConvertJson.bind(this);
        this.addGameToStorage = this.addGameToStorage.bind(this);
        this.removeGameFromStorage = this.removeGameFromStorage.bind(this);
        this.state = {games:[]}
        
    }
    addGameToStorage() {
        var games = JSON.parse(String(localStorage.getItem('Wenslijst')));
        var gamesList: BestellingenGame[] = games.list;
        var game: BestellingenGame = {name: "DOOM", console: "Xbox", price: 60, category: "Games", orderdate: Date.now(), status:"Onderweg",
        image: "Images/doom-cover-new.jpg"}
        
        var game2: BestellingenGame = {name: "Call of duty Infinite Warfare",console: "Xbox ", price: 55, category: "Games", orderdate: Date.now(), status:"Bezorgd",
        image: "https://www.gamestop.com/common/images/lbox/125879b.jpg"}
        
        var game3: BestellingenGame = {name: "GTA 3",console: "Playstation 2", price: 50, category: "Games", orderdate: Date.now(), 
       status:"Onderweg", image:"https://www.lukiegames.com/assets/images/XBOX/xbox_grand_theft_auto_iii-110214.jpg"}
        
       var game4: BestellingenGame = {name: "Fifa 16",console: "Xbox", price: 55, category: "Games", orderdate: Date.now(),
        status:"Onderweg", image:"https://www.instant-gaming.com/images/products/836/271x377/836.jpg"}
        
        gamesList.push(game);
        gamesList.push(game2);
        gamesList.push(game3);
        gamesList.push(game4);

        localStorage.setItem('Wenslijst', JSON.stringify({list: gamesList }));
        
        this.ConvertJson();
    }

    removeGameFromStorage(name: String){
        var games = JSON.parse(String(localStorage.getItem('Wenslijst')));
        var gamesList: BestellingenGame[] = games.list;

        var newList: BestellingenGame[] = []; 

        gamesList.map(item => {
            if(item.name !== name){
                newList.push(item);
            }
        });

        localStorage.setItem('Wenslijst', JSON.stringify({list: newList }));
        
        this.ConvertJson();
    }

    addToShoppingCart(name : string){
        var Winkelmand = JSON.parse(String(localStorage.getItem('winkelmand')));
        var Wenslijst = JSON.parse(String(localStorage.getItem('Wenslijst')));

        var WenslijstList: BestellingenGame[] = Wenslijst.list;
        var WinkelmandList: BestellingenGame[] = Winkelmand.list;
        
        WenslijstList.map(item => {
            if(item.name === name)
            {WinkelmandList.push(item);}
        });

        localStorage.setItem('winkelmand', JSON.stringify({list: WinkelmandList}));
        
        this.removeGameFromStorage(name);
        this.ConvertJson();
    }

    createStorageAndState(){
        localStorage.setItem('Wenslijst', JSON.stringify({list: []}));
    }

    ConvertJson() : any{
        //hier wordt de value van wenslijst naar string gecast om vervolgens naar een JSON object te worden gecast
        var games = JSON.parse(String(localStorage.getItem('Wenslijst')));    
        this.setState({games: games.list})
    }

    componentWillMount(){
        this.createStorageAndState();
        this.ConvertJson();
    }

    render() {
        return <div className={"Wenslijst"}>
                <h1>Wenslijst</h1>
                <button onClick={ this.addGameToStorage }> Test Items Toevoegen </button>
                {this.state.games.map(game => (
                  <div>
                   <li> <img src={game.image}  height={300}/> </li>
                   <div> <h2> {game.name} </h2> </div>
                   <div> <h2> Prijs: {game.price} </h2></div>
                   <button onClick={() => {this.removeGameFromStorage(game.name)} }> remove this item</button>
                   <button onClick={() => {this.addToShoppingCart(game.name)}}>Toevoegen aan Winkelmand</button>
                   </div>
                ))}
            </div>;
    
    }
}

