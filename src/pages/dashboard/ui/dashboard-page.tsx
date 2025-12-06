import { useEmployeesQuery } from '../../../entities/employees/hooks';
import { EmployeeFilters } from '../../../widgets/employees/employee-filters';
import { EmployeeTable } from '../../../widgets/employees/employee-table';
import { Card, CardContent, CardHeader } from '../../../shared/ui/card';
import { Badge } from '../../../shared/ui/badge';

export function DashboardPage() {
  const { data = [] } = useEmployeesQuery();
  const total = data.length;
  const active = data.filter((i) => i.status === 'Активен').length;
  const payroll = data.reduce((acc, item) => acc + Number(item.salary ?? 0), 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <MetricCard title="Сотрудников" value={total} hint="TanStack Query кеширует список" />
        <MetricCard title="Активных" value={active} hint="Фильтры в Zustand" />
        <MetricCard title="ФОТ / мес" value={`₽ ${payroll.toLocaleString('ru-RU')}`} hint="Данные из таблицы" />
      </div>

      <Card>
        <CardHeader
          title="Фильтры и состояние"
          action={<Badge tone="info">react-hook-form + zod + Zustand</Badge>}
        />
        <CardContent>
          <EmployeeFilters />
        </CardContent>
      </Card>

      <EmployeeTable />
    </div>
  );
}

type MetricCardProps = {
  title: string;
  value: string | number;
  hint: string;
};

function MetricCard({ title, value, hint }: MetricCardProps) {
  return (
    <Card>
      <CardHeader title={title} />
      <CardContent>
        <div className="text-2xl font-semibold text-slate-50">{value}</div>
        <p className="text-xs text-slate-400">{hint}</p>
      </CardContent>
    </Card>
  );
}

