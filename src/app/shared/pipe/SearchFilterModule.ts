import { NgModule} from '@angular/core';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SearchFilter } from './search-filter';

@NgModule({
    imports: [
        CommonModule,
		BrowserModule,
		FormsModule,
    ],
    declarations: [
        SearchFilter,
    ],
    providers: [
        SearchFilter
    ],
    exports: [
        SearchFilter
    ]
})
export class  SearchFilterModule { }



