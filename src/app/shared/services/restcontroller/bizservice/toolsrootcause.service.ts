import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { FixtureRootcause001mb } from "../entities/fixturerootcause.mb";
import { Rootcause001mb } from "../entities/Rootcause001mb";
import { ToolsRootcause001mb } from "../entities/toolsrootcause001mb";

@Injectable()
export class ToolsRootCauseSettingManager extends BaseService {

    private toolsrootcausesettingUrl: string = `${environment.apiUrl}/toolsrootcause`

    allfixturerootcause(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.toolsrootcausesettingUrl}` + "/findAll",data);
    }

    findAllbyBreakDownId(slNo: any) {
        let bdslno: any = {};
        bdslno['slNo'] = slNo;
        return this.getCallService(`${this.toolsrootcausesettingUrl}` + "/findAllbyBreakDownId", bdslno);
    }

    rootcausesave(toolsrootcause001mb: ToolsRootcause001mb) {
        return this.postCallService(`${this.toolsrootcausesettingUrl}` + "/save", {}, toolsrootcause001mb);
    }

    rootcauseupdate(toolsrootcause001mb: ToolsRootcause001mb) {
        return this.putCallService(`${this.toolsrootcausesettingUrl}` + "/update", {}, toolsrootcause001mb);
    }

    rootcausedelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.toolsrootcausesettingUrl}` + "/delete", data);
    }
    rootcausePdf(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.toolsrootcausesettingUrl}` + "/pdf",data)
    }
    rootcauseExcel(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.toolsrootcausesettingUrl}` + "/excel",data)
    }
}