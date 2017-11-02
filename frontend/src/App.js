import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, withRouter } from 'react-router-dom';

import { Menu } from './components/Menu';
import PageContent from './pages/PageContent';
import configureStore from './store/configureStore';

import './App.css';

class App extends Component {
    render() {
        const store = configureStore;
        const MenuComponent = withRouter(props => <Menu {...props} />);

        return (
            <Provider store={store}>
                <Router>
                    <div>
                        <MenuComponent />
                        <PageContent />
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
