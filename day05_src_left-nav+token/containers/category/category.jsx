import React, { Component } from 'react'
import {reqCategoryList} from '../../ajax'

export default class Category extends Component {

	demo = async()=>{
		let result = await reqCategoryList()
		console.log(result);
	}

	render() {
		return (
			<div>
				Category分类管理
				<button onClick={this.demo}>点我获取商品分类数据</button>
			</div>
		)
	}
}
