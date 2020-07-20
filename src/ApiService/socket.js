import io from 'socket.io-client';

function createWs() {

}
const ws = io("localhost:5000");

export {
  ws
}