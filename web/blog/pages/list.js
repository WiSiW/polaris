import Head from 'next/head'
import React, {useState} from 'react'
import {Row, Col, List, Menu,Breadcrumb} from "antd";
import {HomeOutlined,FolderOutlined,AlignCenterOutlined} from "@ant-design/icons";
import Header from "./components/Header";
import Footer from './components/Footer'
import Author from "./components/Author";
import '../static/style/pages/index.css'

const detailList = () => {
    const [list,getList] = useState([
        {title:'111',content:'1111'}
    ])
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
                            <List.Item>
                                <div className="list-title">{item.title}</div>
                                <div className="list-icon">
                                    <span><HomeOutlined /></span>
                                    <span><FolderOutlined /></span>
                                    <span><AlignCenterOutlined /></span>
                                </div>
                                <div className="list-content">{item.content}</div>
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

export default detailList;
