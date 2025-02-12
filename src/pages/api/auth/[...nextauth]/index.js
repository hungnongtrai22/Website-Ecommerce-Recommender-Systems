import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import Auth0Provider from "next-auth/providers/auth0";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import bcrypt from "bcrypt";
import clientPromise from "../lib/mongodb";
import db from "../../../../utils/db";
import User from "../../../../models/User";

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  site: process.env.NEXTAUTH_URL, // Kiểm tra lại NEXTAUTH_URL có đúng không
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Vui lòng nhập đầy đủ email và mật khẩu.");
        }

        await db.connectDB(); // Đảm bảo MongoDB được kết nối trước khi truy vấn

        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("Email này không tồn tại.");
        }

        return await signInUser({ password: credentials.password, user });
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.sub) {
        const user = await User.findById(token.sub);
        if (user) {
          session.user.id = user._id.toString();
          session.user.role = user.role || "user";
          token.role = user.role || "user";
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
    signOut: "/signout", // Thêm trang signOut nếu cần
    error: "/auth/error", // Nếu có lỗi, redirect đến trang error thay vì trả về HTML
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.JWT_SECRET,
});

const signInUser = async ({ password, user }) => {
  if (!password) {
    throw new Error("Vui lòng nhập mật khẩu của bạn.");
  }

  if (!user.emailVerified) {
    throw new Error("Vui lòng xác thực tài khoản của bạn qua email.");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Mật khẩu không đúng.");
  }

  return user;
};
