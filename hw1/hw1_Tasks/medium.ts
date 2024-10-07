// DeepPartial<T> - Тип для объекта, все ключи которого опциональны, включая вложенные объекты
export type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

// MyCapitalize<T> - реализация Capitalize<T> из TypeScript
export type MyCapitalize<T extends string> = T extends `${infer FirstLetter}${infer LastString}`
    ? `${Uppercase<FirstLetter>}${LastString}`
    : T;

// DeepMutable<T> - Тип для объекта, который делает все ключи изменяемыми, включая вложенные объекты
export type DeepMutable<T> = {
    -readonly [K in keyof T]: T[K] extends object ? DeepMutable<T[K]> : T[K];
};

// ParseURLParams<StringElem> - Тип, возвращающий перечисление частей строк, являющимися параметрами URL-строки
export type ParseURLParams<StringElem extends string> =
    StringElem extends `${infer Prefix}/:${infer Param}/${infer Rest}`
    ? Param | ParseURLParams<Rest>
    : StringElem extends `${infer Prefix}:${infer Param}`
    ? Param
    : never;

    // Проверка DeepPartial
type NestedObject = { name: string; details: { age: number; location: string } };
type PartialNestedObject = DeepPartial<NestedObject>;

// Проверка MyCapitalize
type CapitalizedString = MyCapitalize<'hello'>; // 'Hello'

// Проверка DeepMutable
type ReadonlyNestedObject = {
  readonly name: string;
  readonly details: {
    readonly age: number;
    readonly location: string;
  };
};
type MutableNestedObject = DeepMutable<ReadonlyNestedObject>;

// Проверка ParseURLParams
type URLParams = ParseURLParams<'posts/:id/:user/:comment'>; // 'id' | 'user' | 'comment'

// Тесты
const testPartialNestedObject: PartialNestedObject = { name: 'Vasya', details: { location: 'SPB' } };
const testCapitalizedString: CapitalizedString = 'Hello';
const testMutableNestedObject: MutableNestedObject = {
  name: 'Nastya',
  details: { age: 25, location: 'EKB' },
};
const testURLParams: URLParams = 'id';

// Вывод результатов
console.log('DeepPartial Test:', testPartialNestedObject);
console.log('MyCapitalize Test:', testCapitalizedString);
console.log('DeepMutable Test:', testMutableNestedObject);
console.log('ParseURLParams Test:', testURLParams);

console.log('All tests passed!');
