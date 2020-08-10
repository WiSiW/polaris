import React, {useState, useEffect} from 'react';
import '../static/css/ArticleList.css'
import {List, Row, Col, Modal, message, Button, Layout, Breadcrumb,Table} from 'antd';
import axios from 'axios'
import {servicePath} from "../config/apiConfig";
import request from "../services/request";
import AddArticle from "./AddArticle";
import moment from "moment";

const {confirm} = Modal;
const {Content} = Layout;
const {Column} = Table;

function ArticleList(props) {
    const [list, setList] = useState([])
    const [isAdd, setIsAdd] = useState(false)
    const [articleId, setArticleId] = useState(null)
    useEffect(()=>{
        getList()
    },[])
    //文章列表
    const getList = (pageIndex) => {
        request(servicePath.listArticle, {
            method: 'POST',
            body: {
                pageIndex: pageIndex || 1,
                pageSize: 2
            },
        }).then(data=>{
            if(!data)return;
            data.list.map((item)=>{item.a_create_time = moment(item.a_create_time).format("YYYY-MM-DD HH:mm:ss")})
            console.log(data.list)
            setList(data)
        });
    }
    //删除文章的方法
    const delArticle = (id) => {
        confirm({
            title: '确定要删除这篇博客文章吗?',
            content: '如果你点击OK按钮，文章将会永远被删除，无法恢复。',
            onOk() {
                request(servicePath.delArticle, {
                    method: 'POST',
                    body: {
                        article_id:id
                    },
                }).then(data=>{
                    if(!data)return;
                    getList()
                });
            },
            onCancel() {
                message.success('没有任何改变')
            },
        });
    }
    const toView = (id) => {
        // props.history.push({ pathname: "/web/index/addArticle", state: { id } })
        setArticleId(id)
        setIsAdd(true)
    }
    const toViewCallback = (isUpdata) => {
        console.log(isUpdata)
    }

    const columns = [
        {title: '标题', dataIndex: 'a_title', key: 'title', render: text => <a>{text}</a>},
        {title: '内容', dataIndex: 'a_content', key: 'content', render: text => text},
        {title: '发布时间', dataIndex: 'a_create_time', key: 'create_time', render: text => text},
        {title: '创建人', dataIndex: 'user_name', key: 'user_name', render: text => text},
        {title: '操作', dataIndex: '', key: '', render: data => <span>
                        <Button type="primary" onClick={()=>{toView(data.article_id)}}>修改</Button>
                        <Button onClick={() => {delArticle(data.article_id)}}>删除 </Button>
            </span>}
    ]

    const onBaseClick= (page) => {
        console.log(page)
        getList(page)
    }
    const ArticleListContent = (
        <Table columns={columns} dataSource={list.list} pagination={{
            pageSize: 2,
            total: list.total,
            onChange: onBaseClick
        }}/>
    )

    const breadcrumb = (
        <Breadcrumb className="tab-list">
            <Breadcrumb.Item onClick={()=>{setIsAdd(false)}}>列表</Breadcrumb.Item>
            <Breadcrumb.Item>编辑</Breadcrumb.Item>
        </Breadcrumb>
    )
    return (
        <div>
            {isAdd?breadcrumb:null}
            {isAdd?<AddArticle className="tab-content" id={articleId} toViewCallback={toViewCallback}/>:ArticleListContent}
        </div>
    )

}

export default ArticleList
