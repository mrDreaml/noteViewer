const SAVED_DATA = 'savedData';

export const getStorageData = () => {
    const data = localStorage.getItem(SAVED_DATA);
    return data && JSON.parse(data);
};

export const setStorageData = state => {
    localStorage.setItem(SAVED_DATA, JSON.stringify(state));
};
