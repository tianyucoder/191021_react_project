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
from '../redux/actions/count_action_creator'

export default connect(
	state => ({
		number:state.count,
		renshu:state.persons.length
	}),
	{
		increment:createIncrementAction,
		decrement:createDecrementAction,
		incrementDelay:createIncrementDelayAction
	}
)(Count)
