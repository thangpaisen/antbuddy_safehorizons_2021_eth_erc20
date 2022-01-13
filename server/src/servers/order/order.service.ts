import { CREATE_ORDER_FAIL, CREATE_ORDER_SUCCESS } from './../../common/StatusCode';
import { OrderEntity } from './order.entity';
import { getRepository } from 'typeorm';
import {
    CREATE_FAIL,
    CREATE_SUCCESS,
    DELETE_FAIL,
    DELETE_SUCCESS,
    ERR_NOT_FIND
} from '../../common';
import { orderType } from './order.interface'
import { OrderDetailEntity } from '../orderDetail/orderDetail.entity';
import { ProductEntity } from '../product/product.entity';
import { UserEntity } from '../User/User.entity';
import { StatusOrderEntity } from '../statusOrder/statusOrder.entity';



export const getLisAllOrderByUser = async (idUser: string) => {
    const OrderRespository: any = await getRepository(OrderEntity);
    try {
        let res = await OrderRespository.createQueryBuilder('t1')
            .select([
                't2.product_id as product_id',
                't2.quantity as quantity',
                't2.unit_price as totalPrice',
                't5.status_name as status_name',
                't3.product_name as product_name',
                't3.description as description',
                't3.price as price',
                't3.picture as picture',
                't4.name as name',
            ])
            .innerJoin(OrderDetailEntity, 't2', 't2.order_id = t1.id')
            .innerJoin(ProductEntity, 't3', 't2.product_id = t3.id')
            .innerJoin(UserEntity, 't4', 't1.user_id = t4.id')
            .innerJoin(StatusOrderEntity, 't5', 't1.status_order = t5.id')
            .where('t1.user_id = :user_id', { user_id: idUser })
            .orderBy('t1.order_date', 'DESC')
            .getRawMany();
        let resCount = await OrderRespository.createQueryBuilder('t1')
            .select([
                'COUNT(t2.product_id) as count',
            ])
            .innerJoin(OrderDetailEntity, 't2', 't2.order_id = t1.id')
            .where('t1.user_id = :user_id', { user_id: idUser })
            .getRawMany();
        return {
            res,
            count: resCount[0]?.count
        }
    } catch (error) {
        return {
            data: [],
            count: 0
        }
    }
}

export const getDetailOrderByUser = async (id: string, idUser: string) => {
    const OrderRespository: any = await getRepository(OrderEntity);
    try {
        let res = await OrderRespository.createQueryBuilder('t1')
            .select([
                't2.product_id as product_id',
                't2.quantity as quantity',
                't2.unit_price as totalPrice',
                't5.status_name as status_name',
                't3.product_name as product_name',
                't3.description as description',
                't3.price as price',
                't3.picture as picture',
                't4.name as name',
            ])
            .innerJoin(OrderDetailEntity, 't2', 't2.order_id = t1.id')
            .innerJoin(ProductEntity, 't3', 't2.product_id = t3.id')
            .innerJoin(UserEntity, 't4', 't1.user_id = t4.id')
            .innerJoin(StatusOrderEntity, 't5', 't1.status_order = t5.id')
            .where('t1.user_id = :userId', { userId: idUser })
            .andWhere('t2.product_id = :productId', { productId: id })
            .orderBy('t1.order_date', 'DESC')
            .getRawMany();
        return res
    } catch (error) {
        return {}
    }
}

export const onAddOrder = async (data: orderType, idUser: string, idProduct: string) => {
    const OrderRespository: any = await getRepository(OrderEntity);
    const OrderDetailRespository: any = await getRepository(OrderDetailEntity);
    const ProductRespository: any = await getRepository(ProductEntity);
    try {
        let resProduct = await ProductRespository.findOne({
            where: {
                id: idProduct
            },
        });
        if (resProduct) {
            let resOrder = await OrderRespository.findOne({
                where: {
                    user_id: idUser,
                },
            });
            if (resOrder) {
                resOrder = { ...resOrder }
                let resDetailOrder = await OrderDetailRespository.findOne({
                    where: {
                        product_id: idProduct,
                        order_id: resOrder?.id
                    },
                    relations: ["product_id", "order_id"]
                });
                if (resDetailOrder) {
                    resDetailOrder = { ...resDetailOrder }
                    let total = Number(resDetailOrder?.product_id?.price) * Number(data?.quantity)
                    resDetailOrder.quantity = data?.quantity + resDetailOrder?.quantity
                    resDetailOrder.unit_price = Number(resDetailOrder.unit_price) + total
                    await OrderDetailRespository.save(resDetailOrder);
                    return {
                        status: true,
                        messenger: CREATE_ORDER_SUCCESS
                    }
                } else {
                    const resDetailOrder = await OrderDetailRespository.create({
                        product_id: idProduct,
                        order_id: resOrder?.id,
                        quantity: data?.quantity,
                        unit_price: Number(resProduct.price) * Number(data?.quantity),
                    });
                    await OrderDetailRespository.save(resDetailOrder);
                    return {
                        status: true,
                        messenger: CREATE_ORDER_SUCCESS
                    }
                }
            } else {
                let resCrOder = await OrderRespository.create({
                    user_id: idUser,
                    status_order: 1
                });
                let resOrder = await OrderRespository.save(resCrOder);
                if (resOrder) {
                    resOrder = { ...resOrder }
                    const resDetailOrder = await OrderDetailRespository.create({
                        product_id: idProduct,
                        order_id: resOrder?.id,
                        quantity: data?.quantity,
                        unit_price: Number(resProduct.price) * Number(data?.quantity),
                    });
                    await OrderDetailRespository.save(resDetailOrder);
                    return {
                        status: true,
                        messenger: CREATE_ORDER_SUCCESS
                    }
                }
            }
        } else {
            return {
                status: false,
                messenger: ERR_NOT_FIND
            }
        }
    } catch (error) {
        return {
            status: false,
            messenger: CREATE_ORDER_FAIL
        }
    }
}


