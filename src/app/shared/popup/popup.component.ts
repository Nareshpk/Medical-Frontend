import {
    Component,
    Input,
    EventEmitter,
    Output,
    OnInit,
    HostBinding,
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthManager } from '../services/restcontroller/bizservice/auth-manager.service';
import { Utils } from '../utils/utils';

@Component({
    selector: 'nandalala-popup',
    templateUrl: 'popup.component.html',
})
export class PopupComponent implements OnInit {
    @Input() title: string = 'Popup';
    @Input() addLabel: string = 'Add New';
    @Input() acceptLabel: string = 'Ok';
    @Input() cancelLabel: string = 'Close';

    @Input() showAccept: boolean = true;
    @Input() showAdd: boolean = false;
    @Input() showCancel: boolean = true;
    @Input() preventCancel: boolean = false;

    @Output() addClick: EventEmitter<any> = new EventEmitter<any>();
    @Output() cancelClick: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() acceptClick: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input() noRecordMessage: string = 'No records found.';
    @Input() showNoRecordMessage: boolean = false;

    @Input() showPrint: boolean = false;
    @Input() showResize: boolean = false;
    @Input() showClose: boolean = false;

    @Input() enableAdd: boolean = false;

    @Input() heightArg: number = 300;
    @Input() widthArg: number = 300;

    @Input() acceptIcon: string = 'fa fa-check';

    @Input() showDefultFooter: boolean = true;

    @Input() bodyStyleClass: string = '';

    hexToRgb: any;
    rgbToHex: any;
    @HostBinding('style.--color_l1') colorthemes_1: any;
    @HostBinding('style.--color_l2') colorthemes_2: any;
    @HostBinding('style.--color_l3') colorthemes_3: any;
    @HostBinding('style.--color_l4') colorthemes_4: any;
    constructor(
        public activeModal: NgbActiveModal,
        private authManager: AuthManager
    ) {}
    ngOnInit() {
        this.authManager.currentUserSubject.subscribe((object: any) => {
            let rgb = Utils.hexToRgb(object.theme);

            this.colorthemes_1 = Utils.rgbToHex(rgb, -0.3);

            this.colorthemes_2 = Utils.rgbToHex(rgb, 0.1);

            this.colorthemes_3 = Utils.rgbToHex(rgb, 0.5);

            this.colorthemes_4 = Utils.rgbToHex(rgb, 0.8);
        });
    }
    onCrossClick(event: any) {
        if (!this.preventCancel) {
            event.stopPropagation();
            this.activeModal.close('Cross click');
        } else {
            this.cancelClick.emit(true);
        }
    }

    onCloseClick(event: any) {
        if (!this.preventCancel) {
            event.stopPropagation();
            this.activeModal.close('No');
        }
        this.cancelClick.emit(true);
    }
    onAcceptClick(event: any) {
        // event.stopPropagation();
        // this.activeModal.close('Yes');
        this.acceptClick.emit(true);
    }
    onAddClick(event: any) {
        this.addClick.emit(event);
    }
}
