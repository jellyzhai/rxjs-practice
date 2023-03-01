import { interval } from "rxjs";
import { distinctUntilChanged, map, scan, take } from "rxjs/operators";

const source = interval(1000);

const example = source.pipe(
  take(10),
  scan((acc: any[], curr) => [...acc, curr], []),
  map((arr) => arr[Math.floor(Math.random() * arr.length)]),
  distinctUntilChanged()
);

example.subscribe((v) => {
//   console.log(v);
});
