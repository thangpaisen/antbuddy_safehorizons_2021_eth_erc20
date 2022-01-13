import * as productType from '../contants';
const initialState = {
    ListProduct: [],
    totalProduct: 0,
    ListOrderProduct: [],
    totalOrderProduct: 0,
    detailProduct: {},
    ListAllOrderProduct: [],
    totalAllOrderProduct: 0,
    listCategories: []
};

const index = (state = initialState, action) => {
    switch (action.type) {
        case productType.GET_LIST_PRODUCT_SUCCESS:
            let { data, count } = action?.payload
            return {
                ...state,
                ListProduct: data,
                totalProduct: count
            }
        case productType.GET_DETAIL_PRODUCT_SUCCESS:
            return {
                ...state,
                detailProduct: action?.payload
            }
        case productType.GET_LIST_ORDER_SUCCESS:
            let { res, count: total } = action?.payload
            return {
                ...state,
                ListOrderProduct: res,
                totalOrderProduct: Number(total)
            }
        case productType.GET_LIST_ALL_ORDER_SUCCESS:
            return {
                ...state,
                ListAllOrderProduct: action?.payload?.res,
                totalAllOrderProduct: action?.payload?.count
            }
        case productType.GET_LIST_CATEGORY_SUCCESS:
            return {
                ...state,
                listCategories: action?.payload
            }
        default:
            return state;
    }
}
export default index