import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { FixturePreventiveaction001mb } from "../entities/fixturepreventiveaction.mb";
import { Preventiveaction001mb } from "../entities/preventiveaction001mb";


@Injectable()
export class FixturePreventiveactionManager extends BaseService {
    private fixturepreventiveactionUrl: string = `${environment.apiUrl}/fixturepreventiveaction`
    alltoolspreventiveaction: any;

    allfixturepreventiveaction(unitslno:number) {
        let data: any ={};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.fixturepreventiveactionUrl}` + "/findAll",data);
    }

    findAllbyRootCauseId(slNo: any) {
        let rcslno: any = {};
        rcslno['slNo'] = slNo;
        return this.getCallService(`${this.fixturepreventiveactionUrl}` + "/findAllbyRootCauseId", rcslno);
    }

    preventiveactionsave(fixturepreventiveaction001mb: FixturePreventiveaction001mb) {
        return this.postCallService(`${this.fixturepreventiveactionUrl}` + "/save", {}, fixturepreventiveaction001mb);
    }

    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.fixturepreventiveactionUrl}`, data);
    }

    preventiveactionupdate(fixturepreventiveaction001mb: Preventiveaction001mb) {
        return this.putCallService(`${this.fixturepreventiveactionUrl}` + "/update", {}, fixturepreventiveaction001mb);
    }

    preventiveactiondelete(slNo: any) {
        let data: any = {};
        data['slNo'] = slNo;
        return this.deleteCallService(`${this.fixturepreventiveactionUrl}` + "/delete", data);
    }
    preventPdf(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.fixturepreventiveactionUrl}` + "/pdf",data)
    }
    preventExcel(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.fixturepreventiveactionUrl}` + "/excel",data)
    }
}