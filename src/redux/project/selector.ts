import { RootState } from '..';
import { Project } from '@interfaces/project';

export const projectCurrentSelector = (
  state: RootState
): Project | Record<string, string> => state.project.projectCurrent;
