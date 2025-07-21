function* generator() {
  yield 1;
  yield* [2, 3];
  yield 4;
}

const iter = generator();
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
