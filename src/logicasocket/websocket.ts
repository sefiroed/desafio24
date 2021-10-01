import { Server } from 'socket.io';
import { getAllMessages, addMessage } from '../schema/messages/'


export const initWSServer = (server:any) => {
    const io = new Server(server);

    io.on('connection', async (socket) => {
        console.log('LLEGO CONNECTION');
    
        let msges = await getAllMessages();
        socket.emit('receiveMessages', msges);
    
        socket.on('newMessage', (msge) => {
          console.log('LLEGO MENSAJE');
          addMessage(msge);
          io.emit('newMessage', msge);
        });
    });

    return io;
};    









