import React, { Component } from 'react'
import {Menu} from 'antd';
import {Link} from 'react-router-dom'
import menus from '../../config/menu_config'
import logo from '../../static/imgs/logo.png'
import './css/left_nav.less'
const {SubMenu,Item} = Menu;

export default class LeftNav extends Component {

	createMenu = (menuArr)=>{
		return menuArr.map((menuObj)=>{
			if(!menuObj.children){
				return (
					<Item key={menuObj.key}>
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
		return (
			<div className="left-nav">
				<div className="nav-header">
					<img src={logo} alt=""/>
					<h1>商品管理系统</h1>
				</div>
				<div>
					<Menu
						defaultSelectedKeys={['home']} //一上来就选中谁
						defaultOpenKeys={['sub1000']}//默认展开哪个菜单
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
