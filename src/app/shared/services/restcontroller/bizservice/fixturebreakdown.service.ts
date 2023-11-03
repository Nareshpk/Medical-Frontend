import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Breakdown001mb } from "../entities/Breakdown001mb";
import { FixtureBreakdown001mb } from "../entities/FixtureBreakdown001mb";

@Injectable()
export class FixtureBreakdownSettingManager extends BaseService {
    private fixturebreakdownUrl: string = `${environment.apiUrl}/fixturebreakdown`

    allfixturebreakdown(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.fixturebreakdownUrl}` + "/findAll",data);
    }

    fixturebreakdowntsave(fixturebreakdown001mb: FixtureBreakdown001mb) {
        return this.postCallService(`${this.fixturebreakdownUrl}` + "/save", {}, fixturebreakdown001mb);
    }

    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.fixturebreakdownUrl}`, data);
    }

    breakdownupdate(fixturebreakdown001mb: FixtureBreakdown001mb) {
        return this.putCallService(`${this.fixturebreakdownUrl}` + "/update", {}, fixturebreakdown001mb);
    }

    breakdowndelete(slNo: any) {
        let data: any = {};
        data['slNo'] = slNo;
        return this.deleteCallService(`${this.fixturebreakdownUrl}` + "/delete", data);
    }

    breakPdf(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.fixturebreakdownUrl}` + "/pdf",data)
    }
    breakExcel(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.fixturebreakdownUrl}` + "/excel",data)
    }
}