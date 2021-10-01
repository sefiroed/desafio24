//Creamos nuestras interfaces


export interface Producto {
    id?: number;
    nombre: string;
    precio: number;
    url: string;
}

export interface Mensaje {
    email: string;
    date: string;
    text: any;
}

