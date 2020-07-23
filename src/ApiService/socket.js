import io from 'socket.io-client';

const host = process.env.NODE_ENV === 'development' ? 'localhost:5000' : '';

/* 创建群聊通道 */
function createWs(params = {}) {
  const ws = io(`${host}/chat`, params);
  return ws;
}


export {
  createWs
}