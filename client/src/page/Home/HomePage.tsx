import React from 'react'
import { Card, InputNumber, Empty, Row, Image } from 'antd';
import HeaderComp from '../../components/HeaderComp';
import { Breadcrumb } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { productAction } from '../../redux/actions';
import Loading from '../../components/Loading';
import { useHistory, Link, useLocation } from "react-router-dom"
import { FooterComp, ItemProduct, ModalCustom } from '../../components';
import { AsyncReturnType, ProductType } from '../../interface';
import { formatCurrency, getToken } from '../../common';
import { showError, showSuccess, showWarning } from '../../utils/appUtils';
export const HomePage = () => {
    let token = getToken()
    let history = useHistory();
    const dispatch = useDispatch()
    const ListProduct: ProductType[] = useSelector((state: any) => state?.product?.ListProduct)
    const [isLoading, setLoading] = React.useState<boolean>(true)
    const [itemProduct, setItemDelete] = React.useState<ProductType | null>(null)
    const [isVisibleCart, setIsVisibleCart] = React.useState<boolean>(false)
    const [valQuantity, setValQuantity] = React.useState<number>(1)

    React.useEffect(() => {
        getListProduct()
    }, [])

    const getListProduct = async () => {
        setLoading(true)
        await productAction.getListProduct(dispatch)
        setLoading(false)
    }

    const showModalCart = (item: ProductType) => {
        setItemDelete(item)
        setIsVisibleCart(true);
    };


    const _renderContentProduct = () => (
        <Row gutter={12}>
            {
                ListProduct?.map((item: ProductType, index: number) => (
                    <ItemProduct
                        item={item}
                        key={`${item?.id} ${index}`}
                        showModalCart={showModalCart}
                    />
                ))
            }
        </Row>
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
                    onChange={onChange} />
            </Card>
        </>
    )

    const onHandleAddCart = async () => {
        if (!token) {
            showWarning("Login!!!")
            return history.push('/login')
        }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
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
            await productAction.getListOrderProduct(dispatch)
        } else {
            showError(messenger)
        }
    }

    return (
        <>
            <HeaderComp />
            <div id="pageHome" >
                <Breadcrumb>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href="">product</a>
                    </Breadcrumb.Item>
                </Breadcrumb>,
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
                    && _renderContentProduct()
                }
                <ModalCustom
                    title='Buy Product'
                    renderContent={_renderContentCart}
                    handleOk={onHandleAddCart}
                    isModalVisible={isVisibleCart}
                    handleCancel={() => setIsVisibleCart(false)}
                />
            </div>
            <FooterComp />
        </>
    )
}

