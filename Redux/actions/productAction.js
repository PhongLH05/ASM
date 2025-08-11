import axios from "axios";
import {
  addProduct,
  deleteProduct,
  setProduct,
  updateProduct,
} from "../reducer/productReducer";

const apiUrl = "http://192.168.1.99:3001/product";

export const getListProducts = () => async (dispatch) => {
  try {
    const res = await axios.get(apiUrl);
    console.log(res.data);
    dispatch(setProduct(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const addProductAction = (product) => async (dispatch) => {
  try {
    const res = await axios.post(apiUrl, product);
    dispatch(addProduct(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const updateProductAction = (id, product) => async (dispatch) => {
  try {
    const res = await axios.put(`${apiUrl}/${id}`, product);
    dispatch(updateProduct({ id, product: res.data }));
  } catch (error) {
    console.log(error);
  }
};

export const deleteProductAction = (id) => async (dispatch) => {
  try {
    await axios.delete(`${apiUrl}/${id}`);
    dispatch(deleteProduct(id));
  } catch (error) {
    console.log(error);
  }
};

export const getProductsByCategoryAction = (categoryId) => async (dispatch) => {
  try {
    const res = await axios.get(`${apiUrl}?categoryId=${categoryId}`);
    console.log("Products by category:", res.data);
    dispatch(setProduct(res.data));
  } catch (error) {
    console.log(error);
  }
};
