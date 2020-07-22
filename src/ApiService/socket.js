import io from 'socket.io-client';

function createWs(params={}) {
  const ws = io("localhost:5000/chat",params);
  return ws;
}


export {
  createWs
}