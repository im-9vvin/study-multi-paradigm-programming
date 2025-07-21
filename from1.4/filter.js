function* filter(f, iter) {
  const iterator = iter[Symbol.iterator]();
  while (true) {
    const { done, value } = iterator.next();
    if (done) break;
    if (f(value)) {
      yield value;
    }
  }
}

const arr = [1, 2, 3, 4, 5];
const filtered = filter((x) => x % 2 === 0, arr);
console.log([...filtered]);
