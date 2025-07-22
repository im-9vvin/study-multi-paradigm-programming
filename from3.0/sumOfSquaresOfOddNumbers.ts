// import { reduce } from '../from2.3/reduce';

// function* map<A, B>(f: (a: A) => B, iterable: Iterable<A>): IterableIterator<B> {
//   for (const a of iterable) {
//     yield f(a);
//   }
// }

// function* filter<A>(f: (a: A) => boolean, iterable: Iterable<A>): IterableIterator<A> {
//   for (const a of iterable) {
//     if (f(a)) {
//       yield a;
//     }
//   }
// }
// function* take<A>(limit: number, iterable: Iterable<A>): IterableIterator<A> {
//   const iterator = iterable[Symbol.iterator]();
//   while (true) {
//     const { value, done } = iterator.next();
//     if (done) break;
//     yield value;
//     if (--limit === 0) break;
//   }
// }

// function sumOfSquaresOfOddNumbers(limit: number, list: number[]): number {
//   return reduce(
//     (acc, a) => acc + a,
//     0,
//     take(
//       limit,
//       map(
//         (a) => a * a,
//         filter((a) => a % 2 === 1, list)
//       )
//     )
//   );
// }

// console.log(sumOfSquaresOfOddNumbers(3, [1, 2, 3, 4, 5, 6, 7, 8, 9]));

import { fx } from '../from2.3/FxIterable';

const sumOfSquaresOfOddNumbers = (limit: number, list: number[]): number =>
  fx(list)
    .filter((a) => a % 2 === 1)
    .map((a) => a * a)
    .take(limit)
    .reduce((a, b) => a + b, 0);

console.log(sumOfSquaresOfOddNumbers(3, [1, 2, 3, 4, 5, 6, 7, 8, 9]));
