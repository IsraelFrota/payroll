import { z } from 'zod';

export const loginSchema = z.object({
	username: z
		.string()
		.trim()
		.nonempty('O nome de usuário não pode estar vazio')
		.toLowerCase(),
	keyWord: z
		.string()
		.trim()
		.nonempty('A palavra-chave não pode estar vazia')
		.min(6, 'A palavra-chave deve possuir pelo menos 6 caracteres')
});

export type LoginSchema = z.infer<typeof loginSchema>;