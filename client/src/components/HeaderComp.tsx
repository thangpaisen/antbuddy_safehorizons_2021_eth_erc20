import { Layout, Menu, Dropdown, Avatar, Badge } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons';
import React from 'react'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { useHistory } from "react-router-dom"
import { authAction, productAction } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { showSuccess } from '../utils/appUtils';
import { getToken } from '../common';
import { getDataUser, useAuth } from '../hook/useAuth';
const { SubMenu } = Menu;
const { Content, Header, Sider } = Layout;

const HeaderComp = () => {
    let totalOrderProduct = useSelector((state: any) => state?.product?.totalOrderProduct)
    let dataUser: any = getDataUser()
    let { logout } = useAuth()
    const dispatch = useDispatch()
    let history = useHistory();
    let token = getToken()



    const onHandlerLogout = async () => {
        authAction.onLogout(dispatch)
        logout()
        showSuccess("Đăng xuất thành công")
        history.push('/login');;
    }

    React.useEffect(() => {
        (async () => {
            await productAction.getListOrderProduct(dispatch)
        })()
    }, [])

    const onHandlerLogin = async () => {
        history.push('/login');;
    }


    const menu = (
        <Menu>
            {
                !!token && (
                    <Menu.Item onClick={() => onHandlerLogout()}>
                        <UserOutlined /> Đăng xuất
                    </Menu.Item>
                )
            }
            {
                !token && (
                    <Menu.Item onClick={() => onHandlerLogin()}>
                        <UserOutlined /> Đăng nhập
                    </Menu.Item>
                )
            }
        </Menu>
    );
    const onHandleGoToOrder = () => {
        history.push('/list-order');;
    }
    return (
        <Header className="container-site-layout-background">
            {
                !!token && (
                    <div style={{
                        margin: '0 48px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    >
                        <Badge count={Number(totalOrderProduct)}>
                            <ShoppingCartOutlined
                                onClick={onHandleGoToOrder}
                                height={50}
                                width={50}
                                style={{
                                    color: '#FFF',
                                    fontSize: '36px',
                                    cursor: 'pointer'
                                }} />
                        </Badge>
                    </div>
                )
            }
            {
                !!token
                && <span style={{
                    color: '#fff'
                }}>
                    {dataUser?.name}
                </span>
            }
            &ensp;
            <Dropdown
                overlay={menu}
                className="triggers">
                <Avatar
                    icon={<UserOutlined />}
                    style={{ cursor: 'pointer' }}
                />
            </Dropdown>
        </Header>
    )
}

export default React.memo(HeaderComp)
