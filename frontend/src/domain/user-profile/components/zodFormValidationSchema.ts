import { z } from 'zod';

export const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  country: z.object({
    value: z.string(),
    label: z.string(),
  }),
  exam: z.object({
    value: z.string().min(1, 'Exam is required'),
    label: z.string(),
  }),
  examYear: z.object({
    value: z.string().min(1, 'Exam Year is required'),
    label: z.string(),
  }),
});
