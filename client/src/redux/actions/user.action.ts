import * as customersType from '../contants'


export const getListCustomer = (params, dispatch) => {
    return new Promise((resolve, reject) => {
        return dispatch({
            type: customersType.GET_LIST_CUSTOMERS,
            params,
            resolve,
            reject
        })
    })
}

export const onAddCustomer = (params, dispatch) => {
    return new Promise((resolve, reject) => {
        return dispatch({
            type: customersType.ON_ADD_CUSTOMERS,
            params,
            resolve,
            reject
        })
    })
}

export const onDeleteCustomer = (params, dispatch) => {
    return new Promise((resolve, reject) => {
        return dispatch({
            type: customersType.ON_DELETE_CUSTOMERS,
            params,
            resolve,
            reject
        })
    })
}

export const onUpdateCustomer = (params, dispatch) => {
    return new Promise((resolve, reject) => {
        return dispatch({
            type: customersType.ON_UPDATE_CUSTOMERS,
            params,
            resolve,
            reject
        })
    })
}

export const getDetailCustomer = (params, dispatch) => {
    return new Promise((resolve, reject) => {
        return dispatch({
            type: customersType.GET_DETAIL_CUSTOMERS,
            params,
            resolve,
            reject
        })
    })
}