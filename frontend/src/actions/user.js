export const LOG_IN = 'LOG_IN';
export const ADD_TO_FRIENDS = 'ADD_TO_FRIENDS';

export const logIn = user => ({
    type: LOG_IN,
    payload: {
        user,
    },
});

export const addToFriends = userId => ({
    type: ADD_TO_FRIENDS,
    payload: {
        userId,
    },
});
