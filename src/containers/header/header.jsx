import React, { Component } from 'react'
import {Button} from 'antd'
import {FullscreenOutlined} from '@ant-design/icons';
import './css/header.less'

export default class Header extends Component {
	render() {
		return (
			<div className="header">
				<div className="header-top">
					<Button size="small">
						<FullscreenOutlined/>	
					</Button>
					<span className="user">欢迎，佩奇</span>
					<Button type="link">退出登录</Button>
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
