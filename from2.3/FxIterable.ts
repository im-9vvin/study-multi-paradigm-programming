import naturals from './naturals';
import { reduce } from './reduce';

function* map<A, B>(f: (a: A) => B, iterable: Iterable<A>): IterableIterator<B> {
  for (const a of iterable) {
    yield f(a);
  }
}

function* filter<A>(f: (a: A) => boolean, iterable: Iterable<A>): IterableIterator<A> {
  for (const a of iterable) {
    if (f(a)) {
      yield a;
    }
  }
}

function forEach<A>(f: (a: A) => void, iterable: Iterable<A>): void {
  for (const a of iterable) {
    f(a);
  }
}

function fx<A>(iterable: Iterable<A>): FxIterable<A> {
  return new FxIterable(iterable);
}

class FxIterable<A> {
  // private iterable: Iterable<A>;
  // constructor(iterable: Iterable<A>) {
  //   this._iterable = iterable;
  // }
  constructor(private _iterable: Iterable<A>) {} // 인스턴스 초기화 생성시에 전달 받는 iterable에 따라 타입 A가 추론 된다.

  get iterable(): Iterable<A> {
    return this._iterable;
  }

  [Symbol.iterator]() {
    return this._iterable[Symbol.iterator]();
  }

  map<B>(f: (a: A) => B): FxIterable<B> {
    return fx(map((a) => f(a), this._iterable));
  }

  filter(f: (a: A) => boolean): FxIterable<A> {
    return fx(filter(f, this._iterable));
  }

  forEach(f: (a: A) => void): void {
    forEach(f, this._iterable);
  }

  reduce<Acc>(f: (acc: Acc, a: A) => Acc, acc: Acc): Acc;
  reduce<Acc>(f: (a: A, b: A) => Acc): Acc;
  reduce<Acc>(f: (a: Acc | A, b: A) => Acc, acc?: Acc): Acc {
    return acc === undefined ? reduce(f, this._iterable) : reduce(f, acc, this._iterable);
  }
}

// const result = fx(naturals(10))
//   .filter((a) => a % 2 === 0)
//   .map((a) => a * a)
//   .map((b) => `${b}-stringified`)
//   .reduce((acc, c) => `${acc}__${c}`, '[WITH_THIS_INITIAL_STR]__');
// // .reduce((acc, c) => `${acc}__${c}`);
// // .forEach(console.log);

// console.log(`result: ${result}`);

// 지연 평가 덕분에 100개의 숫자중 두개만 평가 된다.
const [first, second] = fx(naturals(100)).map((a) => {
  console.log('mapped!');
  return a + 10;
});
console.log(first, second);
