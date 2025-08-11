import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../reducer/productReducer"
import authReducer from "../reducer/authReducer"
import categoryReducer from "../reducer/categoryReducer"

const store = configureStore({
    reducer: {
        product: productReducer,
        auth: authReducer,
        category: categoryReducer
    }
})

export default store