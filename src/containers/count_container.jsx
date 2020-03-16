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

/* 

高阶函数
		理解: 一类特别的函数(符合下列任意一个情况即可)
				情况1: 参数是函数
				情况2: 返回是函数
常见的高阶函数: 
			1.定时器是高阶函数
			2.数组的forEach()/map()/filter()/reduce()/find()
			3.函数对象的bind()
			4.Promise() / then() /catch()
			5.react-router-dom中的withRouter(后面会讲)
			7.react-redux中的connect()
作用: 
			能实现更加动态, 更加可扩展的功能
*/
