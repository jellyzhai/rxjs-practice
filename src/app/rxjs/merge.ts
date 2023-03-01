import { merge, interval } from "rxjs";
import { mapTo, mergeWith } from "rxjs/operators";


// 静态方法
const interval_1 = interval(2500);
const interval_2 = interval(2000);
const interval_3 = interval(1500);
const interval_4 = interval(1000);

const subscription_1 = merge(
  interval_1.pipe(mapTo(2500)),
  interval_2.pipe(mapTo(2000)),
  interval_3.pipe(mapTo(1500)),
  interval_4.pipe(mapTo(1000))
).subscribe(v => {
    // console.log(v);
});

setTimeout(() => subscription_1.unsubscribe(), 5000);


// 实例方法
const subscription_2 = interval_1.pipe(mergeWith([interval_2, interval_3, interval_4])).subscribe(v => {
    // console.log(v);
});

setTimeout(() => subscription_2.unsubscribe(), 5000);