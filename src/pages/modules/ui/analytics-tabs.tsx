import type { AccessModuleCode, AccessTabCode } from '../../../entities/access/types';

type Props = {
  moduleCode: AccessModuleCode;
  tabCode: AccessTabCode;
};

export function AnalyticsDashboardTab({ moduleCode, tabCode }: Props) {
  return (
    <div className="space-y-2 text-sm text-slate-200">
      <p>Аналитика: дашборд (демо вкладка).</p>
      <p className="text-slate-400">Модуль: {moduleCode} · Вкладка: {tabCode}</p>
    </div>
  );
}

