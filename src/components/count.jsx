import React, { Component } from 'react'

export default class Count extends Component {

	//加法
	increment = ()=>{
		//1.获取用户输入
		let {value} = this.refs.numberNode
		//2.通知redux加1
		this.props.store.dispatch({type:'increment',data:value*1})
	}

	//减法
	decrement = ()=>{
		let {value} = this.refs.numberNode
		this.props.store.dispatch({type:'decrement',data:value*1})
	}

	//当前是奇数在加
	incrementIfOdd = ()=>{
		let {value} = this.refs.numberNode
		let count = this.props.store.getState()
		if(count%2 === 1){
			this.props.store.dispatch({type:'increment',data:value*1})
		}
	}

	//延迟0.5秒加
	incrementAsync = ()=>{
		let {value} = this.refs.numberNode
		setTimeout(()=>{
			this.props.store.dispatch({type:'increment',data:value*1})
		},500)
	}

	render() {
		//console.log('---render---');
		return (
			<div>
				<h2>当前总数为:{this.props.store.getState()}</h2>
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
