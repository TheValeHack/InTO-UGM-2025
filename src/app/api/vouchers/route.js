import connectToDatabase from '@/lib/db';
import Voucher from '@/models/Voucher';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import admin from '@/data/admins.json';

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !admin.includes(session.user.email)) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    await connectToDatabase();

    const vouchers = await Voucher.find({}, { _id: 1, code: 1, type: 1, discount: 1, valid_until: 1 });

    return new Response(JSON.stringify({ success: true, vouchers }), { status: 200 });
  } catch (error) {
    console.error('Error fetching vouchers:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
