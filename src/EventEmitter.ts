export class EventEmitter {
  #listeners = new Map<string, Set<() => void>>();

  addEventListener(type: string, listner: () => void) {
    if (!this.#listeners.has(type)) {
      this.#listeners.set(type, new Set());
    }
    const listenerSet = this.#listeners.get(type);
    if (!listenerSet) throw new Error("Required");
    listenerSet.add(listner);
  }

  emit(type: string) {
    const listenerSet = this.#listeners.get(type);
    if (!listenerSet) {
      return;
    }
    listenerSet.forEach((listner) => {
      listner.call(this);
    });
  }

  removeEventListner(type: string, listener: () => void) {
    const listenerSet = this.#listeners.get(type);
    if (!listenerSet) {
      throw new Error("Required");
    }
    listenerSet.forEach((ownListener) => {
      if (ownListener === listener) {
        listenerSet.delete(listener);
      }
    });
  }
}
