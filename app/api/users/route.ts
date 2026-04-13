import { getServerSession } from "next-auth";
import { authOption } from "../auth/[...nextauth]/route";
import { supabase } from "@/lib/supabase";

export async function GET() {
    const session = await getServerSession(authOption);

    if (!session?.user) {
        return Response.json({error: "Unauthorized"}, {status: 401});
    }

    const {data:user} = await supabase
    .from("users")
    .select("*")
    .eq("oauth_id", session.user.id)
    .single();
    
    return Response.json({user});
}