/**
 * An alternative session storage, because session storage would not work
 * in iOS private navigation
 */
export class SessionStorage {
    private data = {};
    setItem(key, val) {
        return this.data[key] = String(val);
    }
    getItem(key) {
        return this.data[key] ? this.data[key] : null;
    }
    removeItem(key) {
        delete this.data[key];
    }
    clear() {
        this.data = {};
    }
}