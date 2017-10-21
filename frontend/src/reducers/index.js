import { combineReducers } from 'redux';
import { LOG_IN } from '../actions/user';

// TEMPORARY TEST DATA
const shoppingCartInitialState = {
    items: [
        {
            product: {
                id: 3,
                title: 'Moped',
                price: '1 000',
                shortInfo: ' No comment.'
            },
            count: 2
        },
    ],
};

const userReducer = (state = shoppingCartInitialState, action) => {
    switch (action.type) {
    case LOG_IN:
        return {
            ...state,
            items: [
                ...state.items,
                {
                    product: action.payload.product,
                    count: 1
                }
            ]
        };
    default:
        return state;
    }
};

const rootReducer = combineReducers({
    user: userReducer,
});

export default rootReducer;