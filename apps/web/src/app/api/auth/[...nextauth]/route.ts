import { authOptions } from "auth/server";
import NextAuth from "auth/next-auth";

const handler = NextAuth({
  ...authOptions,
  // pages: {
  //   signIn: "/auth/signin",
  //   signOut: "/auth/signout",
  //   error: "/auth/error",
  //   verifyRequest: "/auth/verify-request",
  //   newUser: "/auth/new-user"
  // }
});

export { handler as GET, handler as POST };
