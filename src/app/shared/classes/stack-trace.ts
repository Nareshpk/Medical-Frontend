import { Injectable } from "@angular/core";

@Injectable()
export class StackTrace {
    declaringClass:string = "";
    fileName:string = "";
    lineNumber:string = "";
    methodName:string = "";
}