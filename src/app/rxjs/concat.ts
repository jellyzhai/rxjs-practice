import { concat, of } from "rxjs";
import { concatWith, delay } from "rxjs/operators";

const source_1 = of(1, 2, 3);
const source_2 = of(4, 5, 6);

concat(source_1, source_2).subscribe((val) => {
//   console.log(val);
});
source_1.pipe(delay(3000), concatWith(source_2)).subscribe((val) => {
  //   console.log(`delay 3s: ${val}`);
});
