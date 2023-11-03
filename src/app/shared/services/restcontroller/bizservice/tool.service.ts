import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Tool001mb } from "../entities/tool001mb";


@Injectable()
export class ToolManager extends BaseService {
    private ToolUrl: string = `${environment.apiUrl}/tool`

    alltool(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.ToolUrl}` + "/findAll",data);
    }

    findOne(slNo: any) {
        let data: any = {};
        data['slNo'] = slNo;
        return this.getCallService(`${this.ToolUrl}`, data);
    }

    toolSave(tool001mb: Tool001mb) {
        return this.postCallService(`${this.ToolUrl}` + "/save", {}, tool001mb);
    }

    toolUpdate(tool001mb: Tool001mb) {
        return this.putCallService(`${this.ToolUrl}` + "/update", {}, tool001mb);
    }

    toolDelete(slNo: any) {
        let data: any = {};
        data['slNo'] = slNo;
        return this.deleteCallService(`${this.ToolUrl}` + "/delete", data);
    }

    toolPdf(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.ToolUrl}` + "/pdf",data)
    }
    toolExcel(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.ToolUrl}` + "/excel",data)
    }

}