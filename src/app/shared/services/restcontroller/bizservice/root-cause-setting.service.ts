import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Rootcause001mb } from "../entities/Rootcause001mb";

@Injectable()
export class RootCauseSettingManager extends BaseService {

    private rootcausesettingUrl: string = `${environment.apiUrl}/rootcause`

    allrootcause(unitslno: any) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.rootcausesettingUrl}` + "/findAll", data);
    }

    findAllbyBreakDownId(slNo: any) {
        let bdslno: any = {};
        bdslno['slNo'] = slNo;
        return this.getCallService(`${this.rootcausesettingUrl}` + "/findAllbyBreakDownId", bdslno);
    }

    rootcausesave(rootcause001mb: Rootcause001mb) {
        return this.postCallService(`${this.rootcausesettingUrl}` + "/save", {}, rootcause001mb);
    }

    rootcauseupdate(rootcause001mb: Rootcause001mb) {
        return this.putCallService(`${this.rootcausesettingUrl}` + "/update", {}, rootcause001mb);
    }

    rootcausedelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.rootcausesettingUrl}` + "/delete", data);
    }
    rootcausePdf(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.rootcausesettingUrl}` + "/pdf",data)
    }
    rootcauseExcel(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.rootcausesettingUrl}` + "/excel",data)
    }
}