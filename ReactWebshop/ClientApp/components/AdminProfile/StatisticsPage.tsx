import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'bootstrap';
import { Product, Bestelling, JoinedBestelling, DataForGraph} from 'ClientApp/components/Items/ItemsInterfaces';
import {PieChart,BarChart, LineChart, ToolTip} from 'react-easy-chart';
import {GroupBy, OrderBy, DatumFilter} from "../../../TypescriptModels/StatisticsClasses";
import { Klant } from 'TypescriptModels/Klant';
import Calendar from 'react-calendar'


//When the profile gets clicked it gets redirected to this empty profile page
interface StatisticsInterface{
    orders : JoinedBestelling[]
    chartReadyForLoading: boolean,
    DataForGraph: DataForGraph[],
    choiceForChart: number,

    calendarOptionClick: boolean,
    calendarDayClickedvalue: Date,
    calendarMonthClickedvalue: Date,
    calendarYearClickedvalue: Date,
    currentApiUrl: string,

    pieChartTop: number,
    pieChartLeft: number,
    pieChartValue: number,
    pieChartKey: number

   
}

export class StatisticsPage extends React.Component<{}, StatisticsInterface> {
    constructor(){
        super();
        this.loadPieChart = this.loadPieChart.bind(this);
        this.KlantLocationStatistics = this.KlantLocationStatistics.bind(this);
        this.KlantLocationApiCall = this.KlantLocationApiCall.bind(this);
        this.LineGraphStatistics = this.LineGraphStatistics.bind(this);
        this.LineGraphStatisticsApiCall = this.LineGraphStatisticsApiCall.bind(this);

    
        this.state ={
            orders : [],
            chartReadyForLoading: false,
            DataForGraph: [],
            choiceForChart: 0,
            calendarOptionClick: false,
            calendarMonthClickedvalue: new Date(),
            calendarYearClickedvalue: new Date(),
            calendarDayClickedvalue: new Date(),
            currentApiUrl: "",
            pieChartTop: 0,
            pieChartLeft: 0,
            pieChartValue: 0,
            pieChartKey: 0      
        }
        
    }

