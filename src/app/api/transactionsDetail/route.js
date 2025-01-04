import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectToDatabase from '@/lib/db';
import Order from '@/models/Order';
import Participant from '@/models/Participant';
import Package from '@/models/Package';
import Midtrans from 'midtrans-client';
import { appendToSheet } from '@/lib/googleSheets';
import { sendHtmlEmail } from '@/lib/mailer';

let coreApi = new Midtrans.CoreApi({
  isProduction: false,
  serverKey: process.env.SECRET,
  clientKey: process.env.NEXT_PUBLIC_CLIENT,
});

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    await connectToDatabase();

    const { order_id } = await req.json();

    let orderData;

    if (!order_id) {
      orderData = await Order.findOne({ user_id: session.user.id }).sort({ created_at: -1 });
      if (!orderData) {
        return new Response(JSON.stringify({ error: 'Tidak ada transaksi ditemukan.' }), { status: 404 });
      }
    } else {
      orderData = await Order.findOne({ _id: order_id });
      if (!orderData) {
        return new Response(JSON.stringify({ error: 'Transaksi tidak ditemukan.' }), { status: 404 });
      }
    }

    if (orderData?.user_id.toString() !== session?.user?.id) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const transactionStatus = await coreApi.transaction.status(orderData._id.toString());
    const transaction_status = transactionStatus?.transaction_status;

    if (orderData.payment_status !== "paid" && orderData.payment_status !== "expire") {
      if (transaction_status === "settlement") {
        orderData.payment_status = "paid";

        const participants = await Participant.find({ _id: { $in: orderData.participant_ids } });

        const packageData = await Package.findById(orderData.package_id);
        const packageName = packageData?.name || "Unknown";

        const sheetName = 'Peserta';
        const timestamp = new Date().toISOString();

        for (const participant of participants) {
          const participantData = [
            participant._id.toString(),
            participant.name,
            participant.phone,
            participant.email,
            participant.school,
            participant.kode,
            packageName,
            orderData._id.toString(),
            timestamp,
          ];
          await appendToSheet(sheetName, participantData);

          const html = `Halo ${participant.name}, terimakasih sudah daftar to, ini kodemu ${participant.kode}`
          await sendHtmlEmail(participant.email, html)
        }
      } else {
        orderData.payment_status = transaction_status;
      }
      await orderData.save();
    }

    return new Response(
      JSON.stringify({ success: true, transactions: orderData, order_id: orderData._id }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
