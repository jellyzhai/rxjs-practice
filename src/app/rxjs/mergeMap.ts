import { of } from "rxjs";
import { mergeMap } from "rxjs/operators";


// 使用 observable 进行 mergeMap
const source_1 = of('hello', 'world');

source_1.pipe(mergeMap(v => of(`first: ${v}`))).subscribe(v => {
    // console.log(v)
});


// 使用 promise 进行 mergeMap
source_1
  .pipe(mergeMap((v) => Promise.resolve(`${v} from promise.`)))
  .subscribe((v) => {
    // console.log(v)
  });