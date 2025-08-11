import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    listCategories:[],
    selectedCategoryId: null
}

const categorySlide = createSlice({
    name: "category",
    initialState,
    reducers: {
        setCategory(state, action) {
            state.listCategories= action.payload
        },
        setSelectedCategoryId(state, action) {
            state.selectedCategoryId = action.payload
        },
        addCategory(state, action){
            state.listCategories.push(action.payload)
        },
        updateCategory(state, action) {
            const {id, product} = action.payload
            const index = state.listCategories.findIndex(p => p.id === id);
            if (index !== -1){
                state.listCategories[index] = {...state.listCategories[index], ...product}
            }
        },
        deleteCategory(state, action) {
            const id = action.payload;
            state.listCategories = state.listCategories.filter (p => p.id !== id);
        }
    }
})

export const {setCategory, setSelectedCategoryId, addCategory, updateCategory, deleteCategory} = categorySlide.actions;

export default categorySlide.reducer