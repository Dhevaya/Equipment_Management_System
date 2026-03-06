/**
 * Equipment Class Redux Slice
 * Handles CRUD state management for Equipment Classes.
 * Uses Redux Toolkit async thunks to communicate with API layer.
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getEquipmentClasses,
  createEquipmentClass,
  updateEquipmentClass,
  deleteEquipmentClass,
} from "../../api/equipmentClassApi";

// Thunk: fetch all equipment classes
export const fetchEquipmentClasses = createAsyncThunk(
  "equipmentClass/fetchEquipmentClasses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getEquipmentClasses();
      return response.data.map((post) => ({
        autoId: post.id,
        
        id: `EQUIP${String(post.id).padStart(3, "0")}`,
        description: post.title,
        effectiveStartDate: null,
        effectiveEndDate: null,
        isActive: true,
      }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk: create a new equipment class
export const addEquipmentClass = createAsyncThunk(
  "equipmentClass/addEquipmentClass",
  async (data, { rejectWithValue }) => {
    try {
      const payload = {
        ...data,
        autoId: 0,
        effectiveStartDate:
          data.effectiveStartDate || new Date().toISOString(),
      };
      const response = await createEquipmentClass(payload);
      return {
        autoId: response.data.id,
        id: payload.id,
        description: payload.description,
        effectiveStartDate: payload.effectiveStartDate,
        effectiveEndDate: payload.effectiveEndDate ?? null,
        isActive: payload.isActive ?? true,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk: update an existing equipment class
export const editEquipmentClass = createAsyncThunk(
  "equipmentClass/editEquipmentClass",
  async (data, { rejectWithValue }) => {
    try {
      await updateEquipmentClass(data.autoId, data);
      return data;
    } catch (error) {
      const isExpectedMockApiUpdateFailure =
        error?.response?.status === 500 && Number(data?.autoId) > 100;

      // JSONPlaceholder does not persist newly created records.
      // For mock-created IDs, keep UX smooth by applying local update.
      if (isExpectedMockApiUpdateFailure) {
        return data;
      }

      return rejectWithValue(error.message);
    }
  }
);

// Thunk: delete an equipment class
export const removeEquipmentClass = createAsyncThunk(
  "equipmentClass/removeEquipmentClass",
  async (autoId, { rejectWithValue }) => {
    try {
      await deleteEquipmentClass(autoId);
      return autoId;
    } catch (error) {
      const isExpectedMockApiDeleteFailure =
        error?.response?.status === 500 && Number(autoId) > 100;

      // JSONPlaceholder cannot delete mock-created IDs server-side.
      // Keep state consistent by treating this as a local success.
      if (isExpectedMockApiDeleteFailure) {
        return autoId;
      }

      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  selectedItem: null,
  status: "idle",
  error: null,
};

const equipmentClassSlice = createSlice({
  name: "equipmentClass",
  initialState,
  reducers: {
    setSelectedEquipmentClass: (state, action) => {
      state.selectedItem = action.payload;
    },
  },
  extraReducers: (builder) => {
    // fetchEquipmentClasses
    builder
      .addCase(fetchEquipmentClasses.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchEquipmentClasses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchEquipmentClasses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // addEquipmentClass
    builder
      .addCase(addEquipmentClass.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addEquipmentClass.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.push(action.payload);
      })
      .addCase(addEquipmentClass.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // editEquipmentClass
    builder
      .addCase(editEquipmentClass.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(editEquipmentClass.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.items.findIndex(
          (item) => item.autoId === action.payload.autoId
        );
        if (index !== -1) {
          state.items[index] = {
            ...state.items[index],
            description: action.payload.description,
            effectiveStartDate: action.payload.effectiveStartDate,
            effectiveEndDate: action.payload.effectiveEndDate,
            isActive: action.payload.isActive,
          };
        }
      })
      .addCase(editEquipmentClass.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // removeEquipmentClass
    builder
      .addCase(removeEquipmentClass.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(removeEquipmentClass.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = state.items.filter(
          (item) => item.autoId !== action.payload
        );
        if (state.selectedItem && state.selectedItem.autoId === action.payload) {
          state.selectedItem = null;
        }
      })
      .addCase(removeEquipmentClass.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setSelectedEquipmentClass } = equipmentClassSlice.actions;
export default equipmentClassSlice.reducer;
