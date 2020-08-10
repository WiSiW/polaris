import React, {useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import {Card, Input, Button, Spin, message} from 'antd';
import './static/css/Login.css'
import request from "./services/request";
import {servicePath} from "./config/apiConfig";
import store from "./store";
import {setLoginData} from "./store/actionCreators";


const Login = (props) =>{
    const [userName , setUserName] = useState('')
    const [password , setPassword] = useState('')
    const [code , setCode] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [codeImg, getVerifiCode] = useState('http://localhost:8090/Mcake/getVerifiCode?a=' + new Date().getTime())

    useEffect(()=>{
        let login_data = localStorage.getItem("login_data")?JSON.parse(localStorage.getItem("login_data")):null;
        if(login_data){
            store.dispatch(setLoginData(login_data))
            props.history.push("/web/index");
        }
    },[])
    const checkLogin = ()=>{
        if(!userName){
            message.warning('请填写用户名');
            return;
        }
        if(!password){
            message.warning('请填写密码');
            return;
        }
        let params = new FormData;
        params.append("user_name",userName)
        params.append("password",password)
        params.append("imgCode",code)
        request(servicePath.login, {
            method: 'POST',
            body: params,
        }).then(data=>{
            if(!data)return;
            localStorage.setItem("login_data",JSON.stringify(data))
            props.history.push("/web/index")
        });
    }
    const _getVerifiCode = () => {
        getVerifiCode('http://localhost:8090/Mcake/getVerifiCode?a=' + new Date().getTime())
    }
    return (
        <div>
            <div className="login-div">
                <Spin tip="Loading..." spinning={isLoading}>
                    <Card title="不爽的麻雀的微博" extra={<a href="/web/register">注册</a>} bordered={true} style={{ width: 400 }} >
                        <Input
                            id="userName"
                            size="large"
                            placeholder="用户名"
                            onChange={(e)=>{setUserName(e.target.value)}}
                        />
                        <br/><br/>
                        <Input
                            id="password"
                            size="large"
                            placeholder="密码"
                            onChange={(e)=>{setPassword(e.target.value)}}
                        />
                        <br/><br/>
                        <Input id="codeImg" style={{'width':100}} onChange={(e)=>{setCode(e.target.value)}}/>
                        <img className="img" title="点击刷新验证码" src={codeImg} onClick={_getVerifiCode}/>
                        <br/><br/>
                        <Button type="primary" size="large" block onClick={checkLogin} > Login in </Button>
                    </Card>
                </Spin>
            </div>
        </div>
    )
}
export default Login
