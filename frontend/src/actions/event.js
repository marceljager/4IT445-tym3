export const CHANGE_INPUT_VALUE = 'CHANGE_INPUT_VALUE';
export const CLEAR_EVENT_VALUES = 'CLEAR_EVENT_VALUES';

export const changeInputValue = (id, value) => ({
    type: 'CHANGE_INPUT_VALUE',
    payload: {
        id,
        value
    }
});

export const clearEventValues = () => ({
    type: 'CLEAR_EVENT_VALUES',
});

