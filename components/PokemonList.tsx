"use client"

import { ITEMS_PER_PAGE, TOTAL_POKEMON } from "@/config/constants";
import { usePokeTypeStore } from "@/store/pokeTypeStore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import PokemonItem from "./PokemonItem";
import { PokemonPagination } from "./PokemonPagination";
import { getPokemonByTypes } from "@/lib/pokeAPI";

export default function PokemonList({currentPage}:{currentPage:number}) {
  const params = useParams()
  const {selectedTypes} = usePokeTypeStore()
  const [pokemonIds, setPokemonIds] = useState<number[]>([])

  useEffect( ()=>{
    const fetchIds = async () => {
      try {
        if (selectedTypes.length === 0 ) {
          setPokemonIds(Array.from({length:TOTAL_POKEMON}, (_,i)=>i+1))
        } else {
          const filteredIds = await getPokemonByTypes(selectedTypes)
          setPokemonIds(filteredIds)
        }
      } catch(err) {
        console.error("Failed to fetch getPokemonByTypes: ", err)
        setPokemonIds(Array.from({length:TOTAL_POKEMON}, (_,i)=>i+1))
      }
    }
    fetchIds()
  }, [selectedTypes])

  const totalPages = Math.ceil(pokemonIds.length/ITEMS_PER_PAGE)
  const validPage = Math.min(currentPage, totalPages)

  const startIdx = (validPage-1) * ITEMS_PER_PAGE
  const endIdx = startIdx + ITEMS_PER_PAGE

  const displayIds = pokemonIds.slice(startIdx, endIdx)
  return (
    <>
    
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 m-4">
        {
          displayIds.length > 0 ? (
            displayIds.map(id => {
              return(
                // <Suspense
                //   key={id}
                //   fallback={<PokemonSkeleton/>}
                // >
                //   <PokemonItem id={String(id)}/>
                // </Suspense>
                <PokemonItem key={id} id={id} />
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
          params={params as Record<string, string>}
        />
      </div>
    </>
  )

}