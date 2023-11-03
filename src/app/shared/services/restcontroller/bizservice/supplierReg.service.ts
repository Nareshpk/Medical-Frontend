import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Supplierregistration001mb } from "../entities/supplierRegistration001mb";


@Injectable()
export class SupplierRegManager extends BaseService {
    private SupplierRegUrl: string = `${environment.apiUrl}/supplierReg`

    allSupplier(unitslno:number) {
        let data: any={};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.SupplierRegUrl}` + "/findAll",data);
    }

    findAllSlNoAndSuppcode(unitslno:number) {
        let data: any={};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.SupplierRegUrl}` + "/findAllSlNoAndSuppcode",data);
    }

    findimg(img: any) {
        let data: any = {};
        data['img'] = img;
        return this.getCallService(`${this.SupplierRegUrl}` + "/findimg",data);
    }

    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.SupplierRegUrl}`, data);
    }

    supplierSave(supplierreg001mb: Supplierregistration001mb) {
        return this.postCallService(`${this.SupplierRegUrl}` + "/save", {}, supplierreg001mb);
    }

    
    SupplierRegFileSave(supregslno:any,selectedFile: any ) {
        let formData: any = new FormData();
        formData.append("file", selectedFile, selectedFile.name);
        formData.append("contenttype", "contenttype");
        formData.append("contenttype", selectedFile.type);
        formData.append("filename", selectedFile.name);
        formData.append("filepath", selectedFile.filepath);
        formData.append("slNo", supregslno);
        return this.postCallService(`${this.SupplierRegUrl}` + "/fileSave", {}, formData).pipe(
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

    supplierUpdate(supplierreg001mb: Supplierregistration001mb) {
        
        return this.putCallService(`${this.SupplierRegUrl}` + "/update", {}, supplierreg001mb);
    }

    supplierDelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.SupplierRegUrl}` + "/delete", data);
    }

    pdfId(id: any,unitslno:any) {
        let data: any = {};
        data['id'] = id;
        data['unitslno']=unitslno;
        return this.getCallService1(`${this.SupplierRegUrl}` + "/pdfId", data)
    }

    ExcelId(id: any,unitslno:any) {
        let data: any = {};
        data['id'] = id;
        data['unitslno']=unitslno;
        return this.getCallService1(`${this.SupplierRegUrl}` + "/excelID", data)
    }

    suplregPdf(unitslno:number) {  
        let data: any = {};
        data['unitslno'] = unitslno;   
        return this.getCallService1(`${this.SupplierRegUrl}` + "/pdf",data)
    }
    suplregExcel(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.SupplierRegUrl}` + "/excel",data)
    }

    getCount() {
        return this.getCallService(`${this.SupplierRegUrl}` + "/getCount");
    }



}