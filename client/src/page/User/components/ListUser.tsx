import React from 'react';
import { Breadcrumb, Table, Space, Button, Modal } from 'antd';
import { v4 as uuid4 } from 'uuid';
import { useHistory, useLocation, Link } from "react-router-dom";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Loading from '../../../components/Loading';
import moment from 'moment';
import { showError, showSuccess } from '../../../utils/appUtils';
import Api from '../../../config/Api';
import { DashBoard } from '../..';
import { usersActions } from '../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { NUMBER } from '../../../enum';
import { userInforType } from '../../../interface';
const { confirm } = Modal;

export interface ListCusmtomerType {
    data: userInforType[],
    count: number
}

export const ListUser = () => {
    const history = useHistory();
    const dispatch = useDispatch()
    const { search } = useLocation();
    const query = new URLSearchParams(search)
    const ListUser: ListCusmtomerType = useSelector((state: any) => state?.customer?.ListAllCustomer)
    const [loading, setLoading] = React.useState<boolean>(false)
    const paramField = query.get('page');
    const [page, setPage] = React.useState<number>(paramField ? parseInt(paramField) : 1)

    React.useEffect(() => {
        getListAllCusomer()
    }, [page])

    const getListAllCusomer = async () => {
        setLoading(true)
        await usersActions.getListCustomer({
            page,
            number: NUMBER
        }, dispatch)
        setLoading(false)
    }


    const onHandleDelete = async (id: string) => {
        confirm({
            icon: <ExclamationCircleOutlined />,
            content: "Bạn chắc chắn muốn xóa",
            onOk() {
                onHandleDeleteConfirm(id)
            },
            onCancel() {
                console.log('Cancel');
            },
        })
    }

    const onHandleDeleteConfirm = async (id: string) => {
        let { messenger, status }: any = await usersActions.onDeleteCustomer({
            id
        }, dispatch)
        if (status) {
            await usersActions.getListCustomer({
                page,
                number: NUMBER
            }, dispatch)
            showSuccess(messenger)
        } else {
            showError("Lỗi");
        }
    }

    const columns = [
        {
            title: 'STT',
            key: 'index',
            render: (text, record, index) => <span>{index + 1}</span>
        },
        {
            title: 'name',
            dataIndex: 'name',
            key: `accd${uuid4()}`
        },
        {
            title: 'email',
            dataIndex: 'email',
            key: `accd${uuid4()}`
        },
        {
            title: 'phone',
            // dataIndex: 'phone',
            key: `accd${uuid4()}`,
            render: (text, record, index) => <span>{record?.phone ? record?.phone : 'Empty'}</span>
        },
        {
            title: 'Hành Động',
            key: `aacd${uuid4()}`,
            render: (data) => {
                return (
                    <Space>
                        <Button onClick={() => onHandleDelete(data?.id)}>
                            Xóa
                        </Button>
                    </Space>
                )
            }
        },
    ];

    const handleChangePage = (page: number) => {
        setPage(page)
        history.push(`/admin/user?page=${page}`);
    }

    const _renderContent = () => (
        <Table
            dataSource={
                ListUser?.data
                    && ListUser?.data?.length !== 0
                    ? ListUser?.data : []
            }
            columns={columns}
            pagination={{
                defaultPageSize: NUMBER,
                showSizeChanger: true,
                defaultCurrent: page,
                current: page,
                total: ListUser?.count,
                onChange: handleChangePage
            }}
            rowKey='id'
        />
    )

    return (
        <div >
            <Space id="headerAdmin">
                <div className='wrapHeaderLeft'>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            Admin
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            User
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            Total
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <div className='wrapHeaderTotal'>
                        <Button type="dashed">Total&ensp;
                            {
                                ListUser?.count
                                    ? ListUser?.count
                                    : 0
                            }
                        </Button>
                    </div>
                </div>
                {/* <div>
                    <Link to="/admin/AddCustomer">
                        <Button type="primary">
                            Thêm Customer
                        </Button>
                    </Link>
                </div> */}
            </Space>
            {
                loading ? (
                    <div id="loading">
                        <Loading />
                    </div>
                ) : _renderContent()
            }
        </div>

    )
}
