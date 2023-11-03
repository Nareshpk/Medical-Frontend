import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthManager } from '../services/restcontroller/bizservice/auth-manager.service';
import { MachineSettingManager } from '../services/restcontroller/bizservice/machine-setting.service';
import { Machine001mb } from '../services/restcontroller/entities/Machine001mb';
import { DataSharedService } from '../services/services/datashared.service';
import { Utils } from '../utils/utils';

@Component({
  selector: 'app-search-find',
  templateUrl: './search-find.component.html',
  styleUrls: ['./search-find.component.css'],
  
})
export class SearchFindComponent implements OnInit {
  @Output() open: EventEmitter<boolean> = new EventEmitter();
  SearchMenuValues: string = '';
  SearchMenuItems: string = '';
  machine001mb?: Machine001mb;
  isActive: boolean | undefined;
  activeTab: boolean = false;
  searchStr: any;
  modalRef: any;
  parentMenuString: string = "";
  childMenuString: string = "";


  hexToRgb: any;
  rgbToHex: any;
  @HostBinding('style.--color_l1') colorthemes_1: any;
  @HostBinding('style.--color_l2') colorthemes_2: any;
  @HostBinding('style.--color_l3') colorthemes_3: any;
  @HostBinding('style.--color_l4') colorthemes_4: any;
  title: string | undefined;
  params: any


  constructor(private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private authManager: AuthManager,
    private dataSharedService: DataSharedService,
    private machineSettingManager: MachineSettingManager,
  ) { }

  ngOnInit(): void { 
    // this.colorthemes = this.user.theme;
    this.dataSharedService.currentMenuObject.subscribe((object: any) => {
      this.parentMenuString = object.parentMenuString;
      this.childMenuString = object.childMenuString;
    });

   
    this.authManager.currentUserSubject.subscribe((object: any) => {

      let rgb = Utils.hexToRgb(object.theme);

      this.colorthemes_1 = Utils.rgbToHex(rgb, -0.3);

      this.colorthemes_2 = Utils.rgbToHex(rgb, 0.1);

      this.colorthemes_3 = Utils.rgbToHex(rgb, 0.5);

      this.colorthemes_4 = Utils.rgbToHex(rgb, 0.8);
    });
    this.title = this.title + 'SearchMenu';
  }

  SearchClick(SearchMenuValues:any,SearchMenuItems:any,) {
    this.dataSharedService.onSearchMenuAction(SearchMenuValues);
    this.dataSharedService.onSearchedMenuAction(SearchMenuItems);
      this.activeModal.close('Yes');
  }
onCancelClick() {
    this.activeModal.close('No');
  }
}

