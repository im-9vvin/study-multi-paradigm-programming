import { naturals } from './iteration-protocol';

function* map<A, B>(f: (value: A) => B, iterable: Iterable<A>): IterableIterator<B> {
  for (const value of iterable) {
    yield f(value);
  }
}

const array = [1, 2, 3, 4];
const mapped: IterableIterator<number> = map((x) => x * 2, array);
const iterator = mapped[Symbol.iterator]();

console.log(iterator.next().value); // 2 (1 * 2)
console.log(iterator.next().value); // 4 (2 * 2)
console.log([...iterator]); // [6, 8]

let acc = 0;
for (const num of map((x) => x * 2, naturals(4))) {
  acc += num;
}

console.log(acc);
