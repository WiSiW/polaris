import React,{useState,useEffect} from 'react'
import Head from 'next/head'
import {Row, Col , Icon ,Breadcrumb ,Affix } from 'antd'
import marked from 'marked';
import hljs from 'highlight.js';
// import 'highlight.js/styles/monokai-sublime.css';
import Header from '../pages/components/Header'
import Author from '../pages/components/Author'
import Footer from '../pages/components/Footer'
import axios from "axios";
import Tocify from './plug/tocify.tsx'
import moment from 'moment'
import {servicePath} from "./config/apiConfig";

const Detail = (props) => {
    const tocify = new Tocify()
    const renderer = new marked.Renderer();
    const [showDate,setShowDate] = useState()   //发布日期
    const [articleTitle,setArticleTitle] = useState('')   //文章标题
    const [markHtml,setMarkHtml] = useState("");
    useEffect(()=>{
        console.log(props)
        //获得文章ID
        let tmpId;
        if(props.url && props.url.query && props.url.query.id){
            tmpId = props.url.query.id;
        }else if(props.id){
            tmpId = props.id
        }
        if(tmpId){
            getArticleById(tmpId);
        }
    },[])
    renderer.heading = function(text, level, raw) {
        const anchor = tocify.add(text, level);
        return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
    };
    marked.setOptions({
        renderer: renderer,
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
        highlight: function (code) {
            return hljs.highlightAuto(code).value;
        }
    });
    const getArticleById = (id)=>{
        axios(servicePath.getArticle, {
            method: 'POST',
            body: {
                article_id:id
            },
        }).then(res=>{
            if(!res)return;
            console.log(res.data.data)
            setArticleTitle(res.data.data.a_title);
            setMarkHtml(marked(res.data.data.a_content || ""))

            setShowDate(moment(res.data.data.a_create_time).format("YYYY-MM-DD HH:mm:ss"))
        });

    }
    return (
        <div>
            <Head>
                <title>博客详细页</title>
            </Head>
            <Header />
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
                    <div>
                        <div className="bread-div">
                            <Breadcrumb>
                                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                                <Breadcrumb.Item>视频列表</Breadcrumb.Item>
                                <Breadcrumb.Item>xxxx</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>

                        <div>
                            <div className="detailed-title">{articleTitle}</div>
                            <div className="list-icon center">
                                <span> {showDate}</span>
                                <span> 视频教程</span>
                                <span> 5498人</span>
                            </div>

                            <div className="detailed-content" dangerouslySetInnerHTML={{__html:markHtml}} />
                        </div>

                    </div>
                </Col>
                <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
                    <Author />
                    <Affix offsetTop={5}>
                        <div className="detailed-nav comm-box">
                            <div className="nav-title">文章目录</div>
                            <div className="toc-list">
                                {tocify && tocify.render()}
                            </div>
                        </div>
                    </Affix>
                </Col>
            </Row>
            <Footer/>
        </div>
    )
}

export default Detail
