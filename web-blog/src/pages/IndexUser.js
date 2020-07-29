import React from "react";
import {Menu} from "antd";
import {SettingOutlined} from "@ant-design/icons";

const {SubMenu} = Menu;

export default class IndexUser extends React.Component {
    render() {
        return (
            <Menu style={{width: 160, position: "absolute", right: 0}} mode="horizontal">
                <SubMenu icon={<SettingOutlined/>} style={{width:"100%"}} title="韦绍炜">
                    <Menu.Item key="setting:11">Option 1</Menu.Item>
                    <Menu.Item key="setting:12">Option 1</Menu.Item>
                </SubMenu>
            </Menu>
        )
    }
}