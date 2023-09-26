import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions
} from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import { prisma } from "db";

export type { Session, DefaultSession as DefaultAuthSession } from "next-auth";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
    };
  }

  interface User {
    createdAt: Date;
  }
}

if (!process.env.GITHUB_ID) {
  throw new Error("No GITHUB_ID has been provided.");
}

if (!process.env.GITHUB_SECRET) {
  throw new Error("No GITHUB_SECRET has been provided.");
}

const useSecureCookies = Boolean(process.env.VERCEL_URL);

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id
      }
    })
    // session: async ({ session, user }) => {
    //   // 1. State
    //   // let userRoles: RoleTypes[] = [];

    //   // 2. If user already has roles, reduce them to a RoleTypes array.
    //   // if (user.roles) {
    //   //   userRoles = user.roles.reduce((acc: RoleTypes[], role) => {
    //   //     acc.push(role.role);
    //   //     return acc;
    //   //   }, []);
    //   // }

    //   // 3. If the current user doesn't have a USER role. Assign one.
    //   // if (!userRoles.includes("USER")) {
    //   //   const updatedUser = await prisma.user.update({
    //   //     where: {
    //   //       id: user.id
    //   //     },
    //   //     data: {
    //   //       roles: {
    //   //         connectOrCreate: {
    //   //           where: {
    //   //             role: "USER"
    //   //           },
    //   //           create: {
    //   //             role: "USER"
    //   //           }
    //   //         }
    //   //       }
    //   //     },
    //   //     include: {
    //   //       roles: true
    //   //     }
    //   //   });

    //   //   userRoles = updatedUser.roles.reduce((acc: RoleTypes[], role) => {
    //   //     acc.push(role.role);
    //   //     return acc;
    //   //   }, []);
    //   // }

    //   console.log("Session", session);
    //   return {
    //     ...session,
    //     user: {
    //       ...session.user,
    //       id: user.id,
    //       // role: userRoles,
    //       createAt: user.createdAt
    //     }
    //   };
    // }
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    // EmailProvider({
    //   server: process.env.EMAIL_SERVER,
    //   from: process.env.EMAIL_FROM
    // }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!
    })
  ]
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => {
  return getServerSession(authOptions);
};
