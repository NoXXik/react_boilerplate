import { useMemo } from 'react';
import { createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { Plus, RefreshCw } from 'lucide-react';
import { useEmployeesQuery, useSaveEmployeeMutation } from '../../entities/employees/hooks';
import type { Employee, EmployeePayload } from '../../entities/employees/types';
import { useEmployeeUIStore } from '../../features/employees/model/store';
import { EmployeeForm } from '../../features/employees/ui/employee-form';
import type { EmployeeFormValues } from '../../features/employees/model/schema';
import { Badge } from '../../shared/ui/badge';
import { Button } from '../../shared/ui/button';
import { Dialog, DialogContent, DialogHeader } from '../../shared/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../shared/ui/table';
import { Card, CardContent, CardHeader } from '../../shared/ui/card';

const columnHelper = createColumnHelper<Employee>();

export function EmployeeTable() {
  const { data, isLoading, refetch } = useEmployeesQuery();
  const { mutateAsync, isPending } = useSaveEmployeeMutation();
  const { search, department, dialogOpen, openCreate, openEdit, closeDialog, editing } = useEmployeeUIStore();

  const filtered = useMemo(() => {
    if (!data) return [];
    return data
      .filter((item) => (department === 'all' ? true : item.department === department))
      .filter((item) => {
        if (!search) return true;
        const target = `${item.name} ${item.email}`.toLowerCase();
        return target.includes(search.toLowerCase());
      });
  }, [data, search, department]);

  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: 'Имя',
        cell: (info) => (
          <div>
            <div className="font-semibold text-slate-100">{info.getValue()}</div>
            <div className="text-xs text-slate-400">{info.row.original.email}</div>
          </div>
        ),
      }),
      columnHelper.accessor('department', {
        header: 'Отдел',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('role', {
        header: 'Роль',
      }),
      columnHelper.accessor('salary', {
        header: 'Доход',
        cell: (info) => `₽ ${Number(info.getValue()).toLocaleString('ru-RU')}`,
      }),
      columnHelper.accessor('status', {
        header: 'Статус',
        cell: (info) => (
          <Badge tone={info.getValue() === 'Активен' ? 'success' : 'info'}>{info.getValue()}</Badge>
        ),
      }),
      columnHelper.display({
        id: 'actions',
        header: '',
        cell: (info) => (
          <Button variant="ghost" size="sm" onClick={() => openEdit(info.row.original)}>
            Редактировать
          </Button>
        ),
      }),
    ],
    [openEdit]
  );

  const table = useReactTable({
    data: filtered,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const handleSubmit = async (values: EmployeeFormValues) => {
    const payload: EmployeePayload = { ...values };
    await mutateAsync(payload);
    closeDialog();
  };

  return (
    <Card className="mt-4">
      <CardHeader
        title="Команда"
        action={
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => refetch()}>
              <RefreshCw className="h-4 w-4" />
              Обновить
            </Button>
            <Button size="sm" onClick={openCreate}>
              <Plus className="h-4 w-4" />
              Добавить
            </Button>
          </div>
        }
      />
      <CardContent>
        <div className="w-full overflow-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-12 text-sm text-slate-400">Загружаем сотрудников...</div>
          ) : (
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} className="whitespace-nowrap">
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))}
                {table.getRowModel().rows.length === 0 ? (
                  <TableRow>
                    <TableCell className="text-center text-slate-400">
                      Нет данных по текущим фильтрам.
                    </TableCell>
                  </TableRow>
                ) : null}
              </TableBody>
            </Table>
          )}
        </div>
      </CardContent>

      <Dialog open={dialogOpen} onOpenChange={(open) => (!open ? closeDialog() : undefined)}>
        <DialogContent>
          <DialogHeader title={editing ? 'Редактирование сотрудника' : 'Новый сотрудник'} description="react-hook-form + Zod, сохранение через TanStack Query" />
          <EmployeeForm defaultValues={editing ?? undefined} onSubmit={handleSubmit} submitting={isPending} />
        </DialogContent>
      </Dialog>
    </Card>
  );
}

