function* reverse<T>(arrayLike: ArrayLike<T>): IterableIterator<T> {
  let idx = arrayLike.length;
  while (idx) {
    yield arrayLike[--idx];
  }
}

const array = ['A', 'B', 'C', 'D', 'E', 'F'];

const iterator = reverse(array);
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
