import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {game}  from '../DatabaseSimulation/TableTypes';

interface WinkelmandProps{
}

interface WinkelmandState{ 
    games: game[] 
}

export class Winkelmand extends React.Component<RouteComponentProps<{}>, WinkelmandState> {
    constructor(){
        super();
        this.createStorageAndState = this.createStorageAndState.bind(this);
        this.ConvertJson = this.ConvertJson.bind(this);
        this.addGameToStorage = this.addGameToStorage.bind(this);
        this.removeGameFromStorage = this.removeGameFromStorage.bind(this);
        this.addWinkelmandToBestellingen = this.addWinkelmandToBestellingen.bind(this);

        this.state = {games:[]}
    }

    addGameToStorage() {
        var games = JSON.parse(String(localStorage.getItem('winkelmand')));
        var gamesList: game[] = games.list;
        
    //     var game: BestellingenGame = {name: "GTA V", console: "Xbox", price: 60, category: "Games", orderdate: "MMM Do YY", status:"Onderweg",
    //     image: "http://gamesofpc.com/wp-content/uploads/2015/02/GTA-5-Download.jpg"}
    //    var game2: BestellingenGame = {name: "Call of duty Infinite Warfare",console: "Xbox ", price: 55, category: "Games", orderdate: "MMM Do YY", status:"Bezorgd",
    //     image: "https://www.gamestop.com/common/images/lbox/125879b.jpg"}
    //    var game3: BestellingenGame = {name: "GTA 3",console: "Playstation 2", price: 50, category: "Games", orderdate: "MMM Do YY", 
    //    status:"Onderweg", image:"https://www.lukiegames.com/assets/images/XBOX/xbox_grand_theft_auto_iii-110214.jpg"}
    //    var game4: BestellingenGame = {name: "Fifa 16",console: "Xbox", price: 55, category: "Games", orderdate: "MMM Do YY",
    //     status:"Onderweg", image:"https://www.instant-gaming.com/images/products/836/271x377/836.jpg"}

    //     gamesList.push(game);
    //     gamesList.push(game2);
    //     gamesList.push(game3);
    //     gamesList.push(game4);

        localStorage.setItem('winkelmand', JSON.stringify({list: gamesList }));
        
        this.ConvertJson();
    }

    addWinkelmandToBestellingen() {
        // localStorage.setItem('bestellingen', JSON.stringify({list: []}));
        // var bestellingen = JSON.parse(String(localStorage.getItem('bestellingen')));
        // var winkelmand = JSON.parse(String(localStorage.getItem('winkelmand')));

        // var winkelmandList: BestellingenGame[] = winkelmand.list;
        // var bestellingenList: BestellingenGame[] = bestellingen.list;
        
        // winkelmandList.map(item => {
        //     bestellingenList.push(item);
        // });

        // localStorage.setItem('bestellingen', JSON.stringify({list: bestellingenList}));

        // localStorage.setItem('winkelmand', JSON.stringify({list: []}));
        // this.ConvertJson();
    }

    removeGameFromStorage(name: String){
        var games = JSON.parse(String(localStorage.getItem('winkelmand')));
        // var gamesList: BestellingenGame[] = games.list;

        // var newList: BestellingenGame[] = []; 

        // gamesList.map(item => {
        //     if(item.name !== name){
        //         newList.push(item);
        //     }
        // });

        // localStorage.setItem('winkelmand', JSON.stringify({list: newList }));
        
        this.ConvertJson();
    }

    createStorageAndState(){
        localStorage.setItem('winkelmand', JSON.stringify({list: []}));
       
    }

    ConvertJson() : any{
        //hier wordt de value van wenslijst naar string gecast om vervolgens naar een JSON object te worden gecast
        var games = JSON.parse(String(localStorage.getItem('winkelmand')));    
        if(games != null){
            this.setState({games: games.list})
        }
      
      
    }

    componentWillMount(){
        //this.createStorageAndState();
        this.ConvertJson()

        //localStorage.setItem('bestellingen', JSON.stringify({list: []}));
    }

    render() {
        return <div className={"Winkelmand"}> 

                <button onClick={ this.addGameToStorage }> add an item </button>   

                <button onClick={ this.addWinkelmandToBestellingen }> add to bestellingen </button>   
    
                <h1>Winkelmand {", " + this.state.games.length + " items in Winkelwagen"}</h1> 
                <h2> {} </h2>
                
                <ul>
                    {
                        this.state.games.map(game =>

                            <li>
                                <h2> ------------------------ </h2>
                                <h2>{ "Game: " +  game.name }</h2>
                                <h2>{ "Prijs: " + game.price }</h2>
                                <button onClick={() => {this.removeGameFromStorage(game.name)} }> remove this item</button>   
                            </li>

                        )
                    }
                </ul>
            </div>;
    
    }
}

