import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Breakdown001mb } from "../entities/Breakdown001mb";
import { FixtureBreakdown001mb } from "../entities/FixtureBreakdown001mb";
import { ToolsBreakdown001mb } from "../entities/toolsbreakdown001mb";

@Injectable()
export class ToolsBreakdownSettingManager extends BaseService {
    private toolsbreakdownUrl: string = `${environment.apiUrl}/toolsbreakdown`

    alltoolsbreakdown(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.toolsbreakdownUrl}` + "/findAll",data);
    }

    fixturebreakdowntsave(toolsBreakdown001mb: ToolsBreakdown001mb) {
        return this.postCallService(`${this.toolsbreakdownUrl}` + "/save", {}, toolsBreakdown001mb);
    }

    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.toolsbreakdownUrl}`, data);
    }

    breakdownupdate(toolsBreakdown001mb: ToolsBreakdown001mb) {
        return this.putCallService(`${this.toolsbreakdownUrl}` + "/update", {}, toolsBreakdown001mb);
    }

    breakdowndelete(slNo: any) {
        let data: any = {};
        data['slNo'] = slNo;
        return this.deleteCallService(`${this.toolsbreakdownUrl}` + "/delete", data);
    }

    breakPdf(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.toolsbreakdownUrl}` + "/pdf",data)
    }
    breakExcel(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.toolsbreakdownUrl}` + "/excel",data)
    }
}