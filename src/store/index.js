import { configureStore } from "@reduxjs/toolkit";
import hierarchyReducer from "./slices/hierarchySlice";
import equipmentClassReducer from "./slices/equipmentClassSlice";
import propertiesReducer from "./slices/propertiesSlice";

const store = configureStore({
  reducer: {
    hierarchy: hierarchyReducer,
    equipmentClass: equipmentClassReducer,
    properties: propertiesReducer,
  },
});

export default store;
