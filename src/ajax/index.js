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
//请求修改分类名称
export const reqUpdateCategory = (categoryId,categoryName) => myAxios.post('/manage/category/update',{categoryId,categoryName})
//请求商品列表(分页)
export const reqProductList = (pageNum,pageSize) => 	myAxios.get('/manage/product/list',{params:{pageNum,pageSize}})
//请求商品上架、下架
export const reqChangeProdStatus = (productId,status) => myAxios.post('/manage/product/updateStatus',{productId,status})
//请求搜索商品
export const reqSearchProduct = (searchType,keyWord,pageNum,pageSize) => 	myAxios.get('/manage/product/search',{params:{[searchType]:keyWord,pageNum,pageSize}})
//根据商品id获取商品详细信息
export const reqProductInfoById = (productId) => myAxios.get('/manage/product/info',{params:{productId}})
//请求删除一个图片
export const reqDeletePicture = (name) => myAxios.post('/manage/img/delete',{name})
//请求添加商品
export const reqAddProduct = (prodcuObj)=> myAxios.post('/manage/product/add',prodcuObj)
