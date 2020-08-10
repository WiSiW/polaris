import React,{useState,useEffect} from 'react';
import marked from 'marked'
import '../static/css/AddArticle.css'
import {Row, Col, Input, Select, Button, Upload} from 'antd'
import {servicePath} from "../config/apiConfig";
import store from "../store";
import request from "../services/request";
import moment from 'moment'

const { Option } = Select;
const { TextArea } = Input
const AddArticle = (props) => {
    return (
        <div>
            <Row gutter={24}>
                <Col span={24}>
                    <Row gutter={24} >
                        <Col span={24}>
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                beforeUpload={beforeUpload}
                                onChange={this.handleChange}
                            >
                                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                            </Upload>
                        </Col>
                    </Row>
                    <br/>
                    <Row gutter={24} >
                        <Col span={10}>
                            <div className="date-select">
                                <DatePicker placeholder="发布日期" size="large"
                                    format="YYYY-MM-DD HH:mm:ss"
                                            onChange={changeCreateTime}
                                    showTime={{ defaultValue: showDate }}
                                />
                            </div>
                        </Col>
                        <Col span={10}>
                            <Button  size="large" onClick={()=>{addArticleInBlog(1)}}>暂存文章</Button>&nbsp;
                            <Button type="primary" size="large" onClick={()=>{addArticleInBlog(2)}}>发布文章</Button>
                            <br/>
                        </Col>
                    </Row>
                    <br/>
                    <Row gutter={24} >
                        <Col span={12}>
                            <TextArea
                                rows={4}
                                value={introducemd}
                                onChange={changeIntroduce}
                                onPressEnter={changeIntroduce}
                                placeholder="文章简介"/>
                        </Col>
                        <Col span={12}>
                            <div className="introduce-html"
                                 dangerouslySetInnerHTML = {{__html:'文章简介：'+introducehtml}} >
                            </div>
                        </Col>
                    </Row>
                    <br/>
                    <Row gutter={24} >
                        <Col span={12}>
                            <TextArea
                                value={articleContent}
                                className="markdown-content"
                                rows={35}
                                onChange={changeContent}
                                onPressEnter={changeContent}
                                placeholder="文章内容"/>
                        </Col>
                        <Col span={12}>
                            <div className="show-html"
                                dangerouslySetInnerHTML = {{__html:markdownContent}} >
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}
export default AddArticle
