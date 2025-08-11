import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    listProducts:[]
}

const productSlide = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProduct(state, action) {
            state.listProducts= action.payload
        },
        addProduct(state, action){
            state.listProducts.push(action.payload)
        },
        updateProduct(state, action) {
            const {id, product} = action.payload
            const index = state.listProducts.findIndex(p => p.id === id);
            if (index !== -1){
                state.listProducts[index] = {...state.listProducts[index], ...product}
            }
        },
        deleteProduct(state, action) {
            const id = action.payload;
            state.listProducts = state.listProducts.filter (p => p.id !== id);
        }
    }
})

export const {setProduct, addProduct, updateProduct, deleteProduct} = productSlide.actions;

export default productSlide.reducer