import { fromEvent } from "rxjs";
import { debounceTime, map } from "rxjs/operators";

const element = `
    <hr>
    <h3>debounceTime</h3>
    <div><input type="text" id="debounce-time-input"></div>
    <div>延迟500毫秒后，输入的内容：<span  id="debounce-time-container"></span></div>
    <hr>
`;

document.body.insertAdjacentHTML('beforeend', element);

const inputDom = document.querySelector(
  "#debounce-time-input"
) as HTMLInputElement;
const spanDom = document.querySelector(
  "#debounce-time-container"
) as HTMLElement;

const inputObs = fromEvent(inputDom, "keyup").pipe(
  map((val: any) => val.target.value),
  debounceTime(500)
);

inputObs.subscribe(v => {
    spanDom.innerText = v;
})