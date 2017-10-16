import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import {BestellingenContainer} from './components/Bestellingen/BestellingenContainer';
import { WensLijstContainer } from './components/Storage/Wenslijst/WensLijstContainer';
import { Winkelmand } from './components/Storage/ShoppingCart/WinkelmandContainer';
import { ProductPage } from './components/ProductPage/ProductPageContainer';
import { Home } from './components/Home';

export const routes = <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/Wenslijst' component={ WensLijstContainer } />
    <Route path='/Winkelmand' component={ Winkelmand } />
    <Route path='/ProductPage' component={ ProductPage } />
    <Route path='/Bestellingen' component={ BestellingenContainer } />
</Layout>;
