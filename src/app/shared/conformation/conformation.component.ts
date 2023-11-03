import { Component, HostBinding, Inject, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthManager } from '../services/restcontroller/bizservice/auth-manager.service';
import { Login001mb } from '../services/restcontroller/entities/Login001mb';
import { Utils } from '../utils/utils';


@Component({
    selector: 'app-conformation',
    templateUrl: './conformation.component.html',
    styleUrls: ['./conformation.component.css']
})
export class ConformationComponent implements OnInit {
    @Input() title: string = '';
    @Input() details: any;
    hexToRgb: any;
    rgbToHex: any;
    @HostBinding('style.--color_l1') colorthemes_1: any;
    @HostBinding('style.--color_l2') colorthemes_2: any;
    @HostBinding('style.--color_l3') colorthemes_3: any;
    @HostBinding('style.--color_l4') colorthemes_4: any;

    user?:Login001mb|any;

    constructor(
        public activeModal: NgbActiveModal,
        private authManager: AuthManager
    ) { }

    ngOnInit(): void {

        this.user = this.authManager.getcurrentUser;
        this.authManager.currentUserSubject.subscribe((object: any) => {
            let rgb = Utils.hexToRgb(object.theme);

            this.colorthemes_1 = Utils.rgbToHex(rgb, -0.3);

            this.colorthemes_2 = Utils.rgbToHex(rgb, 0.1);

            this.colorthemes_3 = Utils.rgbToHex(rgb, 0.5);

            this.colorthemes_4 = Utils.rgbToHex(rgb, 0.8);
        });

        this.title = this.title;
    }


    onOkClick() {
        this.activeModal.close('Yes');
    }

    onCancelClick() {
		this.activeModal.close('No');
	}
}
