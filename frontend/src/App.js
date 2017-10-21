import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import configureStore from './store/configureStore';
import createRoutes from './createRoutes';

import './App.css';

class App extends Component {
    render() {
        const store = configureStore;
        const routes = createRoutes;

        return (
            <Provider store={store}>
                <Router>
                    {routes}
                </Router>
            </Provider>
        );
    }
}

export default App;
