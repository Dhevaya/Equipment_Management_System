import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enterprise: {
    level: "Enterprise",
    autoId: 1,
    id: "OpteBizEnterprise",
    description: "LeanQubit formally known as OpteBiz",
    effectiveStartDate: "2023-09-20T06:32:38.487-04:00",
    effectiveEndDate: null,
  },
  site: {
    level: "Site",
    autoId: 2,
    id: "SiteMumbai",
    description: "Mumbai Operations Site",
    effectiveStartDate: "2023-09-20T06:32:38.487-04:00",
    effectiveEndDate: null,
  },
  area: {
    level: "Area",
    autoId: 3,
    id: "Bicycle",
    description: "Bicycle Manufacturing Area",
    effectiveStartDate: "2023-09-20T06:32:38.487-04:00",
    effectiveEndDate: null,
  },
};

const hierarchySlice = createSlice({
  name: "hierarchy",
  initialState,
  reducers: {},
});

export default hierarchySlice.reducer;
