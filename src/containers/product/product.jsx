import React, {Component} from 'react'
import {Card,Button,Select,Input,Table, message} from 'antd';
import {reqProductList,reqChangeProdStatus,reqSearchProduct} from '../../ajax'
import {PAGE_SIZE} from '../../config'
import {SearchOutlined,PlusCircleOutlined} from '@ant-design/icons';

const {Option} = Select;

export default class Product extends Component {

	state = {
		productList:[],//商品列表
		total:0,//商品总数
		isLoading:false,//是否处于加载中
		searchType:'productName',//搜索类型
		keyWord:'',//搜索关键词
		current:1//当前页码
	}

	changeStatus = async({_id,status})=>{
		if(status === 1) status = 2 //若之前为上架，改为下架
		else status = 1 //若之前为下架，改为上架
		let result = await reqChangeProdStatus(_id,status) //请求更新状态
		if(result.status === 0){ //如果操作是成功的
			message.success('操作成功！') //提示成功
			let arr = [...this.state.productList] //获取原状态的商品列表
			arr.forEach((item)=>{ 
				if(item._id === _id){
					item.status = status
				}
			})
			//更新状态
			this.setState({productList:arr})
		}else{
			message.error(result.msg)
		}
	}

	getProductList = async(number)=>{
		this.setState({isLoading:true,current:number}) //1.改为加载中 2.维护当前点击的页码
		let result //定义好result接收服务器返回数据
		if(this.isSearch){
			//如果是搜索
			const {keyWord,searchType} = this.state
			result = await reqSearchProduct(searchType,keyWord,number,PAGE_SIZE)
		}else{
			//如果是初始化
			result = await reqProductList(number,PAGE_SIZE)
		}
		//从result中获取数据
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
		//初始化加载商品列表
		this.getProductList(1)
	}

	render() {
		const dataSource = this.state.productList
		//表格列配置(重要！！)
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
						<Select onChange={(value)=>{this.setState({searchType:value})}} defaultValue="productName">
							<Option value="productName">按名称搜索</Option>
							<Option value="productDesc">按描述搜索</Option>
						</Select>
						<Input onChange={(event)=>{this.setState({keyWord:event.target.value})}} style={{width:'20%',marginLeft:'10px',marginRight:'10px'}}/>
						<Button onClick={()=>{this.isSearch = true;this.getProductList(1)}} type="primary"><SearchOutlined/>搜索</Button>
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
						onChange:(number)=>{this.getProductList(number)},//页码改变的回调
						current:this.state.current //当前在哪一页
					}}
				/>
			</Card>
		)
	}
}
