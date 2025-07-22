function* concat<T>(...iterables: Iterable<T>[]): IterableIterator<T> {
  for (const iterable of iterables) yield* iterable;
}

const arr = [1, 2, 3, 4];
const iter = concat(arr, [5]);
console.log([...iter]);
