import React, {useEffect, useState} from "react";
import {Tree, Button, Breadcrumb} from "antd";
import request from "../../services/request";
import {servicePath} from "../../config/apiConfig";
import AddMenu from "./AddMenu";

function MenuManage() {
    const [treeData,setTreeData] = useState([])
    const [expandedKeys,setExpandedKeys] = useState([])
    const [isAdd,setIsAdd] = useState(false)
    const [menuId,setMenuId] = useState(null)
    const [menuParentId,setMenuParentId] = useState(null)
    useEffect(()=>{
        request(servicePath.listMenu, {
            method: 'POST',
            body: {},
        }).then(data=>{
            if(!data)return;
            let treeData = [
                {
                    menu_key : "root",
                    menu_id:0,
                    menu_title : "菜单列表",
                    menuList : data,
                    menu_parent_id : null,
                    menu_icon : null
                }
            ]
            processData(treeData);
            setTreeData(treeData)
        });
    },[]);
    const processData = data => {
        data.map(item =>{
            item.key = item.menu_key;
            item.title = item.menu_title;
            item.children = item.menuList;
            item.icon = item.menu_icon;
            if(item.children && item.children.length){
                processData(item.children);
            }
        })
    }

    const breadcrumb = (
        <Breadcrumb className="tab-list">
            <Breadcrumb.Item onClick={()=>{setIsAdd(false)}}>列表</Breadcrumb.Item>
            <Breadcrumb.Item>编辑</Breadcrumb.Item>
        </Breadcrumb>
    )
    const rightClick = (e) => {
        console.log(e);
        setIsAdd(true)
        setMenuId(e.node.menu_id)
    }
    const select = (selectedKeys,e) => {
        console.log(e);
        setMenuId(null)
        setMenuParentId(e.node.menu_id)
    }
    return(
        <div>
            {isAdd?breadcrumb:<Button type="primary" onClick={()=>{setIsAdd(true)}}>新增菜单</Button>}
            {isAdd?<AddMenu className="tab-content" id={menuId} parentId={menuParentId}/>:<Tree
                showIcon
                defaultExpandAll={true}
                className="draggable-tree"
                blockNode
                onSelect={select}
                onRightClick={rightClick}
                treeData={treeData}
            />}
        </div>
    )
}
export default MenuManage;
