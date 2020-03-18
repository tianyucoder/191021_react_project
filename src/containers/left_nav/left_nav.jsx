import React, { Component } from 'react'
import {Menu} from 'antd';
import {Link,withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {createSaveTitleAction} from '../../redux/actions/header'
import menus from '../../config/menu_config'
import logo from '../../static/imgs/logo.png'
import './css/left_nav.less'
const {SubMenu,Item} = Menu;

class LeftNav extends Component {

	createMenu = (menuArr)=>{
		return menuArr.map((menuObj)=>{
			if(!menuObj.children){
				return (
					<Item key={menuObj.key} onClick={()=>{this.props.saveTitle(menuObj.title)}}>
						<Link to={menuObj.path}>
							<menuObj.icon/>
							<span style={{marginLeft:'10px'}}>{menuObj.title}</span>
						</Link>
					</Item>
				)
			}else{
				return (
					<SubMenu
						key={menuObj.key}
						title={
							<span>
								<menuObj.icon/>
								<span>{menuObj.title}</span>
							</span>
						}
					>
						{this.createMenu(menuObj.children)}
					</SubMenu>
				)
			}
		})
	}

	render() {
		const currentPathArr = this.props.location.pathname.split('/')
		const currentKey = currentPathArr.reverse()[0]
		
		return (
			<div className="left-nav">
				<div className="nav-header">
					<img src={logo} alt=""/>
					<h1>商品管理系统</h1>
				</div>
				<div>
					<Menu
						selectedKeys={[currentKey]} //一上来就选中谁
						defaultOpenKeys={currentPathArr}//默认展开哪个菜单
						mode="inline"//内嵌模式
						theme="dark"//暗色主题
					>
						{this.createMenu(menus)}
					</Menu>
				</div>
			</div>
		)
	}
}

export default connect(
	()=>({}),//传递状态
	{
		saveTitle:createSaveTitleAction
	}//传递操作状态的方法
)(withRouter(LeftNav))
