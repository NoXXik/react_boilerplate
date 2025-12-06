import type { AccessModuleCode, AccessTabCode } from '../../../entities/access/types';
import { AccessMatrixView } from '../../access-matrix/ui/access-matrix-view';

type Props = {
  moduleCode: AccessModuleCode;
  tabCode: AccessTabCode;
};

export function AccessRoleTab({ moduleCode, tabCode }: Props) {
  return (
    <div className="space-y-3">
      <div className="text-sm text-slate-400">
        Матрица доступов для роли. Модуль: {moduleCode} · Вкладка: {tabCode}
      </div>
      <AccessMatrixView />
    </div>
  );
}

