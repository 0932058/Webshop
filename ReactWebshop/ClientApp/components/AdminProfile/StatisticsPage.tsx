import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'bootstrap';

//When the profile gets clicked it gets redirected to this empty profile page

export class StatisticsPage extends React.Component<{}, {}> {
    constructor(){
        super();
        
    }
    render(){  
        return(         
            <div className={"StatisticsComponent"}> 
                <h1> Statistics </h1>
                </div>
        )
    }     
}