import { handleActions } from 'redux-actions'

// 登陆返回结果
const loginState = () => ({})
export const loginResponse = handleActions({
    'request login'(state, action) {
        return { ...state, loading: true }
    },
    'receive login'(state, action) {
        // eslint-disable-next-line no-unused-vars
        const { req, res } = action.payload
        return { data: res, loading: false }
    },
}, loginState())
