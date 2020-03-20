//项目中所有发送请求的方法都会写在这里
import myAxios from './myAxios'
import jsonp from 'jsonp'
import {message} from 'antd'
import {LOCATION,AK,WEATHER_URL} from '../config'

//请求登录
export const reqLogin = (username,password) => myAxios.post('/login',{username,password})
//请求天气信息
export const reqWeather = ()=>{
	const url = `${WEATHER_URL}?location=${LOCATION}&output=json&ak=${AK}`
	return new Promise((resolve)=>{
		jsonp(url,(err,data)=>{
			if(!err){
				resolve(data.results[0].weather_data[0])
			}else{
				message.error('请求天气信息出错，请联系管理员')
			}
		})
	})
}
//请求商品分类信息
export const reqCategoryList = () => myAxios.get('/manage/category/list')
//请求添加一个分类
export const reqAddCategory = (categoryName) => myAxios.post('/manage/category/add',{categoryName})





