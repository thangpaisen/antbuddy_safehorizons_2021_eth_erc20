import { validate } from 'express-validation';
import express from 'express';
import { responsHelper } from '../../common/responsiveHelper';
import {
    getDetailProduct,
    getLisProduct,
    onAddProduct,
    onDeleteproduct
} from './product.service';
import { VALIDATION_PRODUCT } from './product.validation';
import { JWTauthen } from '../../middleware';
import { ROLE_ADMIN } from '../../common/Enum';
import { ACCESS_ADMIN } from '../../common';

const route = express.Router();

//danh sách All product
route.post('/get-list-product', async (req, res) => {
    try {
        const { page, number } = req.body
        const response: any = await getLisProduct(page, number);
        return responsHelper(req, res, null, response, 200)
    } catch (error) {
        return responsHelper(req, res, null, error, 400)
    }
})

//chi tiết product
route.get('/get-detail-product/:id', async (req, res) => {
    try {
        const { id } = req.params
        const response: any = await getDetailProduct(id);
        return responsHelper(req, res, null, response, 200)
    } catch (error) {
        return responsHelper(req, res, null, error, 400)
    }
})

//thêm product
route.post('/add-product',
    validate(VALIDATION_PRODUCT),
    JWTauthen,
    async (req: any, res) => {
        try {
            let role_id = req?.user?.role?.id
            if (role_id != ROLE_ADMIN)
                return responsHelper(req, res, null, ACCESS_ADMIN, 400)
            const response: any = await onAddProduct(req.body);
            return responsHelper(req, res, null, response, 200)
        } catch (error) {
            return responsHelper(req, res, null, error, 400)
        }
    })

//Xóa product
route.delete('/delete-product/:id',
    async (req, res) => {
        try {
            const { id } = req.params
            const response: any = await onDeleteproduct(id);
            return responsHelper(req, res, null, response, 200)
        } catch (error) {
            return responsHelper(req, res, null, error, 400)
        }
    })


export default route;