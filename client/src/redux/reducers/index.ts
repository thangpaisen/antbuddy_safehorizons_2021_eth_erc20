import { combineReducers } from 'redux'
import customereducers from './user.reducers'
import authReducers from './auth.reducer'
import productReducers from './product.reducers'
export type AppState = {
    customer,
    auth,
    product
}
const rootReducer = combineReducers<AppState>({
    customer: customereducers,
    auth: authReducers,
    product: productReducers
})
export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;
