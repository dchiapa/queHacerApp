class Storage {
  add() {
  }
  delete() {
  }
  modify() {
  }
  read() {
    return this.tareas = JSON.parse(localStorage.getItem('tareas'));
  }
}