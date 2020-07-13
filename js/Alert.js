class Alert {
  render(msg, classList) {
    this.content = document.createElement('div');
    this.msg = msg;
    this.classList = classList;
    this.content.classList.add('alertContainer');
    this.content.innerHTML = `
    <p class="alertParrafo">${this.msg}</p>
    <span class="btn alertBtn">Ok</span>
    `;
    if (this.classList != undefined) {
      this.classList.forEach(classes => {
        this.content.classList.add(classes);
      });
    }
    document.querySelector('body').appendChild(this.content);
    this.btn = document.querySelector('.alertBtn');
    this.btn.addEventListener('click', this.action);
  }
  confirm(elemento) {
    this.content = document.createElement('div');
    this.content.classList.add('alertContainer');
    this.content.innerHTML = `
    <p class="alertParrafo">¿Está seguro que desea eliminar esta tarea?</p>
    <p class="alertParrafo">Esta acción no se puede deshacer</p>
    <span id="btnSi" class="btn alertBtn">Si</span>
    <span id="btnNo" class="btn alertBtn">No</span>
    `;
    document.querySelector('body').appendChild(this.content);
    this.content = document.querySelector('.alertContainer');
    this.content.addEventListener('click', e => {
      e.stopPropagation();
      if (e.target.id == 'btnSi') {
        storage.delete(elemento);
      }
      this.action();
      cargarTareas();
    });
  }
  action() {
    this.content = document.querySelector('.alertContainer');
    document.querySelector('body').removeChild(this.content);
  }
}