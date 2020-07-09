// Isntancias de Clases
const storage = new Storage();

// Variables
const btnAgregar = document.querySelector('#btnTarea');
const nuevaTarea = document.querySelector('#nuevaTarea');
const listaTareas = document.querySelector('#listaTareas');

let tareas = [];

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
function agregarTarea() {
}
function borrarTarea() {
  console.dir('Borrar Elemento');
}
function cargarTareas() {
  tareas = storage.read();
  console.dir(tareas);
}
function completarTarea(e) {
  e.target.parentNode.childNodes[1].classList.toggle('noVisible');
}