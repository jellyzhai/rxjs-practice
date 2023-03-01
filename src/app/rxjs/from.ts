import { from } from "rxjs";
import { filter } from "rxjs/operators";

// 数组转换而来的 observable
from([1, 2, 3, 2, 3, 4, 4, 5, 6])
  .pipe(filter((v) => v % 2 === 0))
  .subscribe({
    next: (even) => {
      //   console.log(even);
    },
    complete: () => {
      //   console.log("complete!");
    },
  });

// promise 转换而来的 observable
from(Promise.resolve("observable from promise!")).subscribe((v) => {
  //   console.log(v);
});

// 集合转换而来的 observable
const collectionMap = new Map([[0, 'init']]);

collectionMap.set(1, "Hi");
collectionMap.set(2, "Bye");

from(collectionMap).subscribe((v) => {
//   console.log(v);
});


// 字符串转换而来的 observable
from("Hello World!").subscribe((v) => {
    // console.log(v);
});