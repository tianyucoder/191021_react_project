//该文件是count组件的容器组件，容器组件要给count组件传递：1.redux中的状态； 2.操作状态的方法

//引入UI组件
import Count from '../components/count' 
//引入connect方法
import {connect} from 'react-redux'

import {createIncrementAction,createDecrementAction} from '../redux/count_action_creator'

/* 
	关于connect方法：
			1.connect函数的返回值依然是一个函数，调用返回的那个函数要传入UI组件。
			2.connect函数调用后所返回的那个函数继续调用就可以生成一个容器组件。
			3.connect函数会接收到两个函数作为参数,这两个函数必须返回一个Object类型的对象
*/

//将redux中所保存的状态，通过props传递给UI组件
function mapStateToProps(state){
	return {number:state} 
}

//将操作状态的方法，通过props传递给UI组件
function mapDispatchToProps(dispatch){
	return {
		increment:(value)=>{dispatch(createIncrementAction(value))},
		decrement:(value)=>{dispatch(createDecrementAction(value))}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Count)
