import { createAsyncThunk, createSlice,createEntityAdapter} from '@reduxjs/toolkit';
import axios from 'axios';

export const getSupport = createAsyncThunk(
  'helpCenterApp/support',
  async () => {
    const response = await axios.get(`http://194.67.110.24/api/v1/support/categories/`);
    const data = await response.data.results;
    return data;
  }
);

const supportAdapter = createEntityAdapter([]);


const supportSlice = createSlice({
  name: 'helpCenterApp/support',
  initialState: supportAdapter.getInitialState([]),
  reducers: {},
  extraReducers: {
    [getSupport.fulfilled]: supportAdapter.setAll,
  },
});

export const selectSupport = ({ helpCenterApp }) => helpCenterApp.support.entities;

export default supportSlice.reducer;
