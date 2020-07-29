import {CHANGE_INPUT,ADD_ITEM,DEL_ITEM,GET_LIST} from "../store/actionTypes";
const defaultState = {
    inputValue:'1111',
    menuList: [
        {
            title: '一级目录', menuList: [
                {
                    title: '二级目录', menuList: [
                        {
                            title: '三级目录', menuList: [
                                {title: '四级目录', menuList: []}
                            ]
                        }
                    ]
                }
            ]
        },
        {
            title: '一级目录', menuList: [
                {
                    title: '二级目录', menuList: [
                        {
                            title: '三级目录', menuList: [
                                {title: '四级目录', menuList: []}
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}

export default (
    state = defaultState,action) => {
    if (action.type === CHANGE_INPUT){
        let newSatete = JSON.parse(JSON.stringify(state))
        newSatete.inputValue = action.value;
        return newSatete;
    }else if (action.type === ADD_ITEM){
        let newSatete = JSON.parse(JSON.stringify(state))
        newSatete.menuList.push({
            title:action.value
        });
        return newSatete;
    }else if (action.type === DEL_ITEM){
        let newSatete = JSON.parse(JSON.stringify(state))
        newSatete.menuList.splice(action.value,1)
        return newSatete;
    }else if (action.type === GET_LIST){
        let newSatete = JSON.parse(JSON.stringify(state))
        newSatete.menuList = action.value
        return newSatete;
    }
    return state;
}
