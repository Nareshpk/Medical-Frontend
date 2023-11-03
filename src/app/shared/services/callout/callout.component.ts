import { Component, Input, OnInit, HostListener } from '@angular/core';
import { animate, transition, trigger, state, style, keyframes } from '@angular/animations';
import { Observable } from 'rxjs';
import { count } from 'rxjs/operators';

export class CalloutType {
    static INFO = "info";
    static WARNING = "warning";
    static SUCCESS = "success";
    static ERROR = "error";
}

@Component({
    selector: 'callout',
    templateUrl: 'callout.component.html',
    styleUrls: ["callout.component.scss"],
    animations: [
        trigger('focusPanel', [
            state('inactive', style({ transform: 'scale(1)' })),
            state('active', style({ transform: 'scale(0)' })),
            transition('inactive => active', animate('1000ms ease-in')),
            transition('active => inactive', animate('1000ms ease-out'))
        ]),
        trigger('movePanel', [
            transition('void => *', [
                style({ opacity: 0, transform: 'translateY(-100%)' }),
                animate(200)
            ]),
            transition('* => void', [
                animate(100, keyframes([
                    style({ opacity: 1, transform: 'scaleY(1)', offset: 0 }),
                    style({ opacity: 1, transform: 'scaleY(.3)', offset: .7 }),
                    style({ opacity: 0, transform: 'scaleY(0)', offset: 1 }),
                ]))
            ])
        ])

    ]
})
export class CalloutComponent implements OnInit {

    private static index:number = 0;

    messages: any[] = [];
    waitingMessages: Object[] = [];

    @HostListener('document:calloutNotification', ['$event']) onKeyDown(event: any) {
        let value = event.detail;
        this.showNewMessage(value.message, value.type, value.closingTime);
    }

    showNewMessage(message: string, type: string, closingTime: number) {
        CalloutComponent.index++;
        let id = CalloutComponent.index;
        this.messages.push({id:id, text: message, color: this.getColorForType(type) });
        setTimeout(() => {
            this.removeOldMessage(id);
        }, closingTime ? closingTime : 1500);
    }

    getColorForType(type: string): any {
        switch (type) {
            case CalloutType.INFO:
                return "#5bc0de";
            case CalloutType.WARNING:
                return "#ffc107";
            case CalloutType.SUCCESS:
                return "#28a745";
            case CalloutType.ERROR:
                return "#dc3545";
        }
    }

    removeOldMessage(index:number) {
        if (this.myMouseIn) {
            this.waitingMessages.push(this.messages[this.waitingMessages.length]);
        } else {
            let pos = 0;
            for(let message of this.messages) {
                if(message["id"] == index) {
                    this.messages.splice(pos, 1);
                    break;
                }
                pos++;
            }
        }
    }

    removeWaitingMessages() {
        if (this.waitingMessages.length > 0) {
            this.messages.splice(0, this.waitingMessages.length);
            this.waitingMessages.splice(0, this.waitingMessages.length);
        }
    }

    state: String = "inactive";

    doAnimate() {
        if (this.state == "inactive") {
            this.state = "active";
        }
        else {
            this.state = "inactive";
        }
    }

    ngOnInit() {

    }

    myMouseIn: boolean = false;

    onOver() {
        this.myMouseIn = true;
    }

    onOut() {
        this.myMouseIn = false;
        setTimeout(() => {
            this.removeWaitingMessages();
        }, 500);
    }
}

