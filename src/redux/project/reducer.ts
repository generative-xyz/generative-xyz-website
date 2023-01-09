import { createReducer } from '@reduxjs/toolkit';
import { setProjectCurrent } from './action';

const initialState = {
  projectCurrent: {},
};

const project = createReducer(initialState, builder => {
  builder.addCase(setProjectCurrent, (state, action) => {
    state.projectCurrent = action.payload;
  });
});

export default project;
