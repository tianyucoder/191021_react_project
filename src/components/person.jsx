import React, { Component } from 'react'

export default class Person extends Component {

	add = ()=>{
		let {nameNode,ageNode} = this.refs
		this.props.add({name:nameNode.value,age:ageNode.value})
		nameNode.value = ''
		ageNode.value = ''
	}


	render() {
		return (
			<div>
				<h2>当前总人数为：{this.props.rens.length},上方的总数为：{this.props.he}</h2>
				姓名<input ref="nameNode" type="text"/>&nbsp;
				年龄<input ref="ageNode" type="text"/>&nbsp;
				<button onClick={this.add}>添加</button>
				<ul>
					{
						this.props.rens.map((obj,index)=>{
							return <li key={index}>姓名：{obj.name},年龄：{obj.age}</li>
						})
					}
				</ul>
			</div>
		)
	}
}
