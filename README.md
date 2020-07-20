# queHacerApp

Clasica lista "to do", que permite agregar tareas a realizar, y actualizar su estado.

Realizado con HTML5, CSS3 y JS.

 - Por hacer:
    - Panel de información de funcionamiento.
    - Boton para limpiar las tareas completas.

 - Por corregir:
    Se aceptan sugerencias xD

v 1.1.0:
  - Cambiar tooltip por menú.
    - En mobile no se mostraba.
    
v 1.1.0:
  - Agregar tooltip info de la tarea.
    - Muestra la fecha de Publicación y el tiempo pasado.
  - Agregar fondos de distintos colores Para las tareas incompletas.
    - Amarillo: Pasaron 5 días.
    - Naranja: Pasaron 10 días.
    - Rojo: Pasaron 15 días.

v 1.0.3:

  - Corregir confirmacion al borrar.
    - Al hacer click en borrar pide confirmación.

v 1.0.2:

  - Corregir agregar lineas en blanco.
    - Al agregar tarea, chequea que el input no esté vacio.
    - Ajustar cantidad de caracteres en dispositivos moviles.
    - Ajustar maquetado de footer en dispositivos moviles.
    
v 1.0.1:

  - Corregir acciones para primer uso.
    - No detectaba el array vacío, y buscaba información para cargar.

v 1.0.0:

  - Agrega tareas, por defecto en estado pendiente.
  - Al hacer click sobre la tarea, se completa, mostrando una imagen de check antes de la tarea.
  - Al hacer click en borrar, la tarea correspondiente se borra.
  - En dispositivos con menos a 575px de ancho, el máximo de caracteres es 50.
  - En dispositivos con menos a 500px de ancho, el máximo de caracteres es 30.
  - Las tareas no se borran amenos que sean eliminadas por el usuario, ó se borre la cache del navegador, ya que se almacenan en localStorage.

  - Corregir: 
    - el máximo de caracteres en dispositivos con menos a 360px de ancho.
    - Al hacer click en borrar, debe pedir confirmación.