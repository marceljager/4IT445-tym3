export const isInObject = (obj, list, parameter = 'id') => {
    let i;
    for (i = 0; i < list.length; i += 1) {
        if (list[i].id === obj[parameter]) {
            return true;
        }
    }

    return false;
};
