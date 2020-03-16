//汇总所有的reducer生成一个总的reducer
import {combineReducers} from 'redux'
import countReducer from './count_reducer'
import personReducer from './person_reducer'

export default combineReducers({
	count:countReducer,
	persons:personReducer
})
/* 
	关于combineReducers：
		1.combineReducers可以汇总所有reducer，最终生成一个总的reducer交给store。
		2.combineReducers传入的那个对象，就是redux中保存所有组件状态的那个大对象。
*/