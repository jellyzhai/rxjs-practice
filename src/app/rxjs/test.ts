import {
  catchError,
  EMPTY,
  interval,
  mergeMap,
  Observable,
  of,
  Subject,
  Subscription,
  switchMap,
  takeUntil,
} from "rxjs";

const subj = new Subject<any>();
const subjObs = subj.asObservable();

const source = interval(1000);

// const subs: Subscription = source.pipe(takeUntil(subjObs)).subscribe({
const subs: Subscription = source.subscribe({
  next(v: number) {
    // console.log("v: ", v);
  },
  error(e) {
    // console.log("e: ", e);
  },
  complete() {
    // console.log("competed");
  },
});

setTimeout(() => {
  // subj.next(false);
  // subj.complete();

  subs.unsubscribe();
  // console.log("subs.closed:", subs.closed);
}, 3000);

/* ------------------------------------------------------ */

of(1)
  .pipe(
    mergeMap((_) => Promise.reject("reject error!")),
    catchError((data) => {
      // console.log('Error: ', data);
      return EMPTY;
    })
  )
  .subscribe();

/* ------------------------------------------------------ */

of(1)
  .pipe(
    mergeMap((v: number) => Promise.resolve(v + 1)),
    mergeMap((v: number) => Promise.resolve(v + 1))
  )
  .subscribe(res => {
    // console.log(res);
  });

/* ------------------------------------------------------ */

of(1)
  .pipe(
    switchMap((v: number) => Promise.resolve(v + 1)),
    switchMap((v: number) => Promise.resolve(v + 1))
  )
  .subscribe((res) => {
    // console.log(res);
  });
