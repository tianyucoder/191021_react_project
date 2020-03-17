import React, { Component } from 'react'
import {Modal,Button} from 'antd';
import screenfull from 'screenfull'
import {connect} from 'react-redux'
import {
	FullscreenOutlined,
	FullscreenExitOutlined,
	ExclamationCircleOutlined
} from '@ant-design/icons';
import {createDeleteUserAction} from '../../redux/actions/login'
import './css/header.less'
const {confirm} = Modal;

class Header extends Component {

	state = {
		isFull:false,//标识是否全屏
	}

	fullScreen = ()=>{
		//让网页全屏
		screenfull.toggle();
	}

	logOut = ()=>{
		confirm({
			title: '确定退出吗？',
			icon: <ExclamationCircleOutlined />,
			content: '退出后要重新登录',
			okText:'确定',
			cancelText:'取消',
			onOk:()=> { //确认按钮的回调
				this.props.logout()
			},
		});
	}

	componentDidMount(){
		screenfull.onchange(()=>{
			let isFull = !this.state.isFull
			this.setState({isFull})
		})
	}

	render() {
		return (
			<div className="header">
				<div className="header-top">
					<Button onClick={this.fullScreen} size="small">
						{this.state.isFull ? <FullscreenExitOutlined /> : <FullscreenOutlined/>}
					</Button>
					<span className="user">欢迎，{this.props.username}</span>
					<Button onClick={this.logOut} type="link">退出登录</Button>
				</div>
				<div className="header-bottom">
					<div className="bottom-left">
						<h1>首页</h1>
					</div>
					<div className="bottom-right">
						<span>2020年xx月xx日 14:44:01 </span>
						<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584437611520&di=1b5f1717c3b04add5d224874ccfa7f0e&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F00%2F93%2F73%2F58dc0c96ef3bf_610.jpg" alt=""/>
						<span>晴 温度：18~0℃</span>
				</div>
				</div>
			</div>
		)
	}
}

export default connect(
	(state)=>({username:state.userInfo.user.username}),//传递状态
	{
		logout:createDeleteUserAction
	}//传递操作状态的方法
)(Header)
