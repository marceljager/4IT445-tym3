import { combineReducers } from 'redux';
import { ADD_TO_FRIENDS, LOG_IN, LOG_OUT } from '../actions/user';
import {STORE_NEW_EVENT} from "../actions/event";

// TEMPORARY TEST DATA
const userInitialState = {
    user: {
        email: null,
        username: null,
        picture: null
    },
    friends: [],
};

const userReducer = (state = userInitialState, action) => {
    switch (action.type) {
    case LOG_IN:
        return {
            ...state,
            user: action.payload.user
        };
    case LOG_OUT:
        return {
            ...state,
            user: userInitialState
        };
    case ADD_TO_FRIENDS:
        return {
            ...state,
            friends: [
                ...state.friends,
                action.payload.userId
            ]
        };
    default:
        return state;
    }
};

const eventReducer = (state = userInitialState, action) => {
    switch (action.type) {
        case STORE_NEW_EVENT:
            return {
                ...state,
                user: action.payload.newEvent
            };
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    userData: userReducer,
});

export default rootReducer;
