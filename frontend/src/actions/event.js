export const CHANGE_INPUT_VALUE = 'CHANGE_INPUT_VALUE';

export const changeInputValue = (id, value) => ({
    type: 'CHANGE_INPUT_VALUE',
    payload: {
        id,
        value
    }
});

