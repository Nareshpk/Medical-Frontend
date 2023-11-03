import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { FixturePreventiveaction001mb } from "../entities/fixturepreventiveaction.mb";
import { Preventiveaction001mb } from "../entities/preventiveaction001mb";
import { ToolsPreventiveaction001mb } from "../entities/toolspreventiveaction001mb";


@Injectable()
export class ToolsPreventiveactionManager extends BaseService {
    private toolspreventiveactionUrl: string = `${environment.apiUrl}/toolspreventiveaction`

    alltoolspreventiveaction(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.toolspreventiveactionUrl}` + "/findAll",data);
    }

    findAllbyRootCauseId(slNo: any) {
        let trcslno: any = {};
        trcslno['slNo'] = slNo;
        return this.getCallService(`${this.toolspreventiveactionUrl}` + "/findAllbyRootCauseId", trcslno);
    }

    toolspreventiveactionsave(toolsPreventiveaction001mb: ToolsPreventiveaction001mb) {
        return this.postCallService(`${this.toolspreventiveactionUrl}` + "/save", {}, toolsPreventiveaction001mb);
    }

    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.toolspreventiveactionUrl}`, data);
    }

    toolspreventiveactionupdate(toolsPreventiveaction001mb: ToolsPreventiveaction001mb) {
        return this.putCallService(`${this.toolspreventiveactionUrl}` + "/update", {}, toolsPreventiveaction001mb);
    }

    preventiveactiondelete(slNo: any) {
        let data: any = {};
        data['slNo'] = slNo;
        return this.deleteCallService(`${this.toolspreventiveactionUrl}` + "/delete", data);
    }
    preventPdf(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.toolspreventiveactionUrl}` + "/pdf",data)
    }
    preventExcel(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.toolspreventiveactionUrl}` + "/excel",data)
    }
}