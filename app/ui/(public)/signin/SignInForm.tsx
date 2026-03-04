'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from '@/components/ui/field';
import {
	Card,
	CardTitle,
	CardFooter,
	CardHeader,
	CardContent,
	CardDescription,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import {
	loginSchema,
	type LoginSchema,
} from '../../../_utils/schema';

export function SignInForm() {
	const router = useRouter();
	const form = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			username: '',
			keyWord: ''
		},
	});

	async function onSubmit(data: LoginSchema) {
		const result = await fetch('/api/auth', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data),
		});

		if (!result) {
			return;
		}

		router.replace('ui/panel');
		router.refresh();
	}

	return (
		<main className='h-screen flex justify-center items-center'>
			<Card className='w-full sm:max-w-md'>
				<CardHeader>
					<CardTitle>Israel Frota</CardTitle>
					<CardDescription>
						Painel de Folha de Pagamento
					</CardDescription>
				</CardHeader>

				<Separator />

				<CardContent>
					<form id='login-form' onSubmit={form.handleSubmit(onSubmit)}>
						<FieldGroup>
							<Field data-invalid={!!form.formState.errors.username} >
								<FieldLabel>Nome</FieldLabel>
								<Input
									{...form.register('username')}
									id='username'
									type='text'
									placeholder='Informe seu nome de usuário'
									autoComplete='off'
								/>
								{form.formState.errors.username && (
									<FieldError errors={[form.formState.errors.username]} />
								)}
							</Field>

							<Field data-invalid={!!form.formState.errors.keyWord} >
								<FieldLabel>Palavra-chave</FieldLabel>
								<Input
									{...form.register('keyWord')}
									id='keyWord'
									type='password'
									placeholder='Informe sua palavra-chave'
									autoComplete='off'
								/>
								{form.formState.errors.keyWord && (
									<FieldError errors={[form.formState.errors.keyWord]} />
								)}
							</Field>
						</FieldGroup>
					</form>
				</CardContent>

				<Separator />

				<CardFooter>
					<Field orientation='responsive'>
						<Button
							type='submit'
							form='login-form'
							disabled={form.formState.isSubmitting}
						>
							{form.formState.isSubmitting ? 'Entrando...' : 'Entrar'}
						</Button>
					</Field>
				</CardFooter>
			</Card>
		</main>
	);
}
