import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Payment001wb } from "../entities/Payment001wb";



@Injectable()
export class PaymentManager extends BaseService {
    private PaymentUrl: string = `${environment.apiUrl}/payment`

    allpayment(unitslno:number) {
        let data :any ={};
        data['unitslno'] =unitslno;
        return this.getCallService(`${this.PaymentUrl}` + "/findAll",data);
    }

    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.PaymentUrl}`, data);
    }

    paymentSave(payment001wb: Payment001wb) {
        return this.postCallService(`${this.PaymentUrl}` + "/save", {}, payment001wb);
    }

    paymentUpdate(payment001wb: Payment001wb) {
        return this.putCallService(`${this.PaymentUrl}` + "/update", {}, payment001wb);
    }

    paymentDelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.PaymentUrl}` + "/delete", data);
    }
    paymentPdf(unitslno:any) {
        let data:any={};
        data['unitslno']=unitslno;
        return this.getCallService1(`${this.PaymentUrl}` + "/pdf", data)
    }

    paymentExcel(unitslno:any) {
        let data:any={};
        data['unitslno']=unitslno;
        return this.getCallService1(`${this.PaymentUrl}` + "/excel", data)
    }
}