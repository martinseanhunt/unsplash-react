class LocalStorageMock {
  constructor() {
    this.store = {}
  }
  setItem(key, value) {
    this.store[key] = value.toString()
  }
}

export default LocalStorageMock