import io from 'socket.io-client';

function createWs() {
  const ws = io("localhost:5000");
  return ws;
}


export {
  createWs
}