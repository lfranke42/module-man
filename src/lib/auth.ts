import {GetServerSidePropsContext, NextApiRequest, NextApiResponse} from "next";
import {getServerSession, NextAuthOptions} from "next-auth";
import GithubProvider from "next-auth/providers/github";
import prisma from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_SECRET_ID as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  callbacks: {
    async jwt({token, account, profile}) {
      if (account == null || profile == null) {
        return token
      }

      // Try to add the user to the database
      const user = await prisma.user.findFirst({
        where: {id: account.providerAccountId},
      })

      // If user already exists, return the token
      if (user) {
        token.id = account.providerAccountId
        return token
      }

      await prisma.user.create({
        data: {
          id: account.providerAccountId,
          name: profile.name,
          email: profile.email,
        },
      })

      token.id = account.providerAccountId
      return token
    },
    session({session, token, user}) {
      session.user.id = token.id as string
      return session
    }
  }
};

export function auth(...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []) {
  return getServerSession(...args, authOptions)
}