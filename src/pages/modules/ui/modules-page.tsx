import { Link } from 'react-router-dom';
import { useAccessMatrixQuery } from '../../../entities/access/hooks';
import { Card, CardContent, CardHeader } from '../../../shared/ui/card';
import { Badge } from '../../../shared/ui/badge';

export function ModulesPage() {
  const { data = [], isLoading } = useAccessMatrixQuery();

  if (isLoading) {
    return <div className="text-sm text-slate-300">Загружаем доступы...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-slate-50">Доступные модули</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {data.map((module) => (
          <Card key={module.code}>
            <CardHeader
              title={
                <div className="flex items-center gap-2">
                  <span>{module.name}</span>
                  <Badge tone="info">{module.code}</Badge>
                </div>
              }
            />
            <CardContent className="space-y-2">
              {module.tabs.map((tab) => (
                <Link
                  key={tab.code}
                  to={`/modules/${module.code}/${tab.code}`}
                  className="flex items-center justify-between rounded-lg border border-slate-800/80 bg-slate-900/50 px-3 py-2 text-sm text-slate-100 hover:bg-slate-800/60"
                >
                  <span>{tab.name}</span>
                  <Badge tone="neutral">{tab.code}</Badge>
                </Link>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

