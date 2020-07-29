import React from "react";
import store from "../store";
import {changeInputAction,addItem,delItem,getList} from "../store/actionCreators";
import IndexRightUI from './IndexRightUI';
import axios from 'axios';

const indexRight = {
    position: "absolute", top: 48, left: 256, bottom: 0, right: 0
}
export default class IndexRight extends React.Component {
    constructor(props) {
        super(props);
        this.state = store.getState()
        this.changeValue = this.changeValue.bind(this);
        this.storeChange = this.storeChange.bind(this);
        this.addItem = this.addItem.bind(this);
        this.delItem = this.delItem.bind(this);
        // 订阅更新state
        store.subscribe(this.storeChange)
    }

    componentDidMount() {
        axios.get('http://localhost:8090/api/menu/listMenu')
            .then((res)=>{
                console.log(res)
                console.log(typeof res)
                console.log(res.data)
                console.log(typeof res.data)
                store.dispatch(getList(res.data.data))
            })
    }

    changeValue(e){
        store.dispatch(changeInputAction(e.target.value))
    }

    addItem(){
        store.dispatch(addItem(this.state.inputValue))
    }

    delItem(index){
        store.dispatch(delItem(index))
    }

    storeChange(){
        this.setState(store.getState())
    }

    render() {
        return (
            <IndexRightUI
                indexRight={indexRight}
                defaultValue={this.state.inputValue}
                changeValue={this.changeValue}
                addList={this.addItem}
                delItem={this.delItem}
                menuList={this.state.menuList}
            />
        )
    }
}
