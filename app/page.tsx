import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SignInForm } from './ui/(public)/signin/SignInForm';

export default async function LoginPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;

  if (token) {
    redirect('/ui/panel');
  }

  return <SignInForm />;
}
