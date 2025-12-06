import type { AccessModuleCode, AccessTabCode } from '../../../entities/access/types';

type Props = {
  moduleCode: AccessModuleCode;
  tabCode: AccessTabCode;
};

export function FallbackTab({ moduleCode, tabCode }: Props) {
  return (
    <div className="space-y-2 text-sm text-slate-200">
      <p>Нет реализованного компонента для вкладки.</p>
      <p className="text-slate-400">Модуль: {moduleCode}</p>
      <p className="text-slate-400">Вкладка: {tabCode}</p>
    </div>
  );
}

