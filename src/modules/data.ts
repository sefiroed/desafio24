import { leerMessages } from './app';

/**
 * DATOS A MANIPULAR
 */

/* Definiendo mis Array */
const productos:any = []; 
const dbIDs:any = []; 
const lastID:any = { lastID: 0 }; 
const msn:any = []; 

/* Validar si existen mensajes guardados */
async function checkMessagesOld() {
  const messages = await leerMessages();
  msn.push.apply(msn, messages)
}

/* Inicializamos los mensajes */
checkMessagesOld();
export { productos, dbIDs, lastID, msn };