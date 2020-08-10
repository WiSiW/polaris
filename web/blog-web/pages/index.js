import Head from 'next/head'
import React, {useState} from 'react'
import axios from 'axios'
import {Row, Col, List, Menu} from "antd";
import {HomeOutlined,FolderOutlined,AlignCenterOutlined} from "@ant-design/icons";
import Header from "./components/Header";
import Footer from './components/Footer'
import Author from "./components/Author";
import '../static/style/pages/index.css'


const Home = (data) => {
    const [list,getList] = useState(data.data)
    return(
        <div>
            <Head>
                <title>Home</title>
            </Head>
            <Header></Header>
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
                    <List
                        header={<div>最新日志</div>}
                        itemLayout="vertical"
                        dataSource={list}
                        renderItem={item=>(
                            <List.Item>
                                <div className="list-title">{item.b_name}</div>
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

Home.getInitialProps = async ()=>{
    const promise = new Promise((resolve)=>{
        axios('http://localhost:8090/api/blog/listBlog').then(
            (res)=>{
                console.log('远程获取数据结果:',res.data)
                resolve(res.data)
            }
        )
    })

    return await promise
}

export default Home;
