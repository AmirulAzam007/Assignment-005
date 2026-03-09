## 1️⃣ WHAT IS THE DIFFERENCE BETWEEN VAR, LET, AND CONST?

var: Function-scoped, can be redeclared and updated, hoisted with undefined.

let: Block-scoped, can be updated but not redeclared in the same scope.

const: Block-scoped, cannot be redeclared or updated (for objects/arrays, the reference is constant but content can change).

## 2️⃣ WHAT IS THE SPREAD OPERATOR (...)?

The spread operator allows you to expand arrays or objects into individual elements or properties.

Example:

const arr = [1, 2, 3];
const newArr = [...arr, 4]; // [1, 2, 3, 4]
## 3️⃣ WHAT IS THE DIFFERENCE BETWEEN MAP(), FILTER(), AND FOREACH()?

map(): Returns a new array after applying a function to each element.

filter(): Returns a new array with elements that pass a condition.

forEach(): Executes a function on each element but does not return a new array.

## 4️⃣ WHAT IS AN ARROW FUNCTION (=>)?

An arrow function is a shorter, modern syntax for writing functions:

const add = (a, b) => a + b;

It doesn’t have its own this, which makes it handy in callbacks.

Great for concise functions and one-liners.

## 5️⃣ WHAT ARE TEMPLATE LITERALS (`)?

Template literals are strings wrapped in backticks (`) that allow variable interpolation and multi-line strings:

const name = "Amirul";
console.log(`Hello, ${name}!`);

Output:

Hello, Amirul!