import React,{useState,useEffect} from 'react';
import marked from 'marked'
import '../static/css/AddArticle.css'
import {Layout,Row, Col, Input, Select, Button, DatePicker, Upload} from 'antd'
import {servicePath} from "../config/apiConfig";
import store from "../store";
import request from "../services/request";
import moment from 'moment'
const { Option } = Select;
const { TextArea } = Input
const {Content} = Layout;
const AddArticle = (props) => {
    const [className,setClassName] = useState("")
    const [articleId,setArticleId] = useState(null)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [userId,setUserId] = useState(null)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle,setArticleTitle] = useState('')   //文章标题
    const [articleContent , setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [introducemd,setIntroducemd] = useState()            //简介的markdown内容
    const [introducehtml,setIntroducehtml] = useState('等待编辑') //简介的html内容
    const [showDate,setShowDate] = useState()   //发布日期
    const [updateDate,setUpdateDate] = useState() //修改日志的日期
    const [typeInfo ,setTypeInfo] = useState([]) // 文章类别信息
    const [articleType,setArticleType] = useState(1) //选择的文章类别
    const [isShowBreadcrumb,setBreadcrumb] = useState(false) //是否显示导航
    marked.setOptions({
        renderer: marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
    });
    const changeContent = (e)=>{
        setArticleContent(e.target.value)
        let html=marked(e.target.value)
        setMarkdownContent(html)
    }
    const changeTitle = (e)=>{
        setArticleTitle(e.target.value)
    }
    const changeIntroduce = (e)=>{
        setIntroducemd(e.target.value)
        let html=marked(e.target.value)
        setIntroducehtml(html)
    }
    useEffect(()=>{
        setClassName(props.className)
        setUserId(store.getState().login_data.user_id);
        console.log(props)

        //获得文章ID
        let tmpId;
        if(props.location && props.location.state && props.location.state.id){
            tmpId = props.location.state.id;
        }else if(props.id){
            tmpId = props.id
        }
        if(tmpId){
            setArticleId(tmpId);
            setBreadcrumb(true);
            getArticleById(tmpId);
        }
    },[])
    const getArticleById = (id)=>{
        console.log(id)
        request(servicePath.getArticle, {
            method: 'POST',
            body: {
                article_id:id
            },
        }).then(data=>{
            if(!data)return;
            setArticleId(data.article_id);

            setArticleTitle(data.a_title);

            let html=marked(data.a_content || "")
            setArticleContent(data.a_content)
            setMarkdownContent(html)

            setIntroducemd(data.a_introduce || "")
            let tmpInt = marked(data.a_introduce || "")
            setIntroducehtml(tmpInt)

            setShowDate(moment(data.a_create_time).format("YYYY-MM-DD HH:mm:ss"))
        });

    }

    const changeCreateTime = (e) => {
        console.log(e)
        setShowDate(moment(e._d).format("YYYY-MM-DD HH:mm:ss"))
        console.log(showDate)
    }
    const addArticleInBlog = (type)=>{
        console.log(type)
        request(servicePath.upsertArticle, {
            method: 'POST',
            body: {
                article_id:articleId,
                a_title:articleTitle,
                a_type:articleType,
                a_content:articleContent,
                a_introduce:introducemd,
                user_id:userId,
                a_create_time:showDate
            },
        }).then(data=>{
            if(!data)return;
        });
    }
    const Article = (<Row gutter={24} >
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
    )
    const uploadData = ({fileList}) => {
        console.log(fileList)
    }
    const UpLoadButton = (
        <Upload action={servicePath.upLoad} onChange={uploadData}>
            <Button>Upload</Button>
        </Upload>
    )

    const callback = () => {
        props.toViewCallback(true)
    }

    return (
        <div className={className}>
            <Row gutter={24}>
                <Col span={24}>
                    <Row gutter={24} >
                        <Col span={24}>
                            <Input placeholder="博客标题" size="large" value={articleTitle} onChange={changeTitle} />
                        </Col>
                    </Row>
                    <br/>
                    <Row gutter={24} >
                        <Col span={4}>
                            <Select defaultValue="Sign Up" size="large" onChange={(value)=>{setArticleType(value)}}>
                                <Option value="1">文字</Option>
                                <Option value="2">视频</Option>
                            </Select>
                        </Col>
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
                    {articleType==1?Article:UpLoadButton}
                </Col>
            </Row>
        </div>
    )
}
export default AddArticle
