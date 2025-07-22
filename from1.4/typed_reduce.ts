function baseReduce<A, Acc>(f: (acc: Acc, a: A) => Acc, acc: Acc, iterator: Iterator<A>): Acc {
  while (true) {
    const { done, value } = iterator.next();
    if (done) break;
    acc = f(acc, value);
  }
  return acc;
}

/**
 * reduce (함수 오버로드)
 */

function reduce<A, Acc>(f: (acc: Acc, a: A) => Acc, acc: Acc, iterable: Iterable<A>): Acc;

function reduce<A, Acc>(f: (acc: Acc, a: A) => Acc, iterable: Iterable<A>): Acc;

function reduce<A, Acc>(
  f: (a: Acc | A, b: A) => Acc,
  accOrIterable: Acc | Iterable<A>,
  iterable?: Iterable<A>
): Acc {
  if (iterable === undefined) {
    const iterator = (accOrIterable as Iterable<A>)[Symbol.iterator]();
    const { done, value: acc }: IteratorResult<A> = iterator.next();
    if (done) throw new TypeError("'reduce' of empty 'Iterable' with no initial value");
    return baseReduce(f, acc, iterator) as Acc;
  } else {
    return baseReduce(f, accOrIterable as Acc, iterable[Symbol.iterator]());
  }
}

const arr1 = [1, 2, 3];
const sum1 = reduce((acc, a) => acc + a, 0, arr1);
console.log(`sum1: ${sum1}`);

const arr2 = [1, 2, 3];
const sum2 = reduce((a, b) => a + b, arr2);
console.log(`sum2: ${sum2}`);
