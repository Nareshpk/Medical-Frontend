import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Materiealrequestitem001wb } from "../entities/Materiealrequestitem001wb";



@Injectable()
export class MateriealrequestiteManager extends BaseService {
    private materiealrequestitemUrl: string = `${environment.apiUrl}/Materiealrequestitem`



    allmateriealrequest(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.materiealrequestitemUrl}` + "/findAll",data);
    }
    
    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.materiealrequestitemUrl}`, data);
    }

    materiealrequestsave(materiealrequestitem001wb : Materiealrequestitem001wb ) {
    return this.postCallService(`${this.materiealrequestitemUrl}` + "/save", {}, materiealrequestitem001wb );
    }
  
    materiealrequestUpdate(materiealrequestitem001wb: Materiealrequestitem001wb) {
        return this.putCallService(`${this.materiealrequestitemUrl}` + "/update", {}, materiealrequestitem001wb);
    }
  

    materiealrequestDelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.materiealrequestitemUrl}` + "/delete", data);
    }

    itemPdf(unitslno:any) {
        let data:any={};
        data['unitslno']=unitslno; 
        return this.getCallService1(`${this.materiealrequestitemUrl}` + "/itempdf", data)
    }
    itemExcel(unitslno:any) {
        let data:any={};
        data['unitslno']=unitslno; 
        return this.getCallService1(`${this.materiealrequestitemUrl}` + "/itemexcel", data)
    }

    consumablePdf(unitslno:any) {
        let data:any={};
        data['unitslno']=unitslno; 
        return this.getCallService1(`${this.materiealrequestitemUrl}` + "/consumablepdf", data)
    }
    consumableExcel(unitslno:any) {
        let data:any={};
        data['unitslno']=unitslno; 
        return this.getCallService1(`${this.materiealrequestitemUrl}` + "/consumablexcel", data)
    }

    childPartPdf(unitslno:any) {
        let data:any={};
        data['unitslno']=unitslno; 
        return this.getCallService1(`${this.materiealrequestitemUrl}` + "/childPartpdf", data)
    }
    childPartExcel(unitslno:any) {
        let data:any={};
        data['unitslno']=unitslno; 
        return this.getCallService1(`${this.materiealrequestitemUrl}` + "/childPartexcel", data)
    }


    PartPdf(unitslno:any) {
        let data:any={};
        data['unitslno']=unitslno; 
        return this.getCallService1(`${this.materiealrequestitemUrl}` + "/partpdf", data)
    }
    PartExcel(unitslno:any) {
        let data:any={};
        data['unitslno']=unitslno; 
        return this.getCallService1(`${this.materiealrequestitemUrl}` + "/partexcel", data)
    }

}