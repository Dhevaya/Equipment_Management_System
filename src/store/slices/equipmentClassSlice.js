import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  selectedItem: null,
  status: "idle",
  error: null,
};

const equipmentClassSlice = createSlice({
  name: "equipmentClass",
  initialState,
  reducers: {},
});

export default equipmentClassSlice.reducer;
