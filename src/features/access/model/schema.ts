import { z } from 'zod';

export const updateAccessSchema = z.object({
  roleCode: z.string().min(1),
  moduleCode: z.string().min(1),
  tabCode: z.string().min(1),
  actionCodes: z.array(z.string().min(1)),
});

export type UpdateAccessInput = z.infer<typeof updateAccessSchema>;

