// Дженерик для конвертации строк из snake_case в camelCase
type CamelCase<T extends string> =
    T extends `${infer FirstPart}_${infer SecondPart}`
    ? `${FirstPart}${Capitalize<CamelCase<SecondPart>>}`
    : T;

// Camelize<ObjType> - Дженерик для конвертации свойств объекта из snake_case в camelCase, включая вложенность
export type Camelize<T> = {
    [K in keyof T as CamelCase<K & string>]:
    T[K] extends object
    ? Camelize<T[K]>
    : T[K];
};

// DeepPick<T, Paths> - Реализация Pick из TypeScript, но Paths может включать вложенные объекты
export type DeepPick<T, Paths extends string> = {
    [K in Paths as K extends `${infer Param}.${infer OtherParams}` ? Param : K]:
    K extends `${infer Param}.${infer OtherParams}`
    ? Param extends keyof T
    ? T[Param] extends object
    ? DeepPick<T[Param], OtherParams>
    : never
    : never
    : K extends keyof T
    ? T[K]
    : never;
};

// Пример объекта для проверки Camelize
type SnakeCaseObj = {
    first_name: string;
    last_name: string;
    address_details: {
        street_name: string;
        zip_code: number;
    };
};

type CamelizedObj = Camelize<SnakeCaseObj>;
// Ожидаемый тип CamelizedObj: 
// {
//   firstName: string;
//   lastName: string;
//   addressDetails: {
//     streetName: string;
//     zipCode: number;
//   };
// }

// Пример объекта для проверки DeepPick
type NestedObject = {
    user: {
        id: number;
        details: {
            name: string;
            age: number;
        };
    };
};

type PickedObject = DeepPick<NestedObject, 'user.details.name'>;
// Ожидаемый тип PickedObject:
// {
//   user: {
//     details: {
//       name: string;
//     };
//   };
// }

// Тесты
const testCamelizedObj: CamelizedObj = {
    firstName: 'Vasya',
    lastName: 'Pupkin',
    addressDetails: {
        streetName: 'Lenin St',
        zipCode: 12345,
    },
};

const testPickedObject: PickedObject = {
    user: {
        details: {
            name: 'Vasya',
        },
    },
};

// Вывод результатов
console.log('Camelize Test:', testCamelizedObj);
console.log('DeepPick Test:', testPickedObject);

console.log('All tests passed!');
