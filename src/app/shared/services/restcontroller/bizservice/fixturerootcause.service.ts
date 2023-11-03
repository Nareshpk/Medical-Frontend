import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { FixtureRootcause001mb } from "../entities/fixturerootcause.mb";
import { Rootcause001mb } from "../entities/Rootcause001mb";

@Injectable()
export class FixtureRootCauseSettingManager extends BaseService {

    private fixturerootcausesettingUrl: string = `${environment.apiUrl}/fixturerootcause`

    allfixturerootcause(unitslno:number) {
        let data: any = {};
        data['slNo'] = unitslno;
        return this.getCallService(`${this.fixturerootcausesettingUrl}` + "/findAll",data);
    }

    findAllbyBreakDownId(slNo: any) {
        let bdslno: any = {};
        bdslno['slNo'] = slNo;
        return this.getCallService(`${this.fixturerootcausesettingUrl}` + "/findAllbyBreakDownId", bdslno);
    }

    rootcausesave(fixturerootcause001mb: FixtureRootcause001mb) {
        return this.postCallService(`${this.fixturerootcausesettingUrl}` + "/save", {}, fixturerootcause001mb);
    }

    rootcauseupdate(fixturerootcause001mb: FixtureRootcause001mb) {
        return this.putCallService(`${this.fixturerootcausesettingUrl}` + "/update", {}, fixturerootcause001mb);
    }

    rootcausedelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.fixturerootcausesettingUrl}` + "/delete", data);
    }
    rootcausePdf(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.fixturerootcausesettingUrl}` + "/pdf",data)
    }
    rootcauseExcel(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.fixturerootcausesettingUrl}` + "/excel",data)
    }
}