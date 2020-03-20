import React, {Component} from 'react'
import {Card,Button,Select,Input} from 'antd';
import {SearchOutlined,PlusCircleOutlined} from '@ant-design/icons';

const {Option} = Select;

export default class Product extends Component {
	render() {
		return (
			<Card 
				title={
					<div>
						<Select defaultValue="prodcutName">
							<Option value="prodcutName">按名称搜索</Option>
							<Option value="prodcutDesc">按描述搜索</Option>
						</Select>
						<Input style={{width:'20%',marginLeft:'10px',marginRight:'10px'}}/>
						<Button type="primary"><SearchOutlined/>搜索</Button>
					</div>
				}
				extra={<Button type="primary"><PlusCircleOutlined/>添加商品</Button>}
			>
				<p>Card content</p>
				<p>Card content</p>
				<p>Card content</p>
			</Card>
		)
	}
}
