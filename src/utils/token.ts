import * as store from 'store';

export const setToken = (token: string) => {
    store.set('token', token);
};

export const getToken = () => store.get('token');
export const removeToken = () => store.remove('token');
