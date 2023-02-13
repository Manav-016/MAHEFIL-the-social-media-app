import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      (state.user = action.payload.user), (state.token = action.payload.token);
    },
    setLogout: (state) => {
      (state.user = null), (state.token = null);
    },
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setFriends: (state) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("USER FRIENDS DO NOT EXISTS");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPost = state.posts.map((post) => {
        if (post._id === action.payload.post._id) {
          return action.payload.post;
        }
        return post;
      });
      state.posts = updatedPost;
    },
  },
});

export const { setLogin, setLogout, setMode, setFriends, setPosts, setPost } =
  authSlice.actions;

export default authSlice.reducer;
