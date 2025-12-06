import { z } from 'zod';

export const employeeSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, 'Минимум 3 символа'),
  email: z.string().email('Некорректный email'),
  department: z.string().min(2, 'Выберите отдел'),
  role: z.string().min(2, 'Укажите роль'),
  salary: z
    .number({
      invalid_type_error: 'Введите число',
    })
    .min(1, 'Зарплата должна быть > 0'),
  status: z.string().min(2, 'Статус обязателен'),
  notes: z.string().optional(),
});

