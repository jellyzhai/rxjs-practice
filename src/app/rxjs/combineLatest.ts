import { timer, combineLatest, fromEvent } from "rxjs";
import { mapTo, scan, startWith, tap } from "rxjs/operators";

const timerOne_1 = timer(1000, 4000);
const timerTwo_1 = timer(2000, 4000);
const timerThree_1 = timer(3000, 4000);

const combined_1 = combineLatest([timerOne_1, timerTwo_1, timerThree_1]);

const subscription_1 = combined_1.subscribe((latestVals) => {
  const [val_1, val_2, val_3] = latestVals;

  // console.log(val_1, val_2, val_3);
});

setTimeout(() => subscription_1.unsubscribe(), 10000);

/* case 2 */
const combined_2 = combineLatest(
  [timerOne_1, timerTwo_1, timerThree_1],
  (one, two, three) => {
    return `formatted val: ${one}, ${two}, ${three}, `;
  }
);

const subscription_2 = combined_2.subscribe((val) => {
  // console.log(val);
});

setTimeout(() => subscription_2.unsubscribe(), 10000);

/* case 3 */
const elementFragment = `
    <hr/>
    <h3>组合2个按钮的事件</h3>
    <div>
      <button id='red'>Red</button>
      <button id='black'>Black</button>
    </div>
    <div>Red: <span id="redTotal"></span> </div>
    <div>Black: <span id="blackTotal"></span> </div>
    <div>Total: <span id="total"></span> </div>
    <hr/>
`;
document.body.insertAdjacentHTML("beforeend", elementFragment);

const btnBoxMap: { [key: string]: string } = {
  red: "redTotal",
  black: "blackTotal",
};

const getDom = (id: string): HTMLElement => {
  return document.querySelector(`#${id}`) as HTMLElement;
};

const setHtmlVal = (id: string) => (val: any) => {
  getDom(id).innerHTML = val;
};

const clickedObservable = (id: string) =>
  fromEvent(getDom(id), "click").pipe(
    mapTo(1),
    startWith(0),
    scan((acc: number, curr: number) => acc + curr),
    tap((setHtmlVal(btnBoxMap[id])))
  );

const redClickedObservable = clickedObservable("red");
const blackClickedObservable = clickedObservable("black");

const combined_3 = combineLatest(
  [redClickedObservable, blackClickedObservable],
  (redClickCount: number, blackClickCount: number) =>
    redClickCount + blackClickCount
);

combined_3.pipe(tap(setHtmlVal("total"))).subscribe();
