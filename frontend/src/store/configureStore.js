import { createStore } from 'redux';

import rootReducer from '../reducers/index';

const configureStore = () =>
    createStore(
        rootReducer,
        undefined,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

export default configureStore();
