import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Fixture001mb } from "../entities/Fixture001mb";
import { Machine001mb } from "../entities/Machine001mb";
import { Toolsmaster001mb } from "../entities/toolsmaster001mb";


@Injectable()
export class ToolsMasterSettingManager extends BaseService {
   
    private toolsmasterUrl: string = `${environment.apiUrl}/toolsmaster`

    alltoolsmaster(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.toolsmasterUrl}` + "/findAll",data);
    }
    getCount(){
        return this.getCallService(`${this.toolsmasterUrl}` + "/getCount");
       }
  
    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.toolsmasterUrl}`, data);
    }

    findAllSlNoAndMcode(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.toolsmasterUrl}` + "/findAllSlNoAndMcode",data);
    }

    toolssave(toolmaster001mb:Toolsmaster001mb) {
        return this.postCallService(`${this.toolsmasterUrl}` + "/save", {}, toolmaster001mb);
    }

    toolsupdate(toolmaster001mb: Toolsmaster001mb) {
        return this.putCallService(`${this.toolsmasterUrl}` + "/update", {}, toolmaster001mb);
    }
    
    toolsdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.toolsmasterUrl}`+"/delete", data);
    }
    toolsPdf(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.toolsmasterUrl}` + "/pdf",data)
    }
    toolsExcel(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.toolsmasterUrl}` + "/excel",data)
    }
   
}