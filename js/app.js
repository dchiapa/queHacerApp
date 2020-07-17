// Isntancias de Clases
const storage = new Storage();
const alert = new Alert();
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
    completarTarea(e);
  }
});

// Funciones
function cargarTareas() {
  let estado = '';
  let fragmento;
  let info = '';
  let li;
  let orden = 0;
  let tareas = [];
  let tiempo = [];
  while (listaTareas.firstChild) {
    listaTareas.removeChild(listaTareas.firstChild);
  }
  fragmento = document.createDocumentFragment();
  tareas = storage.read();
  if (tareas != null) {
    tareas.forEach(tarea => {
      if (tarea.estado == 0) {
        estado = 'noVisible';
      } else {
        estado = '';
      }
      tiempo = contarTiempo(tarea.publicado);
      info = 'Publicado: ' + tiempo[0][0][0] + '/' + tiempo[0][0][1] + '/' + tiempo[0][0][2] + ' - ' + tiempo[0][1][0] + ':' + tiempo[0][1][1] + ':' + tiempo[0][1][2] + '\n' + 'Hace: ' + tiempo[1][0] + ':' + tiempo[1][1] + ':' + tiempo[1][2];
      li = document.createElement('li');
      li.innerHTML = `
    <img class="completa ${estado}" src="img/check.svg" alt="completado">
    <span class="tarea" data-order=${orden} data-estado=${tarea.estado} title="${info}">${tarea.tarea}</span>
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
  let actual = new Date();
  let actualDia;
  let actualHoras;
  let actualMinutos;
  let actualSegundos;
  let diffDias;
  let diffHoras;
  let diffMin;
  let diffSeg;
  let diffTiempo = [];
  let retorno = [];
  publicado = publicado.split('-');
  publicado[0] = publicado[0].split('/');
  publicado[1] = publicado[1].split(':');
  if (publicado[0][0] < 10) {
    publicado[0][0] = '0' + publicado[0][0];
  }
  if (publicado[0][1] < 10) {
    publicado[0][1] = '0' + publicado[0][1];
  }
  if (publicado[1][0] < 10) {
    publicado[1][0] = '0' + publicado[1][0];
  }
  if (publicado[1][1] < 10) {
    publicado[1][1] = '0' + publicado[1][1];
  }
  if (publicado[1][2] < 10) {
    publicado[1][2] = '0' + publicado[1][2];
  }
  retorno.push(publicado);
  actualSegundos = actual.getSeconds();
  actualMinutos = actual.getMinutes();
  actualHoras = actual.getHours();
  actualDia = actual.getDate();
  diffSeg = actualSegundos - publicado[1][2];
  diffMin = actualMinutos - publicado[1][1];
  diffHoras = actualHoras - publicado[1][0];
  diffDias = actualDia - publicado[0][0];
  if (diffSeg < 0) {
    diffMin = diffMin - 1;
    diffSeg = diffSeg + 60;
  }
  if (diffMin < 0) {
    diffHoras = diffHoras - 1;
    diffMin = diffMin + 60;
  }
  if (diffHoras < 0) {
    diffDias = diffDias - 1;
    diffHoras = diffHoras + 24;
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
  retorno.push(diffTiempo);

  console.log(retorno);
  return retorno;
}