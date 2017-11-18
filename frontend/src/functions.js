export const isInObject = (obj, list) => {
    let i;
    for (i = 0; i < list.length; i += 1) {
        if (list[i].id === obj.id) {
            return true;
        }
    }

    return false;
};
