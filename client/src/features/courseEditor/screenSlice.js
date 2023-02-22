import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import screenService from "../courseEditor/screenService";
import { toast } from "react-toastify";

const initialState = {
  screen: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getScreen = createAsyncThunk("getScreen", async (screenId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.account.token;
    return screenService.getScreen(screenId, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const createScreen = createAsyncThunk("/createScreen", async (screenData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.account.token;
    return screenService.createScreen(screenData, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const setTextField = createAsyncThunk("/setTextField", async (screenData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.account.token;
    return screenService.setTextField(screenData, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const setH5P = createAsyncThunk("/setH5P", async (screenData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.account.token;
    return screenService.setH5P(screenData, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const setPicture = createAsyncThunk("/setPicture", async (screenData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.account.token;
    return screenService.setPicture(screenData, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateScreen = createAsyncThunk("/updateScreen", async (screenData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.account.token;
    return screenService.updateScreen(screenData, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateTextField = (updateData) => {
  const { screen, elementId, text } = updateData;
  const updatedElements = screen.elements.map((element) => {
    if (element._id === elementId) {
      return { ...element, text };
    }
    return element;
  });
  const updatedScreen = { ...screen, elements: updatedElements };
  return {
    type: "screenEditor/updateScreen",
    payload: updatedScreen,
  };
};

export const exchangeElement = createAsyncThunk("/exchangeElement", async (elementData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.account.token;
    return screenService.exchangeElement(elementData, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
      console.log(message)
      toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteElement = createAsyncThunk("/deleteElement", async (elementData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.account.token;
    return screenService.deleteElement(elementData, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
      toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});

export const screenSlice = createSlice({
  name: "screenEditor",
  initialState,
  reducers: {
    resetScreen: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getScreen.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getScreen.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.screen = action.payload;
      })
      .addCase(getScreen.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.screen = {};
      })
      .addCase(createScreen.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createScreen.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.screen = action.payload;
      })
      .addCase(createScreen.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(setTextField.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setTextField.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.screen = action.payload;
      })
      .addCase(setTextField.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateScreen.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateScreen.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.screen = action.payload;
      })
      .addCase(updateScreen.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase("screenEditor/updateScreen", (state, action) => {
        state.screen = action.payload;
      })
      .addCase(setH5P.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setH5P.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.screen = action.payload;
      }) 
      .addCase(setH5P.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(setPicture.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setPicture.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.screen = action.payload;
      })
      .addCase(setPicture.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteElement.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteElement.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.screen = action.payload;
      })
      .addCase(deleteElement.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // .addCase(exchangeElement.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(exchangeElement.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.isSuccess = true;
      //   state.screen = action.payload;
      // })
      // .addCase(exchangeElement.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = true;
      //   state.message = action.payload;
      // })
  },
});

export const { resetScreen } = screenSlice.actions;
export default screenSlice.reducer;
