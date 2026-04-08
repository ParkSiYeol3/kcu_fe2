import { use, useState } from "react"

function identity<T>(value:T): T{
    return value
}

identity<number>(10)
identity("hi")

function getFirst<T>(arr:T[]): T {
    return arr[0]
}

getFirst<number>([1, 3, 5,])
getFirst(['a', 'b', 'c'])

interface PokemonContainer <T extends string> {
    pokemonName: T
}

const firePokemon: PokemonContainer<"불꽃숭이"> = {
    pokemonName: "불꽃숭이"
}

// const numberPokemon: PokemonContainer<number> = {
//     pokemonName: 10
// }

interface Pokemon<T, U> {
    id: T,
    name: U
}

const poke1: Pokemon<number, string> = {id: 25, name: '거북왕'}
const poke2: Pokemon<string, string> = {id: '25', name: '거북왕'}

function Test() {
    const [count, setCount] = useState<number>(0)
    const [user, setUser] = useState<{name: string; age: number}>({
        name: "Tom",
        age: 10
    })
    const [name, setName] = useState("거북왕")
    const [list, setList] = useState<string[]>([]) // any[]
    const [pokemon, setPokemon] = useState< string | null >(null)
    const [pokemonList, setPokemonList] = useState<string[]>(['불꽃숭이', '라이츄', '파이리'])
}