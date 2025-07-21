function* naturals() {
  let n = 1;
  while (true) {
    yield n++; // 제너레이터는 코드를 지연 실행 한다.
  }
}

const iter = naturals();

console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
