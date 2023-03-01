import { timer } from "rxjs";
import { share, mapTo, tap } from "rxjs/operators";


// 不使用 share 操作符，tap 方法会执行多次
const source = timer(1000);

const noShareExample = source.pipe(
  tap(() => {
    // console.log("this noShareExample from tap operator");
  }),
  mapTo("subscribe result")
);

noShareExample.subscribe((v) => {
//   console.log(v);
});

noShareExample.subscribe((v) => {
//   console.log(v);
});


// 使用 share 操作符，tap 方法 只执行 1 次
const shareExample = source.pipe(
  tap(() => {
    // console.log("this shareExample from tap operator");
  }),
  mapTo(Math.random()),
  share()
);

shareExample.subscribe((v) => {
  // console.log(v);
});

shareExample.subscribe((v) => {
  // console.log(v);
});

shareExample.subscribe((v) => {
  // console.log(v);
});
