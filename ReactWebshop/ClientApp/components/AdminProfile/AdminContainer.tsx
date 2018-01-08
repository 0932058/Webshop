import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { ProductsPage } from "./ProductsPage" ;
import { UsersPage } from "./UsersPage" ;
import { StatisticsPage } from "./StatisticsPage" ;

//When the profile gets clicked it gets redirected to this empty profile page

interface AdminState{
    page : JSX.Element
}

export class AdminContainer extends React.Component<RouteComponentProps<{}>, AdminState> {
    constructor(){
        super();

        this.switchTo = this.switchTo.bind(this);

        this.state = {
            page : <StatisticsPage/>
        }
    }

    switchTo(page : JSX.Element){
        this.setState({
            page
        })

    }

    render(){  
        return(         
            <div>

                <div className='col-sm-2'>
                    <div className="list-group">
                        
                        <button className={"list-group-item btn "} onClick={() => this.switchTo(<StatisticsPage/>)} >Statistics</button>

                        <button className={"list-group-item btn "} onClick={() => this.switchTo(<ProductsPage/>)} >Products</button> 

                        <button className={"list-group-item btn "} onClick={() => this.switchTo(<UsersPage/>)} >Users</button>

                    </div>                                                                  
                </div>

                <div className={"Container"}>

                    { /* the Statistics page */ }
                    <div className={"StatisticsComponent"}>
                        { this.state.page }
                    </div>

                </div>   
            
            </div>
            
            
        )
    }     
}