import { combineReducers } from 'redux';
import { LOG_IN } from '../actions/user';

// TEMPORARY TEST DATA
const userInitialState = {
    user: {
        email: null,
        firstName: null,
        lastName: null
    },
};

const userReducer = (state = userInitialState, action) => {
    switch (action.type) {
    case LOG_IN:
        return {
            ...state,
            user: action.payload.user
        };
    default:
        return state;
    }
};

const rootReducer = combineReducers({
    userData: userReducer,
});

export default rootReducer;