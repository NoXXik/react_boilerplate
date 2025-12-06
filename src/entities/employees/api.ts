import { fetchEmployees, saveEmployee } from '../../shared/api/fake-server';
import type { Employee, EmployeePayload } from './types';

export const employeeKeys = {
  all: ['employees'] as const,
};

export async function getEmployees(): Promise<Employee[]> {
  return fetchEmployees();
}

export async function persistEmployee(employee: EmployeePayload): Promise<string> {
  return saveEmployee(employee);
}

