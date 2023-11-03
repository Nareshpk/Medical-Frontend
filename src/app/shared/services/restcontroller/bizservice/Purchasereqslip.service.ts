import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Purchasereqslip001wb } from "../entities/Purchasereqslip001wb";


@Injectable()
export class PurchasereqslipManager extends BaseService {

    private PurchasereqslipUrl: string = `${environment.apiUrl}/purchasereq`

    allpurchaseslip(unitslno:number) {
        let data:any={};
        data['unitslno']=unitslno;
        return this.getCallService(`${this.PurchasereqslipUrl}` + "/findAll",data);
    }

    purchaseslipsave(purchasereqslip001wb: Purchasereqslip001wb) {
       
        return this.postCallService(`${this.PurchasereqslipUrl}` + "/save", {}, purchasereqslip001wb);
    }

    purchaseslipupdate(purchasereqslip001wb: Purchasereqslip001wb) {
        
        return this.putCallService(`${this.PurchasereqslipUrl}` + "/update", {}, purchasereqslip001wb);
    }

    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.PurchasereqslipUrl}`, data);
    }
    
    updatereqslip(approvel:any, pchaseslno:any, remarks:any) {
        let data: any = {};
        data['approvel'] = approvel;
        data['pchaseslno'] = pchaseslno;
        data['remarks'] = remarks;
        return this.getCallService(`${this.PurchasereqslipUrl}` + "/updatereqslip", data);
    }

    getCount() {
        return this.getCallService(`${this.PurchasereqslipUrl}` + "/getCount");
    }

    purchaseslipdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.PurchasereqslipUrl}` + "/delete", data);
    }

    purchaslipPdf(unitslno:any) {
        let data:any={};
        data['unitslno']=unitslno;
        return this.getCallService1(`${this.PurchasereqslipUrl}` + "/pdf", data)
    }
    pdfId(id: any,unitslno:any) {
        let data: any = {};
        data['id'] = id;
        data['unitslno']=unitslno;
        return this.getCallService1(`${this.PurchasereqslipUrl}` + "/pdf", data)
    }

    purchaslipExcel(unitslno:any) {
        let data:any={};
        data['unitslno']=unitslno;
        return this.getCallService1(`${this.PurchasereqslipUrl}` + "/excel", data)
    }
    ExcelId(id: any,unitslno:any) {
        let data: any = {};
        data['id'] = id;
        data['unitslno']=unitslno;
        return this.getCallService1(`${this.PurchasereqslipUrl}` + "/excel", data)
    }

    approvalStatus() {
        return this.getCallService(`${this.PurchasereqslipUrl}` + "/approvalStatus");
    }

    submitStatusUpdate() {
        return this.getCallService(`${this.PurchasereqslipUrl}` + "/submitStatusUpdate/", );
    }

}