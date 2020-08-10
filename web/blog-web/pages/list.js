import Head from 'next/head'
import React, {useState,useEffect} from 'react'
import {Row, Col, List, Menu,Breadcrumb} from "antd";
import {HomeOutlined,FolderOutlined,AlignCenterOutlined} from "@ant-design/icons";
import Header from "./components/Header";
import Footer from './components/Footer'
import Author from "./components/Author";
import Router from "next/router";
import axios from 'axios';
import {servicePath} from "./config/apiConfig";
import moment from "moment";
import marked from 'marked';
marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
});
const list = (props) => {
    const [list,setList] = useState([])

    useEffect(()=>{
        axios(servicePath.listArticle,{method:"POST"})
            .then((res)=>{
                console.log(res);
                res.data.data.list.map((item)=>{
                    item.html = marked(item.a_content);
                })
                setList(res.data.data.list)
            })
    },[])

    const toView = (id) => {
        Router.push({pathname:"/detail",query:{id:id}});
    }
    return(
        <div>
            <Head>
                <title>Home</title>
            </Head>
            <Header></Header>
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
                    <Breadcrumb>
                        <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                        <Breadcrumb.Item>视频列表</Breadcrumb.Item>
                    </Breadcrumb>
                    <List
                        header={<div>最新日志</div>}
                        itemLayout="vertical"
                        dataSource={list}
                        renderItem={item=>(
                            <List.Item onClick={()=>toView(item.article_id)}>
                                <div className="list-title">{item.a_title}</div>
                                <div className="list-title">{moment(item.a_create_time).format("YYYY-MM-DD")}</div>
                                <div className="list-icon">
                                    <span><HomeOutlined /></span>
                                    <span><FolderOutlined /></span>
                                    <span><AlignCenterOutlined /></span>
                                </div>
                                <div className="list-content"
                                     dangerouslySetInnerHTML = {{__html:item.html}}></div>
                            </List.Item>
                        )}
                    />
                </Col>

                <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
                    <Author />
                </Col>
            </Row>
            <Footer/>
        </div>
    )
}

export default list;
