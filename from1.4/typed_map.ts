function* genTypedMap<A, B>(f: (a: A) => B, iterable: Iterable<A>): IterableIterator<B> {
  for (const a of iterable) {
    yield f(a);
  }
}

const array = ['a', 'b', 'c'];
const upperedArray = genTypedMap<string, string>((a) => a.toUpperCase(), array);
const [head] = upperedArray; // 이 시점에서 첫번째 요소(head)를 얻기 위해 구조 분해 하므로 upperedArray는 순회 완료 된 것.
console.log('head: ', head); // 'A'
const [body] = upperedArray;
console.log('body: ', body); // undefined. upperedArray는 이미 순회 완료 되었음.
const [tail] = upperedArray;
console.log('tail: ', tail); // undefined. upperedArray는 이미 순회 완료 되었음.
