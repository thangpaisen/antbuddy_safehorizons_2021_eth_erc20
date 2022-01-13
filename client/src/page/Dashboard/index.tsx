import React, { useState } from 'react';
import { Layout, Menu, Typography } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    SendOutlined,
    CalendarFilled,
    FolderFilled,
    TagFilled,
    ShoppingCartOutlined,
    CarryOutOutlined
} from '@ant-design/icons';
import { Dropdown, Avatar } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import HeaderComp from '../../components/HeaderComp';
import Headers from './conponents/Headers';
import { getDataUser } from '../../hook/useAuth';
import { getToken } from '../../common';

const { Content, Header, Sider } = Layout;
const { SubMenu } = Menu;
const { Title } = Typography;

export const DashBoard = (props) => {
    let dataUser: any = getDataUser()
    let token: any = getToken()
    let history = useHistory();
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const [breakpoint, setBreakpoint] = useState<number>(90);
    const toogle = () => setCollapsed(!collapsed);
    if (!token) {
        history.push('/')
        return null
    }
    return (
        <Layout className="container" >
            <Sider trigger={null} collapsible collapsed={collapsed} breakpoint="lg" collapsedWidth={breakpoint} width={250}
                onBreakpoint={broken => {
                    if (broken) {
                        setBreakpoint(0)
                    } else {
                        setBreakpoint(80)
                    }
                }}
                style={{ minHeight: "100%" }}
            >

                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    onClick={({ key }) => history.push(key)}>
                    <SubMenu
                        icon={<CalendarFilled />}
                        title={"User"}
                        key={"User"}>
                        <Menu.Item
                            icon={<SendOutlined />}
                            key="/admin/User">
                            List User
                        </Menu.Item>
                    </SubMenu>
                </Menu>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    onClick={({ key }) => history.push(key)}>
                    <SubMenu
                        icon={<CalendarFilled />}
                        title={"Order"}
                        key={"Order"}>
                        <Menu.Item
                            icon={<SendOutlined />}
                            key="/admin/Order">
                            List Order
                        </Menu.Item>
                    </SubMenu>

                </Menu>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    onClick={({ key }) => history.push(key)}>
                    <SubMenu
                        icon={<CalendarFilled />}
                        title={"Product"}
                        key={"Product"}>
                        <Menu.Item
                            icon={<SendOutlined />}
                            key="/admin/listProduct">
                            List Product
                        </Menu.Item>
                        <Menu.Item
                            icon={<SendOutlined />}
                            key="/admin/AddProduct">
                            Add Product
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Headers />
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 1000
                    }}
                >
                    {props.children ? props.children : <Title level={4}>Trang Admin</Title>}

                </Content>
            </Layout>
        </Layout>
    )
}
