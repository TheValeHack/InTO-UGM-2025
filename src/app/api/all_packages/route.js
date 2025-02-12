import connectToDatabase from '@/lib/db';
import Package from '@/models/Package';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import admin from '@/data/admins.json';

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);

    await connectToDatabase();

    const packages = await Package.find({}, { _id: 1, name: 1, desc: 1, price: 1, max_participants: 1 });

    const packageOrder = ['Dewekan', 'Betigo', 'Belimo'];
    packages.sort((a, b) => {
      return packageOrder.indexOf(a.name) - packageOrder.indexOf(b.name);
    });

    return new Response(JSON.stringify({ success: true, packages }), { status: 200 });
  } catch (error) {
    console.error('Error fetching packages:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
