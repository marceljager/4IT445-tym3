import React from 'react';
import { Route } from 'react-router-dom';

import { Login } from './Login';
import { Home } from './Home';
import SearchPage from './SearchPage';
import UserProfile from './UserProfile';
import EventDetail from './EventDetail';

const PageContent = () => (
    <div className="PageContent">
        <Route exact path="/" component={Login} />
        <Route path="/timeline" component={Home} />
        <Route path="/detail-restaurace" component={EventDetail} />
        <Route path="/hledat/:searchText" component={SearchPage} />
        <Route path="/uzivatel/:userId" component={UserProfile} />
    </div>
);

export default PageContent;
