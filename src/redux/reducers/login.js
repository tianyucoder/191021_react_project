import {SAVE_USER_INFO,DELETE_USER_INFO} from '../action_types'

//尝试从local中读取用户信息
let _user = JSON.parse(localStorage.getItem('user'))
let _token = localStorage.getItem('token')
//初始化状态
let initState = {
	user:_user || {},
	token:_token || '',
	isLogin:_user&&_token ? true : false
}
export default function(preState=initState,action){
	const {type,data} = action
	let newState
	switch (type) {
		case SAVE_USER_INFO: //如果是保存用户
			const {user,token} = data
			newState = {user,token,isLogin:true}
			return newState
		case DELETE_USER_INFO: //如果是删除用户
			newState = {user:{},token:'',isLogin:false}
			return newState
		default:
			return preState
	}
}