import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { FixturePreventiveplan001wb } from "../entities/fixturepreventiveplan001wb";
import { Preventiveplan001wb } from "../entities/preventiveplan001wb";

@Injectable()
export class FixturePreventivePlanManager extends BaseService {
    static findAllByDashboard() {
      throw new Error('Method not implemented.');
    }
    private fixturepreventivePlanUrl: string = `${environment.apiUrl}/fixturepreventiveplan`

    allpreplan() {
        return this.getCallService(`${this.fixturepreventivePlanUrl}` + "/findAll");
    }

    findNotificationAll() {
        return this.getCallService(`${this.fixturepreventivePlanUrl}` + "/findNotificationAll");
    }

    findAllByFixtureId(mslNo: any,unitslno:number) {
        let data: any = {};
        data['mslno'] = mslNo;
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.fixturepreventivePlanUrl}` + "/findAllByFixtureId", data);
    }
    findAllByDashboard() {
        // let mslno: any = {};
        // mslno['mslno'] = mslNo;
        
        return this.getCallService(`${this.fixturepreventivePlanUrl}` + "/findAllByDashboard");
    }


    fixturepreplansave(fixturepreventiveplan001wb: FixturePreventiveplan001wb) {
        return this.postCallService(`${this.fixturepreventivePlanUrl}` + "/save", {}, fixturepreventiveplan001wb);
    }

    fixturepreplanUpdate(fixturepreventiveplan001wb: FixturePreventiveplan001wb) {
        return this.putCallService(`${this.fixturepreventivePlanUrl}` + "/update", {}, fixturepreventiveplan001wb);
    }

    preplanDelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.fixturepreventivePlanUrl}` + "/delete", data);
    }
    prePlanPdf(mslNo: any,unitslno:number) {
        let data: any = {};
        data['mslno'] = mslNo;
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.fixturepreventivePlanUrl}` + "/pdf", data)
    }
    prePlanExcel(mslNo: any,unitslno:number) {
        let data: any = {};
        data['mslno'] = mslNo;
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.fixturepreventivePlanUrl}` + "/excel", data)
    }
}