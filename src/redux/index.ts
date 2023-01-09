import type { TypedUseSelectorHook } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { combineReducers } from 'redux';
// Slices
import userReducer from '@redux/user/reducer';
import generalReducer from '@redux/general/reducer';
import projectReducer from '@redux/project/reducer';

const reducer = combineReducers({
  user: userReducer,
  general: generalReducer,
  project: projectReducer,
});

const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type Store = typeof store;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
