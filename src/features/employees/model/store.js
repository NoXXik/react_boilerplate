import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export const useEmployeeUIStore = create(
  immer((set) => ({
    search: '',
    department: 'all',
    dialogOpen: false,
    editing: null,
    setSearch: (value) => set((state) => void (state.search = value)),
    setDepartment: (value) => set((state) => void (state.department = value)),
    openCreate: () => set((state) => void ((state.dialogOpen = true), (state.editing = null))),
    openEdit: (employee) => set((state) => void ((state.dialogOpen = true), (state.editing = employee))),
    closeDialog: () => set((state) => void (state.dialogOpen = false)),
  }))
);

