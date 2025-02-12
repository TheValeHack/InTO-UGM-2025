import connectToDatabase from "@/lib/db";
import Participant from "@/models/Participant";
import Order from "@/models/Order";
import Package from "@/models/Package";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import admin from "@/data/admins.json";
import { sendHtmlEmail } from "@/lib/mailer";
import { appendToSheet } from "@/lib/googleSheets";

const generateUniqueCode = async () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code;

  do {
    code = Array.from({ length: 6 }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
    ).join("");
    const existingParticipant = await Participant.findOne({ kode: code });
    if (!existingParticipant) {
      break;
    }
  } while (true);

  return code;
};

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !admin.includes(session.user.email)) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    await connectToDatabase();

    const { name, email, school, phone } = await req.json();

    if (!name || !email || !school || !phone) {
      return new Response(
        JSON.stringify({ error: "Semua data (nama, email, sekolah, nomor telepon) harus diisi!" }),
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Format email tidak valid!" }),
        { status: 400 }
      );
    }

    const phoneRegex = /^(?:\+62|0)[2-9][0-9]{7,12}$/;
    if (!phoneRegex.test(phone)) {
      return new Response(
        JSON.stringify({ error: "Format nomor telepon tidak valid!" }),
        { status: 400 }
      );
    }

    const paketDewekan = await Package.findOne({ name: "Dewekan" });
    if (!paketDewekan) {
      return new Response(
        JSON.stringify({ error: "Paket Dewekan tidak ditemukan." }),
        { status: 404 }
      );
    }

    const kode = await generateUniqueCode();

    const participant = new Participant({
      name,
      email,
      school,
      phone,
      kode,
      is_user: false,
    });

    await participant.save();

    const order = new Order({
      user_id: session.user.id,
      package_id: paketDewekan._id,
      participant_ids: [participant._id],
      total_price: paketDewekan.price,
      payment_status: "paid",
      created_at: new Date(),
    });

    await order.save();

    try {
        const sheetName = 'Peserta';
        const now = new Date();
        const timestamp = new Date(now.getTime() + 7 * 60 * 60 * 1000).toISOString().replace('T', ' ').slice(0, 19);
        const whatsappGroupLink = "http://chat.whatsapp.com/LJmhEwUkFIy18uKunf2mdw";

        const participantData = [
        participant._id.toString(),
        participant.name,
        participant.phone,
        participant.email,
        participant.school,
        participant.kode,
        paketDewekan.name,
        order._id.toString(),
        timestamp,
        ];
        const html = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2>Halo ${participant.name},</h2>
            <p>Terima kasih telah mendaftar untuk mengikuti tryout dengan paket <strong>${paketDewekan.name}</strong>. Kami sangat senang dapat mendukung persiapanmu!</p>
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
            <p><strong>Tim InTO UGM 2025</strong></p>
        </div>
        `;
        const text = `
        Halo ${participant.name},

        Terima kasih telah mendaftar untuk mengikuti tryout dengan paket ${paketDewekan.name}. Kami sangat senang dapat mendukung persiapanmu!

        Berikut adalah ID tiketmu yang akan digunakan saat tryout:

        ${participant.kode}

        Pastikan kamu menyimpan ID tiket ini dengan baik.

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

    return new Response(
      JSON.stringify({
        success: true,
        message: "Peserta berhasil ditambahkan ke paket Dewekan.",
        order_id: order._id,
        kode,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding participant:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
