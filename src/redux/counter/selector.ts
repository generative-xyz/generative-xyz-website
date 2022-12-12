import { createSelector } from 'reselect';
import { RootState } from '..';

export const counterValueSelector = (state: RootState): number =>
  state.counter.value;

export const counterValueAddOneSelector = createSelector(
  counterValueSelector,
  (value: number) => value + 1
);
