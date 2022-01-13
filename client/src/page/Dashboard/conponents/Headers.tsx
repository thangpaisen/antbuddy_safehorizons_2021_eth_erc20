import { Layout, Menu, Dropdown, Avatar, Badge } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons';
import React from 'react'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { useHistory } from "react-router-dom"
import { authAction, productAction } from '../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { showSuccess } from '../../../utils/appUtils';
import { getToken } from '../../../common';
import { getDataUser, useAuth } from '../../../hook/useAuth';
const { SubMenu } = Menu;
const { Content, Header, Sider } = Layout;

const Headers = () => {
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
        history.push('/admin/login');;
    }

    const menu = (
        <Menu>
            <Menu.Item onClick={() => onHandlerLogout()}>
                <UserOutlined /> Đăng xuất
            </Menu.Item>
        </Menu>
    );
    const onHandleGoToOrder = () => {
        history.push('/list-order');;
    }
    return (
        <Header className="container-site-layout-background">
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

export default React.memo(Headers)
