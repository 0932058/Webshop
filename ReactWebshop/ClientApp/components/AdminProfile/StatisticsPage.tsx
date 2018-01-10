import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'bootstrap';
import { Product, Bestelling, JoinedBestelling } from 'ClientApp/components/Items/ItemsInterfaces';

//When the profile gets clicked it gets redirected to this empty profile page
interface StatisticsInterface{
    orders : JoinedBestelling[]
}

export class StatisticsPage extends React.Component<{}, StatisticsInterface> {
    constructor(){
        super();

        this.state ={
            orders : []
        }
        
    }

    componentDidMount(){
        this.GetOrders();
    }

    async GetOrders(){
        await fetch('api/Bestellingen/GetAll')
        .then(response => response.json() as Promise<JoinedBestelling[]>)
        .then(data =>{
            this.setState({
                orders : data
            })
        });
    }

    render(){  
        return(         
            <div className={"StatisticsComponent"}> 
                <h1> Statistics </h1>
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