export class EventEmitter {
    #listeners = new Map();

    addEventListener(type, listner) {
        if (!this.#listeners.has(type)) {
            this.#listeners.set(type, new Set());
        }
        const listenerSet = this.#listeners.get(type);
        listenerSet.add(listner);
    }

    emit(type) {
        const listenerSet = this.#listeners.get(type);
        if (!listenerSet) {
            return;
        }
        listenerSet.forEach(listner => {
            listner.call(this);
        });
    }

    removeEventListner(type, listener) {
        const listnerSet = this.#listeners.get(type);
        if (!listenerSet) {
            return;
        }
        listnerSet.forEach(ownListener => {
            if (ownListener === listener) {
                listnerSet.delete(listener);
            }
        });
    }
}