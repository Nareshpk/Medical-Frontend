
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[OnlyNumber]'
})
export class OnlyNumber {

  constructor(private el: ElementRef) { }

  @Input() isDecimal: boolean = true;

  @HostListener('keydown', ['$event']) onKeyDown(event) {
    let e = <KeyboardEvent>event;
      if (this.isDecimal) {
        if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
          (e.keyCode == 65 && e.ctrlKey === true) ||
          (e.keyCode == 67 && e.ctrlKey === true) ||
          (e.keyCode == 88 && e.ctrlKey === true) ||
          (e.keyCode >= 35 && e.keyCode <= 39)) {
          return;
        }
      } else {
        if ([46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
          (e.keyCode == 65 && e.ctrlKey === true) ||
          (e.keyCode == 67 && e.ctrlKey === true) ||
          (e.keyCode == 88 && e.ctrlKey === true) ||
          (e.keyCode >= 35 && e.keyCode <= 39)) {
          return;
        }
      }
      if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
      }
  }
}
