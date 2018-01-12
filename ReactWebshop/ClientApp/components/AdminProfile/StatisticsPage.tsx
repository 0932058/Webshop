import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'bootstrap';
import { Product, Bestelling, JoinedBestelling, DataForGraph} from 'ClientApp/components/Items/ItemsInterfaces';
import {PieChart,BarChart} from 'react-easy-chart';
import {GroupBy, OrderBy} from "../../../TypescriptModels/StatisticsClasses";
import { Klant } from 'TypescriptModels/Klant';

//When the profile gets clicked it gets redirected to this empty profile page
interface StatisticsInterface{
    orders : JoinedBestelling[]
    chartReadyForLoading: boolean,
    DataForGraph: DataForGraph[],
    choiceForChart: number
}

export class StatisticsPage extends React.Component<{}, StatisticsInterface> {
    constructor(){
        super();
        this.UserStatisticsApiCall = this.UserStatisticsApiCall.bind(this);

        
        this.state ={
            orders : [],
            chartReadyForLoading: false,
            DataForGraph: [],
            choiceForChart: 0,


        }
        
    }

    componentDidMount(){
        //this.GetOrders();
        
    }

    // async GetOrders(){
    //     await fetch('api/Bestellingen/GetAll')
    //     .then(response => response.json() as Promise<JoinedBestelling[]>)
    //     .then(data =>{
    //         this.setState({
    //             orders : data
    //         })
    //     });
    // }

    //This method is only used for the place statistics because postcode needs to be converted to an place name

    async UserStaticsLocation(attributeForGraph: string){ 
      var finalResultLocationAndAmmount = [];
      async function loopThroughLocation(klanten: any[]) {
            var apiResponses: any[] = [];
           for(var i = 0; i < klanten.length;i++){
                for(var z = 0; z < 1;z++){          
                let apiUrl = 'api/Statistics/location';
                let apiResponse = await fetch(apiUrl, {body: JSON.stringify(klanten[i][z].klantPostcode), method: 'Post', headers: new Headers({'content-type' : 'application/json'})}); 
                let responseConverted = apiResponse.json();
                apiResponses[i] = {place: responseConverted, klantenAmmount: klanten[i].length }                    
           }}
           return apiResponses;  
        }

        this.UserStatisticsApiCall(attributeForGraph)
        .then(klanten => loopThroughLocation(klanten)
        .then(locationNames => {
            for(var i = 0; i < locationNames.length; i++){
                let klantenAmmount = locationNames[i].klantenAmmount;
                locationNames[i].place.then((place) => {
                this.setState({
                    choiceForChart: 1,
                    chartReadyForLoading: true, 
                    DataForGraph: [...this.state.DataForGraph, {key: place, value: klantenAmmount}]})})                             
            }
        }
        ))
    }
    async UserStatisticsApiCall(attributeForGraph: string) : Promise<Klant[][]>{
        var groupBy: GroupBy = {
            attribute:attributeForGraph
        };
        let apiUrl = 'api/Statistics/Users/GroupBy';
        let apiResponse = await fetch(apiUrl, {body: JSON.stringify(groupBy), method: 'Post', headers: new Headers({'content-type' : 'application/json'})}); 
        let responseConverted = apiResponse.json();
        return responseConverted;

    }
    loadPieChart() : JSX.Element{
        return(
        <PieChart
        labels
        data={this.state.DataForGraph}
        styles={{
            '.chart_text': {
              fontSize: '2em',
              fill: '#fff'
            }
          }}
        />
        )
    }
    LoadBarChart() : JSX.Element{
        return(
            <BarChart
            axes
            height={250}
            width={900}
            data={this.state.DataForGraph}         
          />
        )
    }
    BestellingStatistics(attributeForGraph: string, ascendOrDescend: number){
        this.BestellingStatisticsApiCall(attributeForGraph,ascendOrDescend)
        .then(result => 
                this.setState({
                choiceForChart: 2,
                chartReadyForLoading: true, 
                DataForGraph: result})
        )
    }
    async BestellingStatisticsApiCall(attributeForGraph: string, ascendOrDescend: number) : Promise<DataForGraph[]> {
        var groupBy: OrderBy = {
            ascendOrDescend: ascendOrDescend,
            attribute:attributeForGraph
        };

        let apiUrl = 'api/Statistics/Orders/OrderBy';
        let apiResponse = await fetch(apiUrl, {body: JSON.stringify(groupBy), method: 'Post', headers: new Headers({'content-type' : 'application/json'})}); 
        let responseConverted = apiResponse.json();
        return responseConverted;
    }
    ReviewStatistics(byCategory: boolean, ascendOrDescend: number){
        alert("Button is not working yet");
        this.ReviewStatisticsApiCall(byCategory, ascendOrDescend)
        .then(result => {
            if(byCategory){
                this.setState({
                    choiceForChart: 1,
                    chartReadyForLoading: true, 
                    DataForGraph: result})
            }
            else{
                this.setState({
                    choiceForChart: 2,
                    chartReadyForLoading: true, 
                    DataForGraph: result})
            }
        }
        );

    }
    async ReviewStatisticsApiCall(byCategory: boolean, ascendOrDescend: number) : Promise<DataForGraph[]>{
        var groupBy: OrderBy = {
            ascendOrDescend: ascendOrDescend,
            attribute:null
        };

        if(byCategory){
            var apiUrl = 'api/Statistics/Reviews/Category';         
        }
        else{
            var apiUrl = 'api/Statistics/Reviews'; 
            
        }
        let apiResponse = await fetch(apiUrl, {body: JSON.stringify(groupBy), method: 'Post', headers: new Headers({'content-type' : 'application/json'})}); 
        let responseConverted = apiResponse.json();   
        return responseConverted;
    }
    render(){  
        return(                  
            <div className={"Container"}> 
                {this.state.chartReadyForLoading ?    
                    this.state.choiceForChart == 1?
                    this.loadPieChart()    
                    :
                    this.state.choiceForChart == 2?
                    this.LoadBarChart()          
                :
                <div> </div>
                :
                <div> </div>

                }
                
                <li> <h2> Users statistics </h2> </li>
                <li> <button onClick={() => this.UserStaticsLocation("klantPostcode")}> Locatie van klanten  </button> </li>
              
                <li> <h2> Bestellingen statistics</h2> </li>  
                <li> <button onClick={() => this.BestellingStatistics("productId",0)}> Meeste bestelde producten uit de huidige voorraad </button> </li>
                <li> <button onClick={() => this.BestellingStatistics("productId",1)}> Minste bestelde producten uit de huidige voorraad  </button> </li>
           
                <li> <h2> Review statistics</h2> </li>   
                <li> <button onClick={() => this.ReviewStatistics(false,0)}> Highest rated products of all time </button>  </li> 
                <li>  <button onClick={() => this.ReviewStatistics(false,1)}> Lowest rated products of all time </button></li>  
                <li> <button onClick={() => this.ReviewStatistics(true,0)}> Highest rated products of category </button>  </li> 
                <li> <button onClick={() => this.ReviewStatistics(true,1)}> Lowest rated products of category </button> </li>  

                <ul>
                    {
                        this.state.orders.map(
                            order => { console.log(order.productId); return (<li><h2> {order.bestellingDatum} </h2></li>)}
                        )
                    }
                </ul>
                </div>
                
        )
    }     
}