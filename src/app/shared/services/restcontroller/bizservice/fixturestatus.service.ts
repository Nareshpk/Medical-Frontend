import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { FixtureStatus001mb } from "../entities/FixtureStatusmb";
import { Status001mb } from "../entities/status001mb";

@Injectable()
export class FixtureStatusSettingManager extends BaseService {
    private fixturestatusUrl: string = `${environment.apiUrl}/fixturestatus`

    allfixturestatus(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.fixturestatusUrl}` + "/findAll",data);
    }

    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.fixturestatusUrl}`, data);
    }

    fixturestatussave(fixturestatus001mb: FixtureStatus001mb) {
        
        return this.postCallService(`${this.fixturestatusUrl}` + "/save", {}, fixturestatus001mb);
    }

    statusupdate(fixturestatus001mb: FixtureStatus001mb) {
        return this.putCallService(`${this.fixturestatusUrl}` + "/update", {}, fixturestatus001mb);
    }

    statusdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.fixturestatusUrl}`+"/delete", data);
    }

    fixturestatusPdf(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.fixturestatusUrl}` + "/pdf",data)
    }
    fixturestatusExcel(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.fixturestatusUrl}` + "/excel",data)
    }
}