import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  board: [],
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    updateBoard: (state, action) => {
      state.board = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateBoard } = boardSlice.actions;

export default boardSlice.reducer;
