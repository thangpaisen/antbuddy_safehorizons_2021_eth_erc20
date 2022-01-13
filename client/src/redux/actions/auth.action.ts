import { Dispatch } from 'redux';
import { userType } from '../../interface';
import * as authTypes from '../contants';
export const onLogin = (params: userType, dispatch: Dispatch<any>): Promise<userType> => {
    return new Promise<any>((resolve, reject) => {
        dispatch({
            type: authTypes.LOGIN,
            params,
            resolve,
            reject,
        })
    })
}

export const onRegister = (params, dispatch: Dispatch<any>): Promise<userType> => {
    return new Promise((resolve, reject) => {
        dispatch({
            type: authTypes.REGISTER,
            params,
            resolve,
            reject,
        })
    })
}
export const onLogout = (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({
            type: authTypes.LOGOUT_REQUEST,
            resolve,
            reject,
        })
    })
}