// Isntancias de Clases
const storage = new Storage();
const alert = new Alert();
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
        contarTiempo(tarea.publicado);
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
    nuevaTarea.setAttribute('maxlength', '26');
  } else if (window.innerWidth < 575) {
    nuevaTarea.setAttribute('maxlength', '45');
  }
}
function agregarTarea() {
  if (nuevaTarea.value != '') {
    storage.add(nuevaTarea.value);
    cargarTareas();
    nuevaTarea.value = '';
  } else {
    alert.render('Debe ingresar una tarea nueva');
  }
}
function borrarTarea(e) {
  elemento = e.target.parentNode.firstChild.nextSibling.nextSibling.nextSibling.getAttribute('data-order');
  alert.confirm(elemento);
}
function completarTarea(e) {
  elemento = e.target.getAttribute('data-order');
  storage.modify(elemento);
  cargarTareas();
}
function contarTiempo(publicado) {
  let tiempoPublicado = publicado.split('-');
  tiempoPublicado[0] = tiempoPublicado[0].split('/');
  tiempoPublicado[1] = tiempoPublicado[1].split(':');
  let actual = new Date();
  let actualSegundos = actual.getSeconds();
  let actualMinutos = actual.getMinutes();
  let actualHoras = actual.getHours();
  let diffTiempo = [];
  let diffSeg = actualSegundos - tiempoPublicado[1][2];
  let diffMin = actualMinutos - tiempoPublicado[1][1];
  let diffHoras = actualHoras - tiempoPublicado[1][0];
  if (diffSeg < 0) {
    diffMin = diffMin - 1;
    diffSeg = diffSeg + 60;
  }
  if (diffMin < 0) {
    diffHoras = diffHoras - 1;
    diffMin = diffMin + 60;
  }
  if (diffHoras < 10) {
    diffHoras = '0' + diffHoras;
  }
  if (diffMin < 10) {
    diffMin = '0' + diffMin;
  }
  if (diffSeg < 10) {
    diffSeg = '0' + diffSeg;
  }
  diffTiempo.push(diffHoras, diffMin, diffSeg);
  console.log('Publicado: ' + tiempoPublicado[1][0] + ':' + tiempoPublicado[1][1] + ':' + tiempoPublicado[1][2] + 'Pasó: ' + diffTiempo[0] + ':' + diffTiempo[1] + ':' + diffTiempo[2])
}