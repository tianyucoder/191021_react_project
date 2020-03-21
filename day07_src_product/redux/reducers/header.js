import {SAVE_HEADER_TITLE} from '../action_types'

export default function(preState='',action){
	const {type,data} = action
	let newState
	switch (type) {
		case SAVE_HEADER_TITLE: //如果是保存头部的标题
			newState = data
			return newState
		default:
			return preState
	}
}