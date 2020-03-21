import React, { Component } from 'react'
import {Card,Button,Form,Input,Select} from 'antd'
import {connect} from 'react-redux'
import {createSaveCategoryAsyncAction} from '../../redux/actions/category'
import {ArrowLeftOutlined} from '@ant-design/icons';

const {Item} = Form
const {Option} = Select

class AddUpdate extends Component {

	onFinish = (values)=>{
		console.log(values);
	}

	createOption = ()=>{
		return this.props.categoryList.map((categoryObj)=>{
			return <Option key={categoryObj._id} value={categoryObj._id}>{categoryObj.name}</Option>
		})
	}

	componentDidMount(){
		if(!this.props.categoryList.length){
			this.props.saveCategoryList()
		}
	}

	render() {
		return (
			<Card title={
				<div>
					<Button onClick={()=>{this.props.history.goBack()}} type="link">
						<ArrowLeftOutlined/>返回
					</Button>	
					<span>添加商品</span>
				</div>
			}>
				<Form
					onFinish={this.onFinish}
				>
					<Item
						name="name"
						rules={[{required:true,message:'商品名称不能为空'}]}
						label="商品名称"
						wrapperCol={{span:10}}
					>
						<Input placeholder="输入商品名称"/>
					</Item>
					<Item
						name="desc"
						rules={[{required:true,message:'描述不能为空'}]}
						label="商品描述"
						wrapperCol={{span:10}}
					>
						<Input placeholder="输入商品描述"/>
					</Item>
					<Item
						name="price"
						rules={[{required:true,message:'商品价格不能为空'}]}
						label="商品价格"
						wrapperCol={{span:10}}
					>
						<Input
							addonAfter="元"
							addonBefore="￥"
							type="number"
							placeholder="输入商品价格"
						/>
					</Item>
					<Item
						name="categoryId"
						rules={[{required:true,message:'必须选择一个分类'}]}
						label="所属分类"
						wrapperCol={{span:10}}
					>
						<Select defaultValue="">
							<Option value="">请选择分类</Option>
							{this.createOption()}
						</Select>
					</Item>
					<Item
						style={{marginLeft:'10px'}}
						label="商品图片"
						wrapperCol={{span:10}}
					>
						此处放置上传组件
					</Item>
					<Item
						style={{marginLeft:'10px'}}
						label="商品详情"
						wrapperCol={{span:10}}
					>
						此处放置富文本组件
					</Item>
					<Item>
						<Button htmlType="submit" type="primary">提交</Button>
					</Item>
				</Form>
			</Card>
		)
	}
}

export default connect(
	(state)=>({categoryList:state.categoryList}),
	{
		saveCategoryList:createSaveCategoryAsyncAction
	}
)(AddUpdate)
