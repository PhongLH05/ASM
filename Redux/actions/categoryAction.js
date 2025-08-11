import axios from "axios";
import {
  addCategory,
  deleteCategory,
  setCategory,
  setSelectedCategoryId,
  updateCategory,
} from "../reducer/categoryReducer";

const apiUrl = "http://192.168.1.99:3001/category";

export const getListCategories = () => async (dispatch) => {
  try {
    const res = await axios.get(apiUrl);
    console.log(res.data);
    dispatch(setCategory(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const addCategoryAction = (product) => async (dispatch) => {
  try {
    const res = await axios.post(apiUrl, product);
    dispatch(addCategory(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const updateCategoryAction = (id, product) => async (dispatch) => {
  try {
    const res = await axios.put(`${apiUrl}/${id}`, product);
    dispatch(updateCategory({ id, product: res.data }));
  } catch (error) {
    console.log(error);
  }
};

export const deleteCategoryAction = (id) => async (dispatch) => {
  try {
    await axios.delete(`${apiUrl}/${id}`);
    dispatch(deleteCategory(id));
  } catch (error) {
    console.log(error);
  }
};

export const setSelectedCategoryIdAction = (categoryId) => (dispatch) => {
  dispatch(setSelectedCategoryId(categoryId));
};