//Creamos una clase especial para trabajar con socket

export default class Productos {
    constructor(public producto:any, public precio:any, public url:any, public id:any) {
      this.producto = producto;
      this.precio = parseFloat(precio);
      this.url = url;
      this.id = id;
    }
}