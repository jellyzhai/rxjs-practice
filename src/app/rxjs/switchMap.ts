import { timer, interval, fromEvent, merge, EMPTY, Observable, Observer } from "rxjs";
import {
  mapTo,
  scan,
  startWith,
  switchMap,
  take,
  takeWhile,
  tap,
} from "rxjs/operators";

// 每3秒重新启动 interval
const source_1 = timer(0, 3000);

const example_1 = source_1.pipe(
  take(3),
  switchMap((_) => interval(1000).pipe(take(6)))
);

example_1.subscribe((v) => {
  // console.log(v);
});

// 每次点击时，重置内部 observable
const source_2 = fromEvent(document, "click");

const obs_1 = source_2.pipe(
  switchMap((_) =>
    interval(3000).pipe(take(3), mapTo("happen in 3s, only happen 3 times."))
  )
);

obs_1.subscribe((v) => {
  // console.log(v);
});

// 十秒倒计时
const element = `
<hr>
<h3>switchMap</h3>
<h4>
  剩余时间: <span id="remaining">10</span>
</h4>
<button id="pause">
  暂停
</button>
<button id="resume">
  重新进行
</button>
<hr>
`;

document.body.insertAdjacentHTML("beforeend", element);

let countDown = {count : 10};
let isResume = true;

const getDom = (id: string) => document.querySelector(`#${id}`) as HTMLElement;

const setHTML = (id: string) => (val: any) => (getDom(id).innerHTML = val);

const source_3 = interval(1000).pipe(
  tap(() => {
    countDown.count === 0 ? (isResume = false) : (isResume = true);
    // console.log(countDown, isResume);
  }),
  takeWhile(() => isResume),
  mapTo(-1),
  tap(() => {
    // console.log("go on!");
  })
);

const pauseObs$ = fromEvent(getDom("pause"), "click").pipe(
  mapTo(false),
  tap(() => (isResume = false))
);

const resumeObs$ = fromEvent(getDom("resume"), "click").pipe(
  tap(() => {
    isResume = true;
    // console.log(countDown, "resumeObs$ ");
  }),
  mapTo(true)
);

merge(pauseObs$, resumeObs$)
  .pipe(
    tap((isGoing: boolean) => {
      if (isGoing && countDown.count <= 0) {
        setHTML("remaining")(10);
        countDown.count = 10;
      }
    }),
    startWith(isResume),
    switchMap((isGoing) => (isGoing ? source_3 : EMPTY)),
    scan((_, curr) => {
      if (curr) {
        countDown.count += curr;
      }
      return countDown.count;
    }, countDown.count)
  )
  .subscribe((val) => {
    setHTML("remaining")(val);
  });

// --- test ---
const obs$ = new Observable((observer: Observer<any>) => {
  const num = Math.floor(Math.random() * 10) % 3;

  if (num === 0) {
    observer.error(`error: ${num}`);
  } else {
    observer.next(`success: ${num}`)
  }
   observer.complete()
});

pauseObs$.pipe(switchMap(() => obs$)).subscribe({
  next(v) {
    // console.log(v)
  },
  error(v) {
    // console.log(v);
  },
  complete() {
    // console.log('competed');
  },
});