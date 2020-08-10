import React , {useState} from 'react';
import 'antd/dist/antd.css';
import { Card, Input,Button ,Spin,message } from 'antd';
import './static/css/Login.css'
import {servicePath} from "./config/apiConfig";
import request from "./services/request";



const Register = () =>{
    const [userName , setUserName] = useState('')
    const [password , setPassword] = useState('')
    const [repeatPassword , setRepeatPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const register = ()=>{
        if(!userName){
            message.warning('请填写用户名');
            return;
        }
        if(!password){
            message.warning('请填写密码');
            return;
        }
        if(!repeatPassword){
            message.warning('请重复密码');
            return;
        }
        if(password !== repeatPassword){
            message.warning('密码不相符');
        }else{
            setIsLoading(true)
        }
        request(servicePath.upsertUser, {
            method: 'POST',
            body: {
                user_name:userName,
                password:password
            },
        }).then(data=>{
            if(!data)return;
            this.props.history.push("/web/index")
        });
        // axios.post(servicePath.upsertArticle,qs.stringify({
        //     user_name:userName,
        //     password:password
        // },{headers:{'Content-Type':'application/x-www-form-urlencoded'}}),{
        // })
    }
    return (
        <div>
            <div className="login-div">
                <Spin tip="Loading..." spinning={isLoading}>
                    <Card title="不爽的麻雀的微博" extra={<a href="/web/login">登录</a>} bordered={true} style={{ width: 400 }} >
                        <Input
                            id="userName"
                            size="large"
                            placeholder="用户名"
                            onChange={(e)=>{setUserName(e.target.value)}}
                        />
                        <br/><br/>
                        <Input.Password
                            id="password"
                            size="large"
                            placeholder="密码"
                            onChange={(e)=>{setPassword(e.target.value)}}
                        />
                        <br/><br/>
                        <Input.Password
                            id="repeat-password"
                            size="large"
                            placeholder="重复密码"
                            onChange={(e)=>{setRepeatPassword(e.target.value)}}
                        />
                        <br/><br/>
                        <Button type="primary" size="large" block onClick={register} > Register in </Button>
                    </Card>
                </Spin>
            </div>
        </div>
    )
}
export default Register
