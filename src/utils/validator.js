export const validateText = (rules, text) => {
    const { length } = text;
    let errorMessage;
    if (rules.maxLength && length > rules.maxLength.value) {
        errorMessage = rules.maxLength.message;
    } else if (rules.minLength && length <= rules.minLength.value) {
        errorMessage = rules.minLength.message;
    }

    return errorMessage ? { isValid: false, errorMessage } : { isValid: true };
};
