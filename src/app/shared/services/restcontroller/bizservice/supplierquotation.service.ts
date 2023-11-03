import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Supplierquotation001wb } from "../entities/supplierquotation001wb ";



@Injectable()
export class SupplierQuotationManager extends BaseService {
    private SupplierQuotationUrl: string = `${environment.apiUrl}/supquotation`

    allSupplierQuotation(unitslno:any) {
        let data: any= {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.SupplierQuotationUrl}` + "/findAll",data);
    }

    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.SupplierQuotationUrl}`, data);
    }

    findAllbySupplierId(slNo: any) {
        let poslNo: any = {};
        poslNo['slNo'] = slNo;
        return this.getCallService(`${this.SupplierQuotationUrl}` + "/findAllbySupplierId", poslNo);
    }

    SupplierQuotationSave(supplierquotation001wb: Supplierquotation001wb) {
        return this.postCallService(`${this.SupplierQuotationUrl}` + "/save", {}, supplierquotation001wb);
    }

    SupplierQuotationFileSave(supplierquotationSlno:any,selectedFile: any ) {
        let formData: any = new FormData();
        formData.append("file", selectedFile, selectedFile.name);
        formData.append("contenttype", "contenttype");
        formData.append("contenttype", selectedFile.type);
        formData.append("filename", selectedFile.name);
        formData.append("filepath", selectedFile.filepath);
        formData.append("slNo", supplierquotationSlno);
        return this.postCallService(`${this.SupplierQuotationUrl}` + "/fileSave", {}, formData).pipe(
            catchError(this.errorMgmt)
        )

    }

    SupplierQuotationFileUpdate(supplierquotationSlno:any,selectedFile: any ) {
        let formData: any = new FormData();
        formData.append("file", selectedFile, selectedFile.name);
        formData.append("contenttype", "contenttype");
        formData.append("contenttype", selectedFile.type);
        formData.append("filename", selectedFile.name);
        formData.append("filepath", selectedFile.filepath);
        formData.append("slNo", supplierquotationSlno);
        return this.putCallService(`${this.SupplierQuotationUrl}` + "/fileUpdate", {}, formData).pipe(
            catchError(this.errorMgmt)
        )

    }

    SupplierQuotationUpdate(supplierquotation001wb: Supplierquotation001wb) {
        return this.putCallService(`${this.SupplierQuotationUrl}` + "/update", {}, supplierquotation001wb);
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

   

    UpdateSupplierQuotation(approvel:any, pchaseslno:any, remarks:any) {
        let data: any = {};
        data['approvel'] = approvel;
        data['pchaseslno'] = pchaseslno;
        data['remarks'] = remarks;
        return this.getCallService(`${this.SupplierQuotationUrl}` + "/UpdateSupplierQuotation", data);
    }

    SupplierQuotationDelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.SupplierQuotationUrl}` + "/delete", data);
    }


    supplierQuotationPdf(unitslno:any) {
        let data:any={};
        data['unitslno']=unitslno;
        return this.getCallService1(`${this.SupplierQuotationUrl}` + "/pdf", data)
    }
    paramsPdf(id: any,unitslno:any) {
        let data: any = {};
        data['id'] = id;
        data['unitslno']=unitslno;
        return this.getCallService1(`${this.SupplierQuotationUrl}` + "/pdf", data);
    }
    supplierQuotationExcel(unitslno:any) {
        let data:any={};
        data['unitslno']=unitslno;
        return this.getCallService1(`${this.SupplierQuotationUrl}` + "/excel", data)
    }

    supplierExcel(id:any,unitslno:any) {
        let data: any = {};
        data['id'] = id;
        data['unitslno']=unitslno;
        return this.getCallService1(`${this.SupplierQuotationUrl}` + "/excel", data)
    }

   

}