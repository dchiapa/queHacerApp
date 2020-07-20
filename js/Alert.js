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
      alert.action();
      cargarTareas();

    });
  }
  opciones(btn1Texto, btn1Accion, btn2Texto, elemento) {
    this.content = document.createElement('div');
    this.content.classList.add('alertContainer');
    this.content.innerHTML = `
    <span class="btn cerrarBtn"></span>
    <span id="btn1" class="btn alertBtn"><img class="opcionesImg" src="img/check.svg" alt="completado">${btn1Texto}</span>
    <span id="btn2" class="btn alertBtn"><img class="opcionesImg" src="img/reloj.svg" alt="tiempo pasado">${btn2Texto}</span>
    `;
    document.querySelector('body').appendChild(this.content);
    this.content = document.querySelector('.alertContainer');
    this.content.addEventListener('click', e => {
      e.stopPropagation();
      if (e.target.id == 'btn1') {
        btn1Accion(elemento);
        this.action();
      } else if (e.target.id == 'btn2') {
        this.action();
        alert.render(elemento.target.getAttribute('data-info'))

      } else if (e.target.classList.contains('cerrarBtn')) {
        this.action();
      }
    });
  }
  action() {
    this.content = document.querySelector('.alertContainer');
    document.querySelector('body').removeChild(this.content);
  }
}