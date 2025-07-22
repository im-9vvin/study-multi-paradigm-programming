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

function* take<A>(limit: number, iterable: Iterable<A>): IterableIterator<A> {
  const iterator = iterable[Symbol.iterator]();
  while (true) {
    const { value, done } = iterator.next();
    if (done) break;
    yield value;
    if (--limit === 0) break;
  }
}

// function* find<A>(f: (a: A) => boolean, iterable: Iterable<A>): IterableIterator<A> {
//   const iterator = iterable[Symbol.iterator]();
//   while (true) {
//     const { value, done } = iterator.next();
//     if (done) break;
//     if (f(value)) yield value;
//   }
//   return undefined;
// }

// function find<A>(f: (a:A) => boolean, iterable: Iterable<A>): A | undefined {
//   return filter(f, iterable).next().value;
// }

const head = <A>(iterable: Iterable<A>): A | undefined =>
  iterable[Symbol.iterator]().next().value;

// const find = <A>(
//   f: (a: A) => boolean,
//   iterable: Iterable<A>
// ): A | undefined => head(filter(f, iterable));

function accumulateWith<A>(
  accumulator: (a: boolean, b: boolean) => boolean,
  acc: boolean,
  taking: (a: boolean) => boolean,
  f: (a: A) => boolean,
  iterable: Iterable<A>
): boolean {
  return fx(iterable).map(f).filter(taking).take(1).reduce(accumulator, acc);
}

const find = <A>(f: (a: A) => boolean, iterable: Iterable<A>): A | undefined =>
  fx(iterable).filter(f).to(head);

const every = <A>(f: (a: A) => boolean, iterable: Iterable<A>): boolean =>
  // fx(iterable)
  //   .map(f)
  //   .filter(a => !a)
  //   .take(1) // false를 하나라도 만나면 every는 false 이다.
  //   .reduce((a, b) => a && b, true);
  accumulateWith(
    (a, b) => a && b,
    true,
    (a) => !a,
    f,
    iterable
  );

const some = <A>(f: (a: A) => boolean, iterable: Iterable<A>): boolean =>
  // fx(iterable)
  //   .map(f)
  //   .filter((a) => a)
  //   .take(1) // true를 하나라도 만나면 some은 true 이다.
  //   .reduce((a, b) => a || b, false);
  accumulateWith(
    (a, b) => a || b,
    false,
    (a) => a,
    f,
    iterable
  );

export function fx<A>(iterable: Iterable<A>): FxIterable<A> {
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

  take(limit: number): FxIterable<A> {
    return fx(take(limit, this));
  }

  to<R>(converter: (iterable: Iterable<A>) => R): R {
    return converter(this._iterable);
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
// const [first, second] = fx(naturals(100)).map((a) => {
//   console.log('mapped!');
//   return a + 10;
// });
// console.log(first, second);