    loadPieChart() : JSX.Element{
        return(
            <PieChart
            labels
            height={750}
            width={900}
            data={this.state.DataForGraph}
            />
        )
    }
    LoadBarChart() : JSX.Element{      
        return(
            <BarChart
            axes
            height={300}
            width={1000}
            data={this.state.DataForGraph}         
          />
        )
    }
    LoadLineChart() : JSX.Element{
       return(
        <LineChart
        axes
        margin={{top: 10, right: 10, bottom: 50, left: 50}}
        axisLabels={{x: 'X', y: 'Y'}}
        width={900}
        interpolate={'cardinal'}
        height={300}
        data={[this.state.DataForGraph]}
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
    async ReviewStatisticsApiCall(byCategory: boolean, ascendOrDescend1: number) : Promise<DataForGraph[]>{
        var groupBy: OrderBy = {
            ascendOrDescend: ascendOrDescend1,
            attribute:null
        };
        if(byCategory){
            var apiUrl = 'api/Statistics/Reviews/Category';         
        }
        else{
            var apiUrl = 'api/Statistics/Reviews/' + ascendOrDescend1; 
            
        }
        let apiResponse = await fetch(apiUrl, {body: JSON.stringify(groupBy), method: 'Post', headers: new Headers({'content-type' : 'application/json'})}); 
        let responseConverted = apiResponse.json();   
        return responseConverted;
    }
    //////////////////////////////
    ///New refined methods below
    KlantLocationStatistics(){
        this.KlantLocationApiCall()
        .then((result) => this.setState({
            choiceForChart: 1,
            chartReadyForLoading: true, 
            DataForGraph: result}));
    }
    async KlantLocationApiCall() : Promise<any[]>{
        let apiUrl = 'api/Statistics/Klant/Location';
        let apiResponse = await fetch(apiUrl,{ method: 'Get', headers: new Headers({'content-type' : 'application/json'})});
        let responseConverted = apiResponse.json();
        return responseConverted;
    }
    LineGraphStatistics(apiUrl: string){
        this.setState({calendarOptionClick: false})
        this.LineGraphStatisticsApiCall(apiUrl)
        .then((result) => {
            this.setState({
                choiceForChart: 3,
                chartReadyForLoading: true, 
                DataForGraph: result})
        });

    }
    FixDateOffset(date: Date){
        date.setDate(date.getDate() + 1);      
    }
    async LineGraphStatisticsApiCall(apiUrl: string){
        if(this.state.calendarDayClickedvalue != null){
            this.FixDateOffset(this.state.calendarDayClickedvalue);
        }
        else if(this.state.calendarMonthClickedvalue != null){
            this.FixDateOffset(this.state.calendarMonthClickedvalue);
        }
        else{
            this.FixDateOffset(this.state.calendarYearClickedvalue);
        }        
        var filter: DatumFilter = {
            day: this.state.calendarDayClickedvalue,
            month: this.state.calendarMonthClickedvalue,
            year: this.state.calendarYearClickedvalue,
        }
        let fullApiUrl = 'api/Statistics/' + apiUrl;
        let apiResponse = await fetch(fullApiUrl,{body: JSON.stringify(filter), method: 'Post', headers: new Headers({'content-type' : 'application/json'})});
        let responseConverted = apiResponse.json();
        return responseConverted;
    }


    render(){  
      
        return(                       
            <div className={"Container"}> 
            <div className='col-md-10'>
            <div className="btn-group" role="group">
                <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Klanten
                </button>
                <div className="dropdown-menu dropdown-menu-klanten">
                    <li> <button onClick={this.KlantLocationStatistics} className="dropdown-item" type="button">Klanten locatie </button> </li>            
                    <li> <button onClick={() =>{ this.setState({calendarOptionClick: true}), this.setState({currentApiUrl: "Klant/Registratie"})}} 
                    className="dropdown-item" type="button"> Nieuwe gebruikers overzicht </button> </li>  
                </div>
            </div>
            <div className="btn-group" role="group">
                <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Bestellingen 
                </button>
                <div className="dropdown-menu dropdown-menu-bestellingen">
                    <li> <button onClick={() => {this.setState({calendarOptionClick: true}), this.setState({currentApiUrl: "Bestellingen"})}} className="dropdown-item" type="button">Bestellingen overzicht </button> </li>    
                    <button onClick={() => this.BestellingStatistics("productId",0)}> Meeste bestelde producten uit de huidige voorraad </button>
                    <button onClick={() => this.BestellingStatistics("productId",1)}> Minst bestelde producten uit de huidige voorraad  </button>                          
                </div>
            </div>
            <div className="btn-group" role="group">
                <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Omzet 
                </button>
                <div className="dropdown-menu dropdown-menu-bestellingen">
                <button onClick={() =>{ this.setState({calendarOptionClick: true}), this.setState({currentApiUrl: "Omzet"})}}> Omzet overzicht </button>                
                </div>
            </div>
            <div className="btn-group" role="group">
                <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Reviews
                </button>
                <div className="dropdown-menu dropdown-menu-bestellingen">
                <button onClick={() => this.ReviewStatistics(false,0)}> Hoogst gewaardeerde producten uit de huidige voorraad </button> 
                <button onClick={() => this.ReviewStatistics(false,1)}>  Minst gewaardeerde producten uit de huidige voorraad </button>  
               <button onClick={() => this.ReviewStatistics(true,0)}>  Overall Reviews van producten per category</button>                        
                </div>
            </div>

            {this.state.calendarOptionClick?      
            [   
                //TODO Find out why it starts at a wrong date
            <Calendar 
            showWeekNumbers={true} 
            locale={"nl-nl"}
            showNeighboringMonth={true}
            showNavigation={true}
            view={"decade"}

            onClickDay={(e:any) => this.setState({calendarDayClickedvalue: e, calendarMonthClickedvalue:null, calendarYearClickedvalue:null})}
            onClickMonth={(e:any) => this.setState({calendarMonthClickedvalue: e, calendarDayClickedvalue:null, calendarYearClickedvalue: null })}
            onClickYear={(e: any) => this.setState({calendarYearClickedvalue: e, calendarDayClickedvalue: null, calendarMonthClickedvalue:null})}
            />,
            <button onClick={() => this.LineGraphStatistics(this.state.currentApiUrl)}> Load the data </button>,          
            ]          
            :
            <div> </div>

            }           
            {this.state.chartReadyForLoading ? 
                    this.state.choiceForChart == 1 ?
                    this.loadPieChart()
                    :            
                    this.state.choiceForChart == 2 ?
                    this.LoadBarChart()
                    :
                    this.state.choiceForChart == 3 ?
                    this.LoadLineChart()
                    :
                    <div> </div>
                  :
                  <div>  </div>
                 }  
                                           
                </div>
                </div>
               
        )
    }     
}