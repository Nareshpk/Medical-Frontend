import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Dailychecklist001wb } from "../entities/Dailychecklist001wb";

@Injectable()
export class DailyChecklistManager extends BaseService {
    private dailychecklistUrl: string = `${environment.apiUrl}/dailychecklist`

    alldailychecklist() {
        return this.getCallService(`${this.dailychecklistUrl}` + "/findAll");
    }

    findAllByMachineId(mslNo: any, unitslno: any) {
        let data: any = {};
        data['mslno'] = mslNo;
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.dailychecklistUrl}` + "/findAllByMachineId", data,);
    }

    dailychecklistsave(dailychecklist001wb: Dailychecklist001wb) {
        return this.postCallService(`${this.dailychecklistUrl}` + "/save", {}, dailychecklist001wb);
    }

    dailychecklistupdate(dailychecklist001wb: Dailychecklist001wb) {
        return this.putCallService(`${this.dailychecklistUrl}` + "/update", {}, dailychecklist001wb);
    }

    dailychecklistdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.dailychecklistUrl}`+"/delete", data);
    }

    dailyCheckPdf(mslNo: any,unitslno: any) {
        let data: any = {};
        data['mslno'] = mslNo;
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.dailychecklistUrl}` + "/pdf", data)
    }

    dailyCheckExcel(mslNo: any,unitslno: any) {
        let data: any = {};
        data['mslno'] = mslNo;
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.dailychecklistUrl}` + "/excel", data)
    }
}