import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
//The navigation menu of the side bar

export class ZijMenu extends React.Component<{}, {}> {
    public render() {
        return <nav className="Zijbalk">

            
            <div>
                <h2>Consoles</h2>
                <nav>
                    <NavLink to={ '/Consoles/Xbox360' } exact activeClassName='active' className='LinksSide'>
                       Xbox 360
                    </NavLink>
                </nav>
                <nav>
                    <NavLink to={ '/Consoles/XboxOne' } exact activeClassName='active'className='LinksSide'>
                        Xbox One
                    </NavLink>
                </nav>
                <nav>
                    <NavLink to={ '/Consoles/Playstation3' } exact activeClassName='active' className='LinksSide'>
                       Playstation 3
                    
                    </NavLink>
                </nav>
                    <nav>
                        <NavLink to={ '/Consoles/Playstation4' } exact activeClassName='active' className='LinksSide'>
                           Playstation 4
                        </NavLink>
                    </nav>
                </div>
            
                <div>
                    <h2>Games</h2>
                    <nav>
                        <NavLink to={ '/Games/Action' } exact activeClassName='Active'className='LinksSide'>
                            Action
                        </NavLink>
                    </nav>
                    <nav>
                        <NavLink to={ '/Games/Shooter' } exact activeClassName='Avontuur'className='LinksSide'>
                            Shooter
                        </NavLink>
                    </nav>
                    <nav>
                        <NavLink to={ '/Games/Fantasy' } exact activeClassName='active'className='LinksSide'>
                            Fantasy
                        </NavLink>
                    </nav>
                    <nav>
                        <NavLink to={ '/Games/Sport' } exact activeClassName='active'className='LinksSide'>
                            Sport
                        </NavLink>
                    </nav>
                    <nav>
                        <NavLink to={ '/Games/Sandbox' } exact activeClassName='active'className='LinksSide'>
                            Sandbox
                        </NavLink>
                    </nav>
                    <nav>
                        <NavLink to={ '/Games/Fight' } exact activeClassName='active'className='LinksSide'>
                            Fight
                        </NavLink>
                    </nav>
                
                </div>
            
            
                <div>
                    <h2>Accessoires</h2>
                    <nav>
                        <NavLink to={ '/Accessoires/Headsets' } exact activeClassName='active'className='LinksSide'>
                            Headsets
                        </NavLink>
                    </nav>
                    <nav>
                        <NavLink to={ '/Accessoires/Racewheels' } exact activeClassName='active'className='LinksSide'>
                            Race-Wheels
                        </NavLink>
                    </nav>
                </div>
   </nav>
     