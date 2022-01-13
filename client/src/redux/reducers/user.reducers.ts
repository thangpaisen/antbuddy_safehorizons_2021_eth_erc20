import * as types from '../contants';
import { ToastContainer, toast } from 'react-toastify';
const initialState = {
    ListAllCustomer: {},
    DetailCustomer:{}
};
export interface SuccessAction<T> {
    type: string,
    payload: {
    }
}
export interface userType {

}

export interface ErrorAction {
    type: string,
    payload: any
}

export type UserReducePayload = {

}
export type userAction = SuccessAction<UserReducePayload> | ErrorAction
    | SuccessAction<undefined>
export type UserReduceAction = SuccessAction<UserReducePayload> | ErrorAction

const customereducers = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_LIST_CUSTOMERS_SUCCEESS:
            action = <SuccessAction<any>>action
            return {
                ListAllCustomer: action?.payload
            }
        case types.GET_DETAIL_CUSTOMERS_SUCCESS:
            action = <SuccessAction<any>>action
            return {
                DetailCustomer: action?.payload
            }
        default:
            return state;
    }
}
export default customereducers