import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const API_BASE = "https://blog-backend-hn49.onrender.com/auth"



export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (authData, thunkAPI) => {
    try {
      const response = await axios.post(`${API_BASE}/register`, authData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(response.data.message);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (authData, thunkAPI) => {
    try {
      const response = await axios.post(`${API_BASE}/login`, authData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      

      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Sunucu Hatası";
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const getUsers = createAsyncThunk("auth/getUsers", async () => {
  try {
    const response = await axios.get(`${API_BASE}`);
    return response.data;
  } catch (error) {
    toast.error(response.data.message);
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
});

const initialState = {
  allUsers: [],
  user: localStorage.getItem("user") || null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState, 
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(getUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.allUsers = action.payload;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;
