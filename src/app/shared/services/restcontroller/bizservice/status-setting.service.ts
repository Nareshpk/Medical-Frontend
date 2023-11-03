import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Status001mb } from "../entities/status001mb";

@Injectable()
export class StatusSettingManager extends BaseService {
    private statusUrl: string = `${environment.apiUrl}/status`

    allstatus() {
        return this.getCallService(`${this.statusUrl}` + "/findAll");
    }

    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.statusUrl}`, data);
    }

    statussave(status001mb: Status001mb) {
        return this.postCallService(`${this.statusUrl}` + "/save", {}, status001mb);
    }

    statusupdate(status001mb: Status001mb) {
        return this.putCallService(`${this.statusUrl}` + "/update", {}, status001mb);
    }

    findAllByStatusId() {
        return this.getCallService(`${this.statusUrl}` + "/findAllByStatusId");
    }
    
    findAllByApporuvedId() {
        return this.getCallService(`${this.statusUrl}` + "/findAllByApporuvedId");
    }
    
    statusdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.statusUrl}`+"/delete", data);
    }

    statusPdf(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.statusUrl}` + "/pdf",data)
    }
    statusExcel(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.statusUrl}` + "/excel",data)
    }
}