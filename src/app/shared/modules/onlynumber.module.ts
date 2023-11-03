import { NgModule } from '@angular/core';
import { OnlyNumber } from '../directives/onlynumber.directive';


@NgModule({
    declarations: [
        OnlyNumber
    ],
    exports: [
        OnlyNumber
    ]
})
export class OnlyNumberModule { }