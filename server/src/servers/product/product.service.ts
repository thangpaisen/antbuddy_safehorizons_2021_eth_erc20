import { getRepository } from 'typeorm';
import {
    CREATE_FAIL,
    CREATE_SUCCESS,
    DELETE_FAIL,
    DELETE_SUCCESS,
    ERR_NOT_FIND
} from '../../common';
import { ProductEntity } from './product.entity';
import { productType } from './product.interface'

export const getLisProduct = async (page: number = 0, number: number = 10) => {
    const ProductRespository: any = await getRepository(ProductEntity);
    try {
        let [result, total] = await ProductRespository.findAndCount({
            take: number,
            skip: page * 10
        });
        if (result) {
            return {
                data: result,
                count: total
            }
        } else {
            return {
                data: [],
                count: 0
            }
        }
    } catch (error) {
        return {
            data: [],
            count: 0
        }
    }
}

export const getDetailProduct = async (id: string) => {
    const ProductRespository: any = await getRepository(ProductEntity);
    try {
        let response = await ProductRespository.findOne({
            where: {
                id
            },
            relations: ["categories_id"]
        });
        if (response) {
            response = { ...response }
            return response
        } else {
            return []
        }
    } catch (error) {
        return ERR_NOT_FIND
    }
}
export const onAddProduct = async (data: productType) => {
    const ProductRespository: any = await getRepository(ProductEntity);
    try {
        const response = await ProductRespository.create(data);
        await ProductRespository.save(response);
        return {
            status: true,
            messenger: CREATE_SUCCESS
        }
    } catch (error) {
        return {
            status: false,
            messenger: CREATE_FAIL
        }
    }
}
//Xóa user by id user
export const onDeleteproduct = async (id: string) => {
    const ProductRespository: any = await getRepository(ProductEntity);
    try {
        let response: any = await ProductRespository.findOne({
            where: {
                id
            }
        });
        if (response) {
            await ProductRespository.remove(response);
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
            messenger: ERR_NOT_FIND
        }
    }
}