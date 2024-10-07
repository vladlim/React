// MyPick<T, K> - реализация Pick из TypeScript
export type MyPick<T, K extends keyof T> = {
    [P in K]: T[P];
};

// NOfArray<ArrayObj, N> - дженерик для массива, возвращающий тип его N элемента
export type NOfArray<ArrayObj extends any[], N extends number> = ArrayObj[N];

// Unshift<ArrayType, Elem> - Дженерик для массива, первый элемент которого имеет тип Elem, а остальные элементы - тип массива в первом переданном параметре
export type Unshift<ArrayType extends any[], Elem> = [Elem, ...ArrayType];

// MyExclude<T, U> - реализация Exclude из TypeScript
export type MyExclude<T, U> = T extends U ? never : T;

// Проверка MyPick
type Original = { name: string; age: number; location: string };
type Picked = MyPick<Original, 'name' | 'age'>; // { name: string; age: number }

// Проверка NOfArray
type Arr = [string, number, boolean];
type ThirdElement = NOfArray<Arr, 2>; // boolean

// Проверка Unshift
type OriginalArray = [number, boolean];
type NewArray = Unshift<OriginalArray, string>; // [string, number, boolean]

// Проверка MyExclude
type Union = 'a' | 'b' | 'c';
type Excluded = MyExclude<Union, 'a' | 'c'>; // 'b'

// Тесты
const testMyPick: Picked = { name: 'John', age: 30 };
const testNOfArray: ThirdElement = true;
const testUnshift: NewArray = ['hello', 42, false];
const testMyExclude: Excluded = 'b';

// Вывод результатов
console.log('MyPick Test:', testMyPick);
console.log('NOfArray Test (3rd element):', testNOfArray);
console.log('Unshift Test:', testUnshift);
console.log('MyExclude Test:', testMyExclude);

console.log('All tests passed!');
