
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[OnlyLetter]'
})
export class OnlyLetter {

    regexStr = '^[a-zA-Z./: ]'
  constructor(private el: ElementRef) { }

  @HostListener('keypress', ['$event'])
    onKeyPress(event){
	return new RegExp(this.regexStr).test(event.key);
	}
	
	@HostListener('paste', ['$event'])
    blockPaste(event:ClipboardEvent){
	this.validateFields(event);
	}
     validateFields(event:ClipboardEvent|any){
	 event.preventDefault();
	 const pasteData = event.clipBoardData.getData('text/plain').replace(/[^a-zA-Z]/g,'');
	 document.execCommand('innerHTML',false,pasteData);
	 
	 }
}
