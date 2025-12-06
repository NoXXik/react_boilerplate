import { apiFetch } from '../../shared/api/http';
import type { AccessMatrix, AccessMatrixAll, AccessUpsertInput } from './types';

export async function getAccessMatrix(): Promise<AccessMatrix> {
  const res = await apiFetch<AccessMatrix | { data?: AccessMatrix }>('/access/matrix', {
    method: 'GET',
  });
  const matrix = (res as any)?.data ?? res;
  if (Array.isArray(matrix)) return matrix;
  return [];
}

export async function getAccessMatrixAll(): Promise<AccessMatrixAll> {
  const res = await apiFetch<
    | AccessMatrixAll
    | {
        data?: {
          modules?: AccessMatrixAll['modules'];
          actions?: AccessMatrixAll['actions'];
          roles?: AccessMatrixAll['roles'];
          matrices?: Record<string, AccessMatrix>;
        };
      }
  >('/access/matrix/all', {
    method: 'GET',
  });
  const payload = (res as any)?.data ?? res ?? {};
  const matricesRaw = payload.matrices ?? {};
  const matrices = Array.isArray(matricesRaw)
    ? (matricesRaw as any[]).reduce<Record<string, AccessMatrix>>((acc, item) => {
        if (item && typeof item === 'object') {
          Object.entries(item).forEach(([role, value]) => {
            if (Array.isArray(value)) acc[role] = value;
          });
        }
        return acc;
      }, {})
    : matricesRaw;

  return {
    modules: payload.modules ?? [],
    actions: payload.actions ?? [],
    roles: payload.roles ?? [],
    matrices,
  };
}

export async function upsertAccess(payload: AccessUpsertInput): Promise<void> {
  await apiFetch('/access/upsert', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(payload),
  });
}

