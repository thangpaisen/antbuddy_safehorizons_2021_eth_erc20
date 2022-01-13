import { validate } from 'express-validation';
import express from 'express';
import { responsHelper } from '../../common/responsiveHelper';

import { JWTauthen } from '../../middleware';
import { ROLE_ADMIN } from '../../common/Enum';
import { ACCESS_ADMIN } from '../../common';
import { VALIDATION_ORDER } from './order.validation';
import {
    onAddOrder,
    getLisAllOrderByUser,
    getDetailOrderByUser,
    getLisAllOrderByAdmin,
    onDeleteOrderProduct,
    onUpdateStatusOrder
} from './order.service';

const route = express.Router();

//danh sách All product by User
route.get('/get-list-order-by-user',
    JWTauthen,
    async (req: any, res) => {
        try {
            const idUser = req?.user?.id
            const response: any = await getLisAllOrderByUser(idUser);
            return responsHelper(req, res, null, response, 200)
        } catch (error) {
            return responsHelper(req, res, null, error, 400)
        }
    })

//danh sách All product by admin
route.get('/get-list-order-by-admin',
    JWTauthen,
    async (req, res) => {
        try {
            const response: any = await getLisAllOrderByAdmin();
            return responsHelper(req, res, null, response, 200)
        } catch (error) {
            return responsHelper(req, res, null, error, 400)
        }
    })


// chi tiết detail order
route.get('/get-detail-order/:id',
    JWTauthen,
    async (req: any, res) => {
        try {
            const idUser = req?.user?.id
            const { id } = req.params
            const response: any = await getDetailOrderByUser(id, idUser);
            return responsHelper(req, res, null, response, 200)
        } catch (error) {
            return responsHelper(req, res, null, error, 400)
        }
    })

//thêm order
route.post('/add-order/:id',
    validate(VALIDATION_ORDER),
    JWTauthen,
    async (req: any, res) => {
        try {
            const idUser = req?.user?.id
            const idProduct = req.params?.id
            const data = req.body
            const response: any = await onAddOrder(data, idUser, idProduct);
            return responsHelper(req, res, null, response, 200)
        } catch (error) {
            return responsHelper(req, res, null, error, 400)
        }
    })

//thêm order
route.patch('/update-status-order/:id',
    JWTauthen,
    async (req: any, res) => {
        try {
            const idUser = req?.user?.id
            const idProduct = req.params?.id
            const data = req.body
            const response: any = await onUpdateStatusOrder(data, idUser, idProduct);
            return responsHelper(req, res, null, response, 200)
        } catch (error) {
            return responsHelper(req, res, null, error, 400)
        }
    })



//Xoa order
route.delete('/delete-order-product/:id',
    JWTauthen,
    async (req: any, res) => {
        try {
            const idUser = req?.user?.id
            const { id } = req.params
            const response: any = await onDeleteOrderProduct(id, idUser);
            return responsHelper(req, res, null, response, 200)
        } catch (error) {
            return responsHelper(req, res, null, error, 400)
        }
    })


export default route;