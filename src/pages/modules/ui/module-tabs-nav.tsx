import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { AccessModuleCode, AccessTab } from '../../../entities/access/types';
import { cn } from '../../../shared/lib/utils';

type Props = {
  moduleCode: AccessModuleCode;
  tabs?: AccessTab[];
  activeTab?: string;
};

export function ModuleTabsNav({ moduleCode, tabs = [], activeTab }: Props) {
  const navigate = useNavigate();
  const items = useMemo(() => tabs, [tabs]);

  if (!items.length) return null;

  return (
    <div className="mb-3 flex flex-wrap gap-2">
      {items.map((tab) => {
        const isActive = tab.code === activeTab;
        return (
          <button
            key={tab.code}
            type="button"
            onClick={() => navigate(`/modules/${moduleCode}/${tab.code}`)}
            className={cn(
              'rounded-lg border px-3 py-2 text-sm transition',
              isActive
                ? 'border-blue-600 bg-blue-600/20 text-blue-100'
                : 'border-slate-700 bg-slate-800/60 text-slate-200 hover:bg-slate-800'
            )}
          >
            {tab.name} <span className="text-[11px] text-slate-400">({tab.code})</span>
          </button>
        );
      })}
    </div>
  );
}

