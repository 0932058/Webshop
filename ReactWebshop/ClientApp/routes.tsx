import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Bestellingen } from './components/Home';
import { Wenslijst } from './components/Wenslijst';
import { Winkelmand } from './components/Winkelmand';

export const routes = <Layout>
    <Route exact path='/' component={ Bestellingen } />
    <Route path='/Wenslijst' component={ Wenslijst } />
    <Route path='/WInkelmand' component={ Winkelmand } />
</Layout>;
