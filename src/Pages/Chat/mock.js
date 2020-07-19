const userList = {
  groupId: 1,
  groupName: 'aaa',
  totalNum: 3,
  currentNum: 1,
  list: [
    {
      name: 'lee',
      userId: 9527,
      token: 'asd990',
      onLine: true,
      headIcon: 'mouse'
    },
    {
      name: 'jane',
      userId: 1001,
      token: 'yyy001',
      onLine: true,
      headIcon: 'pig'
    },
    {
      name: 'sam',
      userId: 2306,
      token: 'alu001',
      onLine: true,
      headIcon: 'tiger'
    },
  ]
};
const messageList = [
  {
    from: 'sam',
    to:'groupA',
    message:'你妈叫你回家吃饭你妈叫你回家吃饭你妈叫你回家吃饭你妈叫你回家吃饭你妈叫你回家吃饭',
    isGroup:true,
    date:1595165159592,
    img:'tiger'
  },
  {
    from: 'lee',
    to:'groupA',
    message:'老子不吃',
    isGroup:true,
    date:1595165159592,
    img:'mouse'
  }
]
export {
  userList,
  messageList
}