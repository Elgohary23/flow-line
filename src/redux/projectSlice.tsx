// projectSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface Project {
  title: string;
  tasks: string[];
}

interface ProjectState {
  projects: Project[];
}

const initialState: ProjectState = {
  projects: [],
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload);
    },

    addTask: (state, action: PayloadAction<{ projectId: string; task: string }>) => {
      const projectIndex = state.projects.findIndex(
        (project) => project.title === action.payload.projectId
      );

      if (projectIndex !== -1) {
        state.projects[projectIndex].tasks.push(action.payload.task);
      }
    },

    removeTask: (state, action: PayloadAction<{ projectId: string; task: string }>) => {
      const { projectId, task } = action.payload;
      const project = state.projects.find(p => p.title === projectId);
      if (project) {
        project.tasks = project.tasks.filter(t => t !== task);
      }
    },
  },
});

export type { ProjectState };
export const { addProject, addTask, removeTask } = projectSlice.actions;
export const selectProjects = (state: RootState) => state.projects.projects;
export default projectSlice.reducer;
