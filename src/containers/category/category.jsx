import React,{Component} from 'react'
import {Card,Button,Table,Modal,Form,Input} from 'antd';
import {connect} from 'react-redux'
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
	handleOk = () => {
    console.log('你点击了确定');
    this.setState({visible: false});
	}
	
	//取消按钮的回调
	handleCancel = () => {
    console.log('你点击了取消');
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
				//dataIndex: 'caozuo',
				key: 'ft789u0iiuyg8opk',
				align:'center',
				width:'15%',
				render:()=><Button type="link" href="">修改分类</Button>
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
          <Form>
						<Item
							name="categoryName"
							rules={[{required:true,message:'分类名必须输入'}]}
						>
							<Input/>
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
