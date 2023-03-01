import { Subject } from "rxjs";
import { pluck, shareReplay } from "rxjs/operators";

const routerEnd = new Subject<{data: any, url: string}>();

/*
* shareReplay 不填参数 默认是 Infinity，就是 之前的所有数据流，都会共享，
* 填写数字，表示，在已经发出值之后，再次订阅 从最新发出值 往前 共享 多少个，
*/
const obs = routerEnd.pipe(pluck('url'), shareReplay(1));

obs.subscribe((url: string) => {
  // console.log(`initSubs url: ${url}`);
});

routerEnd.next({data: 1, url: '/test/a'});
routerEnd.next({data: 2, url: '/test/b'});

// 只能拿到 最新的值
obs.subscribe((url: string) => {
  // console.log(`second Subs url: ${url}`);
});