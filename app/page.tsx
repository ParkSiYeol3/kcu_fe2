import PokemonCard from "@/components/PokemonCard";
import { PokemonSkeleton } from "@/components/PokemonCardSkeleton";
import { getPokemon } from "@/lib/pokeAPI";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function PokemonItem({id}:{id:string}) {
  const pokemon = await getPokemon(String(id))
  return (
    <PokemonCard id={String(id)} pokemon={pokemon} />
  )
}

const ITEMS_PER_PAGE = 12;
const TOTAL_POKEMONS = 151;

export default async function Home({
  searchParams
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const params = await searchParams;
  const currentPage = Number(params.page);
  const totalPages = Math.ceil(TOTAL_POKEMONS / ITEMS_PER_PAGE);
  console.log(`current page: ${currentPage}`);

  if (isNaN(currentPage) || currentPage < 1) {
    redirect('/?page=1');
  }
  if (currentPage > totalPages) {
    redirect(`/?page=${totalPages}`);
  }

  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const NumOfPokemon = Math.min(ITEMS_PER_PAGE, TOTAL_POKEMONS - startIdx);

  return (
    <main className="w-full mx-auto px-20 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 m-4">
        {
          // pokemons.map((pokemon, i) => {
          //   return <PokemonCard key={i} id={String(i+1)} pokemon={pokemon} />
          // })
          Array.from({length: NumOfPokemon}, (_, i)=> {
            return (
              <Suspense
                key={i+1+startIdx}
                fallback={<PokemonSkeleton/>}
              >
                <PokemonItem id={String(i+1+startIdx)}/>
              </Suspense>
            )
          })
        }
      </div>
    </main>
  );
}