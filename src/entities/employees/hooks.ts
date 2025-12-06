import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { employeeKeys, getEmployees, persistEmployee } from './api';
import type { Employee, EmployeePayload } from './types';

export function useEmployeesQuery() {
  return useQuery<Employee[]>({
    queryKey: employeeKeys.all,
    queryFn: getEmployees,
  });
}

export function useSaveEmployeeMutation() {
  const queryClient = useQueryClient();
  return useMutation<string, Error, EmployeePayload>({
    mutationFn: persistEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: employeeKeys.all });
    },
  });
}

