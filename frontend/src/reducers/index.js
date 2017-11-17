import { combineReducers } from 'redux';
import { ADD_TO_FRIENDS, LOG_IN, LOG_OUT } from '../actions/user';
import {
    STORE_NEW_EVENT_RESTAURANT,
    STORE_NEW_EVENT_NAME,
    STORE_NEW_EVENT_DESCRIPTION,
    STORE_NEW_EVENT_TYPE,
    CLEAR_NEW_EVENT
} from "../actions/event";

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

const initialEvent = {
    restaurant: '',
    name: '',
    description: '',
    type: 'public'
};

const eventReducer = (state = initialEvent, action) => {
    switch (action.type) {
        case STORE_NEW_EVENT_RESTAURANT:
            return {
                ...state,
                restaurant: action.event,
            };
        case STORE_NEW_EVENT_NAME:
            return {
                ...state,
                name: action.event,
            };
        case STORE_NEW_EVENT_DESCRIPTION:
            return {
                ...state,
                description: action.event,
            };
        case STORE_NEW_EVENT_TYPE:
            return {
                ...state,
                type: action.event,
            };
        case CLEAR_NEW_EVENT:
            return {
                ...initialEvent
            };
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    userData: userReducer,
    event: eventReducer
});

export default rootReducer;
