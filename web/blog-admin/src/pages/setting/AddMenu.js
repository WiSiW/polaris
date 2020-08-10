import React, {useEffect, useState} from "react";
import request from "../../services/request";
import {servicePath} from "../../config/apiConfig";
import store from "../../store";
import { Form, Input, InputNumber, Button,Upload } from 'antd';
import {LoadingOutlined,PlusOutlined } from '@ant-design/icons'
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

function AddMenu(props) {
    const [className,setClassName] = useState("")
    const [userId,setUserId] = useState(null)
    const [menu_id,setMenuId] = useState(null)
    const [menu_parent_id,setMenuParentId] = useState(0)
    const [loading,setLoading] = useState(false)
    const [imageUrl,setImageUrl] = useState(false)
    const [fields,setFields] = useState([
        {
            name: ['menu_title'],
            value: 'Ant Design',
        },
    ])
    console.log(fields)
    useEffect(()=>{
        setClassName(props.className)
        console.log(store.getState().login_data)
        setUserId(store.getState().login_data.user_id);
        if(!store.getState().login_data && !store.getState().login_data.user_id){
            props.history.push("/web/index");
            return;
        }
        setUserId(store.getState().login_data.user_id);
        //获得文章ID
        let Id,parent_id;
        if(props.location && props.location.state && props.location.state.id){
            Id = props.location.state.id;
        }else if(props.id){
            Id = props.id
        }
        if(Id){
            getMenu(Id);
        }
        if(props.location && props.location.state && props.location.state.parentId){
            parent_id = props.location.state.parentId;
        }else if(props.parentId){
            parent_id = props.parentId
        }
        if(parent_id){
            setMenuParentId(parent_id);
        }
    },[]);
    const getMenu = id => {
        request(servicePath.getMenu, {
            method: 'POST',
            body: {
                menu_id:id
            },
        }).then(data=>{
            if(!data)return;
            console.log(data)
            let formData = [];
            for(var i in data){
                let item = {
                    'name': [i],
                    'value': data[i],
                }
                formData.push(item)
            }
            setMenuId(data.menu_id || 0);
            setMenuParentId(data.menu_parent_id);
            setFields(formData)
        });
    }
    const validateMessages = {
        required: '${label} is required!',
        types: {
            menu_title: '${label} 未填写!',
            menu_key: '${label} 未填写!',
            menu_icon: '${label} 未添加!',
            menu_path: '${label} 未添加!',
        }
    };
    const onFinish = values => {
        console.log(values);
        request(servicePath.upsertMenu, {
            method: 'POST',
            body: {
                menu_icon: values.menu_icon || null,
                menu_id: menu_id || null,
                menu_introduction: values.menu_introduction || null,
                menu_key: values.menu_key || null,
                menu_parent_id: menu_parent_id,
                menu_path: values.menu_path || null,
                menu_title: values.menu_title || null
            },
        }).then(data=>{
            if(!data)return;
        });
    };
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div className="ant-upload-text">Upload</div>
        </div>
    );
    const normFile = e => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };
    const upLoad = (options) =>{
        const {file} = options;
        request(servicePath.upLoad, {
            method: 'POST',
            body: {
                file:file
            },
        }).then(data=>{
            if(!data)return;
            setImageUrl(data[0].url)
        });
    }
    return(
        <Form {...layout} name="nest-messages" className={className} fields={fields} onFinish={onFinish} validateMessages={validateMessages}>
            <Form.Item name={['menu_title']} label="菜单名" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name={['menu_key']} label="菜单key">
                <Input />
            </Form.Item>
            <Form.Item name={['menu_icon']}
                       valuePropName="fileList"
                       getValueFromEvent={normFile}
                       extra="" label="菜单图标">
                <Upload
                    method="POST"
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    customRequest={upLoad}
                    action="https://localhost:8090/api/file/upLoad"
                >
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
            </Form.Item>
            <Form.Item name={['menu_path']} label="菜单链接">
                <Input />
            </Form.Item>
            <Form.Item name={['menu_introduction']} label="介绍">
                <Input.TextArea />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                    提交
                </Button>
            </Form.Item>
        </Form>
    )
}
export default AddMenu;
