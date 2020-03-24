import React, { Component } from 'react'
import { Card ,Button,Table,Modal,Form,Input,Select} from 'antd';
import {PlusCircleOutlined} from '@ant-design/icons';

const {Item} = Form
const {Option} = Select

export default class User extends Component {
	state = { visible: false };

	showModal = () => {
    this.setState({visible: true});
  };

  handleOk = () => {
    this.setState({visible: false});
  };

  handleCancel = () => {
    this.setState({visible: false});
  };

	render() {

		const dataSource = [
			{
				key: '1',
				name: '胡彦斌',
				age: 32,
				address: '西湖区湖底公园1号',
			},
			{
				key: '2',
				name: '胡彦祖',
				age: 42,
				address: '西湖区湖底公园1号',
			},
		];
		
		const columns = [
			{
				title: '姓名',
				dataIndex: 'name',
				key: 'name',
			},
			{
				title: '年龄',
				dataIndex: 'age',
				key: 'age',
			},
			{
				title: '住址',
				dataIndex: 'address',
				key: 'address',
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
					<Table dataSource={dataSource} columns={columns} />
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
					<Form>
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
								<Option value="1">角色1</Option>
								<Option value="2">角色2</Option>
							</Select>
						</Item>
					</Form>
        </Modal>
			</div>
		)
	}
}
