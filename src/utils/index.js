const isEmptyString = value => !value || (typeof (value) === 'string' && value.trim().length === 0);
const isEmptyObject = value => !value;

export {
    isEmptyString,
    isEmptyObject,
}