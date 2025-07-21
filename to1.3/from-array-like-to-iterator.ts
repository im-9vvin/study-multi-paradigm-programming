interface ArrayLike<T> {
  readonly length: number;
  readonly [n: number]: T;
}

class ArrayLikeIterator<T> implements Iterator<T> {
  private index = 0;

  constructor(private arrayLike: ArrayLike<T>) {}

  next(): IteratorResult<T> {
    if (this.index < this.arrayLike.length) {
      return {
        done: false,
        value: this.arrayLike[this.index++],
      };
    } else {
      return {
        done: true,
        value: undefined,
      };
    }
  }
}

const arrayLike: ArrayLike<number> = {
  0: 10,
  1: 20,
  2: 30,
  length: 3,
};

const iterator: Iterator<number> = new ArrayLikeIterator(arrayLike);

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

const array: Array<string> = ['a', 'b', 'c'];
const iterator2: Iterator<string> = new ArrayLikeIterator(array);

console.log(iterator2.next());
console.log(iterator2.next());
console.log(iterator2.next());
console.log(iterator2.next());
