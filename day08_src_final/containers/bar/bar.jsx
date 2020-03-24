import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react';

export default class Bar extends Component {

	getOption = ()=>{
		return {
			//图表的标题
			title: {
				text: '本季度销售数据报表',
				textStyle:{
					 color:'blue'
				}
			},
			//图表的工具栏配置
			toolbox:{
				show:true,
				feature:{
					saveAsImage:{},
					restore:{},
					dataView:{}
				}
			},
			//当鼠标悬浮在图上，所展示的提示框
			tooltip: {}, 
			//表格的切换位
			legend: {
				data:['销量','库存']
			},
			//x轴配置
			xAxis: {
				data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
			},
			//y轴配置
			yAxis: {},
			//数据在此配置
			series: [
				{
					name: '销量',
					type: 'bar', //可选值：line pie 等等
					data: [5, 20, 36, 10, 10, 20]
				},
				{
					name: '库存',
					type: 'line', //可选值：line pie 等等
					data: [1, 2, 3, 4, 5, 6]
				}
			]
	};
	}

	render() {
		return (
			<div>
				<ReactEcharts option={this.getOption()} />
			</div>
		)
	}
}
