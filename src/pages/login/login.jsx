import React, { Component } from 'react'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import logo from './imgs/logo.png'
import './css/login.less'

const {Item} = Form

export default class Login extends Component {

	//表单提交的回调
	onFinish = ()=>{
		console.log('表单提交了');
	}

	render() {
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
						<Item>
							<Input prefix={<UserOutlined/>} placeholder="用户名" />
						</Item>
						<Item>
							<Input
								prefix={<LockOutlined className="site-form-item-icon" />}type="password" placeholder="密码"
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