export const getLisAllOrderByAdmin = async () => {
    const OrderRespository: any = await getRepository(OrderEntity);
    try {
        let res = await OrderRespository.createQueryBuilder('t1')
            .select([
                't2.product_id as product_id',
                't2.quantity as quantity',
                't2.unit_price as totalPrice',
                't3.product_name as product_name',
                't3.description as description',
                't3.price as price',
                't3.picture as picture',
                't4.name as name',
                't5.status_name as status_name',
            ])
            .innerJoin(OrderDetailEntity, 't2', 't2.order_id = t1.id')
            .innerJoin(ProductEntity, 't3', 't2.product_id = t3.id')
            .innerJoin(UserEntity, 't4', 't1.user_id = t4.id')
            .innerJoin(StatusOrderEntity, 't5', 't1.status_order = t5.id')
            .orderBy('t1.order_date', 'DESC')
            .getRawMany();
        let resCount = await OrderRespository.createQueryBuilder('t1')
            .select([
                'COUNT(t2.product_id) as count',
            ])
            .innerJoin(OrderDetailEntity, 't2', 't2.order_id = t1.id')
            .getRawMany();
        return {
            res,
            count: resCount[0]?.count
        }
    } catch (error) {
        return {
            data: [],
            count: 0
        }
    }
}
export const onDeleteOrderProduct = async (id, idUser) => {
    const OrderRespository: any = await getRepository(OrderEntity);
    const OrderDetailRespository: any = await getRepository(OrderDetailEntity);
    try {
        let resOrder = await OrderRespository.findOne({
            where: {
                user_id: idUser
            }
        });
        if (resOrder) {
            resOrder = { ...resOrder }
            let resDetailOrder: any = await OrderDetailRespository.findOne({
                where: {
                    order_id: resOrder.id,
                    product_id: id
                },
                relations: ["product_id", "order_id"]
            });
            await OrderDetailRespository.remove(resDetailOrder);
            return {
                status: true,
                messenger: DELETE_SUCCESS
            }
        } else {
            return {
                status: false,
                messenger: DELETE_FAIL
            }
        }
    } catch (error) {
        return {
            status: false,
            messenger: DELETE_FAIL
        }
    }
}

export const onUpdateStatusOrder = async (data, idUser, idProduct) => {
    console.log( idUser, idProduct)
    const OrderRespository: any = await getRepository(OrderEntity);
    try {
        let response = await OrderRespository.createQueryBuilder('t1')
            .select([
                't2.product_id as product_id',
                't2.quantity as quantity',
                't2.unit_price as totalPrice',
                // 't5.status_name as status_name',
                't3.product_name as product_name',
                't3.description as description',
                't3.price as price',
                't3.picture as picture',
                't4.name as name',
            ])
            .innerJoin(OrderDetailEntity, 't2', 't2.order_id = t1.id')
            .innerJoin(ProductEntity, 't3', 't2.product_id = t3.id')
            .innerJoin(UserEntity, 't4', 't1.user_id = t4.id')
            .innerJoin(StatusOrderEntity, 't5', 't1.status_order = t5.id')
            .where('t1.user_id = :userId', { userId: idUser })
            .andWhere('t2.product_id = :productId', { productId: idProduct })
            .orderBy('t1.order_date', 'DESC')
            .getOne();
        console.log(response)
        return response
    } catch (error) {
        return {}
    }
}