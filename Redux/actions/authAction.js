import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API base URL
const API_URL = 'http://192.168.1.99:3001';

// Login action
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/user?email=${email}&password=${password}`);
      
      if (response.data && response.data.length > 0) {
        const user = response.data[0];
        return {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          },
          token: `token_${user.id}_${Date.now()}` // Simple token generation
        };
      } else {
        return rejectWithValue('Email hoặc mật khẩu không đúng');
      }
    } catch (error) {
      return rejectWithValue('Lỗi kết nối server');
    }
  }
);

// Logout action
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async () => {
    // Clear any stored tokens here if needed
    return null;
  }
);

// Check auth status action
export const checkAuthStatus = createAsyncThunk(
  'auth/checkStatus',
  async (_, { getState }) => {
    const { auth } = getState();
    if (auth.token && auth.user) {
      return { user: auth.user, token: auth.token };
    }
    return null;
  }
);

// Register action
export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      // Kiểm tra email đã tồn tại chưa
      const checkResponse = await axios.get(`${API_URL}/user?email=${email}`);
      
      if (checkResponse.data && checkResponse.data.length > 0) {
        return rejectWithValue('Email đã tồn tại trong hệ thống');
      }

      // Tạo user mới
      const newUser = {
        name,
        email,
        password,
        role: 'user' // Mặc định role là user
      };

      const response = await axios.post(`${API_URL}/user`, newUser);
      
      if (response.data) {
        return {
          user: {
            id: response.data.id,
            name: response.data.name,
            email: response.data.email,
            role: response.data.role
          },
          message: 'Đăng ký thành công!'
        };
      } else {
        return rejectWithValue('Có lỗi xảy ra khi đăng ký');
      }
    } catch (error) {
      return rejectWithValue('Lỗi kết nối server');
    }
  }
);
