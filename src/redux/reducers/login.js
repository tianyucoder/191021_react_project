import {SAVE_USER_INFO} from '../action_types'

//初始化状态
let initState = {
	user:{},
	token:''
}
export default function(preState=initState,action){
	const {type,data} = action
	let newState
	switch (type) {
		case SAVE_USER_INFO: //如果是保存用户
			const {user,token} = data
			newState = {user,token}
			return newState
		default:
			return preState
	}
}