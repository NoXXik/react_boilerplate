import { useEmployeeUIStore } from '../../features/employees/model/store';
import { Input } from '../../shared/ui/input';
import { Select } from '../../shared/ui/select';

export function EmployeeFilters() {
  const { search, department, setSearch, setDepartment } = useEmployeeUIStore();

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <Input
        placeholder="Поиск по имени или email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Select value={department} onChange={(e) => setDepartment(e.target.value)}>
        <option value="all">Все отделы</option>
        <option value="Разработка">Разработка</option>
        <option value="Маркетинг">Маркетинг</option>
        <option value="Продажи">Продажи</option>
        <option value="Поддержка">Поддержка</option>
      </Select>
      <div className="flex items-center text-xs text-slate-400">
        Фильтры живут в Zustand, запросы — через TanStack Query.
      </div>
    </div>
  );
}

