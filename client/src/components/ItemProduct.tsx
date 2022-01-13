import React, { FC } from 'react'
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Card, Col, Empty, Row } from 'antd';
import { ProductType } from '../interface';
import { useHistory } from "react-router-dom"
import { formatCurrency, to_slug } from '../common';
const { Meta } = Card;


interface itemProductCompType {
    item: ProductType,
    showModalCart: any
}
const ItemProductComp: FC<itemProductCompType> = ({
    item,
    showModalCart
}) => {
    let history = useHistory();

    const onHandleGotoDetail = (item: ProductType) => {
        let product_name = to_slug(item?.product_name)
        let id = item?.id
        history.push(`/detail-product/${product_name}.${id}`);;
    }

    return (
        <Col span={4}>
            <Card
                style={{ width: '100%' }}
                cover={
                    <img
                        onClick={() => onHandleGotoDetail(item)}
                        alt={item?.picture}
                        style={{ height: 200 }}
                        src={item?.picture}
                    />
                }
                actions={[
                    <ShoppingCartOutlined onClick={() => showModalCart(item)} />,
                ]}
            >
                <Meta
                    title={item?.product_name}
                    description={formatCurrency(item?.price)}
                />
            </Card>
        </Col>
    )
}

export const ItemProduct = React.memo(ItemProductComp)
