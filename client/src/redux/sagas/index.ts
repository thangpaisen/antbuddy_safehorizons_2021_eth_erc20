import { all, fork } from 'redux-saga/effects';
import userSagas from './user.sagas';
import authSagas from './auth.sagas';
import productSagas from './product.sagas';
export default function* index() {
    yield all([
        fork(userSagas),
        fork(authSagas),
        fork(productSagas)
    ])
}