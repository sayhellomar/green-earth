# Here are the possible answer of the follwing questions

## 1) What is the difference between var, let, and const?

 - **Answer:** We can declare JavaScript variables with var, let and const keyword. **var** keyword introduced from the begining of the JavaScript but **let** and **const** introduced in ES6. Variable declare with **var** hoisted that means all the declaration go to the top of the file and also we can redeclare the variable with the **var**. **let** and **const** are not hoisted that means we are not able to use variable before declaration. With the **let** we can reassign the value of the variable but on the other hand, we are not able to reassign that is declared with the **const**. Also, we can declare a variable with the **let** and then we can assign a value to it but with the **const** there is no option to declare variable without a value. We have to assign a value when we want to declare a variable with **const**

## 2) What is the difference between map(), forEach(), and filter()?

- **Answer:** We can loop through the array with the **map()** and **forEach()** functions. Typically, **map()** return a new array and doesn't change the original array where **forEach()** doesn't return anything and it's change the original array based on the operations. We use **filter()** to filter out some data based on the condition which is matched inside the **filter()** condition. Also, **filter()** return a new array.

## 3) What are arrow functions in ES6?

- **Answer:** Arrow function introduced in ES6 and it's a shorter and alternative way to write functions. There are some difference in **this** keyword and traditional function have a special word called **arguments** in the function parameter where in the arrow function, there is rest(...args) operator.

## 4) How does destructuring assignment work in ES6?

- **Answer:** We can destructure array/object. To destructure an array/object, on the left side, we declare some variable with square bracket([]) or curly braces({}) and on the right side, we write the array or object. In the array, destructure assign value by index where in the object, destructure assign value by property name. We can also change the property name with a colon(:) when destructure an object.

Example of destructuring an Object:

```bash
const student = {
    id: 1,
    name: 'John Doe',
    age: 30
}

const {id, name, age} = student;
```

Example of destructuring an Array:

```bash
const friends = ['John', 'Jane', 'Jimi'];

const [firstFriend, secondFriend, thirdFriend] = friends;
```

## 5) Explain template literals in ES6. How are they different from string concatenation?

- **Answer:** Template literals(``) introduced in ES6 and it's a cleaner form of string concatenation. With string concatenation, using double or single quotes, we are not able to write variable inside it, but with the **Template literals**, we can write variable with a special styntax.

Example of string concatenation:

```bash
const firstName = 'John';
const lastName = 'Doe',

console.log('Hi ' + firstName + ' ' + lastname);
```

Example of template literals:

```bash
const firstName = 'John';
const lastName = 'Doe',

console.log(`Hi ${firstName} ${lastName}`);
```