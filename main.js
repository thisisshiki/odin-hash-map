import { HashMap } from "./hashmap.js";

// Testing the HashMap
const test = new HashMap();
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

// Overwriting values
test.set('apple', 'green');
test.set('banana', 'brown');

// Adding a new value to trigger resize
test.set('moon', 'silver');

console.log(test.length()); // Should reflect the correct number of entries
console.log(test.get('apple')); // Should return 'green'
console.log(test.get('moon')); // Should return 'silver'
console.log(test.keys()); // Should return all keys
console.log(test.values()); // Should return all values
console.log(test.entries()); // Should return all entries

test.print();
