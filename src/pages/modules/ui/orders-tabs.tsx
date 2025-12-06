import type { AccessModuleCode, AccessTabCode } from '../../../entities/access/types';

type Props = {
  moduleCode: AccessModuleCode;
  tabCode: AccessTabCode;
};

export function OrdersListTab({ moduleCode, tabCode }: Props) {
  return (
    <div className="space-y-2 text-sm text-slate-200">
      <p>Список заказов (демо вкладка).</p>
      <p className="text-slate-400">Модуль: {moduleCode} · Вкладка: {tabCode}</p>
    </div>
  );
}

export function OrdersDetailsTab({ moduleCode, tabCode }: Props) {
  return (
    <div className="space-y-2 text-sm text-slate-200">
      <p>Детали заказа (демо вкладка).</p>
      <p className="text-slate-400">Модуль: {moduleCode} · Вкладка: {tabCode}</p>
    </div>
  );
}

