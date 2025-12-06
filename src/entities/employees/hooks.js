import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { employeeKeys, getEmployees, persistEmployee } from './api';

export function useEmployeesQuery() {
  return useQuery({
    queryKey: employeeKeys.all,
    queryFn: getEmployees,
  });
}

export function useSaveEmployeeMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: persistEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: employeeKeys.all });
    },
  });
}

