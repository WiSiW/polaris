import React from "react";
import {Menu, Button} from 'antd'
import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
} from '@ant-design/icons';
import SubMenu from "antd/es/menu/SubMenu";
import IndexTop from "./IndexTop";
import IndexRight from "./IndexRight";
import IndexUser from "./IndexUser";
import store from "../store";
export default class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        };
    }

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    };

    render() {
        return (
            <div>
                <IndexTop/>

                <IndexUser/>
                <Menu>

                </Menu>
                <Menu
                    style={{width: 256, position: "absolute", left: 0, top: 48, bottom: 40, backgroundColor: "#ffffff"}}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="light"
                    inlineCollapsed={this.state.collapsed}
                >
                    <Menu.Item key="1" icon={<PieChartOutlined/>}>
                        Option 1
                    </Menu.Item>
                    <Menu.Item key="2" icon={<DesktopOutlined/>}>
                        Option 2
                    </Menu.Item>
                    <Menu.Item key="3" icon={<ContainerOutlined/>}>
                        Option 3
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<MailOutlined/>} title="Navigation One">
                        <Menu.Item key="5">Option 5</Menu.Item>
                        <Menu.Item key="6">Option 6</Menu.Item>
                        <Menu.Item key="7">Option 7</Menu.Item>
                        <SubMenu key="sub3" title="Submenu">
                            <Menu.Item key="7">Option 7</Menu.Item>
                            <Menu.Item key="8">Option 8</Menu.Item>
                        </SubMenu>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<AppstoreOutlined/>} title="Navigation Two">
                        <Menu.Item key="9">Option 9</Menu.Item>
                        <Menu.Item key="10">Option 10</Menu.Item>
                        <SubMenu key="sub3" title="Submenu">
                            <Menu.Item key="11">Option 11</Menu.Item>
                            <Menu.Item key="12">Option 12</Menu.Item>
                        </SubMenu>
                    </SubMenu>
                </Menu>
                {/*<Menu style={{ width: 256,position:"absolute",left:0,top:48,bottom:40,backgroundColor:"#ffffff" }}*/}
                {/*    defaultSelectedKeys={['1']}*/}
                {/*    defaultOpenKeys={['sub1']}*/}
                {/*    mode="inline"*/}
                {/*    theme="light"*/}
                {/*    inlineCollapsed={this.state.collapsed}*/}
                {/*>*/}
                {/*    <Menu.Item key="1" icon={<PieChartOutlined />}>*/}
                {/*        Option 1*/}
                {/*    </Menu.Item>*/}
                {/*    <Menu.Item key="2" icon={<DesktopOutlined />}>*/}
                {/*        Option 2*/}
                {/*    </Menu.Item>*/}
                {/*    <Menu.Item key="3" icon={<ContainerOutlined />}>*/}
                {/*        Option 3*/}
                {/*    </Menu.Item>*/}
                {/*    <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">*/}
                {/*        <Menu.Item key="5">Option 5</Menu.Item>*/}
                {/*        <Menu.Item key="6">Option 6</Menu.Item>*/}
                {/*        <Menu.Item key="7">Option 7</Menu.Item>*/}
                {/*        <SubMenu key="sub3" title="Submenu">*/}
                {/*            <Menu.Item key="7">Option 7</Menu.Item>*/}
                {/*            <Menu.Item key="8">Option 8</Menu.Item>*/}
                {/*        </SubMenu>*/}
                {/*    </SubMenu>*/}
                {/*    <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">*/}
                {/*        <Menu.Item key="9">Option 9</Menu.Item>*/}
                {/*        <Menu.Item key="10">Option 10</Menu.Item>*/}
                {/*        <SubMenu key="sub3" title="Submenu">*/}
                {/*            <Menu.Item key="11">Option 11</Menu.Item>*/}
                {/*            <Menu.Item key="12">Option 12</Menu.Item>*/}
                {/*        </SubMenu>*/}
                {/*    </SubMenu>*/}
                {/*</Menu>*/}
                <div style={{width: 256, height: 40, position: "absolute", bottom: 0}}>V1.0.1</div>
                <IndexRight/>
            </div>
        );
    }
}
