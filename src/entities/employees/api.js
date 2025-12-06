import { fetchEmployees, saveEmployee } from '../../shared/api/fake-server';

export const employeeKeys = {
  all: ['employees'],
};

export async function getEmployees() {
  return fetchEmployees();
}

export async function persistEmployee(employee) {
  return saveEmployee(employee);
}

