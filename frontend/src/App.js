import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { Menu } from './components/Menu';
import PageContent from './pages/PageContent';
import configureStore from './store/configureStore';

import './App.css';

class App extends Component {
    render() {
        const store = configureStore;

        return (
            <Provider store={store}>
                <Router>
                    <div>
                        <Menu />
                        <PageContent />
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
