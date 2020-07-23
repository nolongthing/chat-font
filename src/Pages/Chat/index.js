import React, { useState, useEffect, useRef } from 'react';
import { PageHeader, Mentions, Button, Form, message } from 'antd';
import cns from 'classnames';
import { UpOutlined } from '@ant-design/icons';
import Message from 'Components/Message';
import Line from 'Components/Line';
import { createWs } from 'ApiService/socket';
import { storage } from 'Static/tool';
import styles from './chat.module.scss';

const { Option } = Mentions;
let ws;
export default function Chat(props) {
  const { from, fromId, img } = storage.get(['from', 'fromId', 'img']);
  const [isPull, setIsPull] = useState(false);
  const [messages, setMessages] = useState([]);
  const chatBox = useRef(null);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!fromId) {
      message.error('登陆已失效，请重新登录');
      props.history.replace('/');
      return;
    }
    setBottom();
    setSocket();
  }, []);
  useEffect(() => {
    setBottom();
  }, [messages]);

  function setBottom() {
    const { scrollHeight, clientHeight } = chatBox.current;
    chatBox.current.scrollTop = scrollHeight - clientHeight;
  }
  function handlePull() {
    setIsPull(!isPull);
  }

  /* 初始化socket请求 */
  function setSocket() {

    /* 生成指定群聊房间 */
    ws = createWs({
      query: {
        groupId: '9001',
      }
    });

    /* 上线消息推送 */
    ws.on('online', (data) => {
      setMessages(preList => [...preList, { ...data, type: 'online' }]);
    })
    /* 接收消息推送 */
    ws.on('message', data => {
      setMessages(preList => [...preList, data]);
    });

    /* 离线消息推送 */
    ws.on('offline', (data) => {
      setMessages(preList => [...preList, { ...data, type: 'offline' }]);
    })

    /* 断开连接 */
    ws.on('disconnect', (reason) => {
      if (reason === 'io server disconnect') {
        storage.remove(['from', 'fromId', 'img']);
        message.error('登陆已失效，请重新登录');
        props.history.replace('/');
      }
    });
  }
  /* 消息发送 */
  function handleSendMessage() {
    const message = form.getFieldValue('message');
    if (message === '') {
      return;
    }
    // console.log(form.getFieldValue('message'));
    form.setFieldsValue({ message: '' });
    /* 需要当前用户姓名+头像，组群信息 */
    const temp = {
      from,
      fromId,
      to: 'groupA',
      toId: '9001',
      message,
      isGroup: true,
      date: new Date().getTime(),
      img,
    }
    // setMessages(preList => [...preList, temp]);

    /* 发送消息网络请求 */
    ws.emit('message', temp);
  }

  /* 头像点击事件 */
  function handleUser(user) {
    console.log(user);
  }
  return (
    <div className={styles['container']}>
      <PageHeader className={styles['site-page-header']}>
        <span onClick={handlePull}>小学生尬聊一群<UpOutlined twoToneColor="#52c41a" className={cns(styles['pull-icon'], styles[isPull ? 'roll' : ''])} /></span>
      </PageHeader>
      <div className={cns(styles['group-detail'], styles[isPull ? 'show' : ''])}>
        {/* {
          userList.list.map(item => {
            return (
              <div key={item.userId} className={styles["user-box"]} onClick={() => { handleUser(item) }}>
                <div className={styles["user-item"]}>
                  <div className={styles["head-box"]}>
                    <img src={require(`Static/svgImgs/${item.headIcon}.svg`)} alt="" />
                    <div className={cns(styles['dot'], styles[item.onLine ? 'onLine' : ''])}></div>
                  </div>

                  <span>{item.name}</span>
                </div>
              </div>
            )
          })
        } */}
      </div>
      <div className={styles["chat-content"]} ref={chatBox}>
        {
          messages.map((item, index) => {
            if (item.type) {
              return (
                <Line
                  key={index + item.type}
                  data={item}
                />
              )
            }
            return (
              <Message
                key={'' + item.date + index}
                data={item}
                isMe={item.fromId === fromId}
              />
            )
          })
        }
      </div>
      <div className={styles["input-content"]}>
        <Form form={form}>
          <Form.Item name="message">
            <Mentions autoSize={{ minRows: 1, maxRows: 3 }} placement="top">
              <Option value="">待开发</Option>
              {/* <Option value="zombieJ">zombieJ</Option>
              <Option value="lilei">lilei</Option> */}
            </Mentions>
          </Form.Item>
          <Form.Item name="submit">
            <Button type="primary" onClick={handleSendMessage}>发送</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
