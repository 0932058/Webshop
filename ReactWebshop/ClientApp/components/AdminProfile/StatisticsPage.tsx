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
        this.loadPieChart = this.loadPieChart.bind(this);

        
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
        this.state.DataForGraph.forEach((a) => console.log(a));
        return(
            <PieChart
            labels
            height={250}
            width={900}
            data={this.state.DataForGraph}
            />
        )
    }
    LoadBarChart() : JSX.Element{
        this.state.DataForGraph.forEach((a) => console.log(a));
        return(
            <BarChart
            axes
            height={300}
            width={1000}
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
        this.ReviewStatisticsApiCall(byCategory, ascendOrDescend)
        .then(result => {
            if(byCategory){
                this.setState({
                    choiceForChart: 1,
                    chartReadyForLoading: true, 
                    DataForGraph: result});
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
            <div className='col-md-10'>
                 <h2> Users statistics </h2>
                 {this.state.chartReadyForLoading ? 
                    this.state.choiceForChart == 1 ?
                    this.loadPieChart()
                    :            
                    this.LoadBarChart()
                  :
                  <div> No graph selected </div>
                 };

                 <button onClick={() => this.UserStaticsLocation("klantPostcode")}> Locatie van klanten  </button>
              
                 <h2> Bestellingen statistics</h2> 
     
                 <button onClick={() => this.BestellingStatistics("productId",0)}> Meeste bestelde producten uit de huidige voorraad </button>
                 <button onClick={() => this.BestellingStatistics("productId",1)}> Minst bestelde producten uit de huidige voorraad  </button>
           
                 <h2> Review statistics</h2>   
                 <button onClick={() => this.ReviewStatistics(false,0)}> Hoogst gewaardeerde producten uit de huidige voorraad </button> 
                  <button onClick={() => this.ReviewStatistics(false,1)}>  Minst gewaardeerde producten uit de huidige voorraad </button>  
                 <button onClick={() => this.ReviewStatistics(true,0)}>  Overall Reviews van producten per category</button> 

                
                    {
                        this.state.orders.map(
                            order => { console.log(order.productId); return (<li><h2> {order.bestellingDatum} </h2></li>)}
                        )
                    }
                </div>
                </div>
                
        )
    }     
}