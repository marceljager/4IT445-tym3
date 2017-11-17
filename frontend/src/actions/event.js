export const STORE_NEW_EVENT = 'STORE_NEW_EVENT';

export const storeNewEvent = newEvent => ({
    type: STORE_NEW_EVENT,
    payload: {
        newEvent,
    },
});
