import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Checklist001mb } from "../entities/Checklist001mb";
import { Fixturechecklist001mb, } from "../entities/FixtureChecklistmb";
import { Toolschecklist001mb } from "../entities/toolschecklist001mb";

@Injectable()
export class ToolsChecklistSettingManager extends BaseService {
    private toolschecklistUrl: string = `${environment.apiUrl}/toolschecklist`

    alltoolschecklist(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.toolschecklistUrl}` + "/findAll",data);
    }

    fixturechecklistsave(toolsChecklist001mb:  Toolschecklist001mb ) {
        
        return this.postCallService(`${this.toolschecklistUrl}` + "/save", {}, toolsChecklist001mb);
    }

    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.toolschecklistUrl}`, data);
    }


    fixturechecklistupdate(toolsChecklist001mb: Toolschecklist001mb ) {
        return this.putCallService(`${this.toolschecklistUrl}` + "/update", {},toolsChecklist001mb);
    }

    checklistdelete(slNo: any) {
        let data: any = {};
        data['slNo'] = slNo;
        return this.deleteCallService(`${this.toolschecklistUrl}`+"/delete", data);
    }
    checklistPdf(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.toolschecklistUrl}` + "/pdf",data)
    }
    checklistExcel(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.toolschecklistUrl}` + "/excel",data)
    }
}