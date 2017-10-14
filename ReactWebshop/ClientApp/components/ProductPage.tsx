import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {game} from "./DatabaseSimulation/TableTypes";
import {gameTableData} from "./DatabaseSimulation/FakeDatabase";
import {consoleType} from "./DatabaseSimulation/ConsoleTable";

interface ProductPageState{
    game: game | null;
}

export class ProductPage extends React.Component<RouteComponentProps<{}>, ProductPageState> {
    constructor(){
        super();
        this.addGameToWenslijst = this.addGameToWenslijst.bind(this);
        this.addGameToWinkelmand = this.addGameToWinkelmand.bind(this);
        this.CheckGameAvailableStatus = this.CheckGameAvailableStatus.bind(this)
        this.CheckChoosenConsole = this.CheckChoosenConsole.bind(this)
        this.state = {game: gameTableData[2]}; //Game inserted from array to test the page layout
    }
    //Button 
    addGameToWenslijst(){
        var wenslijst = JSON.parse(String(localStorage.getItem('Wenslijst')));
        var wenslijstList: game[] = wenslijst.list;
        
        if(this.state.game != null)   {
            wenslijstList.push(this.state.game);
        }
        localStorage.setItem('Wenslijst', JSON.stringify({list: wenslijstList}));
    }
    //Button
    addGameToWinkelmand(){
        var wenslijst = JSON.parse(String(localStorage.getItem('winkelmand')));

        var wenslijstList: game[] = wenslijst.list;
        if(this.state.game != null){
            wenslijstList.push(this.state.game);
        }
        

        localStorage.setItem('winkelmand', JSON.stringify({list: wenslijstList}));
    }
    CheckGameAvailableStatus(){
        if(this.state.game != null){
            if(this.state.game.ammountAvailable > 0){
                return (<div> <h2> Game Status: the game is not available!  </h2> </div>);
            }
            else{
                return (<div> <h2> Game Status: The game is available!</h2> </div>)
            }
        }
    }
    CheckChoosenConsole(){
        var xbox360Image = "https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Xbox_360_full_logo.svg/1280px-Xbox_360_full_logo.svg.png"
        var xboxOneImage = "https://botw-pd.s3.amazonaws.com/styles/logo-thumbnail/s3/042017/untitled-1_114.png?itok=0PUsM4CQ"
        var playstation3Image = "http://www.findthatlogo.com/wp-content/uploads/2012/04/sony-ps3-logo.gif"
        var playstation4Image = "https://venturebeat.com/wp-content/uploads/2013/02/ps4-logo-white1.png?fit=866%2C258&strip=all"
        if(this.state.game != null){
            if(this.state.game.console == consoleType.xbox360){
                return (  <li> <img src={xbox360Image} width={100} height={100}/> </li>)
            }
            else if (this.state.game.console == consoleType.xboxOne){
                return (  <li> <img src={xboxOneImage} width={300} height={100}/> </li>)
            }
            else if (this.state.game.console == consoleType.playstation3){
                return (  <li> <img src={playstation3Image}  height={200}/> </li>)
            }
            else {
                return (  <li> <img src={playstation4Image}  height={200}/> </li>)
            }
        }
    }

    render() {
        if(this.state.game != null){
   
        return <div  className={"ProductPage"}>      
                <h1>{this.state.game.name} - {this.state.game.console}</h1>
                <div>   
                    <li> {this.CheckChoosenConsole()} </li>              
                   <li> <img src={this.state.game.image}  height={500}/> </li>
                   <div className={"product"}>
                   <div> <h2> Description: {this.state.game.description} </h2></div>
                   <div> <h2> Price: €{this.state.game.price.toFixed(2)} </h2></div>
                   <div> <h2> Age: {this.state.game.age} </h2></div>
                   <div> <h2> Genre: {this.state.game.genreCategory} </h2></div>
                   <div> <h2> Category: {this.state.game.category} </h2></div>
                    {this.CheckGameAvailableStatus()}             
                   <h2> <button onClick={ this.addGameToWenslijst }> add to wenslijst </button>   
                   <button onClick={ this.addGameToWinkelmand }> add to winkelmand </button> </h2>
                </div>
            </div>
            </div>; 
        }
        else{
            return <div> this will be removed </div>
        }
    }
}
