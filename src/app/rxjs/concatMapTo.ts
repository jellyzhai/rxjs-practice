import { of, interval } from "rxjs";
import { concatMapTo, delay, take } from "rxjs/operators";

// const source = interval(1000).pipe(take(2));
const source = of(1000).pipe(delay(2000));

const souce2 = source.pipe(
  concatMapTo(of("内部 observable 发出的值").pipe(delay(3000)))
);

souce2.subscribe(v => {
    // console.log(v);
});