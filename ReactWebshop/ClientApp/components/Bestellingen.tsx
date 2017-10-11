import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import Img from 'react-image'


interface BestellingenProps{
}
interface BestellingenState{
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

export class Bestellingen extends React.Component<RouteComponentProps<{}>, BestellingenState> {
    constructor(){
        super();
        this.CreateGamesAndLocalStorage = this.CreateGamesAndLocalStorage.bind(this);
        this.ConvertJson = this.ConvertJson.bind(this);
        this.state = {games:[]}
        
    }
    CreateGamesAndLocalStorage(){
        var game: BestellingenGame = {name: "GTA V", console: "Xbox", price: 60, category: "Games", orderdate: 2017, status:"Onderweg",
         image: "http://gamesofpc.com/wp-content/uploads/2015/02/GTA-5-Download.jpg"}
        var game2: BestellingenGame = {name: "Call of duty Infinite Warfare",console: "Xbox ", price: 55, category: "Games", orderdate: 2017, status:"Bezorgd",
         image: "https://www.gamestop.com/common/images/lbox/125879b.jpg"}
        var game3: BestellingenGame = {name: "GTA 3",console: "Playstation 2", price: 60, category: "Games", orderdate: 2017, 
        status:"Onderweg", image:"https://www.lukiegames.com/assets/images/XBOX/xbox_grand_theft_auto_iii-110214.jpg"}
        var game4: BestellingenGame = {name: "Fifa 16",console: "Xbox", price: 55, category: "Games", orderdate: 2017,
         status:"Onderweg", image:"https://www.instant-gaming.com/images/products/836/271x377/836.jpg"}
        localStorage.setItem('bestellingen', JSON.stringify({list: [game,game2,game3,game4] }));
  
    }
    ConvertJson() : any{
        //hier wordt de value van wenslijst naar string gecast om vervolgens naar een JSON object te worden gecast
        var games = JSON.parse(String(localStorage.getItem('bestellingen')));    
        this.setState({games: games.list})

        
        
    }
    componentWillMount(){
        this.CreateGamesAndLocalStorage();
        this.ConvertJson()

    }
    render() {
        var list =[1,2,3,4,5,6,7]
        return <div className={"Orders"}>      
    
                <h1>Bestellingen</h1>
                {this.state.games.map(game => (
                  <div>
                   <li> <img src={game.image}  height={300}/> </li>
                   <div> <h2> {game.name} </h2> </div>
                   <div> <h2> Besteld op: {game.orderdate} </h2></div>
                   <div> <h2> Status: {game.status} </h2></div>
                   <div> . </div>
                   <div> . </div>
                   </div>
                   
         

                ))}
               
            </div>;
    
    }
}
