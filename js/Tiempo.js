class Tiempo {
  validar(fecha) {
    this.fecha = fecha;
    if (this.fecha.includes('T')) {
      this.fecha = this.fecha.split('T');
      this.hs = this.fecha[1];
      this.fecha = this.fecha[0];
    } else if (this.fecha.includes('-')) {
      this.hs = '';
    } else if (this.fecha.includes(':')) {
      this.fecha = '';
    } else {
      this.fecha = '';
      this.hs = '';
    }
    if (this.fecha == '') {
      this.hoy = new Date();
      this.fecha = this.hoy.getFullYear() + '-' + (this.hoy.getMonth() + 1) + '-' + this.hoy.getDate();
    }
    if (this.hs == '') {
      this.hoy = new Date();
      this.hs = this.hoy.getHours() + ':' + this.hoy.getMinutes() + ':' + this.hoy.getSeconds();
    }
    this.fecha = this.fecha.split('-');
    this.fecha = this.fecha[0] + '-' + this.convert(this.fecha[1]) + '-' + this.convert(this.fecha[2]);
    this.hs = this.hs.split(':');
    this.hs = this.convert(this.hs[0]) + ':' + this.convert(this.hs[1]) + ':' + this.convert(this.hs[2]);
    this.fecha = this.fecha + 'T' + this.hs + '-03:00';
    return this.fecha;
  }
  diff(fecha1, fecha2) {
    if (fecha2 == undefined) {
      fecha2 = ''
    }
    this.fecha1 = new Date(this.validar(fecha1));
    this.fecha2 = new Date(this.validar(fecha2));
    this.resta = this.fecha2.getTime() - this.fecha1.getTime();
    if (this.resta < 0) {
      return 'Error';
    }
    this.d = (this.resta / (1000 * 60 * 60 * 24)).toString().split('.');
    this.hs = (parseFloat('0.' + this.d[1]) * 24).toString().split('.');
    this.d = this.d[0];
    this.min = (parseFloat('0.' + this.hs[1]) * 60).toString().split('.');
    this.hs = this.hs[0];
    this.seg = Math.round(parseFloat('0.' + this.min[1]) * 60).toString();
    this.min = this.min[0];
    if (this.seg == "60") {
      this.seg = "0";
      this.min = this.min + 1;
    }
    if (this.min == "60") {
      this.min = "0";
      this.hs = this.hs + 1;
    }
    if (this.hs == "24") {
      this.hs = "0";
      this.d = this.d + 1;
    }
    this.d = this.convert(this.d);
    this.hs = this.convert(this.hs);
    this.min = this.convert(this.min);
    this.seg = this.convert(this.seg);
    return [this.d, this.hs, this.min, this.seg];
  }
  convert(dato) {
    if (dato < 10) {
      dato = '0' + dato;
    }
    return dato;
  }
}


