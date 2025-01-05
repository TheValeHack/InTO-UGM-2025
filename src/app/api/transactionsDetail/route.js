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
  isProduction: true,
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

    if (orderData?.processing) {
      return new Response(
        JSON.stringify({ error: 'Permintaan sedang diproses, harap tunggu.' }),
        { status: 429 }
      );
    }

    if(orderData?.payment_status == "paid"){
      return new Response(
        JSON.stringify({ success: true, transactions: orderData, order_id: orderData._id }),
        { status: 200 }
      );
    }

    const transactionStatus = await coreApi.transaction.status(orderData._id.toString());
    const transaction_status = transactionStatus?.transaction_status;

    console.log(transactionStatus)

    if (orderData.payment_status !== "paid" && orderData.payment_status !== "expire") {
      orderData.processing = true;
      await orderData.save();

      if (transaction_status === "settlement") {
        orderData.payment_status = "paid";
        await orderData.save();

        const participants = await Participant.find({ _id: { $in: orderData.participant_ids } });

        const packageData = await Package.findById(orderData.package_id);
        const packageName = packageData?.name || "Unknown";

        const sheetName = 'Peserta';
        const now = new Date();
        const timestamp = new Date(now.getTime() + 7 * 60 * 60 * 1000).toISOString().replace('T', ' ').slice(0, 19);

        const whatsappGroupLink = "http://chat.whatsapp.com/LJmhEwUkFIy18uKunf2mdw";

        await Promise.all(
          participants.map(async (participant) => {
            try {
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
              const html = `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                  <h2>Halo ${participant.name},</h2>
                  <p>Terima kasih telah mendaftar untuk mengikuti tryout dengan paket <strong>${packageName}</strong>. Kami sangat senang dapat mendukung persiapanmu!</p>
                  <p>Berikut adalah ID tiketmu yang akan digunakan saat tryout:</p>
                  <div style="font-size: 20px; font-weight: bold; text-align: center; margin: 20px 0;">
                    ${participant.kode}
                  </div>
                  <p>Pastikan kamu menyimpan ID tiket ini dengan baik.</p>
                  <p>Kami juga mengundangmu untuk bergabung ke grup WhatsApp resmi kami, di mana kamu akan mendapatkan informasi dan pembaruan lebih lanjut mengenai tryout:</p>
                  <div style="text-align: center; margin: 20px 0;">
                    <a href="${whatsappGroupLink}" style="display: inline-block; background-color: #25D366; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-size: 16px;">
                      Bergabung ke Grup WhatsApp
                    </a>
                  </div>
                  <p>Jika ada pertanyaan, jangan ragu untuk menghubungi kami. Semoga sukses dan sampai bertemu di tryout!</p>
                  <p>Salam hangat,</p>
                  <p><strong>Tim INTO UGM 2024</strong></p>
                </div>
              `;
              const text = `
              Halo ${participant.name},

              Terima kasih telah mendaftar untuk mengikuti tryout dengan paket ${packageName}. Kami sangat senang dapat mendukung persiapanmu!

              Berikut adalah ID tiketmu yang akan digunakan saat tryout:

              ${participant.kode}

              Pastikan kamu menyimpan ID tiker ini dengan baik.

              Kami juga mengundangmu untuk bergabung ke grup WhatsApp resmi kami, di mana kamu akan mendapatkan informasi dan pembaruan lebih lanjut mengenai tryout. Silakan klik tautan di bawah ini untuk bergabung:

              http://chat.whatsapp.com/LJmhEwUkFIy18uKunf2mdw

              Jika ada pertanyaan, jangan ragu untuk menghubungi kami. Semoga sukses dan sampai bertemu di tryout!

              Salam hangat,
              Tim InTO UGM 2025
              `;

              await sendHtmlEmail(participant.email, html, text);
              await appendToSheet(sheetName, participantData);
            } catch (err) {
              console.log(`Failed to process participant ${participant._id}:`, err);
            }
          })
        );
      } else {
        orderData.payment_status = transaction_status;
        await orderData.save();
      }
    }

    if (orderData) {
      orderData.processing = false;
      await orderData.save();
    }

    return new Response(
      JSON.stringify({ success: true, transactions: orderData, order_id: orderData._id }),
      { status: 200 }
    );
  } catch (error) {
    // if (orderData) {
    //   orderData.processing = false;
    //   await orderData.save();
    // }
    console.log(error)
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
