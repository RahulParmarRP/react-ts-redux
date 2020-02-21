export default class LocalStorage {
    
    get(key: any) {
        return window.localStorage.getItem(key);
    }

    set(key: any, value: any) {
        window.localStorage.setItem(key, value);
    }

    remove(key: any) {
        window.localStorage.removeItem(key);
    }
}
