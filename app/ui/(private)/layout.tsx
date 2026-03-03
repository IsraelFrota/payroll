import { redirect } from 'next/navigation';
import { getSession } from '@/app/_lib/auth';

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect('/');
  }

  return <>{children}</>;
}
