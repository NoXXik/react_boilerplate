import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { employeeSchema, type EmployeeFormValues } from '../model/schema';
import { Button } from '../../../shared/ui/button';
import { Input } from '../../../shared/ui/input';
import { Label } from '../../../shared/ui/label';
import { Select } from '../../../shared/ui/select';
import { Textarea } from '../../../shared/ui/textarea';

type EmployeeFormProps = {
  defaultValues?: EmployeeFormValues;
  onSubmit: (values: EmployeeFormValues) => Promise<void> | void;
  submitting?: boolean;
};

const emptyValues: EmployeeFormValues = {
  name: '',
  email: '',
  department: '',
  role: '',
  salary: 0,
  status: 'Активен',
  notes: '',
};

export function EmployeeForm({ defaultValues, onSubmit, submitting }: EmployeeFormProps) {
  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues: defaultValues ?? emptyValues,
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form]);

  const handleSubmit = form.handleSubmit((values) =>
    onSubmit({
      ...values,
      salary: Number(values.salary),
    })
  );

  const { errors } = form.formState;

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Имя</Label>
          <Input id="name" placeholder="Имя Фамилия" {...form.register('name')} />
          {errors.name ? <p className="text-xs text-red-400">{errors.name.message}</p> : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="user@company.com" {...form.register('email')} />
          {errors.email ? <p className="text-xs text-red-400">{errors.email.message}</p> : null}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="department">Отдел</Label>
          <Select id="department" {...form.register('department')}>
            <option value="">Выберите</option>
            <option value="Разработка">Разработка</option>
            <option value="Маркетинг">Маркетинг</option>
            <option value="Продажи">Продажи</option>
            <option value="Поддержка">Поддержка</option>
          </Select>
          {errors.department ? <p className="text-xs text-red-400">{errors.department.message}</p> : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="role">Роль</Label>
          <Input id="role" placeholder="Должность" {...form.register('role')} />
          {errors.role ? <p className="text-xs text-red-400">{errors.role.message}</p> : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="salary">Доход (₽)</Label>
          <Input id="salary" type="number" min={0} {...form.register('salary', { valueAsNumber: true })} />
          {errors.salary ? <p className="text-xs text-red-400">{errors.salary.message}</p> : null}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="status">Статус</Label>
          <Select id="status" {...form.register('status')}>
            <option value="Активен">Активен</option>
            <option value="В отпуске">В отпуске</option>
            <option value="Уволен">Уволен</option>
          </Select>
          {errors.status ? <p className="text-xs text-red-400">{errors.status.message}</p> : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="notes">Заметки</Label>
          <Textarea id="notes" rows={3} placeholder="Комментарий для HR/менеджера" {...form.register('notes')} />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
          {submitting ? 'Сохраняем...' : 'Сохранить'}
        </Button>
      </div>
    </form>
  );
}

