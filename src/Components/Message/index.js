import React from 'react';
import cns from 'classnames';
import styles from './message.module.scss';

export default function Message(props) {
  const { data, isMe } = props;
  return (
    <div className={cns(styles['container'], styles[isMe ? 'flex-end' : ''])}>
      {
        isMe ?
          <>
            <div  className={styles['f-content']}>
              <span  className={styles['name']}>{data.from}</span>
              <div className={styles['message']}>
                {data.message}
              </div>
            </div>
            <div className={styles['head-content']}>
              <img className={styles['head']} src={require(`Static/svgImgs/${data.img}.svg`)} alt="" />
            </div>
          </>
          :
          <>
            <div className={styles['head-content']}>
              <img className={styles['head']} src={require(`Static/svgImgs/${data.img}.svg`)} alt="" />
            </div>
            <div  className={styles['t-content']}>
              <span className={styles['name']}>{data.from}</span>
              <div className={styles['message']}>
                {data.message}
              </div>
            </div>

          </>
      }
    </div>
  )
}
