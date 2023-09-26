import { authOptions } from "auth/server";
import NextAuth from "auth/next-auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
