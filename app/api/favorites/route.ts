import { getServerSession } from "next-auth";
import { authOption } from "../auth/[...nextauth]/route";
import { supabase } from "@/lib/supabase";

export async function GET() {
    const session = await getServerSession(authOption);
    if(!session?.user) {
        return Response.json({error: "Unauthorized"}, {status: 401});
    }

    const {data: favorites} = await supabase
    .from("favorites")
    .select("pokemon_id")
    .eq("user_id", session.user.id);

    console.log('즐겨찾기: ', favorites); // [{pokemon_id: 1}, {pokemon_id: 2}, ...]

    const pokemonIds = favorites?.map(f => f.pokemon_id) || [];
    return Response.json(pokemonIds);
}

export async function POST(request: Request) {
    const session = await getServerSession(authOption);
    if(!session?.user) {
        return Response.json({error: "Unauthorized"}, {status: 401});
    }

    const {pokemon_id} = await request.json();

    const {error} = await supabase
    .from("favorites")
    .insert({ oauth_id: session.user.id, pokemon_id });

    if(error) {
        return Response.json({error: error.message}, {status: 400});
    }

    return Response.json({success: true});
}

export async function DELETE(request: Request) {
    const session = await getServerSession(authOption);
    if(!session?.user) {
        return Response.json({error: "Unauthorized"}, {status: 401});
    }

    const {searchParams} = new URL(request.url);
    const pokemon_id = searchParams.get("pokemon_id");

    const {error} = await supabase
    .from("favorites")
    .delete()
    .eq('oauth_id', session.user.id)
    .eq('pokemon_id', Number(pokemon_id));

    if(error) {
        return Response.json({error: error.message}, {status: 400});
    }

    return Response.json({success: true});
}