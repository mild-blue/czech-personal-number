# Czech personal number

A package that validates and parses Czech personal identity numbers.

## Intallation

NPM:

```
npm install czech-personal-number
```

Yarn:

```
yarn add czech-personal-number
```

## Supported values

The supported range of birth years is from `1900` until the current year. For example,
`005518/532` parses as a personal identity number of a woman born on 18.05.1900, and `530110/0013` is an invalid personal number with a date of birth in the future.

This package will be relevant until the end of the year `2053`. In the year `2054` the format of personal identity numbers will have to change.

## Usage

### Validation

```js
let result = validate('720909/7280');
// {
//     isValid: true;
//     detail: {
//         age: 49;
//         dateOfBirth: "1972-09-08T23:00:00.000Z";
//         gender: "M";
//         birthOrder: 728;
//         controlDigit: 0;
//     }
// }

result = validate('720909/7180');
// {
//     isValid: false;
//     detail: 'Given personal number does not satisfy modulo condition. Input value: 720909/7180.';
// }
```

### Parsing

```js
let result = parse('720909/7280');
// {
//     result: {
//         age: 49;
//         dateOfBirth: "1972-09-08T23:00:00.000Z";
//         gender: "M";
//         birthOrder: 728;
//         controlDigit: 0;
//     };
//     message: 'Personal number is valid.';
// }

result = parse('720909/7180');
// {
//     result: undefined;
//     message: 'Given personal number does not satisfy modulo condition. Input value: 720909/7180.';
// }
```
