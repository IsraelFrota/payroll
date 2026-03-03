import {
	NextRequest,
	NextResponse,
} from 'next/server';
import { getPayrollService } from '@/database/service-factory';

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const service = await getPayrollService();

		const result = await service.create(body);

		return NextResponse.json(
			{ data: result },
			{ status: 201 },
		);
	} catch (err) {
		return NextResponse.json(
			{ error: err },
			{ status: 500 },
		);
	}
}