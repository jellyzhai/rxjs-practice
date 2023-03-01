import { of, throwError, timer, from } from "rxjs";
import { catchError, mergeMap } from "rxjs/operators";

const source_1 = throwError(() => new Error("this is a error text!"));

const example_1 = source_1.pipe(catchError((val) => of(`i caught : ${val}`)));

// const subscription_1 = example_1.subscribe(val => {console.log(val)});

/*
 * 将 reject 的 promise 装换成 Observable
 */

const rejectPromise = Promise.reject("reject text from promise!");

const source_2 = timer(1000);

const example_2 = source_2.pipe(
  mergeMap((_) =>
    from(rejectPromise).pipe(catchError((val) => of(`promise error: ${val}`)))
  )
);

example_2.subscribe((val) => {
  // console.log(val);
});
