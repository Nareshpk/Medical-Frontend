import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Preventiveplan001wb } from "../entities/preventiveplan001wb";

@Injectable()
export class PreventivePlanManager extends BaseService {
    static findAllByDashboard() {
      throw new Error('Method not implemented.');
    }
    private preventivePlanUrl: string = `${environment.apiUrl}/preventiveplan`

    allpreplan() {
        return this.getCallService(`${this.preventivePlanUrl}` + "/findAll");
    }

    findNotificationAll(unitslno: number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.preventivePlanUrl}` + "/findNotificationAll", data);
    }

    findAllByMachineId(mslNo: any, unitslno: any) {
        let data: any = {};
        data['mslno'] = mslNo;
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.preventivePlanUrl}` + "/findAllByMachineId", data);
    }
    findAllByDashboard() {
        // let mslno: any = {};
        // mslno['mslno'] = mslNo;
        
        return this.getCallService(`${this.preventivePlanUrl}` + "/findAllByDashboard");
    }


    preplansave(preventiveplan001wb: Preventiveplan001wb) {
        return this.postCallService(`${this.preventivePlanUrl}` + "/save", {}, preventiveplan001wb);
    }

    preplanUpdate(preventiveplan001wb: Preventiveplan001wb) {
        return this.putCallService(`${this.preventivePlanUrl}` + "/update", {}, preventiveplan001wb);
    }

    preplanDelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.preventivePlanUrl}` + "/delete", data);
    }
    prePlanPdf(mslNo: any,unitslno: any) {
        let data: any = {};
        data['mslno'] = mslNo;
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.preventivePlanUrl}` + "/pdf", data)
    }
    prePlanExcel(mslNo: any, unitslno: any) {
        let data: any = {};
        data['mslno'] = mslNo;
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.preventivePlanUrl}` + "/excel", data)
    }
}