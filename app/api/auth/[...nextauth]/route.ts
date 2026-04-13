import { supabase } from "@/lib/supabase";
import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOption:NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || "",
            issuer: "https://github.com/login/oauth",
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID || "",
            clientSecret: process.env.GOOGLE_SECRET || "",
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({user}) {
            const {data: existingUser} = await supabase
            .from("users")
            .select("*")
            .eq("oauth_id", user.id)
            .single();
        if (!existingUser) {
            await supabase
            .from("users")
            .insert({
                oauth_id: user.id,
                name: user.name,
                email: user.email,
                data: {points: 10000}
            })
        }
        return true;
        },

        async jwt({token, user}) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },

        async session({session, token}) {
            if(session.user) {
                session.user.id = token.id as string;
            }
            return session;
        }
    }
}

const handler = NextAuth(authOption);
export {handler as GET, handler as POST};