"use client"

import { getTypeConfig } from "@/config/pokemonTypes";
import { getPokemon, PokemonProps } from "@/lib/pokeAPI"
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { cn } from "@/lib/utils";
import TypeBadge from "./TypeBadge";
import Image from "next/image";

export default function PokemonCard({id, pokemon}:{id:string, pokemon:PokemonProps}) {

  if (!pokemon) return <div>Loading...</div>

  const typeConfig = getTypeConfig(pokemon?.types[0])

  return (
    <Link href={`/pokemon/${id}`}>
      <Card
        className={cn(
          "w-full",
          "border border-black",
          "rounded-md",
          "hover:opacity-80",
          "hover:scale-102",
          "transition-all",
          "duration-200",
          "hover:cursor-pointer",
          "ring-3!",
          typeConfig.ringClass,
        )}
      >

        <CardHeader className="flex justify-center">
          <CardTitle>
            {`${pokemon?.koName}(${pokemon?.name})`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center gap-2">
            {pokemon?.types.map( (t,i) => <TypeBadge key={i} typeName={t}/>)}
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
  )
}