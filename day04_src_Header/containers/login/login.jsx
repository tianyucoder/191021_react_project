import React, { Component } from 'react'
import { Form, Input, Button,message} from 'antd';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {reqLogin} from '../../ajax'
import {createSaveUserAction} from '../../redux/actions/login'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import logo from './imgs/logo.png'
import './css/login.less'
//从Form上获取Item(antd)
const {Item} = Form

class Login extends Component {

	//表单提交的回调
	onFinish = async(values)=>{
		const {username,password} = values
		let result = await reqLogin(username,password)
		const {status,data,msg} = result
		if(status===0){
			message.success('登录成功！',1)
			this.props.save(data)//向redux中保存用户信息
			this.props.history.replace('/admin')
		}else{
			message.warning(msg,1)
		}
	}


	//密码的自定义验证
	pwdValidator = (rule,value)=>{
		if(!value){
			return Promise.reject('密码不能为空')
		}else if(value.length < 4){
			return Promise.reject('密码必须大于等于4位')
		}else if(value.length > 12){
			return Promise.reject('密码必须小于等于12位')
		}else if(!(/^\w+$/).test(value)){
			return Promise.reject('密码必须是字母、数字或下划线组成')
		}
		return Promise.resolve()
	}

	render() {
		if(this.props.isLogin) return <Redirect to="/admin"/>
		/*
			用户名/密码的的合法性要求
				1). 必须输入
				2). 必须大于等于4位
				3). 必须小于等于12位
				4). 必须是字母、数字或下划线组成
		*/
		return (
			<div id="login">
				<header className="login-header">
					<img src={logo} alt=""/>
					<h1>商品管理系统</h1>
				</header>
				<div className="login-content">
					<h1>用户登录</h1>
					<Form
						name="normal_login"
						className="login-form"
						onFinish={this.onFinish}
					>
						<Item 
							name="username"
							rules={[
								{required: true, message: '用户名必须输入' },
								{max:12,message:'用户名必须小于等于12位'},
								{min:4,message:'用户名必须大于等于4位'},
								{pattern:/^\w+$/,message:'用户名必须是字母、数字或下划线组成'}
							]}
						>
							<Input prefix={<UserOutlined/>} placeholder="用户名"/>
						</Item>
						<Item
							name="password"
							rules={[
								{validator:this.pwdValidator}
							]}
						>
							<Input 
								prefix={<LockOutlined className="site-form-item-icon" />}
								type="password" 
								placeholder="密码"
							/>
						</Item>
						<Item>
							<Button type="primary" htmlType="submit" className="login-form-button">
								登录
							</Button>
						</Item>
					</Form>
				</div>
			</div>
		)
	}
}

export default connect(
	(state)=>({isLogin:state.userInfo.isLogin}), //传递状态给UI
	{save:createSaveUserAction}//传递操作状态的方法给UI
)(Login)

/* 
	问题：一个组件要和redux交互，要做哪些事情？
			1.引入connect（必须）
			2.调用connect（必须），不在暴露原来的组件，要暴露connect()(UI组件)
			3.给UI传递：(1).状态  (2).操作状态的方法
				备注：
							a.不一定非要传递状态，也不一定非要传递操作状态的方法
							b.但是状态和方法总得传一个，否则没意义。
							c.如果不传递操作状态的方法，就不用引入action
*/

