// 제너레이터는 명령형으로 구현
// 따라서 제너레이터 함수 내에 흐름 제어를 둘 수 있음.
function* generator(cond: boolean) {
  yield 1;
  console.log('hi');
  if (cond) {
    yield 2;
  }
  yield 3;
}

const iter = generator(false); // generator 호출시 이터레이터 객체 반환

console.log(
  iter.next() // 반환된 이터레이터의 .next() 호출시 (다음) yield를 만날때까지 함수내 코드 실행.
  // { value: 1, done: false }
);

console.log(
  iter.next()
  // "hi"
  // { value: 3, done: false }
);

console.log(
  iter.next()
  // { value: undefined, done: true }
);
