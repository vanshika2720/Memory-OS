import { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { jwtVerify } from "jose";
import prisma from "@/lib/prisma";
import { sendMagicLink } from "./resend";

const joseSecret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || "fallback-secret");

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
    verifyRequest: "/",
  },
  providers: [
    EmailProvider({
      async sendVerificationRequest({ identifier: email, url }) {
        console.log(`[Magic Link] URL for ${email}: ${url}`);
        await sendMagicLink(email, url);
      },
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        otpToken: { label: "OTP Token", type: "hidden" },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;

        if (credentials.otpToken) {
          try {
            const verified = await jwtVerify(credentials.otpToken, joseSecret);
            const payload = verified.payload as { email: string; type: string };
            if (payload.email !== credentials.email.toLowerCase() || payload.type !== "otp") {
              return null;
            }

            let user = await prisma.user.findUnique({ where: { email: credentials.email } });
            if (!user) {
              user = await prisma.user.create({
                data: { email: credentials.email },
              });
            }

            return { id: user.id, email: user.email, name: user.name };
          } catch {
            return null;
          }
        }

        if (!credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.passwordHash) return null;

        const isValid = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        return {
          ...token,
          id: user.id,
        };
      }
      return token;
    },
  },
};
