export const LOG_IN = 'LOG_IN';

export const logIn = user => ({
    type: LOG_IN,
    payload: {
        user,
    },
});
