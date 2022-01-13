
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
export const ListProductPage = () => {
    let resState = useSelector((state: any) => state?.product)
    const ListProduct = resState?.ListProduct
    const total = resState?.totalProduct
    const dispatch = useDispatch()
    const [isLoading, setLoading] = React.useState<boolean>(true)
    const [itemProduct, setItemDelete] = React.useState<ProductType | null>(null)
    const [isVisibleCart, setIsVisibleCart] = React.useState<boolean>(false)
    const [valQuantity, setValQuantity] = React.useState<number>(1)
    const onHandleDelete = async (id: any) => {
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
        const { status, messenger }: AsyncReturnType<any> =
            await productAction.onDeleteProduct({ id }, dispatch)
        if (status) {
            await productAction.getListProduct(dispatch)
            showSuccess(messenger)
        } else {
            showError(messenger)
        }
    }
    React.useEffect(() => {
        getListProduct()
    }, [])

    const getListProduct = async () => {
        setLoading(true)
        await productAction.getListProduct(dispatch)
        setLoading(false)
    }


    const columns = [
        {
            title: 'numerical order',
            key: 'index',
            render: (text, record, index) => <span>{index + 1}</span>
        },
        {
            title: 'Name Product',
            dataIndex: 'product_name',
            key: 'product_name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
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
            title: 'price',
            key: 'price',
            render: (text, record, index) => <span>{formatCurrency(record?.price)}</span>
        },
        {
            title: 'Actition',
            key: `aacd${uuid4()}`,
            render: (data) => {
                return (
                    <Space>
                        <Button onClick={() => onHandleDelete(data?.id)}>
                            Delete
                        </Button>
                    </Space>
                )
            }
        },
    ];

    const _renderContentList = () => (
        <Table
            dataSource={ListProduct}
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
                    && ListProduct?.length == 0
                    && <Empty />
                }
                {
                    !isLoading
                    && ListProduct?.length != 0
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

