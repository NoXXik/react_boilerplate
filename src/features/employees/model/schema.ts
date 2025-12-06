import { z } from 'zod';

export const employeeSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, 'Минимум 3 символа'),
  email: z.string().email('Некорректный email'),
  department: z.string().min(2, 'Выберите отдел'),
  role: z.string().min(2, 'Укажите роль'),
  salary: z
    .number()
    .min(1, 'Зарплата должна быть > 0'),
  status: z.enum(['Активен', 'В отпуске', 'Уволен']),
  notes: z.string().optional(),
});

export type EmployeeFormValues = z.infer<typeof employeeSchema>;

