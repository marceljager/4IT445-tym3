export const STORE_NEW_EVENT_RESTAURANT = 'STORE_NEW_EVENT_RESTAURANT';
export const STORE_NEW_EVENT_NAME = 'STORE_NEW_EVENT_NAME';
export const STORE_NEW_EVENT_DESCRIPTION = 'STORE_NEW_EVENT_DESCRIPTION';
export const STORE_NEW_EVENT_TYPE = 'STORE_NEW_EVENT_TYPE';
export const CLEAR_NEW_EVENT = 'CLEAR_NEW_EVENT';

export const storeNewEventRestaurant = event => ({
    type: STORE_NEW_EVENT_RESTAURANT,
    event,
});

export const storeNewEventName = event => ({
    type: STORE_NEW_EVENT_NAME,
    event,
});

export const storeNewEventDescription = event => ({
    type: STORE_NEW_EVENT_DESCRIPTION,
    event,
});

export const storeNewEventType = event => ({
    type: STORE_NEW_EVENT_TYPE,
    event,
});

export const clearNewEvent = () => ({
    type: CLEAR_NEW_EVENT,
});
