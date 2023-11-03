import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { CustomerPoMaster001mb } from "../entities/customerPo001mb";

@Injectable()
export class CustomerPoMasterManager extends BaseService {
    private CustomerPoMasterUrl: string = `${environment.apiUrl}/CustomerPoMaster`

    CustomerPoSave(customerPoMaster001mb: CustomerPoMaster001mb) {
        
        return this.postCallService(`${this.CustomerPoMasterUrl}` + "/save", {}, customerPoMaster001mb);
    }

    CustomerPoUpdate(customerPoMaster001mb: CustomerPoMaster001mb) {
        return this.putCallService(`${this.CustomerPoMasterUrl}` + "/update", {}, customerPoMaster001mb);
    }

    allCustomerPo(unitslno:any) {
        let data: any= {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.CustomerPoMasterUrl}` + "/findAll",data);
    }

    CustomerPoDelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.CustomerPoMasterUrl}` + "/delete", data);
    }

    pdfId(id: any,unitslno:any) {
        let data: any = {};
        data['id'] = id;
        data['unitslno']=unitslno;
        return this.getCallService1(`${this.CustomerPoMasterUrl}` + "/pdfId", data)
    }

    ExcelId(id: any,unitslno:any) {
        let data: any = {};
        data['id'] = id;
        data['unitslno']=unitslno;
        return this.getCallService1(`${this.CustomerPoMasterUrl}` + "/excelID", data)
    }

    customerPomasterPdf(unitslno:number) {  
        let data: any = {};
        data['unitslno'] = unitslno;   
        return this.getCallService1(`${this.CustomerPoMasterUrl}` + "/pdf",data)
    }
    customerPomasterExcel(unitslno:number) {        
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.CustomerPoMasterUrl}` + "/excel",data)
    }
    
}