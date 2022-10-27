class Storage {
  // eslint-disable-next-line no-undef
  store: globalThis.Storage;

  constructor() {
    // eslint-disable-next-line no-undef
    this.store = localStorage;
  }

  set(name: string, payload: any) {
    this.store.setItem(name, payload);
  }

  get(name: string) {
    return this.store.getItem(name);
  }

  remove(name: string) {
    return this.store.removeItem(name);
  }

  clear() {
    this.store.clear();
  }
}

export default new Storage();
