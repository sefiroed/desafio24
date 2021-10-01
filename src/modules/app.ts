import { text } from 'express';
import { Mensaje } from '../entities/formatoknex'
import { messagesSchema } from '../schema/messageschema'




//Función para generar un numero aleatorio.
const random = (min:any, max:any) => {
  return Math.random() * (max - min + 1) + min;
};

//Generando el contenido
const contenido = () => {
  let obj = {
    producto: `Producto ${Math.floor(random(1, 10))}`,
    precio: `${random(0.0, 9999.99).toFixed(2)}`,
    url: `https://picsum.photos/id/${Math.floor(random(1, 200))}/200/200`,
    id: ``,
  };
  return obj;
};

//stringify el contenido para el Item.
const objToJSON = (contenido:any) => {
  return JSON.stringify(contenido, undefined, 2);
};

//Leer y devolver los mensajes en caso de que exista archivo de Mensaje.
async function leerMessages() {
  
  try {
    return await messagesSchema.find({});
  } catch (error) {
    console.log('No hay mensajes en el listado');
    return await [];
  }
  
};

// Archivo a guardar con formato JSON
async function guardarMessages(msn:any) {
  try {
    const msnNew: Mensaje = {
      email: msn.email,
      date: msn.date,
      text: msn.text,
    };
    const message = new messagesSchema(msnNew);
    return await message.save();
  } catch (error) {
    console.log('ERROR: No se pudo agregar un mensaje. ' + error);
  }
  // console.log(msn);
  // const message: Mensaje = {
  // email: msn.email,
  // date: msn.date,
  // text: msn.text
  // }
};


export { random, contenido, objToJSON, leerMessages, guardarMessages };