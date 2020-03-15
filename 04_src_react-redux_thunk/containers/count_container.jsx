//该文件是count组件的容器组件，容器组件要给count组件传递：1.redux中的状态； 2.操作状态的方法
//引入UI组件
import Count from '../components/count' 
//引入connect方法
import {connect} from 'react-redux'
//引入action
import {
	createIncrementAction,
	createDecrementAction,
	createIncrementDelayAction
} 
from '../redux/count_action_creator'

export default connect(
	//给UI组件传递状态
	state => ({number:state}), 
	//给UI组件传递操作状态的方法
	{
		increment:createIncrementAction,
		decrement:createDecrementAction,
		incrementDelay:createIncrementDelayAction
	}
)(Count)
