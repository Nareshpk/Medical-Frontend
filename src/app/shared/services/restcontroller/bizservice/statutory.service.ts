import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Statutory001wb } from "../entities/statutory001wb";


@Injectable()
export class StatutoryPlanManager extends BaseService {
    private statutoryPlanUrl: string = `${environment.apiUrl}/statutory`



    allstuplan(unitslno: any) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.statutoryPlanUrl}` + "/findAll", data);
    }
    findNotificationAll() {
        return this.getCallService(`${this.statutoryPlanUrl}` + "/findNotificationAll");
    }
    findAllByEmployeNameId() {
        return this.getCallService(`${this.statutoryPlanUrl}` + "/findAllByEmployeNameId", );
    }
    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.statutoryPlanUrl}`, data);
    }
  

    stuplansave(statutory001wb : Statutory001wb ) {
    return this.postCallService(`${this.statutoryPlanUrl}` + "/save", {}, statutory001wb );
    }
  
    stuplanUpdate(statutory001wb: Statutory001wb) {
        return this.putCallService(`${this.statutoryPlanUrl}` + "/update", {}, statutory001wb);
    }
    findAllByBankId(bslNo: any) {
        let bslno: any = {};
        bslno['bslno'] = bslNo;
        return this.getCallService(`${this.statutoryPlanUrl}` + "/findAllBylegalId", bslno);
    }

    stuplanDelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.statutoryPlanUrl}` + "/delete", data);
    }


    statoryPdf(unitslno:number) {                     
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.statutoryPlanUrl}` + "/pdf", data)
        
    }
    statoryExcel(unitslno:number) {  
        let data: any = {};
        data['unitslno'] = unitslno;         
        return this.getCallService1(`${this.statutoryPlanUrl}` + "/excel", data)
        
    }




  
   

}