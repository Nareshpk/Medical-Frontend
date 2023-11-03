import { StackTrace } from "./stack-trace";
import { Injectable } from "@angular/core";

@Injectable()
export class ServerError {
    cause: string = "";
    message: string = "";
    type: string = "";
    stackTrace: StackTrace[] = [];
}