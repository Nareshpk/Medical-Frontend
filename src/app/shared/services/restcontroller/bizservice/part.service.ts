import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Part001mb } from "../entities/Part001mb";


@Injectable()
export class PartManager extends BaseService {
    private PartUrl: string = `${environment.apiUrl}/part`


    allpart(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.PartUrl}` + "/findAll",data);
    }

    findOne(slNo: any) {
        let data: any = {};
        data['slNo'] = slNo;
        return this.getCallService(`${this.PartUrl}`, data);
    }

    partSave(part001mb: Part001mb) {
        return this.postCallService(`${this.PartUrl}` + "/save", {}, part001mb);
    }

    partUpdate(part001mb: Part001mb) {
        return this.putCallService(`${this.PartUrl}` + "/update", {}, part001mb);
    }
    getCount() {
        return this.getCallService(`${this.PartUrl}` + "/getCount");
    }


    parttDelete(slNo: any) {
        let data: any = {};
        data['slNo'] = slNo;
        return this.deleteCallService(`${this.PartUrl}` + "/delete", data);
    }

    partPdf(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.PartUrl}` + "/pdf", data)
    }

    partExcel(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.PartUrl}` + "/excel", data)
    }
}