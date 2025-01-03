import connectToDatabase from '@/lib/db';
import User from '@/models/User';
import VerificationToken from '@/models/VerificationToken';
import { sendVerificationEmail } from '@/lib/mailer';
import crypto from 'crypto';

export async function POST(req) {
  const body = await req.json(); // Parse JSON body

  const { name, email, password, school, phone } = body;

  // Regular expressions for validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Valid email format
  const phoneRegex = /^(?:\+62|0)[2-9][0-9]{7,12}$/; // Valid phone number format

  // Trim phone number and remove spaces
  const cleanedPhone = phone.replace(/\s+/g, '');

  // Server-side validation
  if (!name || !email || !password || !school || !cleanedPhone) {
    return new Response(JSON.stringify({ error: 'All fields are required.' }), { status: 400 });
  }

  if (!emailRegex.test(email)) {
    return new Response(JSON.stringify({ error: 'Invalid email format.' }), { status: 400 });
  }

  if (password.length < 8) {
    return new Response(JSON.stringify({ error: 'Password must be at least 8 characters long.' }), { status: 400 });
  }

  if (!phoneRegex.test(cleanedPhone)) {
    return new Response(
      JSON.stringify({ error: 'Invalid phone number format. Use e.g., 081234567890 or +6281234567890.' }),
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ error: 'Email is already registered.' }), { status: 400 });
    }

    // Create new user
    const newUser = new User({ name, email, password, school, phone: cleanedPhone });
    await newUser.save();

    // Generate verification token
    const token = crypto.randomBytes(32).toString('hex');
    const verificationToken = new VerificationToken({ userId: newUser._id, token });
    await verificationToken.save();

    // Send verification email
    await sendVerificationEmail(email, token);

    return new Response(
      JSON.stringify({ message: 'User registered successfully. Please verify your email.' }),
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
