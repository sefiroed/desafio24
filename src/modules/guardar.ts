import Productos from '../class/producto';
import { productos, dbIDs, lastID, msn } from './data';
import moment from 'moment';
import { guardarMessages } from './app'


export function guardarFromForm(data:any) {
  let flagError = false;
  // const msgErrorParametros = 'Parámetros no validos';

  if (data.producto === undefined || data.producto === '') {
    flagError = true;
  }

  if (data.precio === undefined || data.precio === '') {
    flagError = true;
  }

  if (isNaN(parseFloat(data.precio))) {
    flagError = true;
  }

  if (data.url === undefined || data.url === '') {
    flagError = true;
  }

  if (flagError) {
    return 400;
  } else {
    // Se incrementa el lastID por que se va a guarda un nuevo valor.
    lastID.lastID = lastID.lastID + 1; 

    const datos = new Productos(
      data.producto,
      data.precio,
      data.url,
      lastID.lastID
    );
    productos.push(datos);
    dbIDs.push(lastID.lastID);
    return 200;
  }
}

//Guardar los mensajes tanto en la variable como en el archivo
export async function guardarNewMessage(data:any) {
  let now = new Date();
  let date = moment(now).format('DD/MM/YYYY HH:MM:SS');
  data.date = date
  msn.push(data);
  await guardarMessages(data);
}

