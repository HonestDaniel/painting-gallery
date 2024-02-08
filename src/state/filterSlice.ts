import { createSlice } from '@reduxjs/toolkit';

interface IFilterSliceState {
  search: string;
  authorId: number | null,
  locationId: number | null,
  range: { from: string, before: string } | null
}

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    search: '',
    authorId: null,
    locationId: null,
    range: null,
  } as IFilterSliceState,
  reducers: {
    setNameFilter(state, action) {
      // Здесь у меня не было выбора
      // eslint-disable-next-line no-param-reassign
      state.search = action.payload;
    },
    setAuthorId(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.authorId = action.payload !== null ? action.payload.id : null;
    },
    setLocationId(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.locationId = action.payload !== null ? action.payload.id : null;
    },
    setRange(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.range = {
        from: action.payload.from,
        before: action.payload.before,
      };
    },
  },
});

export const {
  setNameFilter,
  setLocationId,
  setAuthorId,
  setRange,
} = filterSlice.actions;

export default filterSlice.reducer;
