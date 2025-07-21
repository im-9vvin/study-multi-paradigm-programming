interface IteratorYieldResult<T> {
  done?: false;
  value: T;
}

interface IteratorReturnResult<T> {
  done: true;
  value: undefined;
}

interface Iterator<T> {
  next(): IteratorYiendResult<T> | IteratorReturnResult;
}
