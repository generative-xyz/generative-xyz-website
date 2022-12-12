import { createAction } from '@reduxjs/toolkit';

export const increment = createAction<number, 'increment'>('increment');
export const decrement = createAction<number, 'decrement'>('decrement');
