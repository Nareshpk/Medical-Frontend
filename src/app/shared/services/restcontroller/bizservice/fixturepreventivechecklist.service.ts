import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Fixturepreventivechecklist001wb } from "../entities/fixturepreventivechecklist001wb";
import { Preventivechecklist001wb } from "../entities/preventivechecklist001wb";

@Injectable()
export class FixturePreventiveChecklistManager extends BaseService {
    private fixpreventivechecklistUrl: string = `${environment.apiUrl}/fixturepreventivechecklist`

    allfixturepreventchecklist(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.fixpreventivechecklistUrl}` + "/findAll",data);
    }

    findAllByFixtureId(mslNo: any, unitslno:number) {
        let data: any = {};
        data['mslno'] = mslNo;
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.fixpreventivechecklistUrl}` + "/findAllByFixtureId", data);
    }

    preventchecklistsave(fixturepreventivechecklist001wb: Fixturepreventivechecklist001wb[]=[]) {
        console.log("fixturepreventivechecklist001wb",fixturepreventivechecklist001wb);
        
        return this.postCallService(`${this.fixpreventivechecklistUrl}` + "/save", {}, fixturepreventivechecklist001wb);
    }

    preventchecklistupdate(fixturepreventivechecklist001wb: Fixturepreventivechecklist001wb) {
        return this.putCallService(`${this.fixpreventivechecklistUrl}` + "/update", {}, fixturepreventivechecklist001wb);
    }

    preventchecklistdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.fixpreventivechecklistUrl}`+"/delete", data);
    }
    preCheckPdf(mslNo: any,unitslno:number) {
        let data: any = {};
        data['mslno'] = mslNo;
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.fixpreventivechecklistUrl}` + "/pdf", data)
    }
    preCheckExcel(mslNo: any,unitslno:number) {
        let data: any = {};
        data['mslno'] = mslNo;
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.fixpreventivechecklistUrl}` + "/excel", data)
    }
}