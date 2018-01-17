import * as React from 'react';


import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import {BestellingenContainer} from './components/Bestellingen/BestellingenContainer';
import { WenslijstContainer } from './components/Storage/Wenslijst/WensLijstContainer';
import { Winkelmand } from './components/Storage/ShoppingCart/WinkelmandContainer';
import { ProductPage } from './components/ProductPage/ProductPageContainer';
import { ItemsContainer } from "./components/Items/ItemsContainer";
import { ItemPage } from "./components/ProductPage/ItemPage";
import {LoginContainer} from "./components/LoginAndLogout/LoginContainer";
import {RegistratieContainer} from "./components/Registratie/RegistratieContainer";
import {GegevensContainer} from "./components/Profile/Gegevens/GegevensContainer";
import {ProfileSideMenuLayout} from "./components/Profile/Layout/ProfileSideMenuLayout";
import {ProfileContainer} from "./components/Profile/ProfileContainer";
import {LogoutContainer} from "./components/LoginAndLogout/LogoutContainer";
import {RegistratieSuccesfullContainer} from "./components/Registratie/RegistratieSuccesfullContainer";
import {Afrekenen} from "./components/Afrekenen/AfrekenContainer";
import {AdminContainer} from "./components/AdminProfile/AdminContainer";
import {UserNotLoggedInMenu} from "./components/LoginAndLogout/UserNotLoggedInMenuLayout";
import {AboutPage} from "./components/Footer/AboutPage";
import {ToSPage} from "./components/Footer/ToSPage";
import {PolicyPage} from "./components/Footer/PolicyPage";

export var routes = <Layout>
    <Route exact path={"/"} component={ItemsContainer} />
    
    <Route path={"/Profile"} component={ProfileContainer}/>
    <Route path={"/Profile/Gegevens"} component={GegevensContainer} />

    <Route path ={"/Admin"} component={AdminContainer}/>

    <Route path={"/Registratie"} component={RegistratieContainer} />
    <Route path={"/Registratiesuccessfull"} component={RegistratieSuccesfullContainer} />

    <Route path={"/Login"} component={LoginContainer} />
    <Route path ={"/Logout"} component={LogoutContainer}/>
    
    <Route path='/Wenslijst' component={ WenslijstContainer } />
    <Route path='/Winkelmand' component={ Winkelmand } />
    <Route path='/Afrekenen' component={Afrekenen} />

    <Route path='/Bestellingen' component={ BestellingenContainer } />

    <Route path="/Search/:searchQuery" component={ ItemsContainer }/>

    <Route path="/Games/All"  component={ItemsContainer}/>
    <Route path="/Games/Action"  component={ItemsContainer}/>
    <Route path="/Games/Shooter" component={ItemsContainer}/>
    <Route path="/Games/Fantasie" component={ItemsContainer}/>
    <Route path="/Games/Sport"  component={ItemsContainer}/>
    <Route path="/Games/Fight"  component={ItemsContainer}/>
    <Route path="/Games/Sandbox"  component={ItemsContainer}/>

    <Route path="/Consoles/All" component={ItemsContainer}/>
    <Route path="/Consoles/Xbox360" component={ItemsContainer}/>
    <Route path="/Consoles/XboxOne"  component={ItemsContainer}/>
    <Route path="/Consoles/Playstation3"  component={ItemsContainer}/>
    <Route path="/Consoles/Playstation4"  component={ItemsContainer}/>

    <Route path="/Accessoires/All" component={ItemsContainer}/>
    <Route path="/Accessoires/Headset" component={ItemsContainer}/>
    <Route path="/Accessoires/Racewheel" component={ItemsContainer}/>

    <Route path="/Policy" component={PolicyPage}/>
    <Route path="/ToS" component={ToSPage}/>
    <Route path="/About" component={AboutPage}/>
    <Route path="/Normies" component={UserNotLoggedInMenu}/>
    
</Layout>;
