class LocalStorageMock {
  constructor() {
    this.store = {}
  }
  setItem(key, value) {
    this.store[key] = value.toString()
  }
  removeItem(key) {
    delete storage[key]
  }
}

export default LocalStorageMock