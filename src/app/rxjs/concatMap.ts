import { of } from "rxjs";
import { delay, concatMap, mergeMap, map } from "rxjs/operators";

const source_1 = of(2000, 1000);

// concatMap
const concatMapObs = source_1.pipe(
  concatMap((val) => of(`${val} from concatMap`).pipe(delay(val)))
);

concatMapObs.subscribe((val) => {
//   console.log(val);
});


// mergeMap
const mergeMapObs = source_1.pipe(
  mergeMap((val) => of(`${val} from mergeMap`).pipe(delay(val)))
);

mergeMapObs.subscribe(val => {
    // console.log(val);
})


// 映射成 promise
const map2PromiseObs = source_1.pipe(
  concatMap((val) => Promise.resolve(`${val} from Promise.resolve`))
);

map2PromiseObs.subscribe(val => {
    // console.log(val);
})


// 应用 concatMap 的第2个参数：投射函数, 在 v8 中 将被废弃，使用 map 操作符代替
const obsWithMap = source_1.pipe(
  concatMap((val) => Promise.resolve(`${val} from Promise.resolve`)),
  map((res) => `${res} from map`)
);

obsWithMap.subscribe((val) => {
//   console.log(val);
});