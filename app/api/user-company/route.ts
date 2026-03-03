import {
	NextRequest,
	NextResponse,
} from 'next/server';
import { getUserCompanyService } from '@/database/service-factory';

export async function POST(request: NextRequest) {
	try {
		const { userId, companyId, role } = await request.json();

		if (!userId || !companyId) {
			return NextResponse.json(
				{ error: 'Invalid data' },
				{ status: 400 }
			);
		}

		const service = await getUserCompanyService();

		const userCompany = await service
			.linkUserToCompany({
				userId,
				companyId,
				role
			});

		if (!userCompany) {
			return NextResponse.json(
				{ success: false },
				{ status: 400 }
			);
		}

		return NextResponse.json(
			{ success: true },
			{ status: 201 }
		);
	} catch (err) {
		return NextResponse.json(
			{ error: err },
			{ status: 500 }
		);
	}
}