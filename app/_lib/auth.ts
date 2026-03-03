import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export type SessionPayload = {
  userId: string;
  username: string;
};

export async function getSession(): Promise<SessionPayload | null> {
	const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;

	if (!token) return null;

	try {
		return jwt.verify(
			token,
			process.env.JWT_SECRET!
		) as SessionPayload;
	} catch {
		return null;
	}
}