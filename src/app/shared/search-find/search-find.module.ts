import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchFindRoutingModule } from './search-find-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { ColorPickerModule } from 'ngx-color-picker';
import { SearchedPopupComponent } from 'src/app/shared/searched-popup/searched-popup.component';





@NgModule({
  declarations: [
    SearchedPopupComponent,
  ],
  imports: [
    CommonModule,
    SearchFindRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatTabsModule,
    ColorPickerModule,
  ]
})
export class SearchFindModule { }
