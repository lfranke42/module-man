import NextAuth, {NextAuthOptions} from "next-auth";
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
      // Just return the token if isn't a sign in event
      if (account == null || profile == null) {
        return token
      }

      // Otherwise try to add the user to the database
      const user = await prisma.user.findFirst({
        where: {id: account.providerAccountId},
      })
      if (user) return token

      await prisma.user.create({
        data: {
          id: account.providerAccountId,
          name: profile.name,
          email: profile.email,
        },
      })

      return token
    }
  }
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}
