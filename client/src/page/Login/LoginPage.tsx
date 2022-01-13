import React, { useState } from 'react';
import { Form, Input, Button, Radio, Checkbox } from 'antd';
import { useHistory, Link, useLocation } from "react-router-dom"
import { showError, showSuccess, showWarning } from '../../utils/appUtils';
import { getToken, validateEmail } from '../../common';
import { authAction } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { AsyncReturnType, userType } from '../../interface';
import { useAuth } from '../../hook/useAuth';
import { ADMIN } from '../../enum';


export const LoginPage = () => {
    let { login } = useAuth();
    const dispatch = useDispatch()
    let token = getToken()
    const location = useLocation();
    let pathname = location?.pathname
    let history = useHistory();
    const [form] = Form.useForm();
    const [email, setEmail] = useState<string>('');
    const [password, setPassWord] = useState<string>('');
    if (token && pathname == "/login") {
        history.push('/')
        return null
    }
    if (token && (
        pathname == "/Admin/Login"
        || pathname == '/admin/login'
    )) {
        history.push('/admin')
        return null
    }
    const onHandleSubmit = async () => {
        try {
            if (val()) {
                const data: userType = {
                    email,
                    password
                }
                const { status, messenger, userInfor }: AsyncReturnType<any> =
                    await authAction.onLogin(data, dispatch)
                if (status) {
                    login(userInfor?.token, userInfor)
                    showSuccess(messenger)
                    if (pathname == '/Admin/Login' || pathname == '/admin/login'
                        && userInfor?.role?.name_Role === ADMIN) {
                        history.push('/admin');;
                    } else {
                        history.push('/');;
                    }
                } else {
                    showError(messenger)
                }
            }
        } catch (error) {
            showWarning('wrong something!!!')
        }
    }

    const val = (): boolean => {
        if (email == '' || password == '') {
            showWarning("Vui lòng điền đầy đủ thông tin")
            return false
        }
        if (!validateEmail(email)) {
            showWarning("Vui lòng nhập Emai đúng định dạng Email '@gmail.com'")
            return false
        }
        return true
    }



    return (
        <div id="pageLogin">
            <Form
                layout={'vertical'}
                form={form}
                initialValues={{ layout: 'vertical' }}
            >
                <Form.Item label="Email">
                    <Input
                        id="Email"
                        placeholder="Enter Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Item>
                <Form.Item label="Password">
                    <Input.Password
                        placeholder="Enter Password"
                        onChange={(e) => setPassWord(e.target.value)}
                    />
                </Form.Item>
                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item >
                    <Button
                        onClick={onHandleSubmit}
                        type="primary">Submit</Button>
                </Form.Item>

                <span className="noAccount">I DON'T HAVE AN ACCOUNT?&nbsp;
                    <Link to="/register" >
                        <strong className="regNow">Sign Up</strong>
                    </Link></span>
            </Form>
        </div>
    );
};
