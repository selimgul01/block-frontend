import { toast } from "react-hot-toast";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = "https://blog-backend-hn49.onrender.com/post";

export const getAllPosts = createAsyncThunk("getPosts", async (tags, thunkAPI) => {
  try {
    const url = tags ? `${API_BASE}?tags=${tags}`: API_BASE

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const getMyPosts = createAsyncThunk("getMyPosts", async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_BASE}/my-posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }, 
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const getPostById = createAsyncThunk(
  "getPostById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${API_BASE}/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const createPost = createAsyncThunk(
  "createPost",
  async (data, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(API_BASE, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Post oluşturuldu");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const deletePost = createAsyncThunk(
  "deletePost",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`${API_BASE}/${id}`);
      toast.success("Post Silindi");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const updatePost = createAsyncThunk(
  "updatePost",
  async ({ data, id }, thunkAPI) => {
    try {
      const response = await axios.put(`${API_BASE}/${id}`, data);
      toast.success("Post Güncellendi");
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  posts: [],
  myPosts: [],
  singlePost: null,
  loading: false,
  error: null,
  editPost: null,
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllPosts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    });
    builder.addCase(getAllPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //////////////

    builder.addCase(getMyPosts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getMyPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.myPosts = action.payload;
    });
    builder.addCase(getMyPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //////////////

    builder.addCase(getPostById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getPostById.fulfilled, (state, action) => {
      state.loading = false;
      state.singlePost = action.payload;
    });
    builder.addCase(getPostById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //////////////

    builder.addCase(createPost.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.loading = false;
      const createdPost = action.payload.savedPost;
      const user = JSON.parse(localStorage.getItem("user"))
      if (user._id === action.payload.savedPost.user) {
        state.myPosts.unshift(createdPost)
      }
        
      state.posts.unshift(createdPost);
    });
    builder.addCase(createPost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //////////////

    builder.addCase(updatePost.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      state.loading = false;
      const currentPost = action.payload.updatePost;

      state.posts = state.posts.map((post) =>
        post._id === updatePost._id ? currentPost : post
      );
      state.singlePost =
        state.singlePost && state.singlePost._id === currentPost._id
          ? currentPost
          : state.singlePost;
    });
    builder.addCase(updatePost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //////////////

    builder.addCase(deletePost.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.posts = state.posts.filter(
        (post) => post._id !== action.payload._id
      );
      state.myPosts = state.myPosts.filter((post)=> post._id !== action.payload._id )
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default postSlice.reducer;
