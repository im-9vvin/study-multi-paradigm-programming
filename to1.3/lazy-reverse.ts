export function reverse<T>(arrayLike: ArrayLike<T>): Iterator<T> {
  let idx = arrayLike.length;
  return {
    next() {
      if (idx === 0) {
        return {
          done: true,
          value: undefined,
        };
      } else {
        return {
          done: false,
          value: arrayLike[--idx],
        };
      }
    },
  };
}

const array = ['A', 'B'];
const reversed = reverse(array); // 원본 배열을 보존하면서
// 요소 하나씩 역으로 방문 가능
console.log(reversed.next().value);
console.log(reversed.next().value);
