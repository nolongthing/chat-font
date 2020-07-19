import React, { useState, useEffect, useRef } from 'react';
import { PageHeader, Mentions, Button, Form } from 'antd';
import cns from 'classnames';
import { UpOutlined } from '@ant-design/icons';
import Message from 'Components/Message';

import styles from './login.module.scss';
import { userList, messageList } from './mock';

const { Option } = Mentions;
export default function Chat() {
  const [isPull, setIsPull] = useState(false);
  const [messages, setMessages] = useState(messageList);
  const [form] = Form.useForm();

  useEffect(() => {
  }, [])
  function handlePull() {
    setIsPull(!isPull);
  }

  /* 消息发送 */
  function handleSendMessage() {
    console.log(form.getFieldValue('message'));
    form.setFieldsValue({ message: '' })
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
        {
          userList.list.map(item => {
            return (
              <div key={item.userId} className={styles["user-box"]} onClick={() => { handleUser(item) }}>
                <div className={styles["user-item"]}>
                  <img src={require(`Static/svgImgs/${item.headIcon}.svg`)} alt="" />
                  <span>{item.name}</span>
                </div>
              </div>
            )
          })
        }
      </div>
      <div className={styles["chat-content"]}>
        {
          messages.map(item => {
            return (
              <Message
                data={item}
                isMe={item.from == 'lee'}
              />
            )
          })
        }
      </div>
      <div className={styles["input-content"]}>
        <Form form={form}>
          <Form.Item name="message">
            <Mentions autoSize={{ minRows: 1, maxRows: 3 }} placement="top">
              <Option value="afc163">afc163</Option>
              <Option value="zombieJ">zombieJ</Option>
              <Option value="lilei">lilei</Option>
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
