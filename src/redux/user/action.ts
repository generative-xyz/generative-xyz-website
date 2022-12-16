import { User } from '@interfaces/user';
import { createAction } from '@reduxjs/toolkit';

const SLICE_PREFIX = 'user';

export const setUser = createAction<User>(`${SLICE_PREFIX}/setUser`);

export const resetUser = createAction(`${SLICE_PREFIX}/resetUser`);
