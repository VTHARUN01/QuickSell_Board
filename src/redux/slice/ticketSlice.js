import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tickets: [],
};

export const ticketSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    InitalizeTickets: (state, action) => {
      state.tickets = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { InitalizeTickets } = ticketSlice.actions;

export default ticketSlice.reducer;
