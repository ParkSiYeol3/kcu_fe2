import PokemonCard from "@/components/PokemonCard";
import { PokemonSkeleton } from "@/components/PokemonCardSkeleton";
import { getPokemon } from "@/lib/pokeAPI";
import { Suspense } from "react";

async function PokemonItem({id}:{id:string}) {
  await new Promise(r=>setTimeout(r,2000));
  const pokemon = await getPokemon(String(id))
  return (
    <PokemonCard id={String(id)} pokemon={pokemon} />
  )
}

export default async function Home() {
  // const pokemons = await Promise.all(
  //   Array.from({length:30}, (_,i) => {
  //     return getPokemon(String(i+1))
  //   })
  // )
  return (
    <main className="w-full mx-auto px-20 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 m-4">
        {
          // pokemons.map((pokemon, i) => {
          //   return <PokemonCard key={i} id={String(i+1)} pokemon={pokemon} />
          // })
          Array.from({length:30}, (_, i)=> {
            return (
              <Suspense
                key={i+1}
                fallback={<PokemonSkeleton/>}
              >
                <PokemonItem id={String(i+1)}/>
              </Suspense>
            )
          })
        }
      </div>
    </main>
  );
}