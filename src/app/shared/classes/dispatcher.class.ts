import { ElementRef } from "@angular/core";

export class Dispatcher {
    public static dispatchEvent(eventType: string, rec: any = null, elRef: any = null) {
        var cusEvent = new CustomEvent(eventType, {
            detail: rec,
            bubbles: true,
            cancelable: false
        });
        if (elRef) {
            elRef.nativeElement.dispatchEvent(cusEvent);
        }
        else {
            document.dispatchEvent(cusEvent);
        }
    }
}