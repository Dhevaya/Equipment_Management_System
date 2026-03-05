import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

const propertiesSlice = createSlice({
  name: "properties",
  initialState,
  reducers: {},
});

export default propertiesSlice.reducer;
