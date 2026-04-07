type User = {
    name: string;
    age: number;
}

const user1: User = {name:"철수", age:20}

type Car = {
  readonly brand: string;
  year: number;
};

const myCar: Car = { brand: "Tesla", year: 2024 };
myCar.year = 2025;     // 가능
// myCar.brand = "Hyundai"; // 오류! readonly 속성은 수정 불가

type UserProfile = {
    readonly id: number;
    name: string;
    age: number;
    email: string;
}

const user: UserProfile = {
    id: 1001,
    name: "Park",
    age: 33,
    email: "GrandPark@naver.com"
};

user.name = "Lee";
// user.id = 2000;