import React, { Component } from 'react'
import {connect} from 'react-redux'

class Admin extends Component {
	render() {
		return (
			<div>
				<span style={{fontSize:'30px'}}>欢迎,{this.props.name}</span>
			</div>
		)
	}
}

export default connect(
	(state)=>({name:state.userInfo.user.username}),//用于传递状态
	{}//用于传递操作状态的方法
)(Admin)
