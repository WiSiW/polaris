import { CHANGE_INPUT,ADD_ITEM,DEL_ITEM,GET_LIST} from './actionTypes'

export const changeInputAction = (value) => ({
    type:CHANGE_INPUT,
    value:value
})
export const addItem = (value) => ({
    type:ADD_ITEM,
    value:value
})
export const delItem = (value) => ({
    type:DEL_ITEM,
    value:value
})
export const getList = (data) => ({
    type:GET_LIST,
    value:data
})
