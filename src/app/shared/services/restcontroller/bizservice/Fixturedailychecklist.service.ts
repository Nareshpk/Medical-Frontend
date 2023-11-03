import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Fixturedailychecklist001wb } from "../entities/FixturDailyCheckList001wb";

@Injectable()
export class FixturedailychecklistManager extends BaseService {
    private  fixturechecklistUrl: string = `${environment.apiUrl}/dailychecklist`

    allfixturechecklist(unitslno:any) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.fixturechecklistUrl}` + "/findAll",data);
    }

    findAllByMachineId(mslNo: any,unitslno:any) {
        let data: any = {};
        data['mslno'] = mslNo;
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.fixturechecklistUrl}` + "/findAllByMachineId", data,);
    }

    fixturechecklistsave(fixturedailychecklist001wb: Fixturedailychecklist001wb) {
        return this.postCallService(`${this.fixturechecklistUrl}` + "/save", {}, fixturedailychecklist001wb);
    }

    fixturechecklistupdate(fixturedailychecklist001wb: Fixturedailychecklist001wb) {
        return this.putCallService(`${this.fixturechecklistUrl}` + "/update", {}, fixturedailychecklist001wb);
    }

    fixturechecklistdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.fixturechecklistUrl}`+"/delete", data);
    }

    dailyCheckPdf(mslNo: any,unitslno:number) {
        let data: any = {};
        data['mslno'] = mslNo;
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.fixturechecklistUrl}` + "/pdf", data)
    }

    dailyCheckExcel(mslNo: any,unitslno:number) {
        let data: any = {};
        data['mslno'] = mslNo;
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.fixturechecklistUrl}` + "/excel", data)
    }
}