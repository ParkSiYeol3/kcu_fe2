"use client"

import { getTypeConfig } from "@/config/pokemonTypes";
import { getPokemon, PokemonProps } from "@/lib/pokeAPI";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { cn } from "@/lib/utils";
import TypeBadge from "./TypeBadge";
import Image from "next/image";
import { useUserInfo } from "@/contexts/UserInfoContext";
import { useSession } from "next-auth/react";
import { FaStar } from "react-icons/fa6";
import FavoriteDialog from "./FavoriteDialog";

export default function PokemonCard({id, pokemon}:{id:string, pokemon:PokemonProps}) {
  // TODO 변수 추가
  const {favorites, setFavorites} = useUserInfo();
  const [showDialog, setShowDialog] = useState(false);
  const isFavorited = favorites.includes(pokemon.id);
  const {data: session} = useSession()

  if (!pokemon) return <div>Loading..</div>

  const typeConfig = getTypeConfig(pokemon?.types[0])

  function handleStarClick(e:React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    
    if(!session) {
      alert('로그인이 필요합니다.');
      return;
    }
    setShowDialog(true)
  }

  return (
    <>
      <Link href={`/pokemon/${id}`}>
        <Card
          className={cn(
            "w-full relative",
            "border border-black",
            "rounded-md",
            "hover:opacity-80",
            "hover:scale-102",
            "transition-all",
            "duration-200",
            "hover:cursor-pointer",
            "ring-3!",
            typeConfig.ringClass
          )}
        >
          <CardHeader className="flex justify-center">
            <button
              onClick={handleStarClick}
              className={cn(
                "absolute",
                "top-2 right-2 z-10 p-1 rounded-full hover:bg-white/20"
              )}
            >
              {isFavorited ? (
                <FaStar className="text-yellow-400" size={20} />
              ):(
                <FaStar className="text-gray-400" size={20} />
              )}
            </button>
            <CardTitle>
              {`${pokemon?.koName}(${pokemon?.name})`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center gap-2">
              {pokemon?.types.map( (t,i)=> <TypeBadge key={i} typeName={t}/> )}
            </div>
            <Image 
              src={pokemon?.image}
              alt={pokemon?.name}
              width={100}
              height={100}
              className="w-full h-full"
              priority
            />
          </CardContent>
        </Card>
      </Link>
      <FavoriteDialog 
        open={showDialog}
        onOpenChange={setShowDialog}
        pokemonId={pokemon.id}
        pokemonName={pokemon.name}
      />
    </>
  )
}