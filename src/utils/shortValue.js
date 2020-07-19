export const makeShortValue = (value, lengthLimit) =>
    value.length > lengthLimit ? `${value.slice(0, lengthLimit)}...` : value;
