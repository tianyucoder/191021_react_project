//该文件是专门用于创建action对象的，action形如：{type:'increment',data:value*1}
import {INCREMENT,DECREMENT} from './action_types'

export const createIncrementAction = value => ({type:INCREMENT,data:value})
export const createDecrementAction = value => ({type:DECREMENT,data:value})
