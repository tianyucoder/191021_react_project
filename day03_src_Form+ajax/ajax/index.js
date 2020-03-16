//项目中所有发送请求的方法都会写在这里
import myAxios from './myAxios'

//请求登录
export const reqLogin = (username,password) => myAxios.post('/login',{username,password})





