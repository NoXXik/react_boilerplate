import { Navigate, useParams } from 'react-router-dom';
import { useAccessMatrixQuery, useHasAccess } from '../../../entities/access/hooks';
import type { AccessModuleCode, AccessTabCode } from '../../../entities/access/types';
import { Card, CardContent, CardHeader } from '../../../shared/ui/card';
import { Badge } from '../../../shared/ui/badge';

import { OrdersListTab, OrdersDetailsTab } from './orders-tabs';
import { AnalyticsDashboardTab } from './analytics-tabs';
import { AccessRoleTab } from './access-tabs';
import { FallbackTab } from './tab-fallback';
import { ModuleTabsNav } from './module-tabs-nav';

type TabComponent = React.ComponentType<{ moduleCode: AccessModuleCode; tabCode: AccessTabCode }>;

const moduleTabsMap: Record<AccessModuleCode, Partial<Record<AccessTabCode, TabComponent>>> = {
  ORDERS: {
    LIST: OrdersListTab,
    DETAILS: OrdersDetailsTab,
  },
  ANALYTICS: {
    DASHBOARD: AnalyticsDashboardTab,
  },
  ACCESS: {
    ROLEACCESS: AccessRoleTab,
  },
};

export function ModuleTabRouter() {
  const { moduleCode = '', tabCode = '' } = useParams<{ moduleCode: AccessModuleCode; tabCode: AccessTabCode }>();
  const { data, isLoading } = useAccessMatrixQuery();
  const hasView = useHasAccess(moduleCode, tabCode, 'VIEW');

  if (isLoading) {
    return <div className="text-sm text-slate-300">Загружаем доступы...</div>;
  }

  if (!hasView) {
    return <Navigate to="/" replace />;
  }

  const Component = moduleTabsMap[moduleCode]?.[tabCode] ?? FallbackTab;
  const module = data?.find((m) => m.code === moduleCode);
  const moduleTabs = module?.tabs.filter((t) => t.actions?.some((a) => a.code === 'VIEW'));
  const tab = moduleTabs?.find((t) => t.code === tabCode);

  return (
    <Card>
      <CardHeader
        title={
          <div className="flex items-center gap-2">
            <span>{tab?.name ?? tabCode}</span>
            <Badge tone="neutral">{moduleCode} / {tabCode}</Badge>
          </div>
        }
      />
      <CardContent>
        <ModuleTabsNav moduleCode={moduleCode} tabs={moduleTabs} activeTab={tabCode} />
        <Component moduleCode={moduleCode} tabCode={tabCode} />
      </CardContent>
    </Card>
  );
}

