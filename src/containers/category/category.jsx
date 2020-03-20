import React,{Component} from 'react'
import {Card,Button,Table,Modal,Form,Input,message} from 'antd';
import {connect} from 'react-redux'
import {reqAddCategory} from '../../ajax'
import {createSaveCategoryAsyncAction} from '../../redux/actions/category'
import {PlusCircleOutlined} from '@ant-design/icons';

const {Item} = Form

class Category extends Component {

	state = {
		visible: false //控制弹窗显示与隐藏
	};

	//展示弹窗
	showModal = () => {
    this.setState({visible: true}); //更改状态，展示弹窗
	};
	
	//确认按钮的回调
	handleOk = async() => {
		const {categoryName} = this.refs.categoryForm.getFieldsValue() //获取用户输入
		if(!categoryName.trim()) {message.warning('分类名不能为空');return}//校验
		let result = await reqAddCategory(categoryName)//请求添加分类
		const {status,msg} = result//获取服务器返回的数据
		if(status === 0){//如果添加的业务逻辑是成功的
			message.success('添加商品成功')
			this.props.saveCategory() //从服务器重新获取最新的分类数据
			this.setState({visible: false});//隐藏弹窗
			this.refs.categoryForm.resetFields()//重置表单
		}else{
			message.warning(msg)
		}
	}
	
	//取消按钮的回调
	handleCancel = () => {
		this.refs.categoryForm.resetFields() //重置表单
    this.setState({visible: false});
  }

	componentDidMount(){
		//将商品分类信息存入redux
		this.props.saveCategory()
	}

	render() {
		//columns是配置Table列的，是一个相当重要的配置项
		const columns = [
			{
				title: '分类名', //列名
				dataIndex: 'name', //该列要展示什么信息
				key: 'name',
			},
			{
				title: '操作',
				//dataIndex: 'name',
				key: 'ft789u0iiuyg8opk',
				align:'center',
				width:'15%',
				render:(item)=><Button onClick={()=>{this.showModal()}} type="link">修改分类</Button>
			},
		];
		return (
			<div>
				<Card 
					extra={
					<Button 
							type="primary" 
							onClick={this.showModal}
					>
						<PlusCircleOutlined/>添加
					</Button>}
				>
					<Table 
						bordered
						dataSource={this.props.categoryList} 
						columns={columns} 
						pagination={{
							pageSize:4,
							showQuickJumper:true
						}}
						rowKey="_id"
					/>
				</Card>
				{/* 以后要展示的弹窗在下面 */}
				<Modal
          title="新增分类"
          visible={this.state.visible}
          onOk={this.handleOk}
					onCancel={this.handleCancel}
					okText='确认'
					cancelText='取消'
        >
          <Form ref="categoryForm">
						<Item
							name="categoryName"
							rules={[{required:true,message:'分类名必须输入'}]}
						>
							<Input placeholder="请输入分类名"/>
						</Item>
					</Form>
        </Modal>
			</div>
		)
	}

}

export default connect(
	(state)=>({
		categoryList:state.categoryList
	}),//传递状态
	{
		saveCategory:createSaveCategoryAsyncAction
	} // 传递操作状态的方法
)(Category)
