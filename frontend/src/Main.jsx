import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

import Home from './pages/Home';
import Faq from './pages/Faq';
import Neco from './pages/Neco';

const Main = () => (
    <div>
        <h1>app</h1>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/neco">Něco</Link></li>
        </ul>

        <Route exact path="/" component={Home} />
        <Route path="/faq" component={Faq} />
        <Route path="/neco" component={Neco} />
    </div>
);

if (document.getElementById('root')) {
    ReactDOM.render(
        <Router>
            <Main />
        </Router>,
        document.getElementById('root')
    );
}
