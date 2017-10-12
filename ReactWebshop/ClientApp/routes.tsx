import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Bestellingen } from './components/Bestellingen';
import { Wenslijst } from './components/Wenslijst';
import { Winkelmand } from './components/Winkelmand';
import { ProductPage } from './components/ProductPage';

export const routes = <Layout>
    <Route exact path='/' component={Bestellingen} />
    <Route path='/Wenslijst' component={ Wenslijst } />
    <Route path='/WInkelmand' component={ Winkelmand } />
    <Route path='/ProductPage' component={ ProductPage } />
</Layout>;
