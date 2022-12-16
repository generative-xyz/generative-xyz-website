import { User } from '@interfaces/user';
import { RootState } from '..';

export const getUserSelector = (state: RootState): User => state.user;
