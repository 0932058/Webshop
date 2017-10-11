import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Winkelmand } from './components/Winkelmand';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/Winkelmand' component={ Winkelmand } />
    <Route path='/fetchdata' component={ FetchData } />
</Layout>;
