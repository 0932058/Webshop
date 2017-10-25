import * as React from 'react';


import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import {BestellingenContainer} from './components/Bestellingen/BestellingenContainer';
import { WensLijstContainer } from './components/Storage/Wenslijst/WensLijstContainer';
import { Winkelmand } from './components/Storage/ShoppingCart/WinkelmandContainer';
import { ProductPage } from './components/ProductPage/ProductPageContainer';
import {GamesContainer} from "./components/Categories/Games/GamesContainer";
import {ConsolesContainer} from "./components/Categories/Consoles/ConsoleContainer";
import {AccessoiresContainer} from "./components/Categories/Accessoires/AccessoiresContainer";
import {SearchContainer} from "./components/Search/SearchContainer";
import {HomeContainer} from "./components/Home/HomeContainer";
import {LoginContainer} from "./components/LoginAndLogout/LoginContainer";
import {RegistratieContainer} from "./components/Registratie/RegistratieContainer";
import {GegevensContainer} from "./components/Profile/Gegevens/GegevensContainer";
import {ProfileSideMenuLayout} from "./components/Profile/Layout/ProfileSideMenuLayout";
import {ProfileContainer} from "./components/Profile/ProfileContainer";
import {LogoutContainer} from "./components/LoginAndLogout/LogoutContainer";
import {RegistratieSuccesfullContainer} from "./components/Registratie/RegistratieSuccesfullContainer";
import {Afrekenen} from "./components/Afrekenen/AfrekenContainer";


export const routes = <Layout>
    <Route exact path={"/"} component={HomeContainer} />
    
    <Route path ={"/Profile"} component={ProfileContainer}/>
    <Route path={"/Profile/Gegevens"} component={GegevensContainer} />

    <Route path={"/Registratie"} component={RegistratieContainer} />
    <Route path={"/Registratiesuccessfull"} component={RegistratieSuccesfullContainer} />

    <Route path={"/Login"} component={LoginContainer} />
    <Route path ={"/Logout"} component={LogoutContainer}/>

    <Route path={"/Search"} component={SearchContainer} />
    
    <Route path='/Wenslijst' component={ WensLijstContainer } />
    <Route path='/Winkelmand' component={ Winkelmand } />
    <Route path='/Afrekenen' component={Afrekenen} />

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

    <Route path="/Accessoires/Headsets"  component={AccessoiresContainer}/>
    <Route path="/Accessoires/Racewheels"  component={AccessoiresContainer}/>
</Layout>;
