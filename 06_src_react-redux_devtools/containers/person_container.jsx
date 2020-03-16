import {connect} from 'react-redux'
import Person from '../components/person'
import {createAddPersonAction} from '../redux/actions/person_action_creator'

export default connect(
	//1.函数----用于给UI组件传递状态
	(state)=>({
		rens:state.persons,
		he:state.count
	}),
	//2.对象----用于给UI组件传递操作状态的方法
	{
		add:createAddPersonAction
	}
)(Person)