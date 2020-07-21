import React, { useRef } from 'react';
import { Card, Input, Button, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { getLogin } from 'ApiService/index';
import { storage } from 'Static/tool';
import styles from './login.module.scss';

export default function Login(props) {
  const inputValue = useRef(null);
  async function handleLogin() {

    const value = inputValue.current.state.value;
    inputValue.current.handleReset();
    if (value && value.length === 6) {

      const { data: { result, code } } = await getLogin({ token: value }) || {};
      if (code === -1 || !result) {
        message.error('邀请码错误，请重试或联系管理员');

      }
      if (code === 0) {
        /* 本地存储当前登录用户的信息 */
        const { name, userId, headIcon } = result;
        storage.set({
          from: name,
          fromId: userId,
          img: headIcon,
        });
        message.success('欢迎加入,访问过程中请注意保护个人隐私');
        // props.history.replace('/chat');
      }
    } else {
      message.error('邀请码不足6位，请确认并重新输入');
    }
  }
  return (
    <div className={styles['login-box']}>
      <Card className={styles['card']} size='small' hoverable='true' title="请输入邀请码">
        <Input ref={inputValue} className={styles['input']} size="large" placeholder="6位邀请码" maxLength='6' prefix={<UserOutlined />} />
        <Button type="primary" onClick={handleLogin} block>确定</Button>
      </Card>
    </div>
  )
}
