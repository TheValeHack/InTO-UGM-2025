import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcrypt';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await connectToDatabase();

        const { email, password } = credentials;

        const user = await User.findOne({ email });
        if (!user) throw new Error('Email atau password salah!');
        if (!user.is_verified) throw new Error('Verifikasi email anda terlebih dahulu sebelum login.');

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw new Error('Email atau password salah!');

        return { id: user._id, name: user.name, email: user.email, school: user.school, phone: user.phone };
      },
    }),
  ],
  session: { jwt: true },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
