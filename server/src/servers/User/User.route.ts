import { UserType } from './User.interface';
import { validate } from 'express-validation';
import express from 'express';
import { responsHelper } from '../../common/responsiveHelper';
import {
    VALIDATION_USER,
    VALIDATION_update_CUSTOMER
} from './User.validation';
const route = express.Router();
import {
    getListUser,
    onRegister,
    onDeleteUser,
    onUpdateUser,
    getDetailUser,
    onLogin
} from './User.service'

//danh sách All user
route.get('/get-list-user', async (req, res) => {
    try {
        const { page, number } = req.body
        const response: any = await getListUser(page, number);
        return responsHelper(req, res, null, response, 200)
    } catch (error) {
        return responsHelper(req, res, null, error, 400)
    }
})

//chi tiết user
route.get('/get-detail-user/:id', async (req, res) => {
    try {
        const { id } = req.params
        const response: any = await getDetailUser(id);
        return responsHelper(req, res, null, response, 200)
    } catch (error) {
        return responsHelper(req, res, null, error, 400)
    }
})

//thêm user
route.post('/register',
    validate(VALIDATION_USER),
    async (req, res) => {
        try {
            const response: any = await onRegister(req.body);
            return responsHelper(req, res, null, response, 200)
        } catch (error) {
            return responsHelper(req, res, null, error, 400)
        }
    })

//thêm user
route.post('/login',
    validate(VALIDATION_USER),
    async (req, res) => {
        try {
            const response: any = await onLogin(req.body);
            return responsHelper(req, res, null, response, 200)
        } catch (error) {
            return responsHelper(req, res, null, error, 400)
        }
    })


//Xóa user by id user
route.delete('/delete-user/:id',
    async (req, res) => {
        try {
            const { id } = req.params
            const response: any = await onDeleteUser(id);
            return responsHelper(req, res, null, response, 200)
        } catch (error) {
            return responsHelper(req, res, null, error, 400)
        }
    })

//cập nhật user by id user
route.patch('/update-customer/:id',
    validate(VALIDATION_update_CUSTOMER),
    async (req, res) => {
        try {
            const { id } = req.params
            const data: UserType = req.body
            const response: any = await onUpdateUser(id, data);
            return responsHelper(req, res, null, response, 200)
        } catch (error) {
            return responsHelper(req, res, null, error, 400)
        }
    })


export default route;