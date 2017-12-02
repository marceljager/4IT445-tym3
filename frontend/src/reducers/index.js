import { combineReducers } from 'redux';
import { ADD_TO_FRIENDS, LOG_IN, LOG_OUT } from '../actions/user';
import { CHANGE_INPUT_VALUE, CLEAR_EVENT_VALUES } from "../actions/event";

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
    private: false,
    dateFrom: '',
    dateTo: ''
};

const eventReducer = (state = initialEvent, action) => {
    switch (action.type) {
    case 'CHANGE_INPUT_VALUE': {
        const { id, value } = action.payload;
        return {
            ...state,
            [id]: value
        };
    }
    case 'CLEAR_EVENT_VALUES':
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
