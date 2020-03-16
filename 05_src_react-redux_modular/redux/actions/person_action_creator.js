import {ADD_PERSON} from '../action_types'

export const createAddPersonAction = (personObj)=> ({type:ADD_PERSON,data:personObj})