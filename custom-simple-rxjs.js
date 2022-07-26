/*
- 需要实现的必要方法
- subscribe
- pipe
- operator
- unsubscribe
- add： 将停止数据流的方法，添加到数组中
*/

class Observable {
  #subscribe;
  constructor(subscribe) {
    this.#subscribe = subscribe;
  }

  subscribe(observer) {
    const subscriber = new Subscriber(observer);
    subscriber.add(this.#subscribe(subscriber));
    return subscriber;
  }

  pipe(...fns) {
    return this.#handleOperators(fns)(this);
  }

  #handleOperators(fns) {
    if (fns.length === 0) {
      return x => x;
    }
    if (fns.length === 1) {
      return fns[0];
    }

    return (input) => {
      return fns.reduce((prev, fn) => fn(prev), input);
    }
  }
}

/*
将 取消订阅 和 添加停止数据流的方法，抽离到父类 Subscription 中
*/
class Subscription {
  #teardowns = [];

  unsubscribe() {
    console.log("this.#teardowns: ", this.#teardowns);
    this.#teardowns.forEach((teardown) => {
      typeof teardown === 'function' ? teardown() : teardown.unsubscribe?.();
    });
  }

  add(teardown) {
    if (!teardown) return;
    this.#teardowns.push(teardown);
  }
}

/*
包装 subscribe 方法的参数 observer 的对象，在调用 observer 内部的方法 前后，
判断是否该停止数据流，和 处理完成后 自动取消订阅
*/
class Subscriber extends Subscription {
  #isStopped = false;
  #observer;
  constructor(observer) {
    super();
    this.#observer = observer;
  }

  next(value) {
    if (this.#isStopped) return;
    this.#observer.next?.(value);
  }

  error(err) {
    this.#isStopped = true;
    this.#observer.error?.(err);
  }

  complete() {
    this.#isStopped = true;
    this.#observer.complete?.();
    this.unsubscribe();
  }
}

/*
- 操作符：是一个函数，调用后返回一个函数，该函数返回新的 Observable 对象，作为下一个操作符调用后返回函数的参数
*/
function map(fn) {
  return (observable) => new Observable(subscriber => {
    const subscription = observable.subscribe({
      next(v) {
        subscriber.next(fn(v));
      },
      error(err) {
       subscriber.error(err, ': ' , Date.now());
      },
      complete() {
        subscriber.complete("complete: ", Date.now());
      },
    });
    return subscription;
  })
}

// 实例化 Observable
const ob = new Observable((observer) => {
  let i = 0;
  const intervalId = setInterval(() => {
    observer.next(++i);
  }, 1000);

  // 实例化 Observable 时，必须返回一个方法，结束数据流
  return function unsubscribe() {
    clearInterval(intervalId);
  };
});

const subscription = ob
  .pipe(
    map((x) => x + 1),
    map((x) => x * 10)
  )
  .subscribe({
    next(v) {
      console.log('result: ', v);
    },
    error(err) {
      console.error(err);
    },
    complete() {
      console.log("complete");
    },
  });

setTimeout(() => {
  subscription.unsubscribe();
}, 4500)