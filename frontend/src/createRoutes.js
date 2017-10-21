import React from 'react';
import { Route } from 'react-router-dom';

import { Login } from './pages/Login';
import { Home } from './pages/Home';

const createRoutes = () => (
    <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/prihlaseni" component={Login} />
    </div>
);

export default createRoutes();
