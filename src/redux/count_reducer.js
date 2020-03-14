/* 
	count_reducer的功能是：
		1.拿到旧的状态，根据用的action(包含着：type、data)，返回新的状态。
		2.reducer会在两个时候调用：1.初始化状态的时候，2.更新状态的时候
*/

function demo (preSate=0,action){
	const {type,data} = action
	let newState
	switch (type) {
		case 'increment': //如果是加
			newState = preSate + data
			return newState
		case 'decrement': //如果是减
			newState = preSate - data
			return newState
		default: //如果是初始化
			return preSate
	}
	
}