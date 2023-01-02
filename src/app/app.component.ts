import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('box') boxTpl!: ElementRef

  ngAfterViewInit(): void {
    const boxDom = this.boxTpl.nativeElement as HTMLDivElement;

    fromEvent(boxDom, 'mousedown').pipe(
      map((event: Event) => ({
        distanceXofMouseToDomLeft: (event as MouseEvent).clientX - boxDom.offsetLeft,
        distanceYofMouseToDomTop: (event as MouseEvent).clientY - boxDom.offsetTop
      })),
      switchMap(({ distanceXofMouseToDomLeft, distanceYofMouseToDomTop }) => fromEvent(document, 'mousemove').pipe(
        map((event: Event) => ({
          boxDomLeft: (event as MouseEvent).clientX - distanceXofMouseToDomLeft,
          boxDomTop: (event as MouseEvent).clientY - distanceYofMouseToDomTop,
        })),
        takeUntil(fromEvent(boxDom, 'mouseup'))
      ))
    ).subscribe(({ boxDomLeft, boxDomTop }) => {
      boxDom.style.left = boxDomLeft + 'px';
      boxDom.style.top = boxDomTop + 'px';
    })
  }
}
