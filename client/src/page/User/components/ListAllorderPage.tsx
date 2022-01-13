
import React from 'react'
import { Card, InputNumber, Empty, Modal, Image, Table, Space, Button, Tag } from 'antd';
import HeaderComp from '../../../components/HeaderComp';
import { Breadcrumb } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid4 } from 'uuid';
import { productAction } from '../../../redux/actions';
import Loading from '../../../components/Loading';
import { useHistory, useLocation, Link } from "react-router-dom";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { FooterComp, ItemProduct, ModalCustom } from './../../../components';
import { AsyncReturnType, ProductType } from '../../../interface';
import { formatCurrency } from '../../../common';
import { showError, showSuccess } from '../../../utils/appUtils';
import { NUMBER } from '../../../enum';
import { DashBoard } from '../..';
const { confirm } = Modal;
export const ListAllorderPage = () => {
    let resState = useSelector((state: any) => state?.product)
    const listOrder = resState?.ListAllOrderProduct

    const total = resState?.totalAllOrderProduct
    const dispatch = useDispatch()
    const [isLoading, setLoading] = React.useState<boolean>(true)
    const [itemProduct, setItemDelete] = React.useState<ProductType | null>(null)
    const [isVisibleCart, setIsVisibleCart] = React.useState<boolean>(false)
    const [valQuantity, setValQuantity] = React.useState<number>(1)


    React.useEffect(() => {
        getListProduct()
    }, [])

    const getListProduct = async () => {
        setLoading(true)
        await productAction.getListAllOrderProduct(dispatch)
        setLoading(false)
    }


    const columns = [
        {
            title: 'numerical order',
            key: 'index',
            render: (text, record, index) => <span>{index + 1}</span>
        },
        {
            title: 'Name User',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Name Product',
            dataIndex: 'product_name',
            key: 'product_name',
        },
        {
            title: 'Ảnh',
            key: `acvd${uuid4()}`,
            width: '15%',
            render: (data) => {
                return (
                    <img src={data.picture} style={{
                        width: 100,
                        height: 100,
                    }} alt="1"></img>
                )
            },
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Total Price',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
        },
        {
            title: 'Status',
            render: (data) => {
                let color = data.status_name == 'Chờ xét duyệt' ? 'geekblue' : 'green';
                return (
                    <Tag color={color}>
                        {data?.status_name?.toUpperCase()}
                    </Tag>
                )
            },
        },
    ];

    const _renderContentList = () => (
        <Table
            dataSource={listOrder}
            columns={columns}
            pagination={{
                defaultPageSize: NUMBER,
                showSizeChanger: true,
                total: total,
            }}
        />
    )

    const onChange = (value) => {
        setValQuantity(value)
    }

    const _renderContentCart = () => (
        <>
            <Card >
                <Image
                    width={'100%'}
                    height={200}
                    src={itemProduct?.picture}
                />
                <p>{itemProduct?.product_name}</p>
                <p>{itemProduct?.description}</p>
                <p>Total Price {formatCurrency(Number(itemProduct?.price) * valQuantity)}</p>
                <InputNumber
                    min={1}
                    max={100}
                    value={valQuantity}
                    onChange={onChange}
                />
            </Card>
        </>
    )

    const onHandleAddCart = async () => {
        let data = {
            quantity: valQuantity,
            id: itemProduct?.id
        }
        const { status, messenger }: AsyncReturnType<any> =
            await productAction.doBuyProduct(data, dispatch)
        if (status) {
            showSuccess(messenger)
            setValQuantity(1)
            setIsVisibleCart(false)
        } else {
            showError(messenger)
        }
    }

    return (
        <DashBoard>
            <div id="pageHome" >
                <Space id="headerAdmin">
                    <div className='wrapHeaderLeft'>
                        <Breadcrumb>
                            <Link to="/">
                                <Breadcrumb.Item>Home</Breadcrumb.Item>
                            </Link>
                            <Breadcrumb.Item>
                                <span>List All Order</span>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                        <div className='wrapHeaderTotal'>
                            <Button type="dashed">Total&ensp;
                                {
                                    total
                                        ? total
                                        : 0
                                }
                            </Button>
                        </div>
                    </div>
                </Space>
                {
                    isLoading && <Loading />
                }
                {
                    !isLoading
                    && listOrder?.length == 0
                    && <Empty />
                }
                {
                    !isLoading
                    && listOrder?.length != 0
                    && _renderContentList()
                }
                <ModalCustom
                    title='Buy Product'
                    renderContent={_renderContentCart}
                    handleOk={onHandleAddCart}
                    isModalVisible={isVisibleCart}
                    handleCancel={() => setIsVisibleCart(false)}
                />
            </div>
        </DashBoard>
    )
}

