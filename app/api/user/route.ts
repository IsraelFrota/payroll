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

		const user = service.create(username, keyWord);

		if (!user) {
			return NextResponse.json(
				{ success: false },
				{ status: 400 }
			);
		}

		const response = NextResponse.json(
			{ success: true },
			{ status: 201 }
		);

		return response;
	} catch (err) {
		return NextResponse.json(
			{ error: err },
			{ status: 500 }
		);
	}
}