import React , { Component } from "react";
import {Button, Input, List} from "antd";

// 无状态组件
const IndexRightUI = (props) => {
    return (
        <div style={props.indexRight}>
            <Input placeholder={'111'} defaultValue={props.inputValue} value={props.inputValue}
                   onChange={props.changeValue}/>
            <Button type={"primary"} onClick={props.addList}>添加</Button>
            <List bordered
                  dataSource={props.menuList}
                  renderItem={(item, index) => (
                      <List.Item
                          onClick={() => {props.delItem(index)}}
                      >{item.title}</List.Item>
                  )}>
            </List>
        </div>
    )
}

export default IndexRightUI;
