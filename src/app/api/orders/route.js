import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectToDatabase from '@/lib/db';
import Order from '@/models/Order';
import Participant from '@/models/Participant';
import Package from '@/models/Package';
import Voucher from '@/models/Voucher';

function generateUniqueCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

async function createUniqueParticipantCode() {
  let code;
  let isUnique = false;

  while (!isUnique) {
    code = generateUniqueCode();
    const existingParticipant = await Participant.findOne({ kode: code });
    if (!existingParticipant) {
      isUnique = true;
    }
  }
  return code;
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const { packageName, voucher, additionalParticipants } = await req.json();

    await connectToDatabase();

    const selectedPackage = await Package.findOne({ name: packageName });
    if (!selectedPackage) {
      return new Response(JSON.stringify({ error: 'Paket tidak ditemukan.' }), { status: 404 });
    }

    const maxParticipants = selectedPackage.max_participants;
    const basePrice = selectedPackage.price;
    let discount = 0;

    const totalParticipants = 1 + (additionalParticipants?.length || 0);
    if (totalParticipants > maxParticipants) {
      return new Response(
        JSON.stringify({ error: `Jumlah partisipan tidak boleh melebihi ${maxParticipants}.` }),
        { status: 400 }
      );
    }

    if (voucher) {
      const validVoucher = await Voucher.findOne({ code: voucher });
      if (!validVoucher) {
        return new Response(JSON.stringify({ success: false, error: "Voucher tidak ditemukan." }), { status: 404 });
      }

      const currentDate = new Date();
      if (currentDate > validVoucher.valid_until) {
        return new Response(
          JSON.stringify({ success: false, error: "Voucher sudah kedaluwarsa." }),
          { status: 400 }
        );
      }

      if (validVoucher.type === 'nominal') {
        discount = validVoucher.discount;
      } else if (validVoucher.type === 'percentage') {
        discount = (basePrice * validVoucher.discount) / 100;
      }

      discount = Math.min(discount, basePrice);
    }

    const totalPrice = basePrice - discount;

    const participants = [];

    const mainKode = await createUniqueParticipantCode();
    const mainParticipant = new Participant({
      user_id: session.user.id,
      kode: mainKode,
      name: session.user.name,
      email: session.user.email,
      school: session.user.school,
      phone: session.user.phone,
      is_user: true,
    });
    await mainParticipant.save();
    participants.push(mainParticipant._id);

    if (additionalParticipants && additionalParticipants.length > 0) {
      for (const participant of additionalParticipants) {
        const kode = await createUniqueParticipantCode();
        const newParticipant = new Participant({
          user_id: session.user.id,
          kode,
          name: participant.name,
          email: participant.email,
          school: participant.school,
          phone: participant.phone,
          is_user: false,
        });
        await newParticipant.save();
        participants.push(newParticipant._id);
      }
    }

    const newOrder = new Order({
      user_id: session.user.id,
      package_id: selectedPackage._id,
      participant_ids: participants,
      voucher_code: voucher,
      total_price: totalPrice,
      payment_status: 'pending',
    });
    await newOrder.save();

    const paymentUrl = `/payment_success?orderId=${newOrder._id}`;
    return new Response(JSON.stringify({ success: true, paymentUrl }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
