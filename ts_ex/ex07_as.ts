const keys = Object.keys({ 'a': 1, 'b': 2 });
const keys2 = Object.keys({'a': 1, 'b': 2}) as ('a' | 'b')[];

let value = "hello" as unknown;
value = 10;

const user2 = { name: "kim", age: 20 };
const key = "email" as keyof typeof user2;

console.log(user2[key]); // undefined

const user3 = { name: "kim", age: 20 };

Object.keys(user3).forEach((key) => {
  console.log(user3[key as keyof typeof user3]); // 에러 발생
});
