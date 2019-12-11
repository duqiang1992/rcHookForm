class MyEvent {
  constructor() {
    this.list = {};
  }

  on(type, fn) {
    this.list[type] ? this.list[type].push(fn) : this.list[type] = [fn];
  };

  emit(type, data) {
    if (this.list[type] && this.list[type].length > 0) {
      this.list[type].forEach(item => {
        item(data);
      });
    }
  };

  remove(type, fn) {
    if (fn) {
      if (this.list[type] && this.list[type].length > 0) {
        for (let i = 0; i < this.list[type].length; i++) {
          if (this.list[type][i] === fn) {
            this.list[type].splice(i, 1);
            break;
          }
        }
      }
    } else {
      this.list[type] = [];
    }
  }
}

export default MyEvent;
