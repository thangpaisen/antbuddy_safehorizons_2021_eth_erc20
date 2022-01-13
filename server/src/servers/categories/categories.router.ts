import { validate } from 'express-validation';
import express from 'express';
import { responsHelper } from '../../common/responsiveHelper';
import { getListCategory } from './categories.service';

const route = express.Router();

//danh sách All category
route.get('/get-category',
    async (req: any, res) => {
        try {
            const response: any = await getListCategory();
            return responsHelper(req, res, null, response, 200)
        } catch (error) {
            return responsHelper(req, res, null, error, 400)
        }
    })


export default route;

