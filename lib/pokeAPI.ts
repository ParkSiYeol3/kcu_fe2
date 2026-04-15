import { PokemonTypeKey } from "@/config/pokemonTypes";
import { notFound } from "next/navigation";

export interface PokemonProps {
    id: number,
    name: string,
    koName: string,
    types: PokemonTypeKey[],
    image: string
}

export async function getPokemon(id:string): Promise<PokemonProps> {
    try {
        // const pokemonId = Number(id);
        // if (!Number.isInteger(id) || pokemonId < 1 || pokemonId > 1008) {
        //     console.log(`getPokemon: ${id}`)
        //     notFound();
        // }

        console.log(`${id}번 포켓몬 API 호출`)
        const [res, speciesRes] = await Promise.all([
          fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
            next:{revalidate:3600} 
            // cache: 'no-store'
          }),
          fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`, {
            next:{revalidate:3600}
            // cache: 'no-store'
          })
        ])
        if(!res.ok || !speciesRes.ok) {
            throw new Error(`포켓몬 데이터를 불러올 수 없음: ${id}`)
        }
        // if (res.status === 404 || speciesRes.status === 404) {
        //     notFound();
        // }

        const data = await res.json();
        const speciesData = await speciesRes.json();

        const result = {
            id: data.id,
            name: data.name,
            koName: speciesData.names.find( (n:{language: {name:string}}) => n.language.name === 'ko' ) ?.name,
            types: data.types?.map( (t:{type: {name:string}}) => t.type.name ),
            image: data.sprites.other["official-artwork"].front_default,
        }
        return result;
    } catch (err) {
        console.error(err)
        throw err;
    }
}

export async function getPokemonByType(typeName: string): Promise<number[]> {
    const res = await fetch(`https://pokeapi.co/api/v2/type/${typeName}`, {
        next:{revalidate:86400} // 24시간
    })
    if (!res.ok) return [];
    
    const data = await res.json();
    return data.pokemon.map( (p:{pokemon: {url:string}}) => {
        const id = parseInt(p.pokemon.url.split('/')[6]);
        return id;
    } ).filter( (id: number) => id <= 1025 );
}

export async function getPokemonByTypes(types: string[]): Promise<number[]> {
    if (types.length === 0) {
        return [];
    }
    const result = await Promise.all (
        types.map(type => getPokemonByType(type))
    )
    // 연습문제 - getPokemonIdByTypes 완성하기 - 하나의 배열로 합치고, 중복제거, 정렬하기
    const set = result.flat();
    return [...set].sort((a,b) => a-b);
}