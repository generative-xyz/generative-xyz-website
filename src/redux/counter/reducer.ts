import { createReducer } from '@reduxjs/toolkit';
import { increment, decrement } from './action';

const initialState = {
  value: 0,
};

const counter = createReducer(initialState, builder =>
  builder
    .addCase(increment, (state, _) => {
      state.value = state.value + 1;
    })
    .addCase(decrement, (state, _) => {
      state.value = state.value - 1;
    })
);

export default counter;
