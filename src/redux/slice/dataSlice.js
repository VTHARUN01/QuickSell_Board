import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    updateData: (state, action) => {
      state.data = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateData } = dataSlice.actions;

export default dataSlice.reducer;
