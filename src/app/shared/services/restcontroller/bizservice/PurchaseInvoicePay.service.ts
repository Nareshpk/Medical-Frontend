import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Purchaseinvoicepay001wb } from "../entities/purchaseinvoicepay001wb";

@Injectable()
export class PurchaseInvoicePayManager extends BaseService {
    private PurchaseInvoiceUrl: string = `${environment.apiUrl}/PurchaseInvoicePay`

    purchaseinvoicpaySave(purchaseinvoicepay001wb: Purchaseinvoicepay001wb) {
        
        return this.postCallService(`${this.PurchaseInvoiceUrl}` + "/save", {}, purchaseinvoicepay001wb);
    }

    purchaseinvoicpayFileSave(purchaseinvoicSlno:any,selectedFile: any ) {
        let formData: any = new FormData();
        formData.append("file", selectedFile, selectedFile.name);
        formData.append("contenttype", "contenttype");
        formData.append("contenttype", selectedFile.type);
        formData.append("filename", selectedFile.name);
        formData.append("filepath", selectedFile.filepath);
        formData.append("slNo", purchaseinvoicSlno);
        return this.postCallService(`${this.PurchaseInvoiceUrl}` + "/fileSave", {}, formData).pipe(
            catchError(this.errorMgmt)
        )

    }

    purchaseinvoicepayUpdate(purchaseinvoicepay001wb: Purchaseinvoicepay001wb) {
        return this.putCallService(`${this.PurchaseInvoiceUrl}` + "/update", {}, purchaseinvoicepay001wb);
    }

    purchaseinvoicpayFileUpdate(purchaseinvoicSlno:any,selectedFile: any ) {
        let formData: any = new FormData();
        formData.append("file", selectedFile, selectedFile.name);
        formData.append("contenttype", "contenttype");
        formData.append("contenttype", selectedFile.type);
        formData.append("filename", selectedFile.name);
        formData.append("filepath", selectedFile.filepath);
        formData.append("slNo", purchaseinvoicSlno);
        return this.putCallService(`${this.PurchaseInvoiceUrl}` + "/fileUpdate", {}, formData).pipe(
            catchError(this.errorMgmt)
        )

    }

    errorMgmt(error: HttpErrorResponse) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
        } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(errorMessage);
    }

    

    allPurchaseInvoicePay(unitslno:any) {
        let data: any= {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.PurchaseInvoiceUrl}` + "/findAll",data);
    }

    PurchaseInvoicePayDelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.PurchaseInvoiceUrl}` + "/delete", data);
    }


    purchasInvoicePdf(unitslno:any) {
        let data:any={};
        data['unitslno']=unitslno;
        return this.getCallService1(`${this.PurchaseInvoiceUrl}` + "/pdf", data)
    }

    purchasInvoicepdfId(id: any,unitslno:any) {
        let data: any = {};
        data['id'] = id;
        data['unitslno']=unitslno;
        return this.getCallService1(`${this.PurchaseInvoiceUrl}` + "/pdf", data)
    }

    purchasInvoiceExcel(unitslno:any) {
        let data:any={};
        data['unitslno']=unitslno;
        return this.getCallService1(`${this.PurchaseInvoiceUrl}` + "/excel", data)
    }

    purchasInvoiceExcelId(id: any,unitslno:any) {
        let data: any = {};
        data['id'] = id;
        data['unitslno']=unitslno;
        return this.getCallService1(`${this.PurchaseInvoiceUrl}` + "/excel", data)
    }
}