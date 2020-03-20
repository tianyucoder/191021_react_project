import React,{Component} from 'react'
import {Card,Button,Table} from 'antd';
import {PlusCircleOutlined} from '@ant-design/icons';


export default class Category extends Component {

	render() {
		const dataSource = [
			{
				key: '1',
				name: '测试分类一',
			},
			{
				key: '2',
				name: '测试分类二',
			},
			{
				key: '3',
				name: '测试分类三',
			},
		];

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
			<Card extra={<Button type="primary"><PlusCircleOutlined/>添加</Button>}>
				<Table 
					bordered
					dataSource={dataSource} 
					columns={columns} 
				/>
			</Card>
		)
	}
}
