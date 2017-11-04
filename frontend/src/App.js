import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, withRouter } from 'react-router-dom';
import { IntlProvider, addLocaleData } from 'react-intl';

import cs from 'react-intl/locale-data/cs';

import { Menu } from './components/Menu';
import PageContent from './pages/PageContent';
import configureStore from './store/configureStore';

import './App.css';

addLocaleData([...cs]);

class App extends Component {
    render() {
        const store = configureStore;
        const MenuComponent = withRouter(props => <Menu {...props} />);

        return (
            <IntlProvider locale="cs">
                <Provider store={store}>
                    <Router>
                        <div>
                            <MenuComponent />
                            <PageContent />
                        </div>
                    </Router>
                </Provider>
            </IntlProvider>
        );
    }
}

export default App;
