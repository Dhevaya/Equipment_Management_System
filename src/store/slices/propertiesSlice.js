import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProperties,
  createProperty,
  updateProperty,
  deleteProperty,
} from "../../api/propertiesApi";

// Thunk: fetch properties for a selected equipment class
export const fetchProperties = createAsyncThunk(
  "properties/fetchProperties",
  async (equipmentClassAutoId, { rejectWithValue }) => {
    try {
      const response = await getProperties(equipmentClassAutoId);
      return response.data.map((comment) => ({
        autoId: comment.id,
        id: comment.email,
        description: comment.name,
        value: comment.id,
        uom: "unit",
        equipmentClassAutoId: comment.postId,
        effectiveStartDate: null,
        effectiveEndDate: null,
      }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk: create a new property
export const addProperty = createAsyncThunk(
  "properties/addProperty",
  async (data, { rejectWithValue }) => {
    try {
      const payload = {
        ...data,
        autoId: 0,
        effectiveStartDate: new Date().toISOString(),
      };
      const response = await createProperty(payload);
      return {
        autoId: response.data.id,
        id: payload.id,
        description: payload.description,
        value: payload.value,
        uom: payload.uom,
        equipmentClassAutoId: payload.equipmentClassAutoId,
        effectiveStartDate: payload.effectiveStartDate,
        effectiveEndDate: payload.effectiveEndDate ?? null,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk: update an existing property
export const editProperty = createAsyncThunk(
  "properties/editProperty",
  async (data, { rejectWithValue }) => {
    try {
      await updateProperty(data.autoId, data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk: delete a property
export const removeProperty = createAsyncThunk(
  "properties/removeProperty",
  async (autoId, { rejectWithValue }) => {
    try {
      await deleteProperty(autoId);
      return autoId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

const propertiesSlice = createSlice({
  name: "properties",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchProperties
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // addProperty
    builder
      .addCase(addProperty.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addProperty.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.push(action.payload);
      })
      .addCase(addProperty.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // editProperty
    builder
      .addCase(editProperty.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(editProperty.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.items.findIndex(
          (item) => item.autoId === action.payload.autoId
        );
        if (index !== -1) {
          state.items[index] = {
            ...state.items[index],
            description: action.payload.description,
            value: action.payload.value,
            uom: action.payload.uom,
            effectiveEndDate: action.payload.effectiveEndDate,
          };
        }
      })
      .addCase(editProperty.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // removeProperty
    builder
      .addCase(removeProperty.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(removeProperty.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = state.items.filter(
          (item) => item.autoId !== action.payload
        );
      })
      .addCase(removeProperty.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default propertiesSlice.reducer;
