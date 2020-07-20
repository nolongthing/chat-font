import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://open.duyiedu.com',
    timeout: 5000,
});

instance.interceptors.request.use(function (config) {
    config.params = {
        // appkey:'ll58333_1547734753802',
        ...config.params
    }
    return config;
});

/**
 * 获取全部学生
 */   
function getAllStudents() {
    return instance.get('/api/student/findAll');
}

/**
 * 添加学生
 */
function addStuduent(params) {
   return instance.get('/api/student/addStudent', {
        params
    })
};


export {
    getAllStudents,
    addStuduent
};
