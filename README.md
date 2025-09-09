1) What is the difference between var, let, and const?
ans: 
     1.var is function-scoped and can be redeclared or updated.
     2.let is block-scoped and can be updated but not redeclared in the same scope.
     3.const is block-scoped, cannot be redeclared or reassigned, but objects/arrays can still be mutated

2) What is the difference between map(), forEach(), and filter()?
ans: 
     1.map() loops through an array and returns a new array with transformed elements.map() is useful when you     want to change values (e.g., double numbers).  map → transform
     2.forEach() loops through an array but returns undefined (no new array).forEach() is used for side effects like logging or updating variables. forEach → iterate
     3.filter() loops through an array and returns a new array with only elements that match the condition.filter() is used when you need to keep only specific elements. filter → select
     
3) What are arrow functions in ES6?
ans:
    Arrow functions are a shorter syntax for writing functions in ES6. They do not have their own this, instead they inherit it from the surrounding scope. Useful for concise code, especially in callbacks and array methods.

4) How does destructuring assignment work in ES6?
ans:
    Destructuring assignment allows you to unpack values from arrays or properties from objects into variables. For arrays, order matters: [a, b] = [1, 2] assigns a=1, b=2. For objects, keys matter: {x, y} = {x:10, y:20} assigns x=10, y=20.

5) Explain template literals in ES6. How are they different from string concatenation?
ans:
    Template literals in ES6 are strings written using backticks (`) that allow multi-line strings and embedded expressions using ${}. They are different from string concatenation because instead of using +, you can directly insert variables or expressions inside the string. Example: `Hello, ${name}!` is cleaner and more readable than "Hello, " + name + "!".





