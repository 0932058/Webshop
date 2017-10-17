import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import {BestellingenContainer} from './components/Bestellingen/BestellingenContainer';
import { WensLijstContainer } from './components/Storage/Wenslijst/WensLijstContainer';
import { Winkelmand } from './components/Storage/ShoppingCart/WinkelmandContainer';
import { ProductPage } from './components/ProductPage/ProductPageContainer';
import { Home } from './components/Home';
import {GamesContainer} from "./components/Categories/Games/GamesContainer";
import {ConsolesContainer} from "./components/Categories/Consoles/ConsoleContainer";


//Productpage won't be accesed in the menu tabs 
{/* <Route path='/ProductPage' component={ ProductPage } /> */}

export const routes = <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/Wenslijst' component={ WensLijstContainer } />
    <Route path='/Winkelmand' component={ Winkelmand } />
  
    <Route path='/Bestellingen' component={ BestellingenContainer } />

    <Route path="/Games/Action"  component={GamesContainer}/>
    <Route path="/Games/Shooter" component={GamesContainer}/>
    <Route path="/Games/Fantasy" component={GamesContainer}/>
    <Route path="/Games/Sport"  component={GamesContainer}/>
    <Route path="/Games/Fight"  component={GamesContainer}/>
    <Route path="/Games/Sandbox"  component={GamesContainer}/>

    <Route path="/Consoles/Xbox360" component={ConsolesContainer}/>
    <Route path="/Consoles/XboxOne"  component={ConsolesContainer}/>
    <Route path="/Consoles/Playstation3"  component={ConsolesContainer}/>
    <Route path="/Consoles/Playstation4"  component={ConsolesContainer}/>


</Layout>;
