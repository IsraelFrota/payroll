import {
  NextRequest,
  NextResponse,
} from 'next/server';
import {
  getCompanyService,
  getCompanyPayrollService,
} from '@/database/service-factory';
import { getSession } from '@/app/_lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const service = await getCompanyService();
    
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

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const service = await getCompanyPayrollService();
    // const result = await service.find();
    const result = await service.findByUserId(session.userId);
    
    return NextResponse.json(
      { data: result },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      { error: err },
      { status: 500 },
    );
  }
}