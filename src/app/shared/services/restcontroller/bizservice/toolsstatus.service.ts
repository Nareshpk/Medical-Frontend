import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { FixtureStatus001mb } from "../entities/FixtureStatusmb";
import { Status001mb } from "../entities/status001mb";
import { ToolsStatus001mb } from "../entities/toolsstatus001mb";

@Injectable()
export class ToolsStatusSettingManager extends BaseService {
    private toolsstatusUrl: string = `${environment.apiUrl}/toolsstatus`

    alltoolsstatus(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.toolsstatusUrl}` + "/findAll",data);
    }

    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.toolsstatusUrl}`, data);
    }

   toolsstatussave(toolsstatus001mb: ToolsStatus001mb) {
        
        return this.postCallService(`${this.toolsstatusUrl}` + "/save", {}, toolsstatus001mb);
    }

    toolsstatusupdate(toolsstatus001mb: ToolsStatus001mb) {
        return this.putCallService(`${this.toolsstatusUrl}` + "/update", {}, toolsstatus001mb);
    }

    toolsstatusdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.toolsstatusUrl}`+"/delete", data);
    }

    toolsstatusPdf(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.toolsstatusUrl}` + "/pdf",data)
    }
    toolsstatusExcel(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.toolsstatusUrl}` + "/excel",data)
    }
}