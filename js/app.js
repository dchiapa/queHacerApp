// Isntancias de Clases
const storage = new Storage();

// Variables
const btnAgregar = document.querySelector('#btnTarea');
const nuevaTarea = document.querySelector('#nuevaTarea');
const listaTareas = document.querySelector('#listaTareas').firstElementChild;

let tareas = [];
let elemento = '';

// Listeners
window.addEventListener('load', cargarTareas);
btnAgregar.addEventListener('click', agregarTarea);
listaTareas.addEventListener('click', e => {
  e.stopPropagation();
  if (e.target.classList.contains('borrar')) {
    borrarTarea(e);
  }
  else if (e.target.classList.contains('tarea')) {
    completarTarea(e);
  }
});

// Funciones
function cargarTareas() {
  while (listaTareas.firstChild) {
    listaTareas.removeChild(listaTareas.firstChild);
  }
  let fragmento = document.createDocumentFragment();
  let estado = '';
  let orden = 0;
  tareas = storage.read();
  if (tareas != null) {
    tareas.forEach(tarea => {
      if (tarea.estado == 0) {
        estado = 'noVisible';
      } else {
        estado = '';
      }
      let li = document.createElement('li');
      li.innerHTML = `
    <img class="completa ${estado}" src="img/check.svg" alt="completado">
    <span class="tarea" data-order=${orden} data-estado=${tarea.estado}>${tarea.tarea}</span>
    <img class="borrar" src="img/delete.svg" alt="eliminar">
    `;
      fragmento.appendChild(li);
      orden = orden + 1;
    });
    listaTareas.appendChild(fragmento);
  }

  if (window.innerWidth < 500) {
    nuevaTarea.setAttribute('maxlength', '30');
  } else if (window.innerWidth < 575) {
    nuevaTarea.setAttribute('maxlength', '50');
  }
}
function agregarTarea() {
  storage.add(nuevaTarea.value);
  cargarTareas();
  nuevaTarea.value = '';
}
function borrarTarea(e) {
  elemento = e.target.parentNode.firstChild.nextSibling.nextSibling.nextSibling.getAttribute('data-order');
  storage.delete(elemento);
  cargarTareas();
}
function completarTarea(e) {
  elemento = e.target.getAttribute('data-order');
  storage.modify(elemento);
  cargarTareas();
}