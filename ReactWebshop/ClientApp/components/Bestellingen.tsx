import * as React from 'react';
import { RouteComponentProps } from 'react-router';

interface BestellingenProps{
}
interface BestellingenState{
}
class BestellingenGame{
    name: string;
    price: Number;
    category: string;
    orderdate: Date | null
    status: string | null
    image: any | null
    constructor(name: string, price: number, category: string, orderdate: Date| null, status: string| null, image: any| null ){
        this.name = name;
        this.price = price;
        this.category = category;
        this.orderdate = orderdate;
        this.status = status;
        this.image = image;
    }
}

export class Bestellingen extends React.Component<RouteComponentProps<{}>, BestellingenState> {
    constructor(props: BestellingenProps){
        super();
        //localStorage.setItem('wenslijst', JSON.stringify({list: [game] }));
    }

  
    public render() {

        var bestellingen = JSON.parse(String(localStorage.getItem('wenslijst')));

        //voorbeeld.list[0].price = 20;

        return <div className={"Orders"}>      
                <div>
                    Test45353535
                    <h1>{ bestellingen.list[0] }</h1>
                </div>
            </div>;
    }
}
export default Bestellingen;