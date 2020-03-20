import {SAVE_CATEGORY_LIST} from '../action_types'
import {message} from 'antd'
import {reqCategoryList} from '../../ajax'

const createSaveCategoryAction = (categoryArr) => ({type:SAVE_CATEGORY_LIST,data:categoryArr})

export const createSaveCategoryAsyncAction = ()=>{
	return async(dispatch)=>{
		let result = await reqCategoryList()
		const {status,data,msg} = result
		if(status === 0){
			dispatch(createSaveCategoryAction(data))
		}else{
			message.error(msg)
		}
	}
}