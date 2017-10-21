import React from 'react';
import { Route } from 'react-router-dom';

import { Login } from './Login';
import { Home } from './Home';
import SearchPage from './SearchPage';

const PageContent = () => (
    <div className="PageContent">
        <Route exact path="/" component={Login} />
        <Route path="/timeline" component={Home} />
        <Route path="/hledat/:searchText" component={SearchPage} />
    </div>
);

export default PageContent;
