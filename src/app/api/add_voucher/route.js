import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectToDatabase from '@/lib/db';
import Voucher from '@/models/Voucher';
import admin from '@/data/admins.json';

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    if (!admin.includes(session.user.email)) {
      return new Response(JSON.stringify({ error: 'Access denied' }), { status: 403 });
    }

    const { code, type, value, validUntil } = await req.json();

    if (!code || !type || !value || !validUntil) {
      return new Response(
        JSON.stringify({ error: 'Semua field harus diisi.' }),
        { status: 400 }
      );
    }

    if (type === 'percentage' && value > 100) {
      return new Response(
        JSON.stringify({ error: 'Diskon persentase harus kurang dari atau sama dengan 100.' }),
        { status: 400 }
      );
    }

    await connectToDatabase();

    let existingVoucher = await Voucher.findOne({ code });

    if (existingVoucher) {
      existingVoucher.type = type;
      existingVoucher.discount = value;
      existingVoucher.valid_until = new Date(validUntil);
      await existingVoucher.save();
    } else {
      const newVoucher = new Voucher({
        code,
        type,
        discount: value,
        valid_until: new Date(validUntil),
      });
      await newVoucher.save();
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Voucher berhasil ditambahkan.' }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500 }
    );
  }
}
