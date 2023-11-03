import { NgModule } from "@angular/core";
import { OnlyLetter } from "../directives/onlyLetter.directive";

@NgModule({
    declarations: [
        OnlyLetter
    ],
    exports: [
        OnlyLetter
    ]
})
export class OnlyLetterModule { }