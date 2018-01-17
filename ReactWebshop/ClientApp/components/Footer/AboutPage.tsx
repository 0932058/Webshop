import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Redirect } from 'react-router'
import { RouteComponentProps } from 'react-router';


export class AboutPage extends React.Component<RouteComponentProps<{}>> {
    constructor(){
        super();

    }

    public render() {
        return (
            <div>
                <h3>
                    Wij zijn <em>De Normies</em>
                </h3>
                <h4>
                    De groep bestaat uit 6 leden<br/>
                    <strong>Namelijk:</strong>
                </h4>
                <h4>
                    Olaf van der Graaf<br/>
                    Mika Grootenboer<br/>
                    Felix de Jonge<br/>
                    Stefan Pesic<br/>
                    Deerk Douma<br/>
                    Lucas de Graaf<br/>
                </h4>
            </div>
        )
    }
}