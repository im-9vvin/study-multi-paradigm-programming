import { reverse } from './lazy-reverse';

function map<A, B>(transform: (value: A) => B, iterator: Iterator<A>): Iterator<B> {
  return {
    next(): IteratorResult<B> {
      const { done, value } = iterator.next();

      return done
        ? {
            done,
            value,
          }
        : {
            done,
            value: transform(value),
          };
    },
  };
}

const array = ['A', 'B', 'C', 'D', 'E', 'F'];
const iterator = map((str) => str.toLowerCase(), reverse(array));
console.log(iterator.next().value, iterator.next().value);
