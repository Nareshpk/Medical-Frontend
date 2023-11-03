import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Purchaseorder001wb } from "../entities/Purchaseorder001wb";



@Injectable()
export class PurchaseorderManager extends BaseService {

    private PurchaseorderUrl: string = `${environment.apiUrl}/order`

    allpurchaseorder(unitslno:number) {
        let data : any ={};
        data['unitslno']= unitslno;
        return this.getCallService(`${this.PurchaseorderUrl}` + "/findAll",data);
    }

    purchaseordersave(purchaseorder001wb: Purchaseorder001wb) {
        return this.postCallService(`${this.PurchaseorderUrl}` + "/save", {}, purchaseorder001wb);
    }

    purchaseorderupdate(purchaseorder001wb: Purchaseorder001wb) {
        
        return this.putCallService(`${this.PurchaseorderUrl}` + "/update", {}, purchaseorder001wb);
    }
    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.PurchaseorderUrl}`, data);
    }
    findById(purchseId: any) {
        let data: any = {};
        data['purchseId'] = purchseId;
        return this.getCallService(`${this.PurchaseorderUrl}`, data);
    }
    findAllByMetrialId(purchseslNo: any) {
        let data: any = {};
        data['purchseslNo'] = purchseslNo;
        return this.getCallService(`${this.PurchaseorderUrl}`, data);
    }
    UpdatePO(approvel:any, pchaseslno:any, remarks:any) {
        let data: any = {};
        data['approvel'] = approvel;
        data['pchaseslno'] = pchaseslno;
        data['remarks'] = remarks;
        return this.getCallService(`${this.PurchaseorderUrl}` + "/UpdatePO", data);
    }

    purchaseorderdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.PurchaseorderUrl}` + "/delete", data);
    }

    purchaseorderPdf(unitslno:any) {
        let data:any={};
        data['unitslno']=unitslno;
        return this.getCallService1(`${this.PurchaseorderUrl}` + "/pdf", data)
    }

    purchaseParamsPdf(id: any,unitslno:any) {
        let data: any = {};
        data['id'] = id;
        data['unitslno']=unitslno;
        return this.getCallService1(`${this.PurchaseorderUrl}` + "/pdf", data);
    }
    purchaseorderExcel(unitslno:any) {
        let data:any={};
        data['unitslno']=unitslno;
        return this.getCallService1(`${this.PurchaseorderUrl}` + "/excel", data)
    }
   
    purchaseordersingleExcel(id:any,unitslno:any) {
        let data: any = {};
        data['id'] = id;
        data['unitslno']=unitslno;
        return this.getCallService1(`${this.PurchaseorderUrl}` + "/excel", data)
    }

    getCount() {
        return this.getCallService(`${this.PurchaseorderUrl}` + "/getCount");
    }

}