import React, { Component } from 'react'

export default class Count extends Component {

	state = {
		count:0
	}

	//加法
	increment = ()=>{
		//1.获取用户输入
		let {value} = this.refs.numberNode
		//2.获取原状态
		let {count} = this.state
		//3.运算
		count += value*1
		//4.更新状态
		this.setState({count})
	}

	//减法
	decrement = ()=>{
		let {value} = this.refs.numberNode
		let {count} = this.state
		count -= value*1
		this.setState({count})
	}

	//当前是奇数在加
	incrementIfOdd = ()=>{
		let {value} = this.refs.numberNode
		let {count} = this.state
		if(count%2 === 1){
			count += value*1
			this.setState({count})
		}
	}

	//延迟0.5秒加
	incrementAsync = ()=>{
		let {value} = this.refs.numberNode
		let {count} = this.state
		setTimeout(()=>{
			count += value*1
			this.setState({count})
		},500)
	}

	render() {
		return (
			<div>
				<h2>当前总数为：{this.state.count}</h2>
				<select ref="numberNode">
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
				</select>&nbsp;
				<button onClick={this.increment}>+</button>&nbsp;
				<button onClick={this.decrement}>—</button>&nbsp;
				<button onClick={this.incrementIfOdd}>increment if odd</button>&nbsp;
				<button onClick={this.incrementAsync}>increment async</button>
			</div>
		)
	}
}
