import * as types from '../contants';
import { ToastContainer, toast } from 'react-toastify';
const initialState = {
    token: {},
};

const index = (state = initialState, action) => {
    switch (action.type) {
        case types.TOKEN:
            let token = action.payload
            localStorage.setItem('USER', token);
            return {
                token
            }
        case types.LOGOUT_SUCCESS:
            localStorage.removeItem('USER');
            return {
                token: {}
            }
        default:
            return state;
    }
}
export default index