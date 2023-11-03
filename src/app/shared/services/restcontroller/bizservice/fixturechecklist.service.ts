import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Checklist001mb } from "../entities/Checklist001mb";
import { Fixturechecklist001mb, } from "../entities/FixtureChecklistmb";

@Injectable()
export class FixtureChecklistSettingManager extends BaseService {
    private fixturechecklistUrl: string = `${environment.apiUrl}/fixturechecklist`

    allfixturechecklist(unitslno:number) {
        let data: any={};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.fixturechecklistUrl}` + "/findAll",data);
    }

    fixturechecklistsave(fixtureChecklist001mb:  Fixturechecklist001mb ) {
        
        return this.postCallService(`${this.fixturechecklistUrl}` + "/save", {}, fixtureChecklist001mb);
    }

    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.fixturechecklistUrl}`, data);
    }


    fixturechecklistupdate(fixtureChecklist001mb: Fixturechecklist001mb ) {
        return this.putCallService(`${this.fixturechecklistUrl}` + "/update", {},fixtureChecklist001mb);
    }

    checklistdelete(slNo: any) {
        let data: any = {};
        data['slNo'] = slNo;
        return this.deleteCallService(`${this.fixturechecklistUrl}`+"/delete", data);
    }
    checklistPdf(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.fixturechecklistUrl}` + "/pdf",data)
    }
    checklistExcel(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.fixturechecklistUrl}` + "/excel",data)
    }
}