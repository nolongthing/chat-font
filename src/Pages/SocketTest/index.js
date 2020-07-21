import React, { useState, useEffect, useRef } from 'react';

import { createWs } from 'ApiService/socket';
import { storage } from 'Static/tool';

export default function SocketTest(props) {
  let ws;
  useEffect(() => {
    ws = createWs();
    
    /* 消息接收监听事件 */
    ws.on('message',(data)=>{
      console.log(data);
    })

    /* 服务端断开socket连接的监听事件 */
    ws.on('disconnect',(reason)=>{
      console.log(reason);
      console.log('这时候需要回到登录页并且清除local Storage')
    })
    return () => {
      /* 跳转页面之前  手动清除ws */
    }
  }, [])


  function handleTest() {
    ws.emit('message',{
      test:111
    })
  }
  return (
    <div>
      this is SocketTest.
      <button onClick={handleTest}>按钮</button>
    </div>
  )
}
