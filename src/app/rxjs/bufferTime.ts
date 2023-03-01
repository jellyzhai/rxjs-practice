import { interval } from "rxjs";
import { bufferTime, startWith } from "rxjs/operators";

const source = interval(500);

const example = source.pipe(startWith(0), bufferTime(2000, 4000));

const subscribe = example.subscribe((val) => {
  // console.log("2秒内缓冲的值为：", val);
});

setTimeout(() => subscribe.unsubscribe(), 10000);
