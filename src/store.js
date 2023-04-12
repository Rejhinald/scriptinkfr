import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productDetailsReducer, productDeleteReducer, productEditReducer } from './Reducers/productReducers'
import { genreListReducer, genreProductsReducer } from './Reducers/genreReducers'
import { tierListReducer, tierProductsReducer } from './Reducers/tierReducers'
import { userLoginReducer, userUpdateReducer, userPaymentReducer, cancelSubscriptionReducer, userDetailsReducer, UserListReducer } from './Reducers/accountReducers'

const reducer = combineReducers({
    productList: productListReducer,
    tierList: tierListReducer,
    tierProducts: tierProductsReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productEdit: productEditReducer,
    genreProducts: genreProductsReducer,
    genreList: genreListReducer,
    userLogin: userLoginReducer,
    userUpdate: userUpdateReducer,
    userPayment: userPaymentReducer,
    cancelSubscription: cancelSubscriptionReducer,
    userDetails: userDetailsReducer,
    userList : UserListReducer,

})

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
    userLogin: {userInfo: userInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
