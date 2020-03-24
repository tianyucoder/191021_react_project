import React, { Component } from 'react'
import { Card ,Button,Table,Modal,Form,Input,Select, message} from 'antd';
import {PlusCircleOutlined} from '@ant-design/icons';
import dayjs from 'dayjs'
import {reqUserList,reqAddUser} from '../../ajax'

const {Item} = Form
const {Option} = Select

export default class User extends Component {

	state = { 
		visible: false,
		users:[],
		roles:[]
	};

	getRoleName = (id)=>{
		let result = this.state.roles.find((roleObj)=>{
			return roleObj._id === id
		})
		if(result) return result.name
	}

	getUserList =async ()=>{
		let {status,data,msg} = await reqUserList()
		if(status === 0){
			const {users,roles} = data
			this.setState({users:users.reverse(),roles})
		}else{
			message.error(msg)
		}
	}

	showModal = () => {
    this.setState({visible: true});
  };

  handleOk = async() => {
		const userObj = this.refs.form.getFieldsValue()
		let {status,msg} = await reqAddUser(userObj)
		if(status === 0){
			message.success('添加用户成功')
			this.getUserList()
			this.refs.form.resetFields()
			this.setState({visible: false});
		}else{
			message.error(msg)
		}
  };

  handleCancel = () => {
		this.refs.form.resetFields()
    this.setState({visible: false});
	};
	
	componentDidMount(){
		this.getUserList()
	}

	render() {
		
		const columns = [
			{
				title: '用户名',
				dataIndex: 'username',
				key: 'username',
			},
			{
				title: '邮箱',
				dataIndex: 'email',
				key: 'email',
			},
			{
				title: '电话',
				dataIndex: 'phone',
				key: 'phone',
			},
			{
				title: '注册时间',
				dataIndex: 'create_time',
				key: 'create_time',
				render:(a)=>(dayjs(a).format('YYYY年 MM月 DD日 HH:mm:ss'))
			},
			{
				title: '所属角色',
				dataIndex: 'role_id',
				key: 'role_id',
				render:(id)=> this.getRoleName(id)
			},
			{
				title: '操作',
				//dataIndex: 'address',
				align:'center',
				key: 'opera',
				render:()=> (
					<div>
						<Button type="link">修改</Button>
						<Button type="link">删除</Button>
					</div>
				)
			},
		];

		return (
			<div>
				<Card title={
					<div>
						<Button onClick={this.showModal} type="primary">
							<PlusCircleOutlined />
							创建用户
						</Button>
					</div>
				}>
					<Table 
						rowKey="_id" 
						bordered
						dataSource={this.state.users} 
						columns={columns} 
					/>
				</Card>
				{/* 新增用户弹窗 */}
				<Modal
          title="新增用户"
          visible={this.state.visible}
          onOk={this.handleOk}
					onCancel={this.handleCancel}
					okText="确定"
					cancelText="取消"
        >
					<Form ref="form">
						<Item
							name="username"
							label="用户名"
							labelCol={{span:4}}
							labelAlign="right"
							wrapperCol={{span:18}}
							rules={[
								{required: true, message: '用户名必须输入' },
								{max:12,message:'用户名必须小于等于12位'},
								{min:4,message:'用户名必须大于等于4位'},
								{pattern:/^\w+$/,message:'用户名必须是字母、数字或下划线组成'}
							]}
						>
							<Input placeholder="请输入用户名"/>
						</Item>
						<Item
							name="password"
							label="密码"
							labelCol={{span:4}}
							labelAlign="right"
							wrapperCol={{span:18}}
							rules={[
								{required: true, message: '密码必须输入' },
								{max:12,message:'密码必须小于等于12位'},
								{min:4,message:'密码必须大于等于4位'},
								{pattern:/^\w+$/,message:'密码必须是字母、数字或下划线组成'}
							]}
						>
							<Input placeholder="请输入密码"/>
						</Item>
						<Item
							name="phone"
							label="手机号"
							labelCol={{span:4}}
							labelAlign="right"
							wrapperCol={{span:18}}
							rules={[{required: true, message: '手机号必须输入' }]}
						>
							<Input placeholder="请输入手机号"/>
						</Item>
						<Item
							name="email"
							label="邮箱"
							labelCol={{span:4}}
							labelAlign="right"
							wrapperCol={{span:18}}
							rules={[{required: true, message: '邮箱必须输入' }]}
						>
							<Input placeholder="请输入邮箱"/>
						</Item>
						<Item
							name="role_id"
							label="所属角色"
							labelCol={{span:4}}
							labelAlign="right"
							wrapperCol={{span:18}}
							rules={[{required: true, message: '必须选择一个角色' }]}
						>
							<Select defaultValue="">
								<Option value="">请选择角色</Option>
								{
									this.state.roles.map((roleObj)=>{
										return <Option key={roleObj._id} value={roleObj._id}>{roleObj.name}</Option>
									})
								}
							</Select>
						</Item>
					</Form>
        </Modal>
			</div>
		)
	}
}
