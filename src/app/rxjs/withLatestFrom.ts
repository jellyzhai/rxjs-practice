import { withLatestFrom, interval } from "rxjs";
import { map, take } from "rxjs/operators";

const obs_5s = interval(5000);
const obs_1s = interval(1000);

// 每5秒发出值，伴随 每1秒发出值
obs_5s
  .pipe(
    take(2),
    withLatestFrom(obs_1s),
    map(([first, second]) => `5s 发出的值：${first}; 1s 发出的值：${second}`)
  )
  .subscribe((v) => {
    // console.log(v);
  });

// 每1秒发出值，伴随 每5秒发出值;
// 等到 伴随的 observable 发出值后，才和 源observable 一起发出值
obs_1s
  .pipe(
    take(11),
    withLatestFrom(obs_5s),
    map(([a, b]) => `1s 发出的值：${a}; 5s 发出的值：${b}`)
  )
  .subscribe((v) => {
    // console.log(v);
  });
