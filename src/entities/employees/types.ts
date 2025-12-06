export type EmployeeStatus = 'Активен' | 'В отпуске' | 'Уволен';

export type Employee = {
  id: string;
  name: string;
  email: string;
  department: 'Разработка' | 'Маркетинг' | 'Продажи' | 'Поддержка' | string;
  role: string;
  salary: number;
  status: EmployeeStatus;
  notes?: string;
};

export type EmployeePayload = Omit<Employee, 'id'> & { id?: string };

