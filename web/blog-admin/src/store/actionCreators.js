import { SET_LOGIN_DATA} from './actionTypes'
import store from "./index";

export const setLoginData = (value) => ({
    type:SET_LOGIN_DATA,
    value:value
})
