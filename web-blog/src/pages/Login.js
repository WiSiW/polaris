import React , {useState, useEffect} from 'react';
import {Form, Input, Button, Checkbox} from 'antd';
import { Redirect } from 'react-router-dom'
// import 'Login.css';
// import {login} from '../service/loginService'

const layout = {
    style:{

    }
}
const tailLayout = {
    style:{}
}
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            model:{
                name: this.props.name,
                codeImg: 'http://localhost:8090/Mcake/getVerifiCode?a=' + new Date().getTime()
            }
        };
        this.submit = this.submit.bind(this);
        this.getVerifiCode = this.getVerifiCode.bind(this);
    }

    submit() {
        fetch(
            'http://localhost:8090/api/login',
            {
                method: 'POST',
                body: JSON.stringify(this.state.model),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
            .then(response => {
                if (response.ok) return response.json();
                throw response;
            })
            .then(json => {

            })
            .catch(err => {
                // console.error(err);

            })
            .finally(() => {
                // setLoading(false);
            });
    }

    getVerifiCode(e){
        e.target.src = 'http://localhost:8090/Mcake/getVerifiCode?a=' + new Date().getTime();
    }
    render() {
        return (
            <Form {...layout} className="login" name="basic" initialValues={{remember: true,}} onFinish={this.onFinish}
                  onFinishFailed={this.onFinishFailed}>
                <Form.Item label="姓名" name="username"
                           rules={[
                               {
                                   required: true,
                                   message: '请输入姓名!',
                               },
                           ]}>
                    <Input value={this.state.model.name}/>
                </Form.Item>

                <Form.Item label="密码" name="password"
                           rules={[
                               {
                                   required: true,
                                   message: '请输入密码!',
                               },
                           ]}>
                    <Input.Password/>
                </Form.Item>

                <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                    <Checkbox>记住</Checkbox>
                </Form.Item>
                <Form.Item>
                    {/*<Button>刷新验证码</Button>*/}
                    <img className="img" title="点击刷新验证码" src={this.state.model.codeImg} onClick={this.getVerifiCode}/>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" onClick={this.submit}>Submit</Button>
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary">Submit</Button>
                </Form.Item>
            </Form>
        );
    }
}