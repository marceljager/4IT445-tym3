import React from 'react';
import { Route } from 'react-router-dom';

import { Login } from './Login';
import { Home } from './Home';
import SearchPage from './SearchPage';
import UserProfile from './UserProfile';
import RestaurantProfile from './RestaurantProfile';
import Step1 from './CreateEvent/Step1';
import Step2 from './CreateEvent/Step2';
import Step3 from './CreateEvent/Step3';
import EventDetail from './EventDetail';
import Timeline from './Timeline';

const PageContent = () => (
    <div className="PageContent">
        <Route exact path="/" component={Login} />
        <Route exact path="/registrace" component={Login} />
        <Route path="/landing" component={Home} />
        <Route path="/detail-akce/:eventId" component={EventDetail} />
        <Route path="/hledat/:searchText" component={SearchPage} />
        <Route path="/uzivatel/:userId" component={UserProfile} />
        <Route path="/misto/:placeId" component={RestaurantProfile} />
        <Route path="/nova-udalost/krok-1" component={Step1} />
        <Route path="/nova-udalost/krok-2" component={Step2} />
        <Route path="/nova-udalost/krok-3" component={Step3} />
        <Route path="/timeline" component={Timeline} />
    </div>
);

export default PageContent;
