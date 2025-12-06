import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { Employee } from '../../../entities/employees/types';

type EmployeeUIState = {
  search: string;
  department: string;
  dialogOpen: boolean;
  editing: Employee | null;
  setSearch: (value: string) => void;
  setDepartment: (value: string) => void;
  openCreate: () => void;
  openEdit: (employee: Employee) => void;
  closeDialog: () => void;
};

export const useEmployeeUIStore = create<EmployeeUIState>()(
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

