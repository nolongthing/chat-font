import React from 'react';
import { storage } from 'Static/tool';
import styles from './line.module.scss'

const isLine ={
  'offline':'下线咯',
  'online':'已加入聊天'
}
export default function Line(props) {
  const {data} = props;
  const key = Object.keys(data)[0];
  const { from, fromId } = storage.get(['from', 'fromId', 'img']);
   return (
    <>
      {
        data[from] === fromId ? '':
        (
          <div className={styles['container']}>
            {`${key}${isLine[data.type]}`}
          </div>
        )
      }
    </>
  )
}
