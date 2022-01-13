import React from 'react'
import { Checkbox } from 'antd';
import { Container, Row, Col } from 'react-bootstrap'
import { Input, Space } from 'antd';
import { useHistory, useLocation, Link } from "react-router-dom";
import { Formik, Field, Form } from 'formik';
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { getToken } from '../../common';
import { authAction } from '../../redux/actions';
import { showError, showSuccess } from '../../utils/appUtils';
import { AsyncReturnType } from '../../interface';

export const RegisterPage = () => {
    let token = getToken()
    const router = useHistory()
    const dispatch = useDispatch()
    const borderError = '0.5px solid red'
    const border = '0.5px solid #D9D9D9'
    const [hidePassword, sethidePassword] = React.useState(true)

    if (token) {
        router.push('/')
        return null
    }
    return (
        <section id="Pageregister">
            <Container fluid className="containerRegister">
                <Row >
                    <Col lg="6" md="6" sm="6" xs="6"
                        className="wrapperRight">
                        <Formik
                            initialValues={{
                                Name: '',
                                Email: '',
                                PassWord: '',
                                repeatPassword: '',
                            }}
                            onSubmit={async (values) => {
                                const data = {
                                    name: values.Name,
                                    email: values.Email,
                                    password: values.PassWord,
                                }
                                const { status, messenger }: AsyncReturnType<any> =
                                    await authAction.onRegister(data, dispatch)
                                console.log(status, messenger)
                                if (status) {
                                    showSuccess(messenger)
                                    router.push('/login');;
                                } else {
                                    showError(messenger)
                                }
                            }}

                            validationSchema={
                                yup.object().shape({
                                    Name: yup.string().required('Vui lòng điền đầy đủ thông tin.'),
                                    Email: yup.string().email("Nhập địa chỉ Email hợp lệ").required('Vui lòng điền đầy đủ thông tin.'),
                                    PassWord: yup.string().required('Vui lòng điền đầy đủ thông tin.').min(4, "Mật khẩu phải ít nhất 4 kí tự"),
                                    repeatPassword: yup.string()
                                        .required("Vui lòng điền đầy đủ thông tin")
                                        .oneOf([yup.ref("PassWord")], "Mật khẩu không trùng khớp"),
                                })
                            }
                        >
                            {({
                                values,
                                handleSubmit,
                                handleChange,
                                errors,
                                touched
                            }) => (
                                <Form onSubmit={handleSubmit} className="formRegister">
                                    <h1 className="txtTitle">SIGN UP</h1>
                                    <span className="txtContent">Welcome to summoner's rift</span>
                                    <div className="contact-title-0">
                                        <span className="txtLable">Name</span>
                                        <Input
                                            name='Name'
                                            value={values.Name}
                                            placeholder="Nhập Họ Và Tên"
                                            onChange={handleChange}
                                            style={{
                                                border: errors.Name
                                                    && touched.Name
                                                    ? borderError
                                                    : border, width: '100%'
                                            }}
                                            className="input-Register-txt"
                                        />
                                        {
                                            errors.Name && touched.Name && (
                                                <span className="errors">
                                                    &emsp;{errors.Name}
                                                </span>
                                            )
                                        }
                                    </div>
                                    <div className="contact-title-0">
                                        <span className="txtLable">Email</span>
                                        <Input
                                            name='Email'
                                            value={values.Email}
                                            onChange={handleChange}
                                            className="input-Register-txt"
                                            style={{
                                                border: errors.Email
                                                    && touched.Email
                                                    ? borderError
                                                    : border, width: '100%'
                                            }}
                                            placeholder="Enter Email" />
                                        {
                                            errors.Email && touched.Email && (
                                                <span className="errors">
                                                    &emsp;{errors.Email}
                                                </span>
                                            )
                                        }
                                    </div>
                                    <div className="contact-title-0">
                                        <span className="txtLable">Enter Password</span>
                                        <Input.Password
                                            name='PassWord'
                                            id="password"
                                            value={values.PassWord}
                                            type={hidePassword ? 'password' : 'text'}
                                            onChange={handleChange}
                                            style={{
                                                border: errors.PassWord
                                                    && touched.PassWord
                                                    ? borderError
                                                    : border
                                            }}
                                            placeholder="Enter Password"
                                            className="input-register-Pass"
                                        />
                                        {
                                            errors.PassWord && touched.PassWord && (
                                                <span className="errors">
                                                    &emsp;{errors.PassWord}
                                                </span>
                                            )
                                        }
                                    </div>
                                    <div className="contact-title-1 ">
                                        <span className="txtLable">Repeat Password</span>
                                        <Input.Password
                                            name='repeatPassword'
                                            id="repeatPassword"
                                            value={values.repeatPassword}
                                            onChange={handleChange}
                                            type={hidePassword ? 'password' : 'text'}
                                            placeholder="Enter Repeat Password"
                                            className="input-register-Pass"
                                        />
                                        {
                                            errors.repeatPassword && touched.repeatPassword && (
                                                <span className="errors">
                                                    &emsp;{errors.repeatPassword}
                                                </span>
                                            )
                                        }
                                    </div>
                                    <div className="wraperRegister">
                                        <button className="btn-Register">Sign Up</button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                        <span className="noAccount">Do you already have an account?&nbsp;
                            <Link to="/login" >
                                <strong className="regNow">Sing In</strong>
                            </Link></span>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

