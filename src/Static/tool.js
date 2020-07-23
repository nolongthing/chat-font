const storage = {
  get: function (arr) {
    const tempObj = {};
    arr.forEach(element => {
      tempObj[element] = localStorage.getItem(element);
    });
    return tempObj
  },
  set: function (object) {
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        localStorage.setItem(key, object[key]);
      }
    }
  },
  clear:function(){
    localStorage.clear();
  },
  remove:function(arr){
    arr.forEach(item=>{
      localStorage.removeItem(item);
    })
  }
}


export {
  storage
}