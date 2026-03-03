import { z } from 'zod';

const userSchema = z.object({
	username: z
		.string()
		.trim()
		.nonempty()
		.toLowerCase(),
	
	keyWord: z
		.string()
		.nonempty()
		.trim(),
});

export type CreateUserDTO = z.infer<typeof userSchema>;

export { userSchema };