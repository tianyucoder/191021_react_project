import {ADD_PERSON} from '../action_types'

export default function(preState=[],action){
	const {type,data} = action
	let newState
	switch (type) {
		case ADD_PERSON:
			newState = [data,...preState]
			return newState
		default:
			return preState
	}
}