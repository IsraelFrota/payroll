import jwt from 'jsonwebtoken';
import {
	NextRequest,
	NextResponse,
} from 'next/server';
import { getUserService } from '@/database/service-factory';

export async function POST(request: NextRequest) {
	try {
		const { username, keyWord } = await request.json();
		
		if (!username || !keyWord) {
			return NextResponse.json(
				{ error: 'Invalid data' },
				{ status: 400 }
			);
		}
		
		const service = await getUserService();

		const user = await service.authenticate(username, keyWord);

		if (!user) {
			return NextResponse.json(
				{ success: false },
				{ status: 400 }
			);
		}

		const token = jwt.sign(
			{ userId: user._id,	username: user.username	},
			process.env.JWT_SECRET!,
			{	expiresIn: '8h' }
		);

		const response = NextResponse.json(
			{ success: true },
			{ status: 200 },
		);

		response.cookies.set('session', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			path: '/',
			maxAge: 60 * 60 * 8,
		});

		return response;
	} catch (err) {
		return NextResponse.json(
			{ error: err },
			{ status: 500 }
		);
	}
}