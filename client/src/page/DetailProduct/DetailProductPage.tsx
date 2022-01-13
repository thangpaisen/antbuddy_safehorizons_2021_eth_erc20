import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams, useLocation } from 'react-router-dom';
import HeaderComp from '../../components/HeaderComp';
import { Card, InputNumber, Row, Breadcrumb, Image, Col, Button } from 'antd';
import { productAction } from '../../redux/actions';
import { FooterComp, ModalCustom } from '../../components';
import Loading from 'react-loading';
import { showError, showSuccess, showWarning } from '../../utils/appUtils';
import { AsyncReturnType, detailProductType, ProductType } from '../../interface';
import { formatCurrency, getToken } from '../../common';

export const DetailProductPage = () => {
    let location = useLocation()
    let token = getToken()
    let { id } = useParams();
    let history = useHistory();
    let detailProduct: detailProductType = useSelector((state: any) => state?.product?.detailProduct)
    const dispatch = useDispatch()
    const [isLoading, setLoading] = React.useState<boolean>(true)
    const [isVisibleCart, setIsVisibleCart] = React.useState<boolean>(false)
    const [valQuantity, setValQuantity] = React.useState<number>(1)

    React.useEffect(() => {
        getDetailProduct()
    }, [])


    const getDetailProduct = async () => {
        setLoading(true)
        await productAction.getDetailProduct({ id }, dispatch)
        setLoading(false)
    }


    const _renderContentCart = () => (
        <>
            <Card >
                <Image
                    width={'100%'}
                    height={200}
                    src={detailProduct?.picture}
                />
                <p>{detailProduct?.product_name}</p>
                <p>{detailProduct?.description}</p>
                <p>Total Price {formatCurrency(Number(detailProduct?.price) * valQuantity)}</p>
                <InputNumber
                    min={1}
                    max={100}
                    value={valQuantity}
                    onChange={onChange} />
            </Card>
        </>
    )

    const onChange = (value) => {
        setValQuantity(value)
    }

    const showModalCart = () => {
        setIsVisibleCart(true);
    };


    const onHandleAddCart = async () => {
        if (!token) {
            showWarning("Login!!!")
            return history.push('/login')
        }
        let data = {
            quantity: valQuantity,
            id: detailProduct?.id
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


    const _renderContentProduct = () => (
        <>
            <Row gutter={12}>
                <Col span={12} >
                    <Image
                        width={'100%'}
                        height={400}
                        src={detailProduct?.picture}
                    />
                </Col>
                <Col span={12} >
                    <p className="txtTitle">{detailProduct?.product_name}</p>
                    <p>{detailProduct?.description}</p>
                    <p>{formatCurrency(detailProduct?.price)}</p>
                    <Button onClick={showModalCart} type="primary">Add Cart</Button>

                </Col>
            </Row>
        </>
    )


    return (
        <>
            <HeaderComp />
            <div id="pageHome" >
                <Breadcrumb>
                    <Link to="/">
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                    </Link>
                    <Breadcrumb.Item>
                        {detailProduct?.product_name}
                    </Breadcrumb.Item>
                </Breadcrumb>,
                {
                    isLoading && <Loading />
                }
                {
                    !isLoading
                    && detailProduct
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

