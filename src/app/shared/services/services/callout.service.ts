import { Injectable, ElementRef, Inject } from "@angular/core";
import { Observable, Subscriber } from 'rxjs';
import { Dispatcher } from "../../classes/dispatcher.class";
import { CalloutType } from "../callout/callout.component";

@Injectable()
export class CalloutService {
    private static subscriber: Subscriber<any>;
    private static observable: Observable<any>;

    public static DELETE_SUCCESS_MSG = "Successfully Removed";
    public static SAVE_SUCCESS_MSG = "Save Success";
  legSuccess: any;

    constructor() { }

    getObservable(): Observable<any> {
        if (CalloutService.observable == null) {
            CalloutService.observable = new Observable(observer => {
                CalloutService.subscriber = observer;
            });
        }
        return CalloutService.observable;
    }

    showInfo(message: String, closingTime: number = 1500) {
        if (CalloutService.subscriber) {
            CalloutService.subscriber.next({ message: message, type: CalloutType.INFO })
        }
        Dispatcher.dispatchEvent("calloutNotification", { message: message, type: CalloutType.INFO, closingTime: closingTime });
    }

    showWarning(message: String, closingTime: number = 1500) {
        if (CalloutService.subscriber) {
            CalloutService.subscriber.next({ message: message, type: CalloutType.WARNING })
        }
        Dispatcher.dispatchEvent("calloutNotification", { message: message, type: CalloutType.WARNING, closingTime: closingTime });
    }

    showSuccess(message: String, closingTime: number = 1500) {
        if (CalloutService.subscriber) {
            CalloutService.subscriber.next({ message: message, type: CalloutType.SUCCESS })
        }
        Dispatcher.dispatchEvent("calloutNotification", { message: message, type: CalloutType.SUCCESS, closingTime: closingTime });
    }

    showError(message: String, closingTime: number = 1500) {
        if (CalloutService.subscriber) {
            CalloutService.subscriber.next({ message: message, type: CalloutType.ERROR })
        }
        Dispatcher.dispatchEvent("calloutNotification", { message: message, type: CalloutType.ERROR, closingTime: closingTime });
    }
}