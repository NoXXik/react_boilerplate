import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAccessMatrix, getAccessMatrixAll, upsertAccess } from './api';
import type { AccessActionCode, AccessModuleCode, AccessTabCode, AccessUpsertInput } from './types';

export const accessKeys = {
  all: ['access', 'matrix'] as const,
  full: ['access', 'matrix', 'all'] as const,
};

export function useAccessMatrixQuery() {
  return useQuery({
    queryKey: accessKeys.all,
    queryFn: getAccessMatrix,
    staleTime: 5 * 60 * 1000,
  });
}

export function useAccessMatrixAllQuery() {
  return useQuery({
    queryKey: accessKeys.full,
    queryFn: getAccessMatrixAll,
    staleTime: 5 * 60 * 1000,
  });
}

export function useHasAccess(moduleCode: AccessModuleCode, tabCode: AccessTabCode, actionCode: AccessActionCode = 'VIEW') {
  const { data } = useAccessMatrixQuery();
  if (!data) return false;
  const module = data.find((m) => m.code === moduleCode);
  if (!module) return false;
  const tab = module.tabs.find((t) => t.code === tabCode);
  if (!tab) return false;
  return tab.actions.some((a) => a.code === actionCode);
}

export function useUpsertAccessMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: AccessUpsertInput) => upsertAccess(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: accessKeys.full });
      queryClient.invalidateQueries({ queryKey: accessKeys.all });
    },
  });
}

