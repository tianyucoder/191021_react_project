import React, { Component } from 'react'
import {Card,Button,List, message} from 'antd';
import {ArrowLeftOutlined} from '@ant-design/icons';
import {connect} from 'react-redux'
import {createSaveCategoryAsyncAction} from '../../redux/actions/category'
import {} from '../../'
import {reqProductInfoById} from '../../ajax'
import './css/detail.less'

const {Item} = List

class Detail extends Component {

	state = {
		productInfo:{
			imgs: [],
			name: "",
			desc: "",
			detail:'',
			price: 0,
			categoryId: ""
		}
	}

	getCategoryName = (id)=>{
		const {categoryList} = this.props
		let result = categoryList.find((categoryObj)=>{
			return categoryObj._id === id
		})
		if(result) return result.name
	}

	getProductInfoById = async()=>{
		//1.获取传递过来的商品id
		const {id} = this.props.match.params
		//2.发送请求查询该商品的详细信息
		let result = await reqProductInfoById(id)
		const {status,data,msg} = result
		if(status === 0) this.setState({productInfo:data})
		else message.error(msg)
	}

	componentDidMount(){
		if(!this.props.categoryList.length){
			this.props.saveCategory()
		}
		this.getProductInfoById()
	}

	render() {
		const {imgs,detail,name,desc,price,categoryId} = this.state.productInfo
		return (
			<Card title={
				<div>
					<Button onClick={()=>{this.props.history.goBack()}} type="link">
						<ArrowLeftOutlined/>返回
					</Button>	
					<span>商品详情</span>
				</div>
			}>
				<List>
					<Item className="detail-item">
						<span className="detail-title">商品名称：</span>
						<span>{name}</span>
					</Item>
					<Item className="detail-item">
						<span className="detail-title">商品描述：</span>
						<span>{desc}</span>
					</Item>
					<Item className="detail-item">
						<span className="detail-title">商品价格：</span>
						<span>{'￥'+price}</span>
					</Item>
					<Item className="detail-item">
						<span className="detail-title">所属分类：</span>
						<span>{this.getCategoryName(categoryId)}</span>
					</Item>
					<Item className="detail-item">
						<span className="detail-title">商品图片：</span>
						{
							imgs.map((imgName)=>{
								return <img src={`/upload/${imgName}`} alt=""/>
							})
						}
					</Item>
					<Item className="detail-item">
						<span className="detail-title">商品详情：</span>
						<span dangerouslySetInnerHTML={{__html:detail}}></span>
					</Item>
				</List>
			</Card>
		)
	}
}

export default connect(
	(state)=>({
		categoryList:state.categoryList
	}),
	{
		saveCategory:createSaveCategoryAsyncAction
	}
)(Detail)
