# queHacerApp

Clasica lista "to do", que permite agregar tareas a realizar, y actualizar su estado.

Realizado con HTML5, CSS3 y JS.

v 1.0.1:

  - Corregir acciones para primer uso.
    - No detectaba el array vacío, y buscaba información para cargar.

v 1.0.0:

  - Agrega tareas, por defecto en estado pendiente.
  - Al hacer click sobre la tarea, se completa, mostrando una imagen de check antes de la tarea.
  - Al hacer click en borrar, la tarea correspondiente se borra.
  - En dispositivos con menos a 575px de ancho, el máximo de caracteres es 50.
  - En dispositivos con menos a 500px de ancho, el máximo de caracteres es 30.
  - Las tareas no se borran amenos que sean eliminadas por el usuario, o se borre la cache del navegador, ya que se almacenan en localStorage.
  
  - Corregir: 
    - el máximo de caracteres en dispositivos con menos a 360px de ancho.
    - Al hacer click en borrar, debe pedir confirmación.

  - Agregar:
    - 2 Columnas para dispositivos muy anchos?
    - Pedir confirmación para cambiar el estado de la tarea?
    - Una vez completa una tarea, al recargar se borra de localStorage?
