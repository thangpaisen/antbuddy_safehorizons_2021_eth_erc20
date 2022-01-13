import { ON_DELETE_ORDER_PRODUCT } from './../contants/product.contants';
import { put, takeLatest } from "redux-saga/effects";
import Api from "../../config/Api";
import { STATUS } from "../../enum";
import { BASE_URL } from "../../utils/configs";
import * as productType from '../contants';
function* getListProduct(action) {
    try {
        const response = yield Api.post(BASE_URL + 'product/get-list-product');
        const status_code = response?.status;
        const data = response?.data?.data;
        if (status_code == STATUS && data) {
            yield put({
                type: productType.GET_LIST_PRODUCT_SUCCESS,
                payload: data,
            });
            action?.resolve(true);
        } else {
            action?.resolve(false);
        }
    } catch (e) {
        action?.resolve(false);
    }
}

function* doDetailProduct(action) {
    try {
        const params = action?.params
        const response = yield Api.get(BASE_URL + `product/get-detail-product/${params?.id}`);
        const status_code = response?.status;
        const data = response?.data?.data;
        if (status_code == STATUS && data) {
            yield put({
                type: productType.GET_DETAIL_PRODUCT_SUCCESS,
                payload: data,
            });
            action?.resolve(true);
        } else {
            action?.resolve(false);
        }
    } catch (e) {
        action?.resolve(false);
    }
}

function* getListOrderProduct(action) {
    try {
        const response = yield Api.get(BASE_URL + 'order/get-list-order-by-user');
        const status_code = response?.status;
        const data = response?.data?.data;
        if (status_code == STATUS && data) {
            yield put({
                type: productType.GET_LIST_ORDER_SUCCESS,
                payload: data,
            });
            action?.resolve(data);
        } else {
            action?.resolve(false);
        }
    } catch (e) {
        action?.resolve(false);
    }
}
function* doBuyOrderProduct(action) {
    try {
        const params = action?.params
        const response = yield Api.post(BASE_URL + `order/add-order/${params?.id}`, {
            quantity: params?.quantity
        });
        console.log(response)
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
                messenger
            });
        }
    } catch (e) {
        action?.resolve(false);
    }
}
function* doAddProduct(action) {
    try {
        const params = action?.params
        console.log(params)
        const response = yield Api.post(BASE_URL + 'product/add-product', params);

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
                messenger
            });
        }
    } catch (e) {
        action?.resolve(false);
    }
}

function* doDeleteOrderProduct(action) {
    try {
        const params = action?.params
        const response = yield Api.delete(BASE_URL + `order/delete-order-product/${params?.id}`);
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
                messenger: ""
            });
        }
    } catch (e) {
        action?.resolve(false);
    }
}
function* doDeleteProduct(action) {
    try {
        const params = action?.params
        const response = yield Api.delete(BASE_URL + `product/delete-product/${params?.id}`);
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
                messenger: ""
            });
        }
    } catch (e) {
        action?.resolve(false);
    }
}

//admin
function* getListAllOrderProduct(action) {
    try {
        const response = yield Api.get(BASE_URL + 'order/get-list-order-by-admin');
        const status_code = response?.status;
        const data = response?.data?.data;
        if (status_code == STATUS && data) {
            yield put({
                type: productType.GET_LIST_ALL_ORDER_SUCCESS,
                payload: data,
            });
            action?.resolve(data);
        } else {
            action?.resolve(false);
        }
    } catch (e) {
        action?.resolve(false);
    }
}


function* getListCategory(action) {
    try {
        const response = yield Api.get(BASE_URL + 'categories/get-category');
        const status_code = response?.status;
        const data = response?.data?.data;
        if (status_code == STATUS && data) {
            yield put({
                type: productType.GET_LIST_CATEGORY_SUCCESS,
                payload: data,
            });
            action?.resolve(true);
        } else {
            action?.resolve(false);
        }
    } catch (e) {
        action?.resolve(false);
    }
}
function* productSagas() {
    //order
    yield takeLatest(productType.GET_LIST_ORDER_PRODUCT, getListOrderProduct);
    yield takeLatest(productType.ON_DELETE_ORDER_PRODUCT, doDeleteOrderProduct);


    //product
    yield takeLatest(productType.GET_LIST_PRODUCT, getListProduct);
    yield takeLatest(productType.ON_BUY_PRODUCT, doBuyOrderProduct);
    yield takeLatest(productType.GET_DETAIL_PRODUCT, doDetailProduct);
    yield takeLatest(productType.ON_ADD_PRODUCT, doAddProduct);
    yield takeLatest(productType.ON_DELETE_PRODUCT, doDeleteProduct);

    //admin
    yield takeLatest(productType.GET_LIST_ALL_ORDER_PRODUCT, getListAllOrderProduct);

    //category
    yield takeLatest(productType.GET_LIST_CATEGORY, getListCategory);
}

export default productSagas