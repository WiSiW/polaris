import {SET_LOGIN_DATA} from "../store/actionTypes";
const defaultState = {
    version:"0.1.0"
}

export default (
    state = defaultState,action) => {
    if (action.type === SET_LOGIN_DATA){
        let newSatete = JSON.parse(JSON.stringify(state))
        newSatete.login_data = action.value;
        return newSatete;
    }
    return state;
}
