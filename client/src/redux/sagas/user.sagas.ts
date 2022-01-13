import { put, takeLatest } from "redux-saga/effects"
import Api from "../../config/Api"
import { STATUS } from "../../enum"
import * as usersType from '../contants'

function* onGetListUser(actions) {
    try {
        let params = actions?.params
        const response = yield Api.get('user/get-list-user', params)
        const statusRes = response?.status
        const data = response?.data?.data
        if (statusRes === STATUS && data) {
            yield put({
                type: usersType.GET_LIST_CUSTOMERS_SUCCEESS,
                payload: data
            })
            actions.resolve(true)
        } else {
            actions.resolve(false)
        }
    } catch (error) {
        actions.resolve(false)
    }
}

function* onDeleteUser(actions) {
    try {
        let params = actions?.params
        const response = yield Api.delete(`/user/delete-user/${params?.id}`)
        const statusRes = response?.status
        const status = response?.data?.data?.status
        const messenger = response?.data?.data?.messenger
        if (statusRes === STATUS && messenger) {
            actions.resolve({
                status,
                messenger
            })
        } else {
            actions.resolve({
                status: false,
                messenger: ''
            })
        }
    } catch (error:any) {
        actions.resolve({
            status: false,
            messenger: error.response?.data.message
        })
    }
}


function* customerSagas() {
    yield takeLatest(usersType.GET_LIST_CUSTOMERS, onGetListUser)
    yield takeLatest(usersType.ON_DELETE_CUSTOMERS, onDeleteUser)
}
export default customerSagas