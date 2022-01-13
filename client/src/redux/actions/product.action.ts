import { Dispatch } from 'redux';
import { userType } from '../../interface';
import * as productType from '../contants';
export const getListProduct = (dispatch: Dispatch<any>): Promise<userType> => {
    return new Promise<any>((resolve, reject) => {
        dispatch({
            type: productType.GET_LIST_PRODUCT,
            resolve,
            reject,
        })
    })
}

export const getDetailProduct = (params, dispatch: Dispatch<any>): Promise<userType> => {
    return new Promise<any>((resolve, reject) => {
        dispatch({
            type: productType.GET_DETAIL_PRODUCT,
            params,
            resolve,
            reject,
        })
    })
}

export const doAddProduct = (params, dispatch: Dispatch<any>): Promise<userType> => {
    return new Promise<any>((resolve, reject) => {
        dispatch({
            type: productType.ON_ADD_PRODUCT,
            params,
            resolve,
            reject,
        })
    })
}


export const doBuyProduct = (params, dispatch: Dispatch<any>): Promise<userType> => {
    return new Promise<any>((resolve, reject) => {
        dispatch({
            type: productType.ON_BUY_PRODUCT,
            params,
            resolve,
            reject,
        })
    })
}

export const getListOrderProduct = (dispatch: Dispatch<any>): Promise<userType> => {
    return new Promise<any>((resolve, reject) => {
        dispatch({
            type: productType.GET_LIST_ORDER_PRODUCT,
            resolve,
            reject,
        })
    })
}


export const doDeleteOrderProduct = (params, dispatch: Dispatch<any>): Promise<userType> => {
    return new Promise<any>((resolve, reject) => {
        dispatch({
            type: productType.ON_DELETE_ORDER_PRODUCT,
            params,
            resolve,
            reject,
        })
    })
}

//admin
export const getListAllOrderProduct = (dispatch: Dispatch<any>): Promise<userType> => {
    return new Promise<any>((resolve, reject) => {
        dispatch({
            type: productType.GET_LIST_ALL_ORDER_PRODUCT,
            resolve,
            reject,
        })
    })
}

//admin
export const getCategory = (dispatch: Dispatch<any>): Promise<userType> => {
    return new Promise<any>((resolve, reject) => {
        dispatch({
            type: productType.GET_LIST_CATEGORY,
            resolve,
            reject,
        })
    })
}

//admin
export const onDeleteProduct = (params, dispatch: Dispatch<any>): Promise<userType> => {
    return new Promise<any>((resolve, reject) => {
        dispatch({
            type: productType.ON_DELETE_PRODUCT,
            params,
            resolve,
            reject,
        })
    })
}
