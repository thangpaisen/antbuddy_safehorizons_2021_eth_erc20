import { delay, put, takeLatest } from 'redux-saga/effects';
import Api from '../../config/Api';
import axios from 'axios';
import { BASE_URL } from '../../utils/configs';
import * as authTypes from '../contants';
import { STATUS } from '../../enum';
import { userType } from '../../interface';

function* doLogin(action) {
    try {
        const params: userType = action.params;
        yield delay(150);
        const response = yield Api.post(BASE_URL + 'user/login', params);
        const status_code = response?.status;
        const resStatus = response?.data?.data?.status;
        const messenger = response?.data?.data?.messenger;
        const userInfor = response?.data?.data?.userInfor;
        if (status_code == STATUS && messenger) {
            yield put({
                type: authTypes.TOKEN,
                payload: userInfor?.token,
            });
            action?.resolve({
                status: resStatus,
                messenger: messenger,
                userInfor
            });
        } else {
            action?.resolve({
                status: false,
                messenger: 'wrong something!!!',
                userInfor: {}
            });
        }
    } catch (e) {
        action?.resolve({
            status: false,
            messenger: 'wrong something!!!',
            userInfor: {}
        });
    }
}
export function* doLogout(action: any) {
    try {
        yield put({
            type: authTypes.LOGOUT_SUCCESS,
            payload: {},
        });
        action?.resolve(true);
    } catch (e) {
        action?.resolve(false);
    }
}
function* doRegister(action) {
    try {
        const params = action?.params;
        let response = yield axios.post(BASE_URL + 'user/register', params);
        const status_code = response?.status;
        const resStatus = response?.data?.data?.status;
        const messenger = response?.data?.data?.messenger;
        if (status_code == STATUS && messenger) {
            action?.resolve({
                status: resStatus,
                messenger
            });
        } else {
            action?.resolve({
                status: false,
                messenger: 'wrong something!!!'
            });
        }
    } catch (e: any) {
        action?.resolve({
            status: false,
            message: ''
        });
    }
}


function* authSaga() {
    yield takeLatest(authTypes.LOGIN, doLogin);
    yield takeLatest(authTypes.LOGOUT_REQUEST, doLogout);
    yield takeLatest(authTypes.REGISTER, doRegister);
}

export default authSaga