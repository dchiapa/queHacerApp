class Storage {
  add(elemento) {
    this.elemento = elemento
    this.tareas = this.read();
    this.tareas.push({ 'tarea': `${this.elemento}`, 'estado': 0 });
    localStorage.setItem('tareas', JSON.stringify(this.tareas));
  }
  delete(elemento) {
    this.elemento = elemento
    this.tareas = this.read();
    this.tareas.splice(this.elemento, 1);
    localStorage.setItem('tareas', JSON.stringify(this.tareas));
  }
  modify(elemento) {
    this.tareas = this.read();
    if (this.tareas[elemento].estado == 0) {
      this.tareas[elemento].estado = 1;
    } else {
      this.tareas[elemento].estado = 0;
    };
    localStorage.setItem('tareas', JSON.stringify(this.tareas));
  }
  read() {
    return this.tareas = JSON.parse(localStorage.getItem('tareas'));
  }
}