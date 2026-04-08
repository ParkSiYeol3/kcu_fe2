// let firstName: "Oh";
// firstName = "Oh";
// firstName = 'Park';

type Direction = 'left' | 'right' | 'up' | 'down';

function action(dir:Direction) {
    console.log(`moving ${dir}`)
}

action('left')
// action('jump')

const colors = {
    fire: 'red',
    water: 'blue',
    grass: 'green'
} as const;

// 이제 key/value가 리터럴 타입으로 인식된다.
// colors.fire = 'pink'; // 에러

// * Record

type UserInfo = Record<string, string>
type UserInfo1 = {[key:string]:string}

const user01: UserInfo = {
    name: "kim",
    city: "cheonan",
    age: "23"
}

// type PokemonTypes = "fire" | "water" | "grass";
// type TypeColor = Record<PokemonTypes, string>

// const color:TypeColor = {
//     fire: "red",
//     water: "blue",
//     grass: "green"
// }

type PokemonType = "fire" | "water" | "grass";
type PokemonColor = "red" | "blue" | "green";

type TypeColorMap = Record<PokemonType, PokemonColor>;

const pokeColors: TypeColorMap = {
  fire: "red",
  water: "blue",
  grass: "green"
};
