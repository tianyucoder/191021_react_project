import React, { Component } from 'react'
import {createDeleteUserAction} from '../../redux/actions/login'
import {connect} from 'react-redux'
import {Layout} from 'antd';
import {Switch,Route,Redirect} from 'react-router-dom'
import LeftNav from '../left_nav/left_nav'
import Header from '../header/header'
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import User from '../user/user'
import Role from '../role/role'
import Bar from '../bar/bar'
import Line from '../line/line'
import Pie from '../pie/pie'
import Detail from '../detail/detail'
import AddUpdate from '../add_update/add_update'
import './css/admin.less'
const {Footer,Sider,Content} = Layout;

class Admin extends Component {

	render() {
		if(!this.props.isLogin) return <Redirect to="/login"/>
		return (
			<Layout className="admin-root">
				<Sider className="admin-sider">
					<LeftNav/>
				</Sider>
				<Layout>
					<Header/>
					<Content className="admin-content">
					<Switch>
						<Route path="/admin/home" component={Home}/>
						<Route path="/admin/prod_about/category" component={Category}/>
						<Route path="/admin/prod_about/product" exact component={Product}/>
						<Route path="/admin/prod_about/product/add" component={AddUpdate}/>
						<Route path="/admin/prod_about/product/update/:id" component={AddUpdate}/>
						<Route path="/admin/prod_about/product/detail/:id" component={Detail}/>
						<Route path="/admin/user" component={User}/>
						<Route path="/admin/role" component={Role}/>
						<Route path="/admin/charts/line" component={Line}/>
						<Route path="/admin/charts/bar" component={Bar}/>
						<Route path="/admin/charts/pie" component={Pie}/>
						<Redirect to="/admin/home"/>
					</Switch>
					</Content>
					<Footer className="foot-text">
						<span>推荐使用谷歌浏览器，获取最佳用户体验</span>
					</Footer>
				</Layout>
			</Layout>
		)
	}
}

export default connect(
	(state)=>({
		name:state.userInfo.user.username,
		isLogin:state.userInfo.isLogin
	}),//用于传递状态
	{
		logout:createDeleteUserAction
	}//用于传递操作状态的方法
)(Admin)
