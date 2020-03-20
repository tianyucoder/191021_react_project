import React,{Component} from 'react'
import {Card,Button,Table,Modal,Form,Input,message} from 'antd';
import {connect} from 'react-redux'
import {reqAddCategory,reqUpdateCategory} from '../../ajax'
import {createSaveCategoryAsyncAction} from '../../redux/actions/category'
import {PlusCircleOutlined} from '@ant-design/icons';
import {PAGE_SIZE} from '../../config'

const {Item} = Form

class Category extends Component {

	state = {
		visible: false //控制弹窗显示与隐藏
	};

	//展示弹窗
	showModal = (categoryObj) => {
		const {_id,name} = categoryObj //尝试着获取_id和name，若_id和name均存在，那么是修改分类
		if(_id && name){
			//能进入此判断，就以为是修改操作
			this.name = name //在实例身上缓存要修改分类的名字
			this._id = _id//在实例身上缓存要修改分类的id
			this.isUpdate = true //实例身上标识：更新
			const {categoryForm} = this.refs //获取Form节点(第一次获取不到)
			if(categoryForm) categoryForm.setFieldsValue({categoryName:name})//第一次以后靠这行代码回显数据
		}
    this.setState({visible: true}); //更改状态，展示弹窗
	};
	
	//确认按钮的回调
	handleOk = async() => {
		const {categoryName} = this.refs.categoryForm.getFieldsValue() //获取用户输入
		if(!categoryName.trim()) {message.warning('分类名不能为空');return}//校验
		let result //提前定义好一个接受服务器返回数据的变量
		if(this.isUpdate) result = await reqUpdateCategory(this._id,categoryName)//请求修改分类
		else result = await reqAddCategory(categoryName)//请求添加分类
		const {status,msg} = result//获取服务器返回的数据
		if(status === 0){//如果添加的业务逻辑是成功的
			message.success(this.isUpdate ? '修改分类成功' : '新增分类成功')
			this.props.saveCategory() //从服务器重新获取最新的分类数据
			this.handleCancel()
		}else{
			message.warning(msg)
		}
	}
	
	//取消按钮的回调
	handleCancel = () => {
		this.refs.categoryForm.setFieldsValue({categoryName:''})
		this.isUpdate = false //重置为新增
		this.name = ''
		this._id = ''
    this.setState({visible: false});//关闭弹窗
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
				render:(item)=><Button onClick={()=>{this.showModal(item)}} type="link">修改分类</Button>
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
						bordered //表格边框效果
						dataSource={this.props.categoryList} //配置表格数据
						columns={columns} //配置表格的列
						pagination={{ //分页器
							pageSize:PAGE_SIZE, //每页展示几条数据
							showQuickJumper:true //快速跳转
						}}
						rowKey="_id" //告诉Table组件展示数据时，以数据的_id属性作为唯一的key
					/>
				</Card>
				{/* 以后要展示的弹窗在下面 */}
				<Modal
          title={this.isUpdate ? '修改分类' : '新增分类'} //弹窗的标题
          visible={this.state.visible} //是否展示弹窗
          onOk={this.handleOk} //确认的回调
					onCancel={this.handleCancel} //取消的回调
					okText='确认' //确认的文字
					cancelText='取消' //取消的文字
        >
					<Form 
						ref="categoryForm"
						initialValues={{
							categoryName:this.name
						}}
					>
						<Item
							name="categoryName"
							rules={[{required:true,message:'分类名必须输入'}]}
						>
							<Input ref="demo" placeholder="请输入分类名"/>
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
