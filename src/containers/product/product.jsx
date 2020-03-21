import React, {Component} from 'react'
import {Card,Button,Select,Input,Table, message} from 'antd';
import {reqProductList,reqChangeProdStatus} from '../../ajax'
import {PAGE_SIZE} from '../../config'
import {SearchOutlined,PlusCircleOutlined} from '@ant-design/icons';

const {Option} = Select;

export default class Product extends Component {

	state = {
		productList:[],
		total:0,
		isLoading:false
	}

	changeStatus = async({_id,status})=>{
		if(status === 1) status = 2
		else status = 1
		let result = await reqChangeProdStatus(_id,status)
		const {msg} = result
		const _status = result.status
		if(_status === 0){
			message.success('操作成功！')
			let arr = [...this.state.productList]
			arr.forEach((item)=>{
				if(item._id === _id){
					item.status = status
				}
			})
			this.setState({productList:arr})
		}else{
			message.error(msg)
		}
	}

	getProductList = async(number)=>{
		this.setState({isLoading:true})
		let result = await reqProductList(number,PAGE_SIZE)
		const {status,data,msg} = result
		if(status === 0){
			const {total,pages,list} = data
			console.log(total,pages);
			this.setState({productList:list,total,isLoading:false})
		}else{
			message.error(msg)
			this.setState({isLoading:false})
		}
	}

	componentDidMount(){
		this.getProductList(1)
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
				//dataIndex: 'status',
				key: 'status',
				align:'center',
				render:(item)=> (
					<div>
						<Button 
							onClick={()=>{this.changeStatus(item)}}
							type={item.status === 1 ? 'danger' : 'primary'}
						>
							{item.status === 1 ? '下架' : '上架'}
						</Button>
						<br/>
						<span>{item.status === 1 ? '在售' : '售罄'}</span>
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
					rowKey="_id"
					loading={this.state.isLoading}
					pagination={{ //分页器
						pageSize:PAGE_SIZE, //每页展示几条数据
						total:this.state.total, //数据总数
						onChange:(number)=>{this.getProductList(number)}
					}}
				/>
			</Card>
		)
	}
}
