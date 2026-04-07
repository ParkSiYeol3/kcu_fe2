const age: number = 26;
const userName:string = 'Peter';
const isAdmin:boolean = false;

const arr:number[] = [1, 2, 3]
const tuple: [string, number] = ['a', 10]
const anything:any = '자유'
const unknownVal:unknown = 10

// age = anything;
// age = unknownVal;

function add(a:number, b:number): number {
    return 10
}

const great = (name:string): void => {
    console.log("Hi, " + name)
}

type User01 = {
    name: string;
    age: number;
}

const u1: User01 = {name: 'Peter', age: 100}

interface Person {
    name: string;
    speak(msg:string): void;
}

const p1: Person = {
    name:"Ele",
    speak(msg) {
        console.log(msg)
    },
}

type ID = string | number;
let userId: ID = 123;
userId = 'abc'

const val: string | number = "Hi"; // 유니언
type A = {a: string};
type B = {b: number};
type C = A & B; // 인터섹션

const obj: C = { a: "x", b: 1 };