export default function* naturals(end = Infinity) {
  let n = 1;
  while (n <= end) {
    yield n++; // 제너레이터는 코드를 지연 실행 한다.
  }
}
