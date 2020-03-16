//store是整个redux中最最核心的对象
import {createStore,applyMiddleware} from 'redux' //createStore用于创建store
//引入count_reducer，专门用于加工count的状态
import ruducer from './reducers/index'
//引入redux-thunk
import thunk from 'redux-thunk'
//引入redux-devtools-extension，用于唤醒redux开发者工具
import {composeWithDevTools} from 'redux-devtools-extension'

//创建并暴露store对象。------例子：老板创业之初就找好了厨师。
export default createStore(ruducer,composeWithDevTools(applyMiddleware(thunk)))