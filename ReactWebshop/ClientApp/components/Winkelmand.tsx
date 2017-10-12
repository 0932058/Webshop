import * as React from 'react';
import { RouteComponentProps } from 'react-router';

interface WinkelmandProps{
}

interface WinkelmandState{ 
    games: codGame[] 
}
class codGame{
    price: number
    name: String

    constructor(name: String){
        this.price = 50;
        this.name = name;
    }
}

export class Winkelmand extends React.Component<RouteComponentProps<{}>, WinkelmandState> {
    constructor(){
        super();
        this.createStorageAndState = this.createStorageAndState.bind(this);
        this.ConvertJson = this.ConvertJson.bind(this);
        this.addGameToStorage = this.addGameToStorage.bind(this);
        this.removeGameFromStorage = this.removeGameFromStorage.bind(this);

        this.state = {games:[]}
        
    }

    addGameToStorage() {
        var games = JSON.parse(String(localStorage.getItem('winkelmand')));
        var gamesList: codGame[] = games.list;

        gamesList.push(new codGame("Destiny 2"))
        
        var game = new codGame("cod");
        var game2 = new codGame("pubg");

        gamesList.push(game);
        gamesList.push(game2);

        localStorage.setItem('winkelmand', JSON.stringify({list: gamesList }));
        
        this.ConvertJson();
    }

    removeGameFromStorage(name: String){
        var games = JSON.parse(String(localStorage.getItem('winkelmand')));
        var gamesList: codGame[] = games.list;

        var newList: codGame[] = []; 

        gamesList.map(item => {
            if(item.name !== name){
                newList.push(item);
            }
        });

        localStorage.setItem('winkelmand', JSON.stringify({list: newList }));
        
        this.ConvertJson();
    }

    createStorageAndState(){
        var game = new codGame("cod");
        var game2 = new codGame("pubg");

        localStorage.setItem('winkelmand', JSON.stringify({list: [game, game2] }));
    }

    ConvertJson() : any{
        //hier wordt de value van wenslijst naar string gecast om vervolgens naar een JSON object te worden gecast
        var games = JSON.parse(String(localStorage.getItem('winkelmand')));    
        this.setState({games: games.list})
    }

    componentWillMount(){
        /*this.createStorageAndState();*/
        this.ConvertJson()

    }

    render() {
        return <div className={"Winkelmand"}> 

                <button onClick={ this.addGameToStorage }> add an item </button>   
    
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

