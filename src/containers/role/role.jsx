import React, { Component } from 'react'
import { Card,Button,Table, message,Modal,Form,Input,Tree} from 'antd';
import {PlusCircleOutlined} from '@ant-design/icons';
import dayjs from 'dayjs'
import {reqRoleList,reqAddRole,reqAuthRole} from '../../ajax'
import treeData from '../../config/tree_config'

const {Item} = Form

export default class Role extends Component {

	state = {
		roleList:[], //角色列表
		visibleAdd: false, //是否展示新增弹窗
		visibleAuth:false,//是否展示授权弹窗
		checkedKeys:['home'],
		id:''
	}

	//展示新增弹窗
	showAddModal = () => {
    this.setState({visibleAdd: true});
	};
	
	//展示授权弹窗
	showAuthModal = (id) => {
		let result = this.state.roleList.find((roleObj)=>{
				return id === roleObj._id
		})
		let {menus} = result
		if(menus.indexOf('home') === -1) menus.push('home')
		if(result) {
			this.setState({visibleAuth: true,id,checkedKeys:menus})
		}
  };

	//新增弹窗--确认按钮的回调
  handleAddOk = async() => {
		//获取表单数据
		let values = this.refs.add_form.getFieldsValue()
		let result = await reqAddRole(values)
		const {status,data,msg} = result
		if(status === 0){
			message.success('添加角色成功')
			//坑！！！！！从state中获取对象类型数据的时候，最好断开引用
			let roleList = [data,...this.state.roleList]
			this.setState({roleList})
			this.refs.add_form.resetFields()
		}else{
			message.error(msg)
		}
    this.setState({visibleAdd: false});
	};
	
	//授权弹窗--确认按钮的回调
	handleAuthOk = async()=>{
		this.setState({visibleAuth: false});
		const {checkedKeys,id} = this.state
		let {status,msg} = await reqAuthRole(id,checkedKeys)
		if(status === 0){
			message.success('授权成功')
			this.getRoleList()
		}else{
			message.error(msg)
		}
	}

	//获取角色列表
	getRoleList = async()=>{
		let result = await reqRoleList()
		const {status,data,msg} = result
		if(status === 0){
			this.setState({roleList:data.reverse()})
		}else{
			message.error(msg)
		}
	}

	onCheck = (checkedArr)=>{
		this.setState({checkedKeys:checkedArr})
	}

	componentDidMount(){
		this.getRoleList()
	}

	render() {

		const columns = [
			{
				title: '角色名称',
				dataIndex: 'name',
				key: 'name',
			},
			{
				title: '创建时间',
				dataIndex: 'create_time',
				key: 'create_time',
				render:(a)=>dayjs(a).format('YYYY年 MM月 DD日 HH:mm:ss')
			},
			{
				title: '授权时间',
				dataIndex: 'auth_time',
				key: 'auth_time',
				render:(a) => a ? dayjs(a).format('YYYY年 MM月 DD日 HH:mm:ss') : '暂未授权'
			},
			{
				title: '授权人',
				dataIndex: 'auth_name',
				key: 'auth_name',
				render:(a)=> a ? a : '暂未授权'
			},
			{
				title: '操作',
				dataIndex: '_id',
				key: 'opera',
				width:'10%',
				align:'center',
				render:(id)=><Button onClick={()=>{this.showAuthModal(id)}} type="link">设置权限</Button>
			},
		];

		return (
			<div>
				<Card 
					title={
						<div>
							<Button onClick={this.showAddModal} type="primary">
								<PlusCircleOutlined/>
								新增角色
							</Button>
						</div>
					} 
				>
					<Table 
						dataSource={this.state.roleList} 
						columns={columns} 
						bordered
						rowKey="_id"
					/>
				</Card>
				{/* 新增角色的弹窗 */}
				<Modal
          title="新增角色"
          visible={this.state.visibleAdd}
          onOk={this.handleAddOk}
					onCancel={()=>{this.refs.add_form.resetFields();this.setState({visibleAdd: false});}}
					okText='确认'
					cancelText='取消'
        >
					<Form ref="add_form">
						<Item
							name="roleName"
							rules={[{required:true,message:"角色名必须填写"}]}
						>
							<Input placeholder="请输入角色名"/>
						</Item>
					</Form>
        </Modal>
				{/* 授权弹窗 */}
				<Modal
          title="设置权限"
          visible={this.state.visibleAuth}
          onOk={this.handleAuthOk}
					onCancel={()=>{this.setState({visibleAuth: false});}}
					okText='确认'
					cancelText='取消'
        >
					<Tree 
						onCheck={this.onCheck}
						checkable 
						defaultExpandAll
						treeData={treeData}
						checkedKeys={this.state.checkedKeys}
					/>
        </Modal>
			</div>
		)
	}
}
