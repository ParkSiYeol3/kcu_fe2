import PokemonCard from "@/components/PokemonCard";
import { PokemonSkeleton } from "@/components/PokemonCardSkeleton";
import { PokemonPagination } from "@/components/PokemonPagination";
import TypeFilter from "@/components/TypeFilter";
import { getPokemon, getPokemonByTypes } from "@/lib/pokeAPI";
import { Metadata } from "next";
import { redirect } from "next/navigation";

import { Suspense } from "react";

export const metadata: Metadata = {
  title: "홈 | 포켓몬 도감",
  description: "포켓몬을 검색해 보세요",
};

async function PokemonItem({id}:{id:string}) {
  // await new Promise(r=>setTimeout(r,2000));
  const pokemon = await getPokemon(String(id))
  return (
    <PokemonCard id={String(id)} pokemon={pokemon} />
  )
}


const ITEMS_PER_PAGE = 12;
const TOTAL_POKEMON = 1025;

export default async function Home({searchParams}:{searchParams:Promise<{page?:string, type?:string}>}) {
  // const pokemons = await Promise.all(
  //   Array.from({length:30}, (_,i) => {
  //     return getPokemon(String(i+1))
  //   })
  // )
  const params = await searchParams
  const currentPage = Number(params.page)
  // const totalPages = Math.ceil(TOTAL_POKEMON / ITEMS_PER_PAGE);
  // console.log(`current page: ${currentPage}`);

  if (isNaN(currentPage) || currentPage < 1) {
    redirect('/?page=1')
  }

  const selectedTypes = params.type ? params.type.split(',') : []
  let pokemonIds:number[]
  if(selectedTypes.length>0) {
    pokemonIds = await getPokemonByTypes(selectedTypes)
  } else {
    pokemonIds = Array.from({length:TOTAL_POKEMON}, (_,i)=>i+1)
  }
  const totalPages = Math.ceil(pokemonIds.length/ITEMS_PER_PAGE)
  const validPage = Math.min(currentPage, totalPages)

  // if (currentPage > totalPages) {
  //   redirect(`/?page=${totalPages}`)
  // }

  const startIdx = (validPage-1) * ITEMS_PER_PAGE
  const endIdx = startIdx + ITEMS_PER_PAGE

  const displayIds = pokemonIds.slice(startIdx, endIdx)

  return (
    <main className="w-full mx-auto px-20 py-8">
      <TypeFilter />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 m-4">
        {
          displayIds.length > 0 ? (
            displayIds.map(id => {
              return(
                <Suspense
                  key={id}
                  fallback={<PokemonSkeleton/>}
                >
                  <PokemonItem id={String(id)}/>
                </Suspense>
              )
            })
          ) : (
            <div>해당 타입의 포켓몬이 없습니다.</div>
          )
        }
      </div>
      <div className="flex justify-center py-6">
        <PokemonPagination 
          currentPage={currentPage}
          totalPages={totalPages}
          params={params}
        />
      </div>
    </main>
  );
}