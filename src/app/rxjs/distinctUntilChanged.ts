import { from } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";


// 原始值
const source_1 = from([1,2,1,2,3,4,5,6,5,6,7,8]).pipe(distinctUntilChanged());

source_1.subscribe(v => {
    // console.log(v);
});


// 对象
const obj_1 = {a: 1};
const obj_2 = {b: 2};

const source_2 = from([obj_1, obj_1, obj_2, obj_2]).pipe(distinctUntilChanged());

source_2.subscribe(v => {
    // console.log(v);
})