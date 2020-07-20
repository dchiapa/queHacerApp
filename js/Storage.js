class Storage {
  add(elemento) {
    this.actual = new Date();
    this.publicado = this.actual.getFullYear() + '-' + (this.actual.getMonth() + 1) + '-' + this.actual.getDate() + 'T' + this.actual.getHours() + ':' + this.actual.getMinutes() + ':' + this.actual.getSeconds();
    this.elemento = elemento;
    this.tareas = this.read();
    if (this.tareas == null) {
      this.tareas = [];
    }
    this.tareas.push({ 'tarea': `${this.elemento}`, 'estado': 0, 'publicado': `${this.publicado}` });
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