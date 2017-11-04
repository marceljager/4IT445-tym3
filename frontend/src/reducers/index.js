import { combineReducers } from 'redux';
import { ADD_TO_FRIENDS, LOG_IN } from '../actions/user';

// TEMPORARY TEST DATA
const userInitialState = {
    user: {
        email: null,
        name: null,
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

const rootReducer = combineReducers({
    userData: userReducer,
});

export default rootReducer;
