// Isntancias de Clases
const alert = new Alert();
const storage = new Storage();
const tiempo = new Tiempo();

// Variables
const btnAgregar = document.querySelector('#btnTarea');
const nuevaTarea = document.querySelector('#nuevaTarea');
const listaTareas = document.querySelector('#listaTareas').firstElementChild;


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
    elegirOpciones(e);
  }
});

// Funciones
function cargarTareas() {
  let estado = '';
  let fragmento;
  let info = '';
  let li;
  let orden = 0;
  let publicado;
  let tareas = [];
  let tPasado = 0;
  let hace = '';
  while (listaTareas.firstChild) {
    listaTareas.removeChild(listaTareas.firstChild);
  }
  fragmento = document.createDocumentFragment();
  tareas = storage.read();
  if (tareas != null) {
    tareas.forEach(tarea => {
      hace = '';
      if (tarea.estado == 0) {
        estado = 'noVisible';
      } else {
        estado = '';
      }
      publicado = tarea.publicado.split('T');
      publicado[0] = publicado[0].split('-');
      publicado[0] = publicado[0][2] + '/' + publicado[0][1] + '/' + publicado[0][0];
      publicado = publicado[0] + ' - ' + publicado[1];
      tPasado = tiempo.diff(tarea.publicado);
      if (tPasado[0] > 0) {
        hace = hace + tPasado[0] + ' Días ';
      }
      hace = hace + tPasado[1] + ':';
      hace = hace + tPasado[2] + ':';
      hace = hace + tPasado[3] + 'hs';
      info = 'Publicado: ' + publicado + '\n' + 'Hace: ' + hace;
      li = document.createElement('li');
      if (tarea.estado == 0) {
        if (tPasado[0] >= 15) {
          li.classList.add('quince');
        } else if (tPasado[0] >= 10) {
          li.classList.add('diez');
        } else if (tPasado[0] >= 5) {
          li.classList.add('cinco');
        }

      }
      li.innerHTML = `
    <img class="completa ${estado}" src="img/check.svg" alt="completado">
    <span class="tarea" data-order=${orden} data-estado=${tarea.estado} data-info="${info}">${tarea.tarea}</span>
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
function elegirOpciones(e) {
  console.dir(e);
  alert.opciones('Completar Tarea', completarTarea, 'Publicado', e);
}