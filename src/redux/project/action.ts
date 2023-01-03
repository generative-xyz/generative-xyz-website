import { createAction } from '@reduxjs/toolkit';
import { Project } from '@interfaces/project';

export const setProjectCurrent = createAction<Project>(
  'project/setProjectCurrent'
);
