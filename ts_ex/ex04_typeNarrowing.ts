function lengthOrAdd(x: number | string) {
    if (typeof x === 'string'){
        return x.length
    } else {
        return x + 1
    }
}

type Fish = {swim: ()=>void}
type Bird = {fly: ()=>void}

function move(animal: Fish | Bird) {
    if("swim" in animal) {
        animal.swim()
    } else {
        animal.fly()
    }
}

// - 연습문제
//     - 함수 `func`는 파라미터 `input` 을 받음
//         - `input` 은 string 또는 문자 배열 또는 숫자 배열을 파라미터로 받음
//     - 파라미터 `input` 의 타입에 따라
//         - string이면 문자열의 길이를
//         - 배열이면 배열의 첫 번째 요소를 반환
//             - 배열은 문자 배열 또는 숫자 배열을 받을 수 있음

function practice(input: string | string[] | number[]) {
    if(typeof input === 'string') {
        return input.length
    } else {
        return input[0]
    }
}

// * 함수 Type Alias
type Add = (a: number, b: number) => number;

const addFn: Add = (x,y) => x+y
// const addFn:Add = function (x,y) { return x+y }

function run(fn: Add) {
  console.log(fn(3, 5));
}

run(addFn);