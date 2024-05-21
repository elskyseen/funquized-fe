import { createSlice } from "@reduxjs/toolkit";
import { ITokenSlice } from "../interfaces";

const initialState: ITokenSlice = {
  token: "",
};

const token = createSlice({
  name: "token-counter",
  initialState,
  reducers: {
    setToken: (state, actions) => {
      state.token = actions.payload;
    },
  },
});

export const { setToken } = token.actions;
export default token.reducer;
