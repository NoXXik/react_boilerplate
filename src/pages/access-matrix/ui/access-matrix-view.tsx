import { useEffect, useMemo, useState } from 'react';
import { useAccessMatrixAllQuery, useUpsertAccessMutation } from '../../../entities/access/hooks';
import type { AccessModule, AccessRole } from '../../../entities/access/types';
import { Card, CardContent, CardHeader } from '../../../shared/ui/card';
import { Badge } from '../../../shared/ui/badge';
import { Select } from '../../../shared/ui/select';
import { Checkbox } from '../../../shared/ui/checkbox';
import { Button } from '../../../shared/ui/button';

export function AccessMatrixView() {
  const { data, isLoading } = useAccessMatrixAllQuery();
  const roles = data?.roles ?? [];
  const [role, setRole] = useState<string>(roles[0]?.code ?? '');

  const matrixByRole = useMemo(() => data?.matrices ?? {}, [data]);
  const actions = data?.actions ?? [];

  // Полный список модулей/табов
  const allModules: AccessModule[] = useMemo(() => data?.modules ?? [], [data]);
  // Доступы выбранной роли в удобной карте
  const roleModules = useMemo(() => matrixByRole[role] ?? [], [matrixByRole, role]);
  const accessMap = useMemo(() => {
    const modMap = new Map<string, Map<string, Set<string>>>();
    roleModules.forEach((m) => {
      const tabMap = new Map<string, Set<string>>();
      m.tabs.forEach((t) => {
        tabMap.set(t.code, new Set(t.actions?.map((a) => a.code) ?? []));
      });
      modMap.set(m.code, tabMap);
    });
    return modMap;
  }, [roleModules]);

  // Локальный выбор для редактирования
  const [selection, setSelection] = useState<Record<string, Record<string, string[]>>>({});
  const { mutateAsync, isPending } = useUpsertAccessMutation();

  useEffect(() => {
    if (!role && roles[0]?.code) {
      setRole(roles[0].code);
    }
  }, [roles, role]);

  useEffect(() => {
    const initial: Record<string, Record<string, string[]>> = {};
    roleModules.forEach((m) => {
      initial[m.code] = {};
      m.tabs.forEach((t) => {
        initial[m.code][t.code] = t.actions?.map((a) => a.code) ?? [];
      });
    });
    setSelection(initial);
  }, [roleModules]);

  const getSelected = (moduleCode: string, tabCode: string) => {
    const local = selection[moduleCode]?.[tabCode];
    if (local) return local;
    const fallback = accessMap.get(moduleCode)?.get(tabCode);
    return Array.from(fallback ?? []);
  };

  const toggleAction = (moduleCode: string, tabCode: string, actionCode: string) => {
    setSelection((prev) => {
      const next = { ...prev };
      const tabMap = { ...(next[moduleCode] ?? {}) };
      const currentSet = new Set(tabMap[tabCode] ?? getSelected(moduleCode, tabCode));
      if (currentSet.has(actionCode)) currentSet.delete(actionCode);
      else currentSet.add(actionCode);
      tabMap[tabCode] = Array.from(currentSet);
      next[moduleCode] = tabMap;
      return next;
    });
  };

  const handleSave = async (moduleCode: string, tabCode: string) => {
    const actionsSelected = getSelected(moduleCode, tabCode);
    await mutateAsync({
      roleCode: role,
      moduleCode,
      tabCode,
      actionCodes: actionsSelected,
    });
  };

  if (isLoading) {
    return <div className="text-sm text-slate-200">Загружаем матрицу ролей...</div>;
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader title="Выберите роль" />
        <CardContent className="space-y-3">
          <Select value={role} onChange={(e) => setRole(e.target.value)}>
            {roles.map((r: AccessRole) => (
              <option key={r.code} value={r.code}>
                {r.name} ({r.code})
              </option>
            ))}
          </Select>
          <p className="text-xs text-slate-400">Чекбоксы отображают доступы роли и не отправляют изменений.</p>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {allModules.map((module) => (
          <Card key={module.code}>
            <CardHeader
              title={
                <div className="flex items-center gap-2">
                  <span>{module.name}</span>
                  <Badge tone="neutral">{module.code}</Badge>
                </div>
              }
            />
            <CardContent className="space-y-3">
              {module.tabs.map((tab) => {
                const tabAccess = accessMap.get(module.code)?.get(tab.code);
                return (
                <div key={tab.code} className="space-y-2 rounded-xl border border-slate-800/60 bg-slate-900/40 p-3">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-100">{tab.name}</span>
                    <Badge tone="info">{tab.code}</Badge>
                  </div>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                    {actions.map((action) => {
                      const selected = new Set(getSelected(module.code, tab.code));
                      const hasAccess = selected.has(action.code);
                      return (
                        <label
                          key={action.code}
                          className="flex items-center gap-2 rounded-lg border border-slate-800/50 bg-slate-900/60 px-3 py-2 text-sm text-slate-100"
                        >
                          <Checkbox
                            checked={hasAccess}
                            onChange={() => toggleAction(module.code, tab.code, action.code)}
                            disabled={isPending}
                          />
                          <span>{action.name}</span>
                          <span className="text-[11px] uppercase tracking-wide text-slate-500">{action.code}</span>
                        </label>
                      );
                    })}
                  </div>
                  <div className="flex justify-end">
                    <Button
                      size="sm"
                      disabled={isPending}
                      onClick={() => handleSave(module.code, tab.code)}
                    >
                      {isPending ? 'Сохраняем...' : 'Сохранить'}
                    </Button>
                  </div>
                </div>
                );
              })}
            </CardContent>
          </Card>
        ))}
        {allModules.length === 0 ? <p className="text-sm text-slate-300">Нет модулей для отображения.</p> : null}
      </div>
    </div>
  );
}

