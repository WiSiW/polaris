import React, {useEffect, useState} from 'react';
import { Layout, Menu, List } from 'antd';
import {} from '@ant-design/icons';
import '../static/css/AdminIndex.css'
import { Route } from "react-router-dom";
import AddArticle from './AddArticle'
import ArticleList from './ArticleList'
import MessageList from "./MessageList";
import MenuManage from "./setting/MenuManage";
import UserManage from "./setting/UserManage";
import RoleManage from "./setting/RoleManage";
import store from "../store";
import {setLoginData} from "../store/actionCreators";
import request from "../services/request";
import {servicePath} from "../config/apiConfig";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


const AdminIndex = (props) => {
    const [collapsed,setCollapsed] = useState(false)
    const [loginData,setLogin] = useState({})
    const [menuList,setMenuList] = useState([])
    const [defaultSelectedKeys,setDefaultSelectedKey] = useState([])
    useEffect(()=>{
        checkLoginData();
    },[])

    const checkLoginData = () => {
        let login_data = localStorage.getItem("login_data")?JSON.parse(localStorage.getItem("login_data")):null;
        if(login_data){
            setLogin(login_data)
            store.dispatch(setLoginData(login_data))
            getMenuList()
            return;
        }
        logOut();
    }
    const getMenuList = () =>{
        request(servicePath.listMenu, {
            method: 'POST',
            body: {},
        }).then(data=>{
            if(!data)return;
            data.map(item=>{
                item.menuList.map(child=>{
                    child.parent_key = item.menu_key
                })
            })
            setMenuList(data);
            checkLocalStorage(data);
        });
    }
    const checkLocalStorage = (list) =>{
        let menuDefaultKey = localStorage.getItem("menuDefaultKey")?localStorage.getItem("menuDefaultKey").split(","):null;
        console.log(menuDefaultKey)
        if(menuDefaultKey){
            setDefaultSelectedKey(menuDefaultKey)
        }else{
            setDefaultSelectedKey([list[0].menu_key]);
            localStorage.setItem("menuDefaultKey",defaultSelectedKeys);
        }
    }
    const onCollapse = collapsed => {
        setCollapsed(collapsed)
    };
    const logOut = () => {
        localStorage.clear();
        props.history.push("/web/login")
    };

    const changeMenu = e =>{
        localStorage.setItem("menuDefaultKey",e.key)
        if(e.key==='my'){
            props.history.push('/web/index/my')
        }else if(e.key==='addArticle'){
            props.history.push('/web/index/addArticle')
        }else if(e.key === 'articleList'){
            props.history.push('/web/index/articleList')
        }else if(e.key === 'messageList'){
            props.history.push('/web/index/messageList')
        }else if(e.key === 'menuManage'){
            props.history.push('/web/index/menuManage')
        }else if(e.key === 'userManage'){
            props.history.push('/web/index/userManage')
        }else if(e.key === 'roleManage'){
            props.history.push('/web/index/roleManage')
        }

    }
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ background: '#001529', padding: 0 }}>
                <Menu mode="horizontal" style={{ background: '#001529',color:'#fff'}}>
                    <SubMenu title={loginData.user_name} style={{float:'right',width:'150px'}}>
                        <Menu.ItemGroup title="" style={{width:'150px'}}>
                            <Menu.Item key="setting:1">个人中心</Menu.Item>
                            <Menu.Item key="setting:2" onClick={logOut}>退出</Menu.Item>
                        </Menu.ItemGroup>
                    </SubMenu>
                </Menu>
            </Header>
            <Layout>
                <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={defaultSelectedKeys}>
                        {menuList.map(item => {
                            return (item.menuList && item.menuList.length)?
                                <SubMenu key={item.menu_key} onClick={(e)=>changeMenu(e)} title={<span><span>{item.menu_title}</span></span>}>
                                    {item.menuList.map(child => {
                                       return <Menu.Item key={child.menu_key}>{child.menu_title}</Menu.Item>
                                    })}
                                </SubMenu>:
                                <Menu.Item key={item.menu_key} onClick={(e)=>changeMenu(e.key)}>
                                    <span>{item.menu_title}</span>
                                </Menu.Item>

                        })}
                    </Menu>
                </Sider>
                <Layout style={{position:"relative"}}>
                    <Content style={{ backgroundColor:"#f0f2f5"}}>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            <Route path="/web/index/addArticle" exact component={AddArticle} />
                            <Route path="/web/index/articleList" exact component={ArticleList} />
                            <Route path="/web/index/messageList" exact component={MessageList} />
                            <Route path="/web/index/menuManage" exact component={MenuManage} />
                            <Route path="/web/index/userManage" exact component={UserManage} />
                            <Route path="/web/index/roleManage" exact component={RoleManage} />
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>weisw.com</Footer>
                </Layout>
            </Layout>
        </Layout>
    )

}

export default AdminIndex
