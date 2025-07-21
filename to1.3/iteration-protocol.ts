interface IteratorYieldResult<T> {
  done?: false;
  value: T;
}

interface IteratorReturnResult {
  done: true;
  value: undefined;
}

interface Iterator<T> {
  next(): IteratorYieldResult<T> | IteratorReturnResult;
}

interface Iterable<T> {
  [Symbol.iterator](): Iterator<T>;
}

interface IterableIterator<T> extends Iterator<T> {
  [Symbol.iterator](): IterableIterator<T>;
}

export function naturals(end = Infinity): IterableIterator<number> {
  let n = 1;
  return {
    next(): IteratorResult<number> {
      return n <= end
        ? {
            done: false,
            value: n++,
          }
        : {
            done: true,
            value: undefined,
          };
    },
    [Symbol.iterator]() {
      return this;
    },
  };
}

console.log([0, ...naturals(3)]);

const numbers = [1, 2, 3];

function sum(...nums: number[]): number {
  return nums.reduce((a, b) => a + b, 0);
}

console.log(sum(...numbers)); // 6
console.log(sum(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)); // 55
