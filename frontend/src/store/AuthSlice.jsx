import {
  createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";

export const userLogin = createAsyncThunk("user/userLogin", async (data, {rejectWithValue}) => {
  console.log(data);
  try {
    const response = await axios.post(`http://localhost:8000/auth/login`, data);
    localStorage.setItem("isAuthenticate", true);

    return response.data;
  } catch (err) {
    throw rejectWithValue(err.response.data.message)
  }
});

export const signout = () => {
  return async (dispatch) => {
    localStorage.clear();
    dispatch(userLoggedOut());
  };
};

export const userLoggedOut = createAction("SOME_ACTION_TYPE");

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    authenticate: false,
    status: "idle",
    message: "",
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(userLogin.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
        state.authenticate = true;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.status = "rejected";
        state.message = action.payload
      })
      .addCase(userLoggedOut, (state, action) => {
        state.authenticate = false;
        // return initialState
        // ...initState
      });
  }
});

export const getAuth = (state) => state.auth;
export default AuthSlice.reducer;
