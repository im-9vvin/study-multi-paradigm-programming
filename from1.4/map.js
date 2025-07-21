function* map(f, iterable) {
  for (const value of iterable) {
    yield f(value);
  }
}

const array = [1, 2, 3];
const mapped = map((x) => x * 2, array);
console.log([...mapped]);
