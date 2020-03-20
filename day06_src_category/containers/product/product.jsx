import React, {Component} from 'react'
import {Card,Button,Select,Input,Table} from 'antd';
import {reqProductList} from '../../ajax'
import {PAGE_SIZE} from '../../config'
import {SearchOutlined,PlusCircleOutlined} from '@ant-design/icons';

const {Option} = Select;

export default class Product extends Component {

	state = {
		productList:[]
	}

	getProductList = async()=>{
		let result = await reqProductList(1,PAGE_SIZE)
		const {status,data,msg} = result
		if(status === 0){
			const {total,pages,list} = data
			this.setState({productList:list})
		}
	}

	componentDidMount(){
		this.getProductList()
	}

	render() {
		const dataSource = this.state.productList
		
		const columns = [
			{
				title: '商品名称',
				dataIndex: 'name',
				key: 'name',
				width:'16%'
			},
			{
				title: '商品描述',
				dataIndex: 'desc',
				key: 'desc',
				width:'65%'
			},
			{
				title: '价格',
				dataIndex: 'price',
				key: 'price',
				render:(a)=> '￥'+a
			},
			{
				title: '状态',
				dataIndex: 'status',
				key: 'status',
				align:'center',
				render:(status)=> (
					<div>
						<Button type={status === 1 ? 'danger' : 'primary'}>{status === 1 ? '下架' : '上架'}</Button>
						<br/>
						<span>{status === 1 ? '在售' : '售罄'}</span>
					</div>
				)
			},
			{
				title: '操作',
				//dataIndex: 'zhuangtai',
				key: 'caozuo',
				align:'center',
				render:()=> (
					<div>
						<Button type="link">详情</Button>
						<br/>
						<Button type="link">修改</Button>
					</div>
				)
			},
		];

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
				<Table
					bordered
					dataSource={dataSource} 
					columns={columns} 
					pagination={{ //分页器
						pageSize:PAGE_SIZE, //每页展示几条数据
					}}
				/>
			</Card>
		)
	}
}
