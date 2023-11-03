import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { FixtureSpares001mb } from "../entities/FixtureSparemb";
import { Spares001mb } from "../entities/spares001mb";
import { ToolsSpares001mb } from "../entities/toolsspare001mb";

@Injectable()
export class ToolsSparesettingManager extends BaseService {
   
    private toolssparesettingUrl: string = `${environment.apiUrl}/toolsspare`
    alltoolssparesetting(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.toolssparesettingUrl}`+"/findAll",data);
    }
    fixturesparesave(toolsSpares001mb: ToolsSpares001mb) {
        return this.postCallService(`${this.toolssparesettingUrl}` + "/save", {}, toolsSpares001mb);
    }
    fixturespareupdate(toolsSpares001mb: ToolsSpares001mb) {
        return this.putCallService(`${this.toolssparesettingUrl}` + "/update", {}, toolsSpares001mb);
    }
    sparedelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.toolssparesettingUrl}`+"/delete",data);
    }
    sparePdf(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.toolssparesettingUrl}` + "/pdf",data)
    }
    spareExcel(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.toolssparesettingUrl}` + "/excel",data)
    }
}