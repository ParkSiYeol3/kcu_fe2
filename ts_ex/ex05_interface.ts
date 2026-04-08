interface User02 {
    name: string;
    age: number;
}

const u2: User02 = {name: 'Go'}

interface Animal {
    name: string;
}

interface Dog extends Animal {
    name: "Saerom"
    bark() {
        console.log("멍멍!")
    }
}

interface User03 {name: string}
interface User03 {age: number}

const u3: User03 = {name: 'Park', age: 26}

interface User04 {
    readonly id: string;
    name: string;
}

const u4: User04 = {
    id: '10',
    name: 'Jane'
}

u4.name = 'Tom'

interface Config {
    [key: string]: string | number;
}

interface ExtendedConfig extends Config {
    port: number
}

const conf:ExtendedConfig = {
    a: 10,
    port: 100
}