import { z } from 'zod';

const summarySchema = z.object({
  title: z
    .string()
    .trim()
    .min(1),

  value: z
    .coerce.number(),
});

const eventSchema = z.object({
  code: z
    .string()
    .trim()
    .min(1),
  
  description: z
    .string()
    .trim()
    .min(1),
  
  amount: z
    .coerce.number(),
  
  category: z
    .string()
    .trim()
    .min(1),
}); 

const detailSchema = z.object({
  obligation: z
    .string()
    .trim()
    .min(1),

  amount: z
    .coerce.number(),

  dueDate: z.coerce.date(),

  documentType: z
    .string()
    .trim()
    .min(1),
});

const evolutionSchema = z.object({
  month: z
    .string()
    .trim()
    .min(1),

  amount: z.coerce.number(),
});

const indicatorsSchema = z.object({
  employees: z.coerce.number().int().nonnegative(),

  admitted: z.coerce.number().int().nonnegative(),

  dismissed: z.coerce.number().int().nonnegative(),

  avgCostPerEmployee: z.coerce.number().nonnegative(),
});

const payrollSchema = z.object({
  companyId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId'),

  competence: z
    .string()
    .regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'Invalid competence format'),

  paymentTermLabel: z
    .string()
    .trim()
    .min(1),

  sentAt: z.coerce.date(),

  summary: z
    .array(summarySchema)
    .default([]),

  events: z
    .array(eventSchema)
    .default([]),

  details: z
    .array(detailSchema)
    .default([]),

  evolution: z
    .array(evolutionSchema)
    .default([]),

  indicators: indicatorsSchema,
});

const updatePayrollSchema = payrollSchema.partial();

export type CreatePayrollDTO = z.infer<typeof payrollSchema>;
export type UpdatePayrollDTO = z.infer<typeof updatePayrollSchema>;

export {
	eventSchema,
  detailSchema,
	summarySchema,
	payrollSchema,
	evolutionSchema,
	indicatorsSchema,
	updatePayrollSchema,
};